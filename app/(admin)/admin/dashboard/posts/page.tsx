import CrudManager from "@/components/admin/crud/CrudManager";
import { deletePostAction, savePostAction } from "@/actions/admin/blog";
import { getAdminPosts, getPostCategoryOptions } from "@/services/admin/blog.service";
import {
  IMAGE_HELP,
  RICH_TEXT_HELP,
  SLUG_HELP,
  searchText,
  str,
  toDateInput,
  toOptions,
  todayInput,
} from "@/lib/admin-rows";
import { formatDateVN } from "@/lib/utils";
import type { ColumnDef, CrudRow, FieldDef } from "@/types/admin";

const columns: ColumnDef[] = [
  { key: "title", label: "Bài viết", type: "strong" },
  { key: "category", label: "Chuyên mục" },
  { key: "publishedAt", label: "Ngày đăng" },
  { key: "isPublished", label: "Công khai", type: "bool" },
];

export default async function AdminPostsPage() {
  const [res, catRes] = await Promise.all([getAdminPosts(), getPostCategoryOptions()]);

  const fields: FieldDef[] = [
    { name: "title", label: "Tiêu đề", type: "text", required: true, full: true },
    { name: "slug", label: "Slug (URL)", type: "text", help: SLUG_HELP },
    {
      name: "categoryId",
      label: "Chuyên mục",
      type: "select",
      required: true,
      options: catRes.success ? toOptions(catRes.data) : [],
    },
    { name: "publishedAt", label: "Ngày đăng", type: "date", required: true, defaultValue: todayInput() },
    { name: "author", label: "Người viết", type: "text", placeholder: "VD: Phòng Kỹ thuật TPI" },
    { name: "thumbnailUrl", label: "Ảnh đại diện", type: "text", required: true, help: IMAGE_HELP },
    { name: "isPublished", label: "Công khai trên website", type: "checkbox", defaultValue: true },
    { name: "excerpt", label: "Tóm tắt", type: "textarea", full: true, rows: 2 },
    { name: "content", label: "Nội dung", type: "textarea", required: true, full: true, rows: 14, help: RICH_TEXT_HELP },
    { name: "seoTitle", label: "SEO title", type: "text", full: true },
    { name: "seoDescription", label: "SEO description", type: "textarea", full: true, rows: 2 },
  ];

  const rows: CrudRow[] = res.success
    ? res.data.map((p) => ({
        id: p.id,
        cells: {
          title: p.title,
          category: p.category.name,
          publishedAt: formatDateVN(p.publishedAt),
          isPublished: p.isPublished,
        },
        values: {
          title: p.title,
          slug: p.slug,
          categoryId: p.categoryId,
          publishedAt: toDateInput(p.publishedAt),
          author: str(p.author),
          thumbnailUrl: p.thumbnailUrl,
          isPublished: p.isPublished,
          excerpt: str(p.excerpt),
          content: p.content,
          seoTitle: str(p.seoTitle),
          seoDescription: str(p.seoDescription),
        },
        viewHref: p.isPublished ? `/blog/${p.slug}` : undefined,
        search: searchText(p.title, p.slug, p.category.name, p.author),
      }))
    : [];

  return (
    <CrudManager
      title="Bài viết"
      entity="bài viết"
      columns={columns}
      fields={fields}
      rows={rows}
      saveAction={savePostAction}
      deleteAction={deletePostAction}
      loadError={res.success ? null : res.error}
    />
  );
}
