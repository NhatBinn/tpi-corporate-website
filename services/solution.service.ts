import { cache } from "react";
import { findSolutionBySlug, findSolutionsByCategory } from "@/repositories/solution.repository";
import { ok, err } from "@/types/result";

// cache(): trang /giai-phap và trang chi tiết (khối "Giải pháp khác") dùng chung trong 1 request.
export const getSolutionsbyCategory = cache(async () => {
  try {
    const data = await findSolutionsByCategory();
    return ok(data);
  } catch (error) {
    console.log("~getSolutionsbyCategory~", error);
    return err("Failed to get solution");
  }
});

// cache(): generateMetadata và page gọi cùng slug trong 1 request → chỉ query DB 1 lần.
export const getSolutionBySlug = cache(async (slug: string) => {
  try {
    const data = await findSolutionBySlug(slug);
    if (!data) return err("Không tìm thấy giải pháp");
    return ok({
      ...data,
      products: data.solutionProducts.map((sp) => sp.product),
    });
  } catch (error) {
    console.log("~getSolutionBySlug~", error);
    return err("Lỗi khi lấy giải pháp");
  }
});
