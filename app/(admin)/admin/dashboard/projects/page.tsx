import CrudManager from "@/components/admin/crud/CrudManager";
import { deleteProjectAction, saveProjectAction } from "@/actions/admin/project";
import { getAdminProjects, getProjectCategoryOptions } from "@/services/admin/project.service";
import { getProductOptions } from "@/services/admin/catalog.service";
import { IMAGE_HELP, SLUG_HELP, imagesToLines, searchText, str, toOptions } from "@/lib/admin-rows";
import { IMAGE_LINES_HELP } from "@/schemas/admin";
import type { ColumnDef, CrudRow, FieldDef } from "@/types/admin";

const columns: ColumnDef[] = [
  { key: "name", label: "Dự án", type: "strong" },
  { key: "category", label: "Danh mục" },
  { key: "year", label: "Năm", type: "number" },
  { key: "products", label: "Sản phẩm", type: "number", align: "right" },
  { key: "isPublished", label: "Công khai", type: "bool" },
  { key: "isFeatured", label: "Nổi bật", type: "bool" },
];

export default async function AdminProjectsPage() {
  const [res, catRes, productRes] = await Promise.all([
    getAdminProjects(),
    getProjectCategoryOptions(),
    getProductOptions(),
  ]);

  const fields: FieldDef[] = [
    { name: "name", label: "Tên dự án", type: "text", required: true },
    { name: "slug", label: "Slug (URL)", type: "text", help: SLUG_HELP },
    {
      name: "categoryId",
      label: "Danh mục",
      type: "select",
      required: true,
      options: catRes.success ? toOptions(catRes.data) : [],
    },
    { name: "thumbnailUrl", label: "Ảnh đại diện", type: "text", required: true, help: IMAGE_HELP },
    { name: "location", label: "Địa điểm", type: "text" },
    { name: "investor", label: "Chủ đầu tư", type: "text" },
    { name: "contractor", label: "Tổng thầu", type: "text" },
    { name: "area", label: "Diện tích", type: "text", placeholder: "VD: 100.000 m²" },
    { name: "constructionTime", label: "Thời gian thi công", type: "text", placeholder: "VD: 2015-2019" },
    { name: "completedYear", label: "Năm hoàn thành", type: "number" },
    { name: "sortOrder", label: "Thứ tự hiển thị", type: "number", defaultValue: "0" },
    { name: "isPublished", label: "Công khai trên website", type: "checkbox", defaultValue: true },
    { name: "isFeatured", label: "Dự án nổi bật (hiện ở trang chủ)", type: "checkbox" },
    { name: "excerpt", label: "Tóm tắt", type: "textarea", full: true, rows: 2 },
    { name: "description", label: "Mô tả chi tiết", type: "textarea", full: true, rows: 5 },
    {
      name: "productIds",
      label: "Sản phẩm TPI đã sử dụng",
      type: "multiselect",
      full: true,
      options: productRes.success ? toOptions(productRes.data) : [],
    },
    { name: "images", label: "Bộ ảnh dự án", type: "textarea", full: true, rows: 4, help: IMAGE_LINES_HELP },
    { name: "seoTitle", label: "SEO title", type: "text", full: true },
    { name: "seoDescription", label: "SEO description", type: "textarea", full: true, rows: 2 },
  ];

  const rows: CrudRow[] = res.success
    ? res.data.map((p) => ({
        id: p.id,
        cells: {
          name: p.name,
          category: p.category.name,
          year: p.completedYear,
          products: p.projectProducts.length,
          isPublished: p.isPublished,
          isFeatured: p.isFeatured,
        },
        values: {
          name: p.name,
          slug: p.slug,
          categoryId: p.categoryId,
          thumbnailUrl: p.thumbnailUrl,
          location: str(p.location),
          investor: str(p.investor),
          contractor: str(p.contractor),
          area: str(p.area),
          constructionTime: str(p.constructionTime),
          completedYear: str(p.completedYear),
          sortOrder: str(p.sortOrder),
          isPublished: p.isPublished,
          isFeatured: p.isFeatured,
          excerpt: str(p.excerpt),
          description: str(p.description),
          productIds: p.projectProducts.map((pp) => pp.productId),
          images: imagesToLines(p.images),
          seoTitle: str(p.seoTitle),
          seoDescription: str(p.seoDescription),
        },
        viewHref: p.isPublished ? `/du-an/${p.slug}` : undefined,
        search: searchText(p.name, p.slug, p.category.name, p.location, p.investor),
      }))
    : [];

  return (
    <CrudManager
      title="Dự án"
      entity="dự án"
      columns={columns}
      fields={fields}
      rows={rows}
      saveAction={saveProjectAction}
      deleteAction={deleteProjectAction}
      loadError={res.success ? null : res.error}
    />
  );
}
