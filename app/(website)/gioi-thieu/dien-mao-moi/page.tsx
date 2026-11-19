import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHeroBanner from "@/components/common/PageHeroBanner";
import SectionTitle from "@/components/common/SectionTitle";
import RichText from "@/components/common/RichText";
import Features from "@/components/common/Features";

export const metadata: Metadata = {
  title: "Thông báo thay đổi logo TPI 2025",
  description:
    "Nhân kỷ niệm 10 năm thành lập, TPI chính thức giới thiệu bộ nhận diện thương hiệu mới cùng slogan Trust - Passion - Innovation.",
};

const VALUES = [
  {
    word: "Trust",
    vi: "Tin cậy",
    desc: "Chất lượng ổn định từng lô hàng, minh bạch thông số kỹ thuật và đồng hành cùng khách hàng đến khi công trình hoàn thiện.",
  },
  {
    word: "Passion",
    vi: "Đam mê",
    desc: "Đội ngũ kỹ sư tận tâm với nghề, luôn có mặt tại công trường để hiểu đúng vấn đề và đưa ra giải pháp phù hợp nhất.",
  },
  {
    word: "Innovation",
    vi: "Đổi mới",
    desc: "Không ngừng nghiên cứu công thức mới, ứng dụng vật liệu xanh và công nghệ sản xuất hiện đại.",
  },
];

const MILESTONES = [
  { year: "2015", text: "Thành lập Công ty TNHH Đầu Tư Phát Triển TPI, ra mắt dòng chất tháo khuôn đầu tiên." },
  { year: "2018", text: "Đưa vào vận hành nhà máy tại Lái Thiêu, Bình Dương." },
  { year: "2021", text: "Đạt chứng nhận ISO 9001:2015, trở thành hội viên Hội đồng Công trình Xanh Việt Nam." },
  { year: "2025", text: "Kỷ niệm 10 năm thành lập, ra mắt bộ nhận diện thương hiệu mới." },
];

const CONTENT = `## Vì sao TPI thay đổi nhận diện?

Sau 10 năm phát triển, TPI đã mở rộng từ một nhà cung cấp chất tháo khuôn thành **nhà sản xuất hoá chất xây dựng** với hơn 70 sản phẩm, phục vụ các công trình cao tầng, nhà xưởng, nhà máy bê tông và hệ thống đại lý trên toàn quốc. Logo cũ ra đời năm 2015 không còn phản ánh đầy đủ quy mô và định hướng của doanh nghiệp.

Bộ nhận diện mới được xây dựng với mong muốn mang lại hình ảnh hiện đại, chuyên nghiệp, đồng thời dễ nhận biết hơn trên bao bì sản phẩm, tại công trường và trên các nền tảng số.

## Ý nghĩa logo mới

- **Chữ TPI** được thiết kế lại với nét chữ khoẻ, vững chãi, gợi liên tưởng đến khối bê tông và kết cấu công trình.
- **Chấm xanh lá** tượng trưng cho định hướng phát triển vật liệu xanh, thân thiện với môi trường và bền vững.
- **Tông màu trung tính** giúp logo nổi bật trên cả nền sáng lẫn nền tối, phù hợp với nhiều chất liệu in ấn.

> Logo mới không chỉ là sự thay đổi về hình ảnh, mà là lời cam kết của TPI về một chặng đường mới: tin cậy hơn, tận tâm hơn và đổi mới hơn.

## Thời gian áp dụng

Kể từ ngày **17/12/2025**, logo mới được sử dụng chính thức trên toàn bộ bao bì sản phẩm, tài liệu, website và các ấn phẩm truyền thông của TPI. Bao bì mang logo cũ vẫn lưu hành song song đến hết quý II/2026 và có giá trị sử dụng như nhau.`;

export default function NewIdentityPage() {
  return (
    <>
      <PageHeroBanner
        title="Diện mạo mới"
        breadcrumbs={[{ label: "Giới thiệu", href: "/gioi-thieu" }, { label: "Diện mạo mới" }]}
      />

      <section className="container-site py-10 md:py-14">
        <p className="text-[12px] md:text-[13px] font-semibold uppercase tracking-wide text-brand">Thông báo · 17/12/2025</p>
        <h1 className="mt-2 max-w-3xl text-[24px] md:text-[36px] font-bold leading-tight text-[#1a1a1a]">
          Thông báo thay đổi logo TPI 2025
        </h1>
        <p className="mt-4 max-w-3xl text-[15px] md:text-[17px] leading-relaxed text-[#4a4a4a]">
          Nhân kỷ niệm 10 năm thành lập, TPI chính thức giới thiệu bộ nhận diện gồm logo và slogan mới. Đây là lần đầu
          tiên TPI chủ động tái định vị thương hiệu, với tinh thần không ngừng{" "}
          <span className="font-bold text-brand">ĐỔI MỚI SÁNG TẠO</span>.
        </p>

        <div className="mt-10 grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-10">
          <figure className="flex flex-col items-center gap-4 bg-[#f4f4f4] p-6 md:p-10">
            <Image
              src="/tpi-logo-2015-jpg.webp"
              alt="Logo cũ 2015 - TPI Development"
              width={300}
              height={200}
              className="h-auto w-full max-w-60 object-contain opacity-70 grayscale"
            />
            <figcaption className="text-[14px] font-bold text-[#696969]">Logo cũ · 2015 – 2025</figcaption>
          </figure>
          <span aria-hidden="true" className="text-center text-[32px] font-bold text-brand md:text-[44px]">
            →
          </span>
          <figure className="flex flex-col items-center gap-4 border-2 border-brand p-6 md:p-10">
            <Image
              src="/tpi-logo-2025-jpg.webp"
              alt="Logo mới 2025 - TPI Trust Passion Innovation"
              width={300}
              height={200}
              className="h-auto w-full max-w-60 object-contain"
            />
            <figcaption className="text-[14px] font-bold text-black">Logo mới · từ 17/12/2025</figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-[#f8f8f8]">
        <div className="container-site py-10 md:py-14">
          <SectionTitle>Trust – Passion – Innovation</SectionTitle>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.word} className="border-t-4 border-brand bg-white p-6">
                <p className="text-[24px] md:text-[28px] font-bold text-[#1a1a1a]">{v.word}</p>
                <p className="text-[13px] font-semibold uppercase tracking-wide text-brand">{v.vi}</p>
                <p className="mt-3 text-[14px] leading-relaxed text-[#4a4a4a]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site grid grid-cols-1 gap-10 py-10 md:py-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
        <RichText content={CONTENT} />

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <SectionTitle as="h2" className="text-[16px] md:text-[18px] uppercase">
            Chặng đường 10 năm
          </SectionTitle>
          <ol className="mt-6 flex flex-col gap-6 border-l-2 border-[#e5e5e5] pl-6">
            {MILESTONES.map((m) => (
              <li key={m.year} className="relative">
                <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-brand ring-4 ring-white" />
                <p className="text-[18px] font-bold text-brand">{m.year}</p>
                <p className="mt-1 text-[14px] leading-relaxed text-[#4a4a4a]">{m.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex items-center gap-4 border-t border-[#e5e5e5] pt-6">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
              <Image src="/Duy-Nguyen-150x150.webp" alt="CEO Nguyễn Hoàng Duy" fill sizes="64px" className="object-cover" />
            </div>
            <p className="text-[14px] text-black">
              <span className="block text-[#9a9a9a]">CEO</span>
              <span className="font-bold">Nguyễn Hoàng Duy</span>
            </p>
          </div>

          <Link
            href="/gioi-thieu"
            className="mt-6 inline-flex rounded-sm bg-brand px-6 py-3 text-[13px] md:text-[14px] font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Về TPI
          </Link>
        </aside>
      </section>

      <Features />
    </>
  );
}
