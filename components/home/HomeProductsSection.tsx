import ProductCategoryBrowser, {
  type Product,
  type ProductCategory,
} from "@/components/home/ProductCategoryBrowser";
import Link from "next/link";

const categories: ProductCategory[] = [
  { key: "noi-bat", label: "Nổi bật" },
  { key: "moi", label: "Mới" },
  { key: "thao-khuon", label: "Chất Tháo Khuôn" },
  { key: "hoa-chat", label: "Hoá Chất" },
  { key: "vua-tron-san", label: "Vữa Trộn Sẵn" },
  { key: "chong-tham", label: "Chống Thấm" },
  { key: "sua-chua-bao-ve", label: "Sửa Chữa & Bảo Vệ" },
  { key: "san-be-tong", label: "Sàn Bê Tông" },
  { key: "son-phu", label: "Sơn Phủ" },
  { key: "phu-gia-be-tong", label: "Phụ Gia Bê Tông" },
];

const productsByCategory: Record<string, Product[]> = {
  "noi-bat": [
    {
      name: "TPI BC-W",
      desc: "Chất tháo khuôn cốp pha nhôm và gangform",
      image: "/products/bc-w.jpg",
      href: "/san-pham/tpi-bc-w",
    },
    {
      name: "TPI A100",
      desc: "Sơn chống thấm tường gốc Acrylic",
      image: "/products/a100.jpg",
      href: "/san-pham/tpi-a100",
    },
    {
      name: "TPI HARD P",
      desc: "Bột xoa nền, tăng cứng bề mặt bê tông",
      image: "/products/hard-p.jpg",
      href: "/san-pham/tpi-hard-p",
    },
    {
      name: "TPI BC-N",
      desc: "Chất tháo khuôn cốp pha gốc dầu",
      image: "/products/bc-n.jpg",
      href: "/san-pham/tpi-bc-n",
    },
    {
      name: "TPI PU21",
      desc: "Màng chống thấm đàn hồi cao dạng lỏng, gốc PU",
      image: "/products/pu21.jpg",
      href: "/san-pham/tpi-pu21",
    },
    {
      name: "TPI Q-FIX 121",
      desc: "Chất kết dính gốc nhựa epoxy, 2 thành phần",
      image: "/products/qfix-121.jpg",
      href: "/san-pham/tpi-qfix-121",
    },
    {
      name: "TPI GROUT 60",
      desc: "Vữa rót đa dụng gốc xi măng, bù co ngót (>60 Mpa)",
      image: "/products/grout-60.jpg",
      href: "/san-pham/tpi-grout-60",
    },
    {
      name: "TPI LATEX P100",
      desc: "Phụ gia chống thấm và kết nối",
      image: "/products/latex-p100.jpg",
      href: "/san-pham/tpi-latex-p100",
    },
  ],
  moi: [],
  "thao-khuon": [],
  "hoa-chat": [],
  "vua-tron-san": [],
  "chong-tham": [],
  "sua-chua-bao-ve": [],
  "san-be-tong": [],
  "son-phu": [],
  "phu-gia-be-tong": [],
};

export default function HomeProductsSection() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 md:px-6 py-12 md:py-16">
      <div className="mb-6 md:mb-8 flex items-start justify-between">
        <div>
          <p className="text-[13px] md:text-[14px] text-[#4a4a4a]">
            Một số <span className="font-bold text-black">Sản Phẩm Chính</span>
          </p>
          <h2 className="mt-1 text-[24px] md:text-[34px] leading-tight text-black">
            <span className="font-extrabold">Sản phẩm</span>
            <span className="font-normal"> của chúng tôi</span>
          </h2>
          <Link
            href="/san-pham"
            className="mt-2 inline-block text-[13px] md:text-[14px] font-semibold text-[#0a8a3f] hover:underline"
          >
            Xem tất cả →
          </Link>
        </div>

        <svg
          viewBox="0 0 380 150"
          className="hidden md:block h-[80px] md:h-[120px] w-[300px] md:w-[450px]"
        >
          <polygon points="0,150 95,150 235,0 140,0" fill="#e5173f" />
          <polygon points="145,150 240,150 380,0 285,0" fill="#e5173f" />
        </svg>
      </div>

      <ProductCategoryBrowser
        categories={categories}
        productsByCategory={productsByCategory}
        columns={4}
        pageSize={8}
        variant="section"
        interaction="click"
      />
    </section>
  );
}
