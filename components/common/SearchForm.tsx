import Form from "next/form";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchFormProps {
  defaultValue?: string;
  className?: string;
  inputClassName?: string;
  onSubmit?: () => void;
}

// action là string → Next.js điều hướng GET tới /tim-kiem?q=... (chạy cả khi chưa có JS).
export default function SearchForm({ defaultValue, className, inputClassName, onSubmit }: SearchFormProps) {
  return (
    <Form action="/tim-kiem" role="search" onSubmit={onSubmit} className={cn("relative", className)}>
      <Input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder="Tìm sản phẩm, dự án..."
        aria-label="Tìm kiếm sản phẩm, dự án"
        maxLength={100}
        required
        className={cn("pr-10", inputClassName)}
      />
      <button
        type="submit"
        aria-label="Tìm kiếm"
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer opacity-70 transition-opacity hover:opacity-100"
      >
        <Search size={16} />
      </button>
    </Form>
  );
}
