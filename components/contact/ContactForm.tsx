"use client";

import { useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { feedbackSchema, type FeedbackInput } from "@/schemas/Feedback";
import { sendFeedback, type FeedbackActionState } from "@/app/lien-he/actions";
import SubmitContactBtn from "./SubmitContactBtn";
const initialState: FeedbackActionState = {};

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
    <div className="px-4 py-2 flex flex-col gap-4">
      <div>
        <h3 className="text-[#a5a5a5] text-[16px]">LEAVE YOUR MESSAGE</h3>
        <h2 className="text-[24px] font-medium my-2">ĐỂ LẠI LỜI NHẮN</h2>
      </div>

      <div>
        <form
          ref={formRef}
          action={formAction}
          className="w-full max-w-[700px]"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-[14px] font-medium text-[#0f5c5c]"
              >
                Họ và Tên / Your Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className={`w-full rounded-full border px-5 py-3 text-[14px] text-black outline-none transition-colors focus:border-[#0a8a3f] ${
                  errors.name ? "border-red-400" : "border-[#d4d4d4]"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-[12px] text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[14px] font-medium text-[#0f5c5c]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className={`w-full rounded-full border px-5 py-3 text-[14px] text-black outline-none transition-colors focus:border-[#0a8a3f] ${
                  errors.email ? "border-red-400" : "border-[#d4d4d4]"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-[12px] text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-[14px] font-medium text-[#0f5c5c]"
              >
                SĐT / Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone")}
                className={`w-full rounded-full border px-5 py-3 text-[14px] text-black outline-none transition-colors focus:border-[#0a8a3f] ${
                  errors.phone ? "border-red-400" : "border-[#d4d4d4]"
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-[12px] text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="company"
                className="mb-2 block text-[14px] font-medium text-[#0f5c5c]"
              >
                Công ty / Company
              </label>
              <input
                id="company"
                type="text"
                {...register("company")}
                className="w-full rounded-full border border-[#d4d4d4] px-5 py-3 text-[14px] text-black outline-none transition-colors focus:border-[#0a8a3f]"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="mb-2 block text-[14px] font-medium text-[#0f5c5c]"
              >
                Lời nhắn / Your Message
              </label>
              <textarea
                id="message"
                rows={6}
                {...register("message")}
                className={`w-full resize-y rounded-3xl border px-5 py-4 text-[14px] text-black outline-none transition-colors focus:border-[#0a8a3f] ${
                  errors.message ? "border-red-400" : "border-[#d4d4d4]"
                }`}
              />
              {errors.message && (
                <p className="mt-1 text-[12px] text-red-600">
                  {errors.message.message}
                </p>
              )}
            </div>
          </div>

          {state.success === true && (
            <p className="mt-4 text-[14px] font-medium text-[#0a8a3f]">
              {state.message}
            </p>
          )}
          {state.success === false && state.message && (
            <p className="mt-4 text-[14px] font-medium text-red-600">
              {state.message}
            </p>
          )}

          <div className="mt-6">
            <SubmitContactBtn onValidate={trigger} formRef={formRef} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
