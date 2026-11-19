"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Eye, ExternalLink, Loader2, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import CrudField from "./CrudField";
import type {
  ColumnDef,
  CrudRow,
  DeleteAction,
  FieldDef,
  FormValue,
  FormValues,
  SaveAction,
} from "@/types/admin";
import { cn, normalizeText } from "@/lib/utils";

interface CrudManagerProps {
  title: string;
  // Tên bản ghi số ít, vd. "sản phẩm" → "Thêm sản phẩm".
  entity: string;
  columns: ColumnDef[];
  fields: FieldDef[];
  rows: CrudRow[];
  // Không truyền saveAction → chỉ xem (vd. liên hệ của khách).
  saveAction?: SaveAction;
  deleteAction: DeleteAction;
  loadError?: string | null;
  note?: string;
}

function emptyValues(fields: FieldDef[]): FormValues {
  return Object.fromEntries(
    fields.map((f) => [
      f.name,
      f.defaultValue ?? (f.type === "checkbox" ? false : f.type === "multiselect" ? [] : ""),
    ]),
  );
}

function Cell({ value, column }: { value: CrudRow["cells"][string]; column: ColumnDef }) {
  if (column.type === "bool") {
    return value ? (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <Check size={13} />
      </span>
    ) : (
      <span className="text-slate-300">—</span>
    );
  }
  if (value === null || value === "") return <span className="text-slate-300">—</span>;
  return (
    <span
      className={cn(
        column.type === "strong" && "font-medium text-slate-900",
        column.type === "muted" && "font-mono text-xs text-slate-500",
        column.type === "number" && "tabular-nums",
      )}
    >
      {String(value)}
    </span>
  );
}

export default function CrudManager({
  title,
  entity,
  columns,
  fields,
  rows,
  saveAction,
  deleteAction,
  loadError,
  note,
}: CrudManagerProps) {
  const router = useRouter();
  const readOnly = !saveAction;
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<{ id: string | null } | null>(null);
  const [values, setValues] = useState<FormValues>(() => emptyValues(fields));
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[] | undefined>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<CrudRow | null>(null);
  const [toast, setToast] = useState<{ text: string; error?: boolean } | null>(null);
  const [saving, startSaving] = useTransition();
  const [deleting, startDeleting] = useTransition();

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const filtered = useMemo(() => {
    const q = normalizeText(search);
    return q ? rows.filter((r) => r.search.includes(q)) : rows;
  }, [rows, search]);

  function open(row: CrudRow | null) {
    setValues({ ...emptyValues(fields), ...(row?.values ?? {}) });
    setFieldErrors({});
    setFormError(null);
    setModal({ id: row?.id ?? null });
  }

  function close() {
    if (saving) return;
    setModal(null);
  }

  function setField(name: string, value: FormValue) {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!saveAction || !modal) return;
    const editingId = modal.id;
    startSaving(async () => {
      const res = await saveAction(editingId, values);
      if (!res.success) {
        setFormError(res.error);
        setFieldErrors(res.fieldErrors ?? {});
        return;
      }
      setModal(null);
      setToast({ text: editingId ? `Đã cập nhật ${entity}` : `Đã thêm ${entity}` });
      router.refresh();
    });
  }

  function remove(row: CrudRow) {
    startDeleting(async () => {
      const res = await deleteAction(row.id);
      setConfirm(null);
      if (!res.success) {
        setToast({ text: res.error, error: true });
        return;
      }
      setToast({ text: `Đã xoá ${entity}` });
      router.refresh();
    });
  }

  // Esc đóng modal / hộp xác nhận.
  useEffect(() => {
    if (!modal && !confirm) return;
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (confirm && !deleting) setConfirm(null);
      else if (modal && !saving) setModal(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal, confirm, saving, deleting]);

  return (
    <div className="p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
            <p className="text-sm text-slate-500">
              {rows.length} {entity}
              {note && ` · ${note}`}
            </p>
          </div>
          {!readOnly && (
            <button
              onClick={() => open(null)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
            >
              <Plus size={16} />
              Thêm {entity}
            </button>
          )}
        </div>

        {loadError && <p className="mb-4 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{loadError}</p>}

        <div className="relative mb-4">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm (không cần dấu)..."
            aria-label={`Tìm ${entity}`}
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  {columns.map((c) => (
                    <th key={c.key} className={cn("px-4 py-3 font-medium", c.align === "right" && "text-right")}>
                      {c.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={columns.length + 1} className="px-4 py-12 text-center text-slate-400">
                      Không có {entity} nào.
                    </td>
                  </tr>
                )}
                {filtered.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50">
                    {columns.map((c) => (
                      <td
                        key={c.key}
                        className={cn("max-w-xs truncate px-4 py-3 text-slate-600", c.align === "right" && "text-right")}
                      >
                        <Cell value={row.cells[c.key] ?? null} column={c} />
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        {row.viewHref && (
                          <a
                            href={row.viewHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Xem trên website"
                            className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-indigo-600"
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}
                        <button
                          onClick={() => open(row)}
                          aria-label={readOnly ? "Xem chi tiết" : "Sửa"}
                          className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-indigo-600"
                        >
                          {readOnly ? <Eye size={15} /> : <Pencil size={15} />}
                        </button>
                        <button
                          onClick={() => setConfirm(row)}
                          aria-label="Xoá"
                          className="rounded-md p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4 sm:items-center"
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="crud-modal-title"
            className="flex max-h-[calc(100dvh-2rem)] w-full max-w-3xl flex-col rounded-xl bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h2 id="crud-modal-title" className="text-lg font-semibold text-slate-900">
                {readOnly ? `Chi tiết ${entity}` : modal.id ? `Sửa ${entity}` : `Thêm ${entity}`}
              </h2>
              <button
                onClick={close}
                aria-label="Đóng"
                className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={submit} noValidate className="flex min-h-0 flex-1 flex-col">
              <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
                {formError && (
                  <div role="alert" className="mb-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
                    {formError}
                  </div>
                )}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {fields.map((f) => (
                    <CrudField
                      key={f.name}
                      field={f}
                      value={values[f.name]}
                      error={fieldErrors[f.name]?.[0]}
                      disabled={readOnly || saving}
                      recordId={modal.id}
                      onChange={(v) => setField(f.name, v)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 px-6 py-4">
                <button
                  type="button"
                  onClick={close}
                  disabled={saving}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-60"
                >
                  {readOnly ? "Đóng" : "Huỷ"}
                </button>
                {!readOnly && (
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
                  >
                    {saving && <Loader2 size={14} className="animate-spin" />}
                    {modal.id ? "Lưu thay đổi" : "Thêm mới"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div role="alertdialog" aria-modal="true" className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <h3 className="mb-1 text-base font-semibold text-slate-900">Xoá {entity}?</h3>
            <p className="mb-5 text-sm text-slate-500">
              Bạn sắp xoá <span className="font-medium text-slate-700">{String(Object.values(confirm.cells)[0])}</span>.
              Hành động này không thể hoàn tác.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirm(null)}
                disabled={deleting}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-60"
              >
                Huỷ
              </button>
              <button
                onClick={() => remove(confirm)}
                disabled={deleting}
                className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 disabled:opacity-60"
              >
                {deleting && <Loader2 size={14} className="animate-spin" />}
                Xoá
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          role="status"
          className={cn(
            "fixed bottom-6 left-1/2 z-60 -translate-x-1/2 rounded-lg px-4 py-2.5 text-sm text-white shadow-lg",
            toast.error ? "bg-rose-600" : "bg-slate-900",
          )}
        >
          {toast.text}
        </div>
      )}
    </div>
  );
}
