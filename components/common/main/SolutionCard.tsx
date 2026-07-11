import Image from "next/image";
import Link from "next/link";

const solutions = [
  {
    href: "/giai-phap/nha-xuong",
    image: "/Grouting-580-280.jpg",
    label: "Công Nghiệp",
    title: "Nhà Xưởng",
    desc: "Vữa rót, vữa tự san, trám khe, sơn sàn, bột xoa nền...",
    span: "flex-5",
    descWidth: "max-w-60",
  },
  {
    href: "/giai-phap/cao-tang",
    image: "/Building-Cao-tang.webp",
    label: "Công Nghiệp",
    title: "Cao Tầng",
    desc: "Tháo cốp pha, chống thấm, vữa tô, xử lý nứt...",
    span: "flex-4",
    descWidth: "max-w-55",
  },
  {
    href: "/giai-phap/be-tong-tuoi",
    image: "/Do-beton-tuoi-280x280-1.jpg",
    label: "Nhà Máy",
    title: "Bê Tông Tươi",
    desc: "Phụ gia giảm nước, hoá dẻo, silicafume...",
    span: "flex-3",
    descWidth: "max-w-45",
  },
];

const solutionsRow2 = [
  {
    href: "/giai-phap/be-tong-duc-san",
    image: "/Beton-Duc-san-cong-2-280x280-1.webp",
    label: "Nhà Máy",
    title: "Bê Tông Đúc Sẵn",
    desc: "Tháo khuôn, bảo dưỡng, tẩy rỉ cốt thép...",
    span: "flex-3",
    descWidth: "max-w-50",
    titleTight: true,
  },
  {
    href: "/giai-phap/cua-hang-vlxd",
    image: "/Cua-hang-vlxd.jpg",
    label: "Dân Dụng",
    title: "Cửa Hàng VLXD",
    titleLine2: "Kênh Phân Phối",
    desc: "Latex, chống thấm 2 thành phần, vữa grout, phụ gia...",
    span: "flex-6",
    descWidth: "max-w-75",
    titleTight: true,
  },
  {
    href: "/giai-phap/thau-tho",
    image: "/Non-bao-ho.webp",
    label: "Dân Dụng",
    title: "Thầu Thợ",
    desc: "Latex, chống thấm 2 thành phần, vữa grout, phụ gia...",
    span: "flex-3",
    descWidth: "max-w-55",
  },
];

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
}: {
  href: string;
  image: string;
  label: string;
  title: string;
  titleLine2?: string;
  desc: string;
  span: string;
  descWidth: string;
  titleTight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative h-70 ${span} overflow-hidden rounded-sm`}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-gray via-gray/85 to-transparent" />
      <div className="absolute bottom-0 left-0 p-5">
        <p className="text-[13px] text-[#696969]">{label}</p>
        <h4
          className={`text-[20px] font-bold text-black ${
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
          className={`mt-1 ${descWidth} text-[13px] leading-snug text-[#696969]`}
        >
          {desc}
        </p>
      </div>
    </Link>
  );
}

export default function SolutionsOverviewSection() {
  return (
    <section className="mx-auto max-w-350 px-6 py-16">
      <div className="flex items-baseline gap-3">
        <span className="text-[56px] font-black leading-none text-[#e9e9e9]">
          03
        </span>
        <p className="-ml-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#4a4a4a]">
          Đa dạng <span className="font-bold text-black">Giải Pháp</span> &{" "}
          <span className="font-bold text-black">Đối Tượng</span>
        </p>
      </div>

      <h2 className="-mt-1 text-[32px] leading-tight text-black sm:text-[38px]">
        <span className="font-normal">Từ </span>
        <span className="font-extrabold">CÔNG NGHIỆP</span>
        <span className="font-normal"> đến </span>
        <span className="font-extrabold">DÂN DỤNG</span>
      </h2>

      <div className="mt-8 flex flex-col gap-6">
        <div className="flex gap-6">
          {solutions.map((item) => (
            <SolutionCard key={item.title} {...item} />
          ))}
        </div>
        <div className="flex gap-6">
          {solutionsRow2.map((item) => (
            <SolutionCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
