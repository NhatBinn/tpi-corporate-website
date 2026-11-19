import * as z from "zod";

// Giới hạn độ dài: form public → chặn payload quá lớn đổ vào DB.
export const feedbackSchema = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập tên").max(100, "Tên tối đa 100 ký tự"),
  email: z.email("Email không hợp lệ").max(150, "Email quá dài"),
  phone: z
    .string()
    .trim()
    .refine((v) => v === "" || /^0\d{9}$/.test(v), "SĐT không hợp lệ"),
  company: z.string().trim().max(150, "Tên công ty tối đa 150 ký tự").optional(),
  message: z
    .string()
    .trim()
    .min(10, "Vui lòng nhập lời nhắn ít nhất 10 ký tự")
    .max(2000, "Lời nhắn tối đa 2000 ký tự"),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;
