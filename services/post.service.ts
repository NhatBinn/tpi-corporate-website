import { cache } from "react";
import {
  findPostBySlug,
  findPostCategories,
  findPosts,
  findRecentPosts,
  findRelatedPosts,
} from "@/repositories/post.repository";
import { err, ok } from "@/types/result";

const POSTS_PER_PAGE = 9;

// cache(): generateMetadata và page của /blog, /blog/[slug] dùng chung trong 1 request.
export const getPostCategories = cache(async () => {
  try {
    const data = await findPostCategories();
    return ok(data.map(({ _count, ...c }) => ({ ...c, postCount: _count.posts })));
  } catch (error) {
    console.log("~getPostCategories~", error);
    return err("Lỗi khi lấy danh mục bài viết");
  }
});

export async function getPosts(categorySlug: string | undefined, page: number) {
  try {
    const { items, total } = await findPosts({
      categorySlug,
      skip: (page - 1) * POSTS_PER_PAGE,
      take: POSTS_PER_PAGE,
    });
    return ok({ items, total, totalPages: Math.max(1, Math.ceil(total / POSTS_PER_PAGE)) });
  } catch (error) {
    console.log("~getPosts~", error);
    return err("Lỗi khi lấy bài viết");
  }
}

// cache(): generateMetadata và page gọi cùng slug trong 1 request → chỉ query DB 1 lần.
export const getPostBySlug = cache(async (slug: string) => {
  try {
    const data = await findPostBySlug(slug);
    if (!data) return err("Không tìm thấy bài viết");
    return ok(data);
  } catch (error) {
    console.log("~getPostBySlug~", error);
    return err("Lỗi khi lấy bài viết");
  }
});

export async function getRecentPosts(take = 5, excludeSlug?: string) {
  try {
    return ok(await findRecentPosts(take, excludeSlug));
  } catch (error) {
    console.log("~getRecentPosts~", error);
    return err("Lỗi khi lấy bài viết mới");
  }
}

export async function getRelatedPosts(categoryId: string, excludeSlug: string, take = 3) {
  try {
    return ok(await findRelatedPosts(categoryId, excludeSlug, take));
  } catch (error) {
    console.log("~getRelatedPosts~", error);
    return err("Lỗi khi lấy bài viết liên quan");
  }
}
