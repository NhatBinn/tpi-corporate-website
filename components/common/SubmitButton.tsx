import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  // Lấy từ phần tử thứ 3 của useActionState.
  pending: boolean;
  label: string;
  pendingLabel: string;
  className?: string;
  showSpinner?: boolean;
}

// Nút submit thuần: việc validate (react-hook-form) và gọi Server Action do form cha xử lý
// qua handleSubmit — xem useActionForm trong hooks/useActionForm.ts.
export default function SubmitButton({
  pending,
  label,
  pendingLabel,
  className,
  showSpinner = false,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={cn("cursor-pointer disabled:cursor-not-allowed", className)}
    >
      {pending && showSpinner && (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black/20 border-t-black" />
      )}
      {pending ? pendingLabel : label}
    </button>
  );
}
