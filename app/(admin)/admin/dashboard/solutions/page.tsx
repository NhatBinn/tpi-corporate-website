import CrudManager from "@/components/admin/crud/CrudManager";
import { deleteSolutionAction, saveSolutionAction } from "@/actions/admin/solution";
import { getAdminSolutions, getSolutionCategoryOptions } from "@/services/admin/solution.service";
import { getProductOptions } from "@/services/admin/catalog.service";
import { IMAGE_HELP, RICH_TEXT_HELP, SLUG_HELP, searchText, str, toOptions } from "@/lib/admin-rows";
import type { ColumnDef, CrudRow, FieldDef } from "@/types/admin";

const columns: ColumnDef[] = [
  { key: "name", label: "Giải pháp", type: "strong" },
  { key: "category", label: "Nhóm" },
  { key: "sortOrder", label: "Thứ tự", type: "number" },
  { key: "products", label: "Sản phẩm", type: "number", align: "right" },
  { key: "isPublished", label: "Công khai", type: "bool" },
];

export default async function AdminSolutionsPage() {
  const [res, catRes, productRes] = await Promise.all([
    getAdminSolutions(),
    getSolutionCategoryOptions(),
    getProductOptions(),
  ]);

  const fields: FieldDef[] = [
    { name: "name", label: "Tên giải pháp", type: "text", required: true },
    {
      name: "slug",
      label: "Slug (URL)",
      type: "text",
      help: `${SLUG_HELP}. 6 slug mặc định (nha-xuong, cao-tang...) có bố cục riêng trên trang chủ`,
    },
    {
      name: "categoryId",
      label: "Nhóm giải pháp",
      type: "select",
      required: true,
      options: catRes.success ? toOptions(catRes.data) : [],
    },
    { name: "imageUrl", label: "Ảnh", type: "text", help: IMAGE_HELP },
    { name: "sortOrder", label: "Thứ tự hiển thị", type: "number", defaultValue: "0" },
    { name: "isPublished", label: "Công khai trên website", type: "checkbox", defaultValue: true },
    { name: "description", label: "Mô tả ngắn (hiện trên card)", type: "textarea", full: true, rows: 2 },
    { name: "content", label: "Nội dung chi tiết", type: "textarea", full: true, rows: 10, help: RICH_TEXT_HELP },
    {
      name: "productIds",
      label: "Sản phẩm đề xuất (theo thứ tự chọn)",
      type: "multiselect",
      full: true,
      options: productRes.success ? toOptions(productRes.data) : [],
    },
  ];

  const rows: CrudRow[] = res.success
    ? res.data.map((s) => ({
        id: s.id,
        cells: {
          name: s.name,
          category: s.category.name,
          sortOrder: s.sortOrder,
          products: s.solutionProducts.length,
          isPublished: s.isPublished,
        },
        values: {
          name: s.name,
          slug: s.slug,
          categoryId: s.categoryId,
          imageUrl: str(s.imageUrl),
          sortOrder: str(s.sortOrder),
          isPublished: s.isPublished,
          description: str(s.description),
          content: str(s.content),
          productIds: s.solutionProducts.map((sp) => sp.productId),
        },
        viewHref: s.isPublished ? `/giai-phap/${s.slug}` : undefined,
        search: searchText(s.name, s.slug, s.category.name),
      }))
    : [];

  return (
    <CrudManager
      title="Giải pháp"
      entity="giải pháp"
      columns={columns}
      fields={fields}
      rows={rows}
      saveAction={saveSolutionAction}
      deleteAction={deleteSolutionAction}
      loadError={res.success ? null : res.error}
    />
  );
}
