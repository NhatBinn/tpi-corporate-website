"use client";

import { useFormStatus } from "react-dom";
import type { MouseEvent, RefObject } from "react";
import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  onValidate: () => Promise<boolean>;
  formRef: RefObject<HTMLFormElement | null>;
  label: string;
  pendingLabel: string;
  className?: string;
  showSpinner?: boolean;
}

export default function SubmitButton({
  onValidate,
  formRef,
  label,
  pendingLabel,
  className,
  showSpinner = false,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  // Validate phía client (react-hook-form) trước, hợp lệ mới submit sang Server Action.
  async function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (await onValidate()) formRef.current?.requestSubmit();
  }

  return (
    <button
      type="submit"
      onClick={handleClick}
      disabled={pending}
      className={cn("cursor-pointer disabled:cursor-not-allowed", className)}
    >
      {pending && showSpinner && (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black/20 border-t-black" />
      )}
      {pending ? pendingLabel : label}
    </button>
  );
}
