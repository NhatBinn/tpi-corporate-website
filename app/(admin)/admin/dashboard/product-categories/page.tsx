import CrudManager from "@/components/admin/crud/CrudManager";
import { deleteProductCategoryAction, saveProductCategoryAction } from "@/actions/admin/catalog";
import { getAdminProductCategories } from "@/services/admin/catalog.service";
import { SLUG_HELP, searchText, str, toOptions } from "@/lib/admin-rows";
import type { ColumnDef, CrudRow, FieldDef } from "@/types/admin";

const columns: ColumnDef[] = [
  { key: "name", label: "Danh mục", type: "strong" },
  { key: "slug", label: "Slug", type: "muted" },
  { key: "parent", label: "Danh mục cha" },
  { key: "products", label: "Sản phẩm", type: "number", align: "right" },
];

export default async function AdminProductCategoriesPage() {
  const res = await getAdminProductCategories();
  const list = res.success ? res.data : [];

  const fields: FieldDef[] = [
    { name: "name", label: "Tên danh mục", type: "text", required: true },
    { name: "slug", label: "Slug (URL)", type: "text", help: SLUG_HELP },
    { name: "parentId", label: "Danh mục cha", type: "select", excludeSelf: true, options: toOptions(list), full: true },
    { name: "seoTitle", label: "SEO title", type: "text", full: true },
    { name: "seoDescription", label: "SEO description", type: "textarea", full: true, rows: 2 },
  ];

  const rows: CrudRow[] = list.map((c) => ({
    id: c.id,
    cells: { name: c.name, slug: c.slug, parent: c.parent?.name ?? null, products: c._count.products },
    values: {
      name: c.name,
      slug: c.slug,
      parentId: str(c.parentId),
      seoTitle: str(c.seoTitle),
      seoDescription: str(c.seoDescription),
    },
    viewHref: `/san-pham?danh-muc=${c.slug}#danh-muc`,
    search: searchText(c.name, c.slug, c.parent?.name),
  }));

  return (
    <CrudManager
      title="Danh mục sản phẩm"
      entity="danh mục"
      columns={columns}
      fields={fields}
      rows={rows}
      saveAction={saveProductCategoryAction}
      deleteAction={deleteProductCategoryAction}
      loadError={res.success ? null : res.error}
      note="danh mục còn sản phẩm thì không xoá được"
    />
  );
}
