"use client";

import { useFormStatus } from "react-dom";
import type { RefObject } from "react";

interface SubmitContactBtnProps {
  onValidate: () => Promise<boolean>;
  formRef: RefObject<HTMLFormElement | null>;
}

function SubmitContactBtn({ onValidate, formRef }: SubmitContactBtnProps) {
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
      className="rounded-full bg-[#ececec] px-8 py-3 text-[13px] font-bold uppercase tracking-wide text-black transition-colors cursor-pointer hover:bg-[#dcdcdc] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "ĐANG GỬI / Sending..." : "GỬI / SEND"}
    </button>
  );
}

export default SubmitContactBtn;
