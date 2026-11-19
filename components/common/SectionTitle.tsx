import { cn } from "@/lib/utils";

interface SectionTitleProps {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: React.ReactNode;
}

export default function SectionTitle({ as: Tag = "h2", className, children }: SectionTitleProps) {
  return (
    <div>
      <Tag className={cn("text-[20px] md:text-[26px] font-bold leading-tight text-[#1a1a1a]", className)}>
        {children}
      </Tag>
      <div className="mt-2 h-[3px] w-10 bg-[#e5173f]" />
    </div>
  );
}
