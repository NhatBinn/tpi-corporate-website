import CrudManager from "@/components/admin/crud/CrudManager";
import { deleteTagAction, saveTagAction } from "@/actions/admin/catalog";
import { getAdminTags } from "@/services/admin/catalog.service";
import { SLUG_HELP, searchText } from "@/lib/admin-rows";
import type { ColumnDef, CrudRow, FieldDef } from "@/types/admin";

const columns: ColumnDef[] = [
  { key: "name", label: "Tag", type: "strong" },
  { key: "slug", label: "Slug", type: "muted" },
  { key: "products", label: "Sản phẩm", type: "number", align: "right" },
];

const fields: FieldDef[] = [
  { name: "name", label: "Tên tag", type: "text", required: true },
  { name: "slug", label: "Slug", type: "text", help: SLUG_HELP },
];

export default async function AdminTagsPage() {
  const res = await getAdminTags();

  const rows: CrudRow[] = res.success
    ? res.data.map((t) => ({
        id: t.id,
        cells: { name: t.name, slug: t.slug, products: t._count.products },
        values: { name: t.name, slug: t.slug },
        search: searchText(t.name, t.slug),
      }))
    : [];

  return (
    <CrudManager
      title="Tags"
      entity="tag"
      columns={columns}
      fields={fields}
      rows={rows}
      saveAction={saveTagAction}
      deleteAction={deleteTagAction}
      loadError={res.success ? null : res.error}
      note="xoá tag sẽ gỡ tag khỏi các sản phẩm"
    />
  );
}
