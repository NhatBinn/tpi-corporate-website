import * as z from "zod";

export const feedbackSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên"),
  email: z.email("Email không hợp lệ"),
  phone: z
    .string()
    .trim()
    .refine((v) => v === "" || /^0\d{9}$/.test(v), "SĐT không hợp lệ"),
  company: z.string().optional(),
  message: z.string().min(10, "Vui lòng nhập lời nhắn ít nhất 10 ký tự"),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;
