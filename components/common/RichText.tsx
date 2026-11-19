import { Fragment } from "react";
import { cn } from "@/lib/utils";

// Hiển thị nội dung dạng văn bản đơn giản (bài viết, giải pháp, chính sách) mà không cần
// thư viện markdown và không dùng dangerouslySetInnerHTML.
// Quy ước (mỗi khối cách nhau 1 dòng trống):
//   "## Tiêu đề"   → h2        "### Tiêu đề" → h3
//   "- mục"        → danh sách (mỗi dòng 1 mục)
//   "> trích dẫn"  → blockquote
//   còn lại        → đoạn văn;  **chữ đậm** dùng được trong mọi khối.

type Block =
  | { type: "h2" | "h3" | "p" | "quote"; text: string }
  | { type: "ul"; items: string[] };

function parse(content: string): Block[] {
  return content
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk): Block => {
      if (chunk.startsWith("### ")) return { type: "h3", text: chunk.slice(4) };
      if (chunk.startsWith("## ")) return { type: "h2", text: chunk.slice(3) };
      const lines = chunk.split("\n").map((l) => l.trim());
      if (lines.every((l) => l.startsWith("- "))) {
        return { type: "ul", items: lines.map((l) => l.slice(2)) };
      }
      if (lines.every((l) => l.startsWith(">"))) {
        return { type: "quote", text: lines.map((l) => l.replace(/^>\s?/, "")).join(" ") };
      }
      return { type: "p", text: lines.join(" ") };
    });
}

function Inline({ text }: { text: string }) {
  // Tách theo **...**: phần tử lẻ là chữ đậm.
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-bold text-black">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export default function RichText({ content, className }: { content: string; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4 text-[14px] md:text-[15px] leading-relaxed text-[#4a4a4a]", className)}>
      {parse(content).map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} className="mt-4 text-[18px] md:text-[22px] font-bold leading-snug text-[#1a1a1a]">
                <Inline text={block.text} />
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-2 text-[16px] md:text-[18px] font-bold leading-snug text-[#1a1a1a]">
                <Inline text={block.text} />
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="flex flex-col gap-2 pl-5 list-disc marker:text-brand">
                {block.items.map((item, j) => (
                  <li key={j}>
                    <Inline text={item} />
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-brand bg-[#f4f4f4] px-5 py-4 text-[15px] md:text-[17px] italic text-[#1a1a1a]"
              >
                <Inline text={block.text} />
              </blockquote>
            );
          default:
            return (
              <p key={i}>
                <Inline text={block.text} />
              </p>
            );
        }
      })}
    </div>
  );
}
