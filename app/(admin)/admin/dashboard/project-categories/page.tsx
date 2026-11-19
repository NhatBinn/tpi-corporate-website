import CrudManager from "@/components/admin/crud/CrudManager";
import { deleteProjectCategoryAction, saveProjectCategoryAction } from "@/actions/admin/project";
import { getAdminProjectCategories } from "@/services/admin/project.service";
import { SLUG_HELP, searchText, str } from "@/lib/admin-rows";
import type { ColumnDef, CrudRow, FieldDef } from "@/types/admin";

const columns: ColumnDef[] = [
  { key: "name", label: "Danh mục", type: "strong" },
  { key: "slug", label: "Slug", type: "muted" },
  { key: "sortOrder", label: "Thứ tự", type: "number" },
  { key: "projects", label: "Dự án", type: "number", align: "right" },
];

const fields: FieldDef[] = [
  { name: "name", label: "Tên danh mục", type: "text", required: true },
  { name: "slug", label: "Slug (URL)", type: "text", help: SLUG_HELP },
  { name: "sortOrder", label: "Thứ tự hiển thị", type: "number", defaultValue: "0" },
];

export default async function AdminProjectCategoriesPage() {
  const res = await getAdminProjectCategories();

  const rows: CrudRow[] = res.success
    ? res.data.map((c) => ({
        id: c.id,
        cells: { name: c.name, slug: c.slug, sortOrder: c.sortOrder, projects: c._count.projects },
        values: { name: c.name, slug: c.slug, sortOrder: str(c.sortOrder) },
        viewHref: `/du-an?cats=${c.slug}`,
        search: searchText(c.name, c.slug),
      }))
    : [];

  return (
    <CrudManager
      title="Danh mục dự án"
      entity="danh mục"
      columns={columns}
      fields={fields}
      rows={rows}
      saveAction={saveProjectCategoryAction}
      deleteAction={deleteProjectCategoryAction}
      loadError={res.success ? null : res.error}
      note="danh mục còn dự án thì không xoá được"
    />
  );
}
