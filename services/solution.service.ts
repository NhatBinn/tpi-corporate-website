import { findSolutionsByCategory } from "@/repositories/solution.repository";
import { ok, err } from "@/types/result";

export async function getSolutionsbyCategory() {
  try {
    const data = await findSolutionsByCategory();
    return ok(data);
  } catch (error) {
    console.log("~getSolutionsbyCategory~", error);
    return err("Failed to get solution");
  }
}
