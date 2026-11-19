"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import type { FieldDef, FormValue } from "@/types/admin";
import { cn, normalizeText } from "@/lib/utils";

const INPUT =
  "w-full rounded-lg border px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-50 disabled:text-slate-600";

interface CrudFieldProps {
  field: FieldDef;
  value: FormValue;
  error?: string;
  disabled?: boolean;
  // id bản ghi đang sửa (dùng cho excludeSelf).
  recordId: string | null;
  onChange: (value: FormValue) => void;
}

function MultiSelect({
  field,
  value,
  disabled,
  onChange,
}: {
  field: FieldDef;
  value: string[];
  disabled?: boolean;
  onChange: (v: string[]) => void;
}) {
  const [filter, setFilter] = useState("");
  const options = useMemo(() => field.options ?? [], [field.options]);
  const labelOf = useMemo(() => new Map(options.map((o) => [o.value, o.label])), [options]);
  const q = normalizeText(filter);
  const visible = q ? options.filter((o) => normalizeText(o.label).includes(q)) : options;

  // Thêm vào cuối khi chọn → giữ đúng thứ tự chọn (dùng làm thứ tự hiển thị, vd. sản phẩm đề xuất).
  function toggle(id: string) {
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
  }

  return (
    <div className="rounded-lg border border-slate-200">
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5 border-b border-slate-100 p-2">
          {value.map((id, i) => (
            <span
              key={id}
              className="inline-flex items-center gap-1 rounded-full bg-indigo-50 py-0.5 pl-2.5 pr-1 text-xs text-indigo-700"
            >
              <span className="text-indigo-400">{i + 1}.</span>
              {labelOf.get(id) ?? id}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => toggle(id)}
                  aria-label={`Bỏ chọn ${labelOf.get(id) ?? id}`}
                  className="rounded-full p-0.5 hover:bg-indigo-100"
                >
                  <X size={12} />
                </button>
              )}
            </span>
          ))}
        </div>
      )}
      {!disabled && (
        <>
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Lọc danh sách..."
            className="w-full border-b border-slate-100 px-3 py-2 text-sm focus:outline-none"
          />
          <div className="max-h-48 overflow-y-auto p-1">
            {visible.length === 0 && <p className="px-2 py-3 text-center text-xs text-slate-400">Không có lựa chọn</p>}
            {visible.map((o) => (
              <label
                key={o.value}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
              >
                <input type="checkbox" checked={value.includes(o.value)} onChange={() => toggle(o.value)} />
                {o.label}
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function CrudField({ field, value, error, disabled, recordId, onChange }: CrudFieldProps) {
  const id = `field-${field.name}`;
  const describedBy = error ? `${id}-error` : field.help ? `${id}-help` : undefined;
  const inputClass = cn(INPUT, error ? "border-rose-400" : "border-slate-200");

  let control: React.ReactNode;
  switch (field.type) {
    case "checkbox":
      return (
        <label className="flex cursor-pointer items-center gap-2 self-end py-2 text-sm text-slate-700">
          <input
            id={id}
            type="checkbox"
            checked={value === true}
            disabled={disabled}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4"
          />
          {field.label}
        </label>
      );
    case "textarea":
      control = (
        <textarea
          id={id}
          rows={field.rows ?? 4}
          value={String(value ?? "")}
          disabled={disabled}
          placeholder={field.placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(e) => onChange(e.target.value)}
          className={cn(inputClass, "resize-y font-[inherit]")}
        />
      );
      break;
    case "select":
      control = (
        <select
          id={id}
          value={String(value ?? "")}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(e) => onChange(e.target.value)}
          className={cn(inputClass, "bg-white")}
        >
          <option value="">{field.required ? "— Chọn —" : "— Không có —"}</option>
          {(field.options ?? [])
            .filter((o) => !(field.excludeSelf && o.value === recordId))
            .map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
        </select>
      );
      break;
    case "multiselect":
      control = (
        <MultiSelect
          field={field}
          value={Array.isArray(value) ? value : []}
          disabled={disabled}
          onChange={onChange}
        />
      );
      break;
    default:
      control = (
        <input
          id={id}
          type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
          inputMode={field.type === "number" ? "decimal" : undefined}
          value={String(value ?? "")}
          disabled={disabled}
          placeholder={field.placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      );
  }

  return (
    <div className={field.full ? "sm:col-span-2" : undefined}>
      <label htmlFor={id} className="mb-1 block text-xs font-medium text-slate-600">
        {field.label}
        {field.required && <span className="text-rose-500"> *</span>}
      </label>
      {control}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs text-rose-600">
          {error}
        </p>
      ) : (
        field.help && (
          <p id={`${id}-help`} className="mt-1 text-[11px] text-slate-400">
            {field.help}
          </p>
        )
      )}
    </div>
  );
}
