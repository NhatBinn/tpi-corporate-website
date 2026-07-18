"use server";

import { feedbackSchema } from "@/schemas/Feedback";
import { submitFeedback } from "@/services/contact.service";

export interface FeedbackActionState {
  success?: boolean;
  message?: string;
  errors?: Partial<
    Record<"name" | "email" | "phone" | "company" | "message", string[]>
  >;
}

export async function sendFeedback(
  _prevState: FeedbackActionState,
  formData: FormData,
): Promise<FeedbackActionState> {
  const result = feedbackSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    company: formData.get("company"),
    message: formData.get("message"),
  });

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await submitFeedback(formData);

    return {
      success: true,
      message:
        "Cảm ơn bạn đã liên hệ! TPI sẽ phản hồi trong thời gian sớm nhất.",
    };
  } catch {
    return {
      success: false,
      message:
        "Có lỗi xảy ra, vui lòng thử lại hoặc liên hệ trực tiếp qua hotline.",
    };
  }
}
