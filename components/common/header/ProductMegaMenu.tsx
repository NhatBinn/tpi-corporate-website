// components/common/nav/ProductMegaMenu.tsx
import ProductCategoryBrowser, {
  type ProductCategory,
  type Product,
} from "@/components/common/section/ProductCategoryBrowser";

const categories: ProductCategory[] = [
  { key: "noi-bat", label: "Nổi bật" },
  { key: "moi", label: "Mới" },
  { key: "thao-khuon", label: "Chất Tháo Khuôn" },
  { key: "vua-chuyen-dung", label: "Vữa Chuyên Dụng" },
  { key: "chong-tham", label: "Chống Thấm" },
  { key: "sua-chua-bao-ve", label: "Sửa Chữa & Bảo Vệ" },
  { key: "san-be-tong", label: "Sàn Bê Tông" },
  { key: "phu-gia-be-tong", label: "Phụ Gia Bê Tông" },
  { key: "son-phu-hoa-chat", label: "Sơn Phủ & Hoá Chất" },
];

const productsByCategory: Record<string, Product[]> = {
  "noi-bat": [
    { name: "TPI SKIMCOAT", desc: "Vữa tô nhẵn mịn cho bề mặt tường và trần", image: "/products/skimcoat.jpg", href: "/san-pham/tpi-skimcoat" },
    { name: "TPI HARD P", desc: "Bột xoa nền, tăng cứng bề mặt bê tông", image: "/products/hard-p.jpg", href: "/san-pham/tpi-hard-p" },
    { name: "TPI PU21", desc: "Màng chống thấm đàn hồi cao dạng lỏng, gốc PU", image: "/products/pu21.jpg", href: "/san-pham/tpi-pu21" },
    { name: "TPI BC-W", desc: "Chất tháo khuôn cốp pha nhôm và gangform", image: "/products/bc-w.jpg", href: "/san-pham/tpi-bc-w" },
    { name: "TPI BC-N", desc: "Chất tháo khuôn cốp pha gốc dầu", image: "/products/bc-n.jpg", href: "/san-pham/tpi-bc-n" },
    { name: "TPI Q-FIX 121", desc: "Chất kết dính gốc nhựa epoxy, 2 thành phần", image: "/products/qfix-121.jpg", href: "/san-pham/tpi-qfix-121" },
    { name: "TPI WB-102", desc: "Chất tháo khuôn đa dụng (gốc nước)", image: "/products/wb-102.jpg", href: "/san-pham/tpi-wb-102" },
    { name: "TPI A100", desc: "Sơn chống thấm tường gốc Acrylic", image: "/products/a100.jpg", href: "/san-pham/tpi-a100" },
    { name: "TPI GROUT 60", desc: "Vữa rót đa dụng gốc xi măng, bù co ngót (>60 Mpa)", image: "/products/grout-60.jpg", href: "/san-pham/tpi-grout-60" },
    { name: "TPI LATEX P100", desc: "Phụ gia chống thấm và kết nối", image: "/products/latex-p100.jpg", href: "/san-pham/tpi-latex-p100" },
  ],
  moi: [],
  "thao-khuon": [],
  "vua-chuyen-dung": [],
  "chong-tham": [],
  "sua-chua-bao-ve": [],
  "san-be-tong": [],
  "phu-gia-be-tong": [],
  "son-phu-hoa-chat": [],
};

export default function ProductMegaMenu() {
  return (
    <ProductCategoryBrowser
      categories={categories}
      productsByCategory={productsByCategory}
      columns={5}
      pageSize={10}
      variant="nav"
      interaction="hover"
    />
  );
}
