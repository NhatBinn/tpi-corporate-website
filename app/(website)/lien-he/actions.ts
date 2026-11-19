"use server";

import { feedbackSchema } from "@/schemas/Feedback";
import { submitFeedback } from "@/services/contact.service";
import { FeedbackActionState } from "@/types/common";

export async function sendFeedback(
  _prevState: FeedbackActionState,
  formData: FormData,
): Promise<FeedbackActionState> {
  // Honeypot: ô "website" bị ẩn với người dùng thật, chỉ bot mới điền.
  // Trả về thành công giả để bot không thử lại, nhưng không lưu gì.
  if (formData.get("website")) {
    return { success: true, message: "Cảm ơn bạn đã liên hệ! TPI sẽ phản hồi trong thời gian sớm nhất." };
  }

  const result = feedbackSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") ?? "",
    company: formData.get("company") ?? undefined,
    message: formData.get("message"),
  });

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  // submitFeedback trả về Result chứ không throw → phải kiểm tra success.
  const res = await submitFeedback(result.data);
  if (!res.success) {
    return {
      success: false,
      message: "Có lỗi xảy ra, vui lòng thử lại hoặc liên hệ trực tiếp qua hotline.",
    };
  }

  return {
    success: true,
    message: "Cảm ơn bạn đã liên hệ! TPI sẽ phản hồi trong thời gian sớm nhất.",
  };
}
