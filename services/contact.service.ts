import type { FeedbackInput } from "@/schemas/Feedback";
import { createFeedback } from "@/repositories/contact.repository";
import { ok, err } from "@/types/result";

export async function submitFeedback(data: FeedbackInput) {
  try {
    await createFeedback(data);
    return ok(null);
  } catch (error) {
    console.log("~submitFeedback~", error);
    return err("Failed to create feedback");
  }
}
