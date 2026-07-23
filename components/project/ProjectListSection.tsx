import { cn } from "@/lib/utils";
import Link from "next/link";

function ProjectListSection({ active }: { active: string }) {
  return (
    <section className="my-14">
      <div className="flex flex-col justify-center items-center">
        <div className="flex gap-5 text-[20px] my-6">
          <Link
            href={"/du-an"}
            className={cn(
              "group relative inline-block px-1 pb-2",
              active === "all"
                ? "text-[#333333]"
                : "text-[#333333B3] hover:text-[#333333]",
            )}
          >
            <span>All</span>
            <span
              className={cn(
                "absolute left-0 bottom-0 h-[2px] w-full bg-black origin-left transition-transform duration-500",
                active === "all"
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100",
              )}
            />
          </Link>
          <Link
            href="/du-an?cats=cao-tang"
            className={cn(
              "group relative inline-block px-1 pb-2",
              active === "cao-tang"
                ? "text-[#333333]"
                : "text-[#333333B3] hover:text-[#333333]",
            )}
          >
            <span>Cao tầng</span>
            <span
              className={cn(
                "absolute left-0 bottom-0 h-[2px] w-full bg-black origin-left transition-transform duration-500",
                active === "cao-tang"
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100",
              )}
            />
          </Link>
          <Link
            href={"/du-an?cats=nha-xuong"}
            className={cn(
              "group relative inline-block px-1 pb-2",
              active === "nha-xuong"
                ? "text-[#333333]"
                : "text-[#333333B3] hover:text-[#333333]",
            )}
          >
            <span>Nhà xưởng</span>
            <span
              className={cn(
                "absolute left-0 bottom-0 h-[2px] w-full bg-black origin-left transition-transform duration-500",
                active === "nha-xuong"
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100",
              )}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProjectListSection;
