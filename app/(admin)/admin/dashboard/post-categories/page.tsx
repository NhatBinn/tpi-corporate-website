import CrudManager from "@/components/admin/crud/CrudManager";
import { deletePostCategoryAction, savePostCategoryAction } from "@/actions/admin/blog";
import { getAdminPostCategories } from "@/services/admin/blog.service";
import { SLUG_HELP, searchText, str } from "@/lib/admin-rows";
import type { ColumnDef, CrudRow, FieldDef } from "@/types/admin";

const columns: ColumnDef[] = [
  { key: "name", label: "Chuyên mục", type: "strong" },
  { key: "slug", label: "Slug", type: "muted" },
  { key: "sortOrder", label: "Thứ tự", type: "number" },
  { key: "posts", label: "Bài viết", type: "number", align: "right" },
];

const fields: FieldDef[] = [
  { name: "name", label: "Tên chuyên mục", type: "text", required: true },
  {
    name: "slug",
    label: "Slug",
    type: "text",
    help: `${SLUG_HELP}. Menu "Tài liệu" trỏ tới huong-dan-thi-cong, ung-dung-san-pham, thong-bao-san-pham`,
  },
  { name: "sortOrder", label: "Thứ tự hiển thị", type: "number", defaultValue: "0" },
];

export default async function AdminPostCategoriesPage() {
  const res = await getAdminPostCategories();

  const rows: CrudRow[] = res.success
    ? res.data.map((c) => ({
        id: c.id,
        cells: { name: c.name, slug: c.slug, sortOrder: c.sortOrder, posts: c._count.posts },
        values: { name: c.name, slug: c.slug, sortOrder: str(c.sortOrder) },
        viewHref: `/blog?danh-muc=${c.slug}`,
        search: searchText(c.name, c.slug),
      }))
    : [];

  return (
    <CrudManager
      title="Chuyên mục blog"
      entity="chuyên mục"
      columns={columns}
      fields={fields}
      rows={rows}
      saveAction={savePostCategoryAction}
      deleteAction={deletePostCategoryAction}
      loadError={res.success ? null : res.error}
      note="chuyên mục còn bài viết thì không xoá được"
    />
  );
}
