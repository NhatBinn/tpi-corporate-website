import CrudManager from "@/components/admin/crud/CrudManager";
import { deleteProductAction, saveProductAction } from "@/actions/admin/catalog";
import { getAdminProducts, getProductCategoryOptions, getTagOptions } from "@/services/admin/catalog.service";
import { IMAGE_HELP, SLUG_HELP, imagesToLines, searchText, str, toOptions } from "@/lib/admin-rows";
import { IMAGE_LINES_HELP } from "@/schemas/admin";
import type { ColumnDef, CrudRow, FieldDef } from "@/types/admin";

const columns: ColumnDef[] = [
  { key: "name", label: "Sản phẩm", type: "strong" },
  { key: "category", label: "Danh mục" },
  { key: "sku", label: "SKU", type: "muted" },
  { key: "stock", label: "Kho", type: "number", align: "right" },
  { key: "isFeatured", label: "Nổi bật", type: "bool" },
  { key: "isNew", label: "Mới", type: "bool" },
];

export default async function AdminProductsPage() {
  const [res, catRes, tagRes] = await Promise.all([getAdminProducts(), getProductCategoryOptions(), getTagOptions()]);

  const fields: FieldDef[] = [
    { name: "name", label: "Tên sản phẩm", type: "text", required: true, placeholder: "VD: TPI BC-N" },
    { name: "slug", label: "Slug (URL)", type: "text", help: SLUG_HELP },
    {
      name: "categoryId",
      label: "Danh mục",
      type: "select",
      required: true,
      options: catRes.success ? toOptions(catRes.data) : [],
    },
    { name: "sku", label: "Mã sản phẩm (SKU)", type: "text" },
    { name: "description", label: "Mô tả", type: "textarea", full: true, rows: 4 },
    { name: "tagIds", label: "Tags", type: "multiselect", full: true, options: tagRes.success ? toOptions(tagRes.data) : [] },
    { name: "imageUrl", label: "Ảnh đại diện", type: "text", help: IMAGE_HELP },
    { name: "pdfUrl", label: "Tài liệu kỹ thuật (PDF)", type: "text", help: "Đường dẫn / hoặc link https://" },
    { name: "price", label: "Giá (đ)", type: "number" },
    { name: "salePrice", label: "Giá khuyến mãi (đ)", type: "number" },
    { name: "stock", label: "Tồn kho", type: "number" },
    { name: "pack", label: "Quy cách", type: "text", placeholder: "VD: 18 lít/thùng" },
    { name: "compressiveStrength", label: "Cường độ nén", type: "text" },
    { name: "waterDilutionRatio", label: "Tỷ lệ pha nước", type: "text" },
    { name: "isFeatured", label: "Sản phẩm nổi bật", type: "checkbox" },
    { name: "isNew", label: "Sản phẩm mới", type: "checkbox" },
    { name: "isBestSeller", label: "Bán chạy", type: "checkbox" },
    { name: "images", label: "Bộ ảnh (gallery)", type: "textarea", full: true, rows: 4, help: IMAGE_LINES_HELP },
    { name: "seoTitle", label: "SEO title", type: "text", full: true },
    { name: "seoDescription", label: "SEO description", type: "textarea", full: true, rows: 2 },
  ];

  const rows: CrudRow[] = res.success
    ? res.data.map((p) => ({
        id: p.id,
        cells: {
          name: p.name,
          category: p.category.name,
          sku: p.sku,
          stock: p.stock,
          isFeatured: p.isFeatured,
          isNew: p.isNew,
        },
        values: {
          name: p.name,
          slug: p.slug,
          categoryId: p.categoryId,
          sku: str(p.sku),
          description: str(p.description),
          tagIds: p.tags.map((t) => t.id),
          imageUrl: str(p.imageUrl),
          pdfUrl: str(p.pdfUrl),
          price: str(p.price),
          salePrice: str(p.salePrice),
          stock: str(p.stock),
          pack: str(p.pack),
          compressiveStrength: str(p.compressiveStrength),
          waterDilutionRatio: str(p.waterDilutionRatio),
          isFeatured: p.isFeatured,
          isNew: p.isNew,
          isBestSeller: p.isBestSeller,
          images: imagesToLines(p.productImages),
          seoTitle: str(p.seoTitle),
          seoDescription: str(p.seoDescription),
        },
        viewHref: `/san-pham/${p.slug}`,
        search: searchText(p.name, p.slug, p.sku, p.category.name),
      }))
    : [];

  return (
    <CrudManager
      title="Sản phẩm"
      entity="sản phẩm"
      columns={columns}
      fields={fields}
      rows={rows}
      saveAction={saveProductAction}
      deleteAction={deleteProductAction}
      loadError={res.success ? null : res.error}
    />
  );
}
