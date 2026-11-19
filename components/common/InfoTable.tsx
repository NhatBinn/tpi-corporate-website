import { cn } from "@/lib/utils";

interface InfoRow {
  label: string;
  value?: string | null;
}

interface InfoTableProps {
  rows: InfoRow[];
  variant?: "boxed" | "lined";
  className?: string;
}

export default function InfoTable({ rows, variant = "lined", className }: InfoTableProps) {
  const visible = rows.filter((row) => row.value);
  if (visible.length === 0) return null;

  const boxed = variant === "boxed";

  return (
    <dl
      className={cn(
        boxed ? "overflow-hidden rounded-sm border border-[#e5e5e5]" : "border-t border-[#e5e5e5]",
        className,
      )}
    >
      {visible.map((row) => (
        <div
          key={row.label}
          className={cn(
            "grid grid-cols-[140px_1fr] border-b border-[#e5e5e5]",
            boxed ? "last:border-b-0" : "gap-4 py-3",
          )}
        >
          <dt
            className={cn(
              "text-[13px] md:text-[14px] font-semibold",
              boxed ? "bg-[#f5f5f5] px-4 py-3 text-[#4a4a4a]" : "text-[#1a1a1a]",
            )}
          >
            {row.label}
          </dt>
          <dd className={cn("text-[13px] md:text-[14px]", boxed ? "px-4 py-3 text-[#1a1a1a]" : "text-[#4a4a4a]")}>
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
