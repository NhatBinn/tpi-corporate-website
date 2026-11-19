"use client";

import { useActionState, useEffect, useRef } from "react";
import { useForm, type UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { feedbackSchema, type FeedbackInput } from "@/schemas/Feedback";
import SubmitButton from "@/components/common/SubmitButton";
import { sendFeedback } from "@/app/(website)/lien-he/actions";
import type { FeedbackActionState } from "@/types/common";
import { cn } from "@/lib/utils";

const initialState: FeedbackActionState = {};

const FIELDS: {
  name: keyof FeedbackInput;
  label: string;
  type?: string;
  multiline?: boolean;
}[] = [
  { name: "name", label: "Họ và Tên / Your Name" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "SĐT / Phone Number", type: "tel" },
  { name: "company", label: "Công ty / Company" },
  { name: "message", label: "Lời nhắn / Your Message", multiline: true },
];

interface FormFieldProps {
  field: (typeof FIELDS)[number];
  register: UseFormRegister<FeedbackInput>;
  error?: string;
}

function FormField({ field, register, error }: FormFieldProps) {
  const inputClass = cn(
    "w-full border px-5 text-[14px] text-black outline-none transition-colors focus:border-[#0a8a3f]",
    error ? "border-red-400" : "border-[#d4d4d4]",
    field.multiline ? "resize-y rounded-3xl py-4" : "rounded-full py-3",
  );

  return (
    <div className={field.multiline ? "sm:col-span-2" : undefined}>
      <label htmlFor={field.name} className="mb-2 block text-[14px] font-medium text-[#0f5c5c]">
        {field.label}
      </label>
      {field.multiline ? (
        <textarea id={field.name} rows={6} {...register(field.name)} className={inputClass} />
      ) : (
        <input id={field.name} type={field.type ?? "text"} {...register(field.name)} className={inputClass} />
      )}
      {error && <p className="mt-1 text-[12px] text-red-600">{error}</p>}
    </div>
  );
}

function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(sendFeedback, initialState);
  const {
    register,
    trigger,
    reset,
    formState: { errors },
  } = useForm<FeedbackInput>({
    resolver: zodResolver(feedbackSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (state.success) reset();
  }, [state.success, reset]);

  return (
    <div className="py-2 flex flex-col gap-4">
      <div>
        <h3 className="text-[#a5a5a5] text-[16px]">LEAVE YOUR MESSAGE</h3>
        <h2 className="text-[24px] font-medium my-2">ĐỂ LẠI LỜI NHẮN</h2>
      </div>

      <form ref={formRef} action={formAction} className="w-full max-w-[700px]">
        <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
          {FIELDS.map((field) => (
            <FormField
              key={field.name}
              field={field}
              register={register}
              error={errors[field.name]?.message}
            />
          ))}
        </div>

        {state.message && (
          <p
            className={cn(
              "mt-4 text-[14px] font-medium",
              state.success ? "text-[#0a8a3f]" : "text-red-600",
            )}
          >
            {state.message}
          </p>
        )}

        <div className="mt-6">
          <SubmitButton
            onValidate={trigger}
            formRef={formRef}
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
