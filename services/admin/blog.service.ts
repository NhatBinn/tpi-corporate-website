import * as repo from "@/repositories/admin/blog.repository";
import type { PostCategoryInput, PostInput } from "@/schemas/admin";
import { runMutation, runQuery, upsert } from "./shared";

export const getAdminPostCategories = () => runQuery("getAdminPostCategories", repo.findAdminPostCategories);
export const getPostCategoryOptions = () => runQuery("getPostCategoryOptions", repo.findPostCategoryOptions);

export const savePostCategory = (id: string | null, data: PostCategoryInput) =>
  upsert("savePostCategory", id, data, data.name, repo.createPostCategory, repo.updatePostCategory);

export const removePostCategory = (id: string) =>
  runMutation("removePostCategory", () => repo.deletePostCategory(id));

export const getAdminPosts = () => runQuery("getAdminPosts", repo.findAdminPosts);

export const savePost = (id: string | null, data: PostInput) =>
  upsert("savePost", id, data, data.title, repo.createPost, repo.updatePost);

export const removePost = (id: string) => runMutation("removePost", () => repo.deletePost(id));
