import Image from "next/image";
import Link from "next/link";

function HeroBanner() {
  return (
    <section className="mx-auto grid max-w-[1200px] grid-cols-2 gap-x-20 gap-y-10 px-6 py-16">
      {/* Cột trái - hàng 1: CEO */}
      <div className="flex items-center gap-4">
        <div className="relative h-30 w-30 overflow-hidden rounded-full">
          <Image
            src="/Duy-Nguyen-150x150.webp"
            alt="CEO Nguyễn Hoàng Duy"
            fill
            className="object-cover grayscale"
          />
        </div>
        <p className="text-[16px] text-black">
          <span className="text-[#9a9a9a]">CEO</span>{" "}
          <span className="font-bold">Nguyễn Hoàng Duy</span>
        </p>
      </div>

      {/* Cột phải - hàng 1: So sánh logo */}
      <div className="flex items-start justify-center gap-16">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/tpi-logo-2015-jpg.webp"
            alt="Logo cũ 2015 - TPI Development"
            width={300}
            height={200}
            className="object-contain"
          />
          <p className="text-[16px] font-bold text-black">Logo cũ 2015</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/tpi-logo-2025-jpg.webp"
            alt="Logo mới 2025 - TPI Trust Passion Innovation"
            width={300}
            height={200}
            className="object-contain"
          />
          <p className="text-[16px] font-bold text-black">Logo mới 2025</p>
        </div>
      </div>

      {/* Cột trái - hàng 2: Khối tiêu đề nhấn mạnh */}
      <div className="flex items-center border-l-4 border-[#0a8a3f] bg-[#e9e9e9] px-4">
        <h3 className="text-[36px] font-bold leading-snug text-black">
          Diện mạo mới, chặng đường mới, bước tiến mới
        </h3>
      </div>

      {/* Cột phải - hàng 2: Đoạn mô tả + nút */}
      <div className="flex flex-col gap-3">
        <p className="text-[16px] leading-relaxed text-[#1a1a1a]">
          Nhân kỷ niệm 10 năm thành lập, ngày 17/12/2025, TPI chính thức giới
          thiệu bộ nhận diện gồm logo và slogan mới. Đây là lần đầu tiên TPI chủ
          động thực hiện tái định vị thương hiệu. Qua đó, chúng tôi mong muốn
          mang đến diện mạo hiện đại, chuyên nghiệp, đồng thời truyền tải được
          tinh thần không ngừng{" "}
          <span className="font-bold text-[#0a8a3f]">ĐỔI MỚI SÁNG TẠO</span>.
        </p>

        <Link
          href="/gioi-thieu/dien-mao-moi"
          className="inline-flex w-fit items-center rounded-sm bg-[#0a8a3f] px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#097535]"
        >
          Xem thêm
        </Link>
      </div>
    </section>
  );
}

export default HeroBanner;
