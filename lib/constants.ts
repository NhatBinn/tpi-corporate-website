// Domain public của site (link chia sẻ, metadataBase). Đặt NEXT_PUBLIC_SITE_URL khi đổi domain.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://tpi-corporate-website.vercel.app").replace(/\/$/, "");

export const SOCIAL_LINKS = [
  { name: "Facebook", href: "https://www.facebook.com/TPIVN", brandClass: "bg-[#1877F2] text-white" },
  { name: "TikTok", href: "https://www.tiktok.com/@tpivn.com", brandClass: "bg-black text-white" },
] as const;

export const ZALO_BUSINESS = "https://zalo.me/0933438323";
export const ZALO_RETAIL = "https://zalo.me/0901966846";

// Tài liệu PDF (Google Drive) giống menu "Tài Liệu" của web gốc — dùng cho menu và trang /tai-lieu.
export const DOCUMENTS = [
  {
    title: "Giải pháp hoá chất & vật liệu",
    desc: "Tổng hợp hệ sản phẩm hoá chất xây dựng TPI theo từng hạng mục thi công.",
    href: "https://drive.google.com/file/d/1DWdaorXXe_MyVVSPCuDmO1rcPLu9dDD1/view?usp=drive_link",
  },
  {
    title: "Nhà xưởng công nghiệp",
    desc: "Giải pháp sàn, vữa rót, chống thấm và bảo vệ bê tông cho nhà xưởng.",
    href: "https://drive.google.com/file/d/1Dp63IU1b0mx4rP2AJdAzQAhaazMA39m4/view?usp=drive_link",
  },
  {
    title: "Bê tông đúc sẵn",
    desc: "Chất tháo khuôn, phụ gia và bảo dưỡng cho nhà máy cấu kiện đúc sẵn.",
    href: "https://drive.google.com/file/d/1DqPoxmh3_Kf7JmIzCIaGSGvIs6pBpQ3u/view?usp=drive_link",
  },
  {
    title: "Chống thấm",
    desc: "Hệ chống thấm gốc xi măng, polymer, bitum và PU cho mọi hạng mục.",
    href: "https://drive.google.com/file/d/1Dn832lEFQ2wRbIUYSbolI4jDp9o1uDJp/view?usp=drive_link",
  },
] as const;

// Các chuyên mục blog được trỏ tới từ menu "Tài liệu & ứng dụng" (slug khớp PostCategory trong seed).
export const DOC_POST_LINKS = [
  { label: "Hướng dẫn thi công", href: "/blog?danh-muc=huong-dan-thi-cong" },
  { label: "Ứng dụng sản phẩm", href: "/blog?danh-muc=ung-dung-san-pham" },
  { label: "Thông báo về sản phẩm", href: "/blog?danh-muc=thong-bao-san-pham" },
] as const;

export const POLICY_LINKS = [
  { label: "Chính sách bán hàng", href: "/chinh-sach-ban-hang" },
  { label: "Chính sách bảo mật thông tin", href: "/chinh-sach-bao-mat-thong-tin" },
  { label: "Chính sách đổi trả hàng", href: "/chinh-sach-doi-tra-hang" },
] as const;

export const PRODUCT_PLACEHOLDER_IMAGE = "/products/list/TPI-SPR4-25L-800x800-1-300x300.webp";
export const IMAGE_PLACEHOLDER = "/Vua-tu-san.webp";
