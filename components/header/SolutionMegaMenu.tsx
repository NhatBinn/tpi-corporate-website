import Image from "next/image";
import Link from "next/link";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { solutionUI } from "@/components/common/solution-ui";
import { getSolutionsbyCategory } from "@/services/solution.service";
import { IMAGE_PLACEHOLDER } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Mega menu "Giải pháp": lấy từ bảng Solution (cùng nguồn với trang /giai-phap) thay vì viết cứng,
// để sửa dữ liệu trong DB thì menu cập nhật theo.
export default async function SolutionMegaMenu() {
  const res = await getSolutionsbyCategory();
  if (!res.success || res.data.length === 0) return null;

  const solutions = res.data;
  const rows = [solutions.slice(0, 3), solutions.slice(3, 6)].filter((r) => r.length > 0);

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 bg-white shadow-lg">
      <div className="mx-auto flex max-w-350 flex-col gap-6 p-8">
        {rows.map((row, i) => (
          <div key={i} className="flex gap-6">
            {row.map((s) => {
              const ui = solutionUI[s.slug as keyof typeof solutionUI];
              return (
                <NavigationMenuLink
                  key={s.id}
                  className={cn("group relative h-70 flex-1 overflow-hidden rounded-sm", ui?.span)}
                  render={
                    <Link href={`/giai-phap/${s.slug}`}>
                      <Image
                        src={s.imageUrl ?? IMAGE_PLACEHOLDER}
                        alt={s.name}
                        fill
                        sizes="(max-width: 1400px) 40vw, 560px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-white via-white/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-5">
                        <p className="text-[13px] text-[#9a9a9a]">{s.category.name}</p>
                        <h4 className="text-[20px] font-bold leading-tight text-black">
                          {s.name}
                          {ui && "titleLine2" in ui && (
                            <>
                              <br />
                              {ui.titleLine2}
                            </>
                          )}
                        </h4>
                        {s.description && (
                          <p className="mt-1 max-w-60 text-[13px] leading-snug text-[#9a9a9a]">{s.description}</p>
                        )}
                      </div>
                    </Link>
                  }
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
