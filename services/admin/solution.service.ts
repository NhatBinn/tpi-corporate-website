import * as repo from "@/repositories/admin/solution.repository";
import type { SolutionCategoryInput, SolutionInput } from "@/schemas/admin";
import { runMutation, runQuery, upsert } from "./shared";

export const getAdminSolutionCategories = () =>
  runQuery("getAdminSolutionCategories", repo.findAdminSolutionCategories);

export const getSolutionCategoryOptions = () =>
  runQuery("getSolutionCategoryOptions", repo.findSolutionCategoryOptions);

export const saveSolutionCategory = (id: string | null, data: SolutionCategoryInput) =>
  upsert("saveSolutionCategory", id, data, data.name, repo.createSolutionCategory, repo.updateSolutionCategory);

export const removeSolutionCategory = (id: string) =>
  runMutation("removeSolutionCategory", () => repo.deleteSolutionCategory(id));

export const getAdminSolutions = () => runQuery("getAdminSolutions", repo.findAdminSolutions);

export const saveSolution = (id: string | null, data: SolutionInput) =>
  upsert("saveSolution", id, data, data.name, repo.createSolution, repo.updateSolution);

export const removeSolution = (id: string) => runMutation("removeSolution", () => repo.deleteSolution(id));
