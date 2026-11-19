import CrudManager from "@/components/admin/crud/CrudManager";
import { deleteSolutionCategoryAction, saveSolutionCategoryAction } from "@/actions/admin/solution";
import { getAdminSolutionCategories } from "@/services/admin/solution.service";
import { SLUG_HELP, searchText, str } from "@/lib/admin-rows";
import type { ColumnDef, CrudRow, FieldDef } from "@/types/admin";

const columns: ColumnDef[] = [
  { key: "name", label: "Nhóm giải pháp", type: "strong" },
  { key: "slug", label: "Slug", type: "muted" },
  { key: "sortOrder", label: "Thứ tự", type: "number" },
  { key: "solutions", label: "Giải pháp", type: "number", align: "right" },
];

const fields: FieldDef[] = [
  { name: "name", label: "Tên nhóm", type: "text", required: true },
  { name: "slug", label: "Slug", type: "text", help: SLUG_HELP },
  { name: "sortOrder", label: "Thứ tự hiển thị", type: "number", defaultValue: "0" },
];

export default async function AdminSolutionCategoriesPage() {
  const res = await getAdminSolutionCategories();

  const rows: CrudRow[] = res.success
    ? res.data.map((c) => ({
        id: c.id,
        cells: { name: c.name, slug: c.slug, sortOrder: c.sortOrder, solutions: c._count.solutions },
        values: { name: c.name, slug: c.slug, sortOrder: str(c.sortOrder) },
        search: searchText(c.name, c.slug),
      }))
    : [];

  return (
    <CrudManager
      title="Nhóm giải pháp"
      entity="nhóm"
      columns={columns}
      fields={fields}
      rows={rows}
      saveAction={saveSolutionCategoryAction}
      deleteAction={deleteSolutionCategoryAction}
      loadError={res.success ? null : res.error}
      note="nhóm còn giải pháp thì không xoá được"
    />
  );
}
