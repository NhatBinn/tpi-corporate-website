import { SolutionCardProps } from "@/types/common";
import Image from "next/image";
import Link from "next/link";

function SolutionCard({
  href,
  image,
  label,
  title,
  titleLine2,
  desc,
  span,
  descWidth,
  titleTight,
}: SolutionCardProps) {
  return (
    <Link
      href={href}
      className={`group relative h-44 md:h-70 ${span} overflow-hidden rounded-sm`}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-gray via-gray/85 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4 md:p-5">
        <p className="text-[12px] md:text-[13px] text-[#696969]">{label}</p>
        <h4
          className={`text-[18px] md:text-[20px] font-bold text-black ${
            titleTight ? "leading-tight" : ""
          }`}
        >
          {title}
          {titleLine2 && (
            <>
              <br />
              {titleLine2}
            </>
          )}
        </h4>
        <p
          className={`mt-1 ${descWidth} text-[12px] md:text-[13px] leading-snug text-[#696969]`}
        >
          {desc}
        </p>
      </div>
    </Link>
  );
}

export default SolutionCard;
