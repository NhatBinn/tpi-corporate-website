import { findSearchableProducts } from "@/repositories/product.repository";
import { findSearchableProjects } from "@/repositories/project.repository";
import { err, ok } from "@/types/result";

const MAX_RESULTS = 24;

// Bỏ dấu tiếng Việt để "vua tu san" khớp "Vữa tự san" (Postgres không bỏ dấu nếu chưa bật unaccent).
function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d");
}

// Khớp khi MỌI từ trong câu tìm kiếm đều xuất hiện trong ít nhất một trường.
function matches(fields: (string | null | undefined)[], words: string[]) {
  const haystack = normalize(fields.filter(Boolean).join(" "));
  return words.every((word) => haystack.includes(word));
}

// Catalog nhỏ (vài trăm bản ghi) nên lọc trong bộ nhớ; nếu dữ liệu lớn nên chuyển sang full-text search của Postgres.
export async function searchSite(query: string) {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return ok({ products: [], projects: [] });

  try {
    const [allProducts, allProjects] = await Promise.all([
      findSearchableProducts(),
      findSearchableProjects(),
    ]);

    const products = allProducts
      .filter((p) => matches([p.name, p.sku, p.description, p.category.name], words))
      .slice(0, MAX_RESULTS)
      .map(({ id, name, slug, imageUrl, description }) => ({ id, name, slug, imageUrl, description }));

    const projects = allProjects
      .filter((p) =>
        matches([p.name, p.description, p.location, p.investor, p.contractor, p.category.name], words),
      )
      .slice(0, MAX_RESULTS)
      .map(({ id, name, slug, description, thumbnailUrl, category }) => ({
        id,
        name,
        slug,
        description,
        thumbnailUrl,
        category,
      }));

    return ok({ products, projects });
  } catch (error) {
    console.log("~searchSite~", error);
    return err("Failed to search");
  }
}
