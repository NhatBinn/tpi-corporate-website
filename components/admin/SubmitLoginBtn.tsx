"use client";

import { useFormStatus } from "react-dom";
import React, { RefObject } from "react";

interface SubmitLoginBtnProps {
  onValidate: () => Promise<boolean>;
  formRef: RefObject<HTMLFormElement | null>;
}

function SubmitLoginBtn({ onValidate, formRef }: SubmitLoginBtnProps) {
  const { pending } = useFormStatus();

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const isValid = await onValidate();
    if (isValid) {
      formRef.current?.requestSubmit();
    }
  }

  return (
    <button
      type="submit"
      onClick={handleClick}
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#ececec] px-8 py-3.5 text-[13px] font-bold uppercase tracking-[0.15em] text-black transition-all cursor-pointer hover:bg-white active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
    >
      {pending && (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black/20 border-t-black" />
      )}
      {pending ? "Đang đăng nhập..." : "Đăng nhập"}
    </button>
  );
}

export default SubmitLoginBtn;
