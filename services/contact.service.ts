import { feedbackSchema } from "@/schemas/Feedback";
import { createFeedback } from "@/repositories/contact.repository";
import { ok, err } from "@/types/result";

export async function submitFeedback(formData: FormData) {
  const result = feedbackSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    company: formData.get("company"),
    message: formData.get("message"),
  });

  if (!result.success) {
    return err("Invalid data form");
  }

  try {
    const feedback = await createFeedback(result.data);

    return ok(feedback);
  } catch (error) {
    console.error(error);

    return err("Failed to create feedback");
  }
}
