"use server";

import { adminDelete } from "@/lib/admin-action";
import { removeFeedback } from "@/services/admin/dashboard.service";

export async function deleteFeedbackAction(id: string) {
  return adminDelete(id, removeFeedback);
}
