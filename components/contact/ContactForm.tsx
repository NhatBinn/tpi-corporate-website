"use client";

import { useEffect } from "react";
import type { UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { feedbackSchema, type FeedbackInput } from "@/schemas/Feedback";
import SubmitButton from "@/components/common/SubmitButton";
import { sendFeedback } from "@/app/(website)/lien-he/actions";
import type { FeedbackActionState } from "@/types/common";
import { useActionForm } from "@/hooks/useActionForm";
import { cn } from "@/lib/utils";

const initialState: FeedbackActionState = {};

const FIELDS: {
  name: keyof FeedbackInput;
  label: string;
  type?: string;
  multiline?: boolean;
  maxLength: number;
}[] = [
  { name: "name", label: "Họ và Tên / Your Name", maxLength: 100 },
  { name: "email", label: "Email", type: "email", maxLength: 150 },
  { name: "phone", label: "SĐT / Phone Number", type: "tel", maxLength: 15 },
  { name: "company", label: "Công ty / Company", maxLength: 150 },
  { name: "message", label: "Lời nhắn / Your Message", multiline: true, maxLength: 2000 },
];

interface FormFieldProps {
  field: (typeof FIELDS)[number];
  register: UseFormRegister<FeedbackInput>;
  error?: string;
}

function FormField({ field, register, error }: FormFieldProps) {
  const inputClass = cn(
    "w-full border px-5 text-[14px] text-black outline-none transition-colors focus:border-brand",
    error ? "border-red-400" : "border-[#d4d4d4]",
    field.multiline ? "resize-y rounded-3xl py-4" : "rounded-full py-3",
  );
  const errorId = `${field.name}-error`;
  const common = {
    id: field.name,
    maxLength: field.maxLength,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: inputClass,
    ...register(field.name),
  };

  return (
    <div className={field.multiline ? "sm:col-span-2" : undefined}>
      <label htmlFor={field.name} className="mb-2 block text-[14px] font-medium text-[#0f5c5c]">
        {field.label}
      </label>
      {field.multiline ? <textarea rows={6} {...common} /> : <input type={field.type ?? "text"} {...common} />}
      {error && (
        <p id={errorId} className="mt-1 text-[12px] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function ContactForm() {
  const { state, pending, form, onSubmit } = useActionForm(sendFeedback, initialState, zodResolver(feedbackSchema));
  const {
    register,
    reset,
    formState: { errors },
  } = form;

  // Mỗi lần action trả về là một object mới → effect chạy lại kể cả khi gửi thành công nhiều lần liên tiếp.
  useEffect(() => {
    if (state.success) reset();
  }, [state, reset]);

  return (
    <div className="py-2 flex flex-col gap-4">
      <div>
        <h3 className="text-[#a5a5a5] text-[16px]">LEAVE YOUR MESSAGE</h3>
        <h2 className="text-[24px] font-medium my-2">ĐỂ LẠI LỜI NHẮN</h2>
      </div>

      <form onSubmit={onSubmit} noValidate className="w-full max-w-[700px]">
        {/* Honeypot chống bot spam: người dùng thật không thấy ô này nên luôn để trống. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
          {FIELDS.map((field) => (
            <FormField
              key={field.name}
              field={field}
              register={register}
              error={errors[field.name]?.message ?? state.errors?.[field.name]?.[0]}
            />
          ))}
        </div>

        {state.message && (
          <p
            role="status"
            className={cn("mt-4 text-[14px] font-medium", state.success ? "text-brand" : "text-red-600")}
          >
            {state.message}
          </p>
        )}

        <div className="mt-6">
          <SubmitButton
            pending={pending}
            label="GỬI / SEND"
            pendingLabel="ĐANG GỬI / Sending..."
            className="rounded-full bg-[#ececec] px-8 py-3 text-[13px] font-bold uppercase tracking-wide text-black transition-colors hover:bg-[#dcdcdc] disabled:opacity-60"
          />
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
