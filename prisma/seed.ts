// ============================================================
// SEED DATA — TPI App
// ============================================================
// Chạy lệnh:
//   bun --bun run prisma db seed
//
// Hoặc chạy trực tiếp:
//   bun --bun run prisma/seed.ts
// ============================================================

import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// ============================================================

// MAIN SEED FUNCTION
// ============================================================
async function main() {
  console.log("🌱 Bắt đầu seed...");

  // ----------------------------------------------------------
  // 1. XOÁ DỮ LIỆU CŨ (theo thứ tự quan hệ)
  // ----------------------------------------------------------
  console.log("  → Xoá dữ liệu cũ...");
  await prisma.$transaction([
    prisma.productImage.deleteMany(),
    prisma.$executeRawUnsafe('DELETE FROM "_ProductToTag"'),
    prisma.tag.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
    prisma.account.deleteMany(),
    prisma.session.deleteMany(),
    prisma.verification.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // ----------------------------------------------------------
  // 2. USER — Admin
  // ----------------------------------------------------------
  console.log("  → Tạo user admin...");
  const admin = await prisma.user.create({
    data: {
      id: "admin-001",
      name: "Admin TPI",
      email: "admin@tpi.vn",
      emailVerified: true,
      role: "admin",
    },
  });
  console.log(`    ✓ Admin: ${admin.email}`);

  // ----------------------------------------------------------
  // 3. CATEGORIES
  // ----------------------------------------------------------
  console.log("  → Tạo danh mục sản phẩm...");

  const categoryData = [
    {
      id: "cat-thao-khuon",
      name: "Chất Tháo Khuôn",
      slug: "thao-khuon",
      seoTitle: "Chất Tháo Khuôn Chất Lượng Cao | TPI",
      seoDescription:
        "Các sản phẩm chất tháo khuôn cốp pha gốc dầu, gốc nước dùng cho nhôm, gangform, gỗ.",
    },
    {
      id: "cat-vua-chuyen-dung",
      name: "Vữa Chuyên Dụng",
      slug: "vua-chuyen-dung",
      seoTitle: "Vữa Chuyên Dụng Chất Lượng Cao | TPI",
      seoDescription:
        "Vữa rót bù co ngót, vữa tô nhẵn mịn, vữa sửa chữa bê tông.",
    },
    {
      id: "cat-chong-tham",
      name: "Chống Thấm",
      slug: "chong-tham",
      seoTitle: "Sơn & Màng Chống Thấm Chất Lượng Cao | TPI",
      seoDescription:
        "Màng chống thấm đàn hồi PU, sơn chống thấm acrylic, phụ gia chống thấm.",
    },
    {
      id: "cat-sua-chua-bao-ve",
      name: "Sửa Chữa & Bảo Vệ",
      slug: "sua-chua-bao-ve",
      seoTitle: "Sửa Chữa & Bảo Vệ Bê Tông | TPI",
      seoDescription:
        "Keo epoxy kết dính, vữa sửa chữa bê tông, bảo vệ kết cấu.",
    },
    {
      id: "cat-san-be-tong",
      name: "Sàn Bê Tông",
      slug: "san-be-tong",
      seoTitle: "Sản Phẩm Cho Sàn Bê Tông | TPI",
      seoDescription:
        "Bột xoa nền tăng cứng, hóa chất đánh bóng, bảo dưỡng sàn bê tông.",
    },
    {
      id: "cat-phu-gia-be-tong",
      name: "Phụ Gia Bê Tông",
      slug: "phu-gia-be-tong",
      seoTitle: "Phụ Gia Bê Tông Chất Lượng Cao | TPI",
      seoDescription:
        "Phụ gia chống thấm, phụ gia kết nối, phụ gia bảo dưỡng bê tông.",
    },
    {
      id: "cat-son-phu-hoa-chat",
      name: "Sơn Phủ & Hoá Chất",
      slug: "son-phu-hoa-chat",
      seoTitle: "Sơn Phủ & Hoá Chất Xây Dựng | TPI",
      seoDescription:
        "Sơn phủ bảo vệ bề mặt, hoá chất xây dựng chuyên dụng.",
    },
  ];

  const categories = await Promise.all(
    categoryData.map((cat) =>
      prisma.category.create({ data: cat }),
    ),
  );
  console.log(`    ✓ ${categories.length} danh mục`);

  // ----------------------------------------------------------
  // 4. TAGS
  // ----------------------------------------------------------
  console.log("  → Tạo tags...");

  const tagData = [
    { id: "tag-chong-tham", name: "Chống thấm", slug: "chong-tham" },
    { id: "tag-epoxy", name: "Epoxy", slug: "epoxy" },
    { id: "tag-acrylic", name: "Acrylic", slug: "acrylic" },
    { id: "tag-goc-nuoc", name: "Gốc nước", slug: "goc-nuoc" },
    { id: "tag-goc-dau", name: "Gốc dầu", slug: "goc-dau" },
    { id: "tag-be-tong", name: "Bê tông", slug: "be-tong" },
    { id: "tag-vua", name: "Vữa", slug: "vua" },
    { id: "tag-son-phu", name: "Sơn phủ", slug: "son-phu" },
    { id: "tag-phu-gia", name: "Phụ gia", slug: "phu-gia" },
    { id: "tag-thao-khuon", name: "Tháo khuôn", slug: "thao-khuon" },
  ];

  const tags = await Promise.all(
    tagData.map((t) => prisma.tag.create({ data: t })),
  );
  console.log(`    ✓ ${tags.length} tags`);

  // ----------------------------------------------------------
  // 5. PRODUCTS
  // ----------------------------------------------------------
  console.log("  → Tạo sản phẩm...");

  const productData = [
    // ===== NỔI BẬT (isFeatured = true) =====
    {
      id: "prod-skimcoat",
      name: "TPI SKIMCOAT",
      slug: "tpi-skimcoat",
      isFeatured: true,
      isNew: false,
      isBestSeller: true,
      sku: "TPI-SKIMCOAT-25",
      imageUrl: "/products/skimcoat.jpg",
      description:
        "Vữa tô nhẵn mịn cho bề mặt tường và trần, thi công dễ dàng, độ bám dính cao.",
      compressiveStrength: "≥ 10 MPa",
      waterDilutionRatio: "0.18 – 0.20 lít/kg",
      pack: "25 kg/bao",
      pdfUrl: "/pdf/tpi-skimcoat.pdf",
      price: 180000,
      salePrice: null,
      stock: 500,
      seoTitle: "TPI SKIMCOAT - Vữa tô nhẵn mịn | TPI",
      seoDescription:
        "Vữa tô nhẵn mịn TPI SKIMCOAT cho bề mặt tường và trần, thi công dễ dàng.",
      categoryId: "cat-vua-chuyen-dung",
      tagIds: ["tag-vua"],
    },
    {
      id: "prod-hard-p",
      name: "TPI HARD P",
      slug: "tpi-hard-p",
      isFeatured: true,
      isNew: false,
      isBestSeller: true,
      sku: "TPI-HARDP-25",
      imageUrl: "/products/hard-p.jpg",
      description:
        "Bột xoa nền, tăng cứng bề mặt bê tông, chống bụi, chống thấm bề mặt.",
      compressiveStrength: null,
      waterDilutionRatio: null,
      pack: "25 kg/bao",
      pdfUrl: "/pdf/tpi-hard-p.pdf",
      price: 250000,
      salePrice: null,
      stock: 300,
      seoTitle: "TPI HARD P - Bột xoa nền tăng cứng | TPI",
      seoDescription:
        "Bột xoa nền TPI HARD P tăng cứng bề mặt bê tông, chống bụi, chống thấm.",
      categoryId: "cat-san-be-tong",
      tagIds: ["tag-be-tong"],
    },
    {
      id: "prod-pu21",
      name: "TPI PU21",
      slug: "tpi-pu21",
      isFeatured: true,
      isNew: false,
      isBestSeller: true,
      sku: "TPI-PU21-20",
      imageUrl: "/products/pu21.jpg",
      description:
        "Màng chống thấm đàn hồi cao dạng lỏng, gốc PU, dùng cho mái, sân thượng, hồ nước.",
      compressiveStrength: null,
      waterDilutionRatio: null,
      pack: "20 kg/thùng",
      pdfUrl: "/pdf/tpi-pu21.pdf",
      price: 850000,
      salePrice: 780000,
      stock: 200,
      seoTitle: "TPI PU21 - Màng chống thấm PU | TPI",
      seoDescription:
        "Màng chống thấm đàn hồi cao TPI PU21 gốc PU, dùng cho mái, sân thượng.",
      categoryId: "cat-chong-tham",
      tagIds: ["tag-chong-tham"],
    },
    {
      id: "prod-bc-w",
      name: "TPI BC-W",
      slug: "tpi-bc-w",
      isFeatured: true,
      isNew: false,
      isBestSeller: false,
      sku: "TPI-BCW-200",
      imageUrl: "/products/bc-w.jpg",
      description:
        "Chất tháo khuôn cốp pha nhôm và gangform, gốc nước, thân thiện môi trường.",
      compressiveStrength: null,
      waterDilutionRatio: "1:3 – 1:5 với nước",
      pack: "200 lít/phuy",
      pdfUrl: "/pdf/tpi-bc-w.pdf",
      price: 1200000,
      salePrice: null,
      stock: 100,
      seoTitle: "TPI BC-W - Chất tháo khuôn gốc nước | TPI",
      seoDescription:
        "Chất tháo khuôn cốp pha nhôm TPI BC-W gốc nước, thân thiện môi trường.",
      categoryId: "cat-thao-khuon",
      tagIds: ["tag-thao-khuon", "tag-goc-nuoc"],
    },
    {
      id: "prod-bc-n",
      name: "TPI BC-N",
      slug: "tpi-bc-n",
      isFeatured: true,
      isNew: false,
      isBestSeller: false,
      sku: "TPI-BCN-200",
      imageUrl: "/products/bc-n.jpg",
      description:
        "Chất tháo khuôn cốp pha gốc dầu, hiệu quả cao cho cốp pha gỗ và thép.",
      compressiveStrength: null,
      waterDilutionRatio: null,
      pack: "200 lít/phuy",
      pdfUrl: "/pdf/tpi-bc-n.pdf",
      price: 1100000,
      salePrice: null,
      stock: 80,
      seoTitle: "TPI BC-N - Chất tháo khuôn gốc dầu | TPI",
      seoDescription:
        "Chất tháo khuôn cốp pha TPI BC-N gốc dầu, hiệu quả cao cho cốp pha gỗ và thép.",
      categoryId: "cat-thao-khuon",
      tagIds: ["tag-thao-khuon", "tag-goc-dau"],
    },
    {
      id: "prod-qfix-121",
      name: "TPI Q-FIX 121",
      slug: "tpi-qfix-121",
      isFeatured: true,
      isNew: false,
      isBestSeller: false,
      sku: "TPI-QFIX121-6",
      imageUrl: "/products/qfix-121.jpg",
      description:
        "Chất kết dính gốc nhựa epoxy, 2 thành phần, dùng để gắn kết bê tông cũ và mới.",
      compressiveStrength: "≥ 60 MPa",
      waterDilutionRatio: null,
      pack: "6 kg/bộ",
      pdfUrl: "/pdf/tpi-qfix-121.pdf",
      price: 650000,
      salePrice: null,
      stock: 150,
      seoTitle: "TPI Q-FIX 121 - Keo epoxy kết dính | TPI",
      seoDescription:
        "Keo epoxy TPI Q-FIX 121 2 thành phần, kết dính bê tông cũ và mới.",
      categoryId: "cat-sua-chua-bao-ve",
      tagIds: ["tag-epoxy"],
    },
    {
      id: "prod-wb-102",
      name: "TPI WB-102",
      slug: "tpi-wb-102",
      isFeatured: true,
      isNew: true,
      isBestSeller: false,
      sku: "TPI-WB102-200",
      imageUrl: "/products/wb-102.jpg",
      description:
        "Chất tháo khuôn đa dụng gốc nước, dùng được cho nhiều loại cốp pha.",
      compressiveStrength: null,
      waterDilutionRatio: "1:2 – 1:4 với nước",
      pack: "200 lít/phuy",
      pdfUrl: "/pdf/tpi-wb-102.pdf",
      price: 950000,
      salePrice: null,
      stock: 120,
      seoTitle: "TPI WB-102 - Chất tháo khuôn đa dụng | TPI",
      seoDescription:
        "Chất tháo khuôn đa dụng TPI WB-102 gốc nước, dùng cho nhiều loại cốp pha.",
      categoryId: "cat-thao-khuon",
      tagIds: ["tag-thao-khuon", "tag-goc-nuoc"],
    },
    {
      id: "prod-a100",
      name: "TPI A100",
      slug: "tpi-a100",
      isFeatured: true,
      isNew: false,
      isBestSeller: false,
      sku: "TPI-A100-18",
      imageUrl: "/products/a100.jpg",
      description:
        "Sơn chống thấm tường gốc Acrylic, thấm sâu, chống kiềm hoá, chống nấm mốc.",
      compressiveStrength: null,
      waterDilutionRatio: "Pha với 10-15% nước sạch",
      pack: "18 lít/thùng",
      pdfUrl: "/pdf/tpi-a100.pdf",
      price: 750000,
      salePrice: 690000,
      stock: 250,
      seoTitle: "TPI A100 - Sơn chống thấm Acrylic | TPI",
      seoDescription:
        "Sơn chống thấm tường TPI A100 gốc Acrylic, thấm sâu, chống kiềm hoá.",
      categoryId: "cat-chong-tham",
      tagIds: ["tag-chong-tham", "tag-acrylic", "tag-son-phu"],
    },
    {
      id: "prod-grout-60",
      name: "TPI GROUT 60",
      slug: "tpi-grout-60",
      isFeatured: true,
      isNew: false,
      isBestSeller: true,
      sku: "TPI-GROUT60-25",
      imageUrl: "/products/grout-60.jpg",
      description:
        "Vữa rót đa dụng gốc xi măng, bù co ngót, cường độ cao (>60 MPa).",
      compressiveStrength: "≥ 60 MPa",
      waterDilutionRatio: "0.13 – 0.15 lít/kg",
      pack: "25 kg/bao",
      pdfUrl: "/pdf/tpi-grout-60.pdf",
      price: 220000,
      salePrice: null,
      stock: 400,
      seoTitle: "TPI GROUT 60 - Vữa rót bù co ngót | TPI",
      seoDescription:
        "Vữa rót đa dụng TPI GROUT 60 gốc xi măng, bù co ngót, cường độ >60 MPa.",
      categoryId: "cat-vua-chuyen-dung",
      tagIds: ["tag-vua", "tag-be-tong"],
    },
    {
      id: "prod-latex-p100",
      name: "TPI LATEX P100",
      slug: "tpi-latex-p100",
      isFeatured: true,
      isNew: false,
      isBestSeller: false,
      sku: "TPI-LATEXP100-5",
      imageUrl: "/products/latex-p100.jpg",
      description:
        "Phụ gia chống thấm và kết nối, tăng cường bám dính cho vữa và bê tông.",
      compressiveStrength: null,
      waterDilutionRatio: null,
      pack: "5 lít/can",
      pdfUrl: "/pdf/tpi-latex-p100.pdf",
      price: 350000,
      salePrice: null,
      stock: 180,
      seoTitle: "TPI LATEX P100 - Phụ gia chống thấm | TPI",
      seoDescription:
        "Phụ gia chống thấm TPI LATEX P100 tăng cường bám dính cho vữa và bê tông.",
      categoryId: "cat-phu-gia-be-tong",
      tagIds: ["tag-phu-gia", "tag-chong-tham"],
    },

    // ===== SẢN PHẨM KHÁC =====
    {
      id: "prod-grout-80",
      name: "TPI GROUT 80",
      slug: "tpi-grout-80",
      isFeatured: false,
      isNew: false,
      isBestSeller: false,
      sku: "TPI-GROUT80-25",
      imageUrl: "/products/grout-80.jpg",
      description:
        "Vữa rót cường độ cao, bù co ngót, dùng cho chân máy, kết cấu chịu tải nặng.",
      compressiveStrength: "≥ 80 MPa",
      waterDilutionRatio: "0.12 – 0.14 lít/kg",
      pack: "25 kg/bao",
      pdfUrl: "/pdf/tpi-grout-80.pdf",
      price: 280000,
      salePrice: null,
      stock: 350,
      seoTitle: "TPI GROUT 80 - Vữa rót cường độ cao | TPI",
      seoDescription:
        "Vữa rót cường độ cao TPI GROUT 80, bù co ngót, dùng cho chân máy.",
      categoryId: "cat-vua-chuyen-dung",
      tagIds: ["tag-vua", "tag-be-tong"],
    },
    {
      id: "prod-pu25",
      name: "TPI PU25",
      slug: "tpi-pu25",
      isFeatured: false,
      isNew: true,
      isBestSeller: false,
      sku: "TPI-PU25-20",
      imageUrl: "/products/pu25.jpg",
      description:
        "Màng chống thấm PU cao cấp, đàn hồi cực tốt, chịu được thời tiết khắc nghiệt.",
      compressiveStrength: null,
      waterDilutionRatio: null,
      pack: "20 kg/thùng",
      pdfUrl: "/pdf/tpi-pu25.pdf",
      price: 980000,
      salePrice: 890000,
      stock: 150,
      seoTitle: "TPI PU25 - Màng chống thấm PU cao cấp | TPI",
      seoDescription:
        "Màng chống thấm PU cao cấp TPI PU25, đàn hồi cực tốt.",
      categoryId: "cat-chong-tham",
      tagIds: ["tag-chong-tham"],
    },
    {
      id: "prod-epoxy-grout",
      name: "TPI EPOXY GROUT",
      slug: "tpi-epoxy-grout",
      isFeatured: false,
      isNew: false,
      isBestSeller: false,
      sku: "TPI-EPOXYGROUT-10",
      imageUrl: "/products/epoxy-grout.jpg",
      description:
        "Vữa epoxy rót bù co ngót, cường độ chịu nén và bám dính cực cao.",
      compressiveStrength: "≥ 90 MPa",
      waterDilutionRatio: null,
      pack: "10 kg/bộ",
      pdfUrl: "/pdf/tpi-epoxy-grout.pdf",
      price: 1500000,
      salePrice: null,
      stock: 60,
      seoTitle: "TPI EPOXY GROUT - Vữa epoxy rót bù co ngót | TPI",
      seoDescription:
        "Vữa epoxy TPI EPOXY GROUT rót bù co ngót, cường độ chịu nén cực cao.",
      categoryId: "cat-sua-chua-bao-ve",
      tagIds: ["tag-epoxy", "tag-vua"],
    },
    {
      id: "prod-hard-l",
      name: "TPI HARD L",
      slug: "tpi-hard-l",
      isFeatured: false,
      isNew: false,
      isBestSeller: false,
      sku: "TPI-HARDL-5",
      imageUrl: "/products/hard-l.jpg",
      description:
        "Hoá chất đánh bóng sàn bê tông, tạo độ bóng và bảo vệ bề mặt sàn.",
      compressiveStrength: null,
      waterDilutionRatio: "Pha với 2-3 phần nước",
      pack: "5 lít/can",
      pdfUrl: "/pdf/tpi-hard-l.pdf",
      price: 450000,
      salePrice: null,
      stock: 200,
      seoTitle: "TPI HARD L - Hoá chất đánh bóng sàn | TPI",
      seoDescription:
        "Hoá chất đánh bóng sàn bê tông TPI HARD L, tạo độ bóng và bảo vệ bề mặt.",
      categoryId: "cat-san-be-tong",
      tagIds: ["tag-be-tong"],
    },
    {
      id: "prod-curing-compound",
      name: "TPI CURING COMPOUND",
      slug: "tpi-curing-compound",
      isFeatured: false,
      isNew: false,
      isBestSeller: false,
      sku: "TPI-CURING-20",
      imageUrl: "/products/curing-compound.jpg",
      description:
        "Chất bảo dưỡng bê tông, tạo màng giữ ẩm, giúp bê tông đạt cường độ tối ưu.",
      compressiveStrength: null,
      waterDilutionRatio: null,
      pack: "20 lít/thùng",
      pdfUrl: "/pdf/tpi-curing-compound.pdf",
      price: 550000,
      salePrice: null,
      stock: 160,
      seoTitle: "TPI CURING COMPOUND - Chất bảo dưỡng bê tông | TPI",
      seoDescription:
        "Chất bảo dưỡng bê tông TPI CURING COMPOUND, tạo màng giữ ẩm.",
      categoryId: "cat-phu-gia-be-tong",
      tagIds: ["tag-phu-gia", "tag-be-tong"],
    },
    {
      id: "prod-acrylic-topcoat",
      name: "TPI ACRYLIC TOPCOAT",
      slug: "tpi-acrylic-topcoat",
      isFeatured: false,
      isNew: true,
      isBestSeller: false,
      sku: "TPI-ACRYLICTOP-18",
      imageUrl: "/products/acrylic-topcoat.jpg",
      description:
        "Sơn phủ acrylic bảo vệ bề mặt tường ngoại thất, chống UV, chống thấm.",
      compressiveStrength: null,
      waterDilutionRatio: "Pha với 10-15% nước sạch",
      pack: "18 lít/thùng",
      pdfUrl: "/pdf/tpi-acrylic-topcoat.pdf",
      price: 820000,
      salePrice: null,
      stock: 220,
      seoTitle: "TPI ACRYLIC TOPCOAT - Sơn phủ acrylic | TPI",
      seoDescription:
        "Sơn phủ acrylic TPI ACRYLIC TOPCOAT bảo vệ bề mặt tường ngoại thất.",
      categoryId: "cat-son-phu-hoa-chat",
      tagIds: ["tag-son-phu", "tag-acrylic"],
    },
    {
      id: "prod-epoxy-primer",
      name: "TPI EPOXY PRIMER",
      slug: "tpi-epoxy-primer",
      isFeatured: false,
      isNew: false,
      isBestSeller: false,
      sku: "TPI-EPOXYPRIMER-6",
      imageUrl: "/products/epoxy-primer.jpg",
      description:
        "Sơn lót epoxy 2 thành phần, tăng bám dính cho hệ thống sơn epoxy.",
      compressiveStrength: null,
      waterDilutionRatio: null,
      pack: "6 kg/bộ",
      pdfUrl: "/pdf/tpi-epoxy-primer.pdf",
      price: 580000,
      salePrice: null,
      stock: 140,
      seoTitle: "TPI EPOXY PRIMER - Sơn lót epoxy | TPI",
      seoDescription:
        "Sơn lót epoxy TPI EPOXY PRIMER 2 thành phần, tăng bám dính.",
      categoryId: "cat-son-phu-hoa-chat",
      tagIds: ["tag-son-phu", "tag-epoxy"],
    },
    {
      id: "prod-bc-g",
      name: "TPI BC-G",
      slug: "tpi-bc-g",
      isFeatured: false,
      isNew: false,
      isBestSeller: false,
      sku: "TPI-BCG-200",
      imageUrl: "/products/bc-g.jpg",
      description:
        "Chất tháo khuôn chuyên dụng cho cốp pha gỗ, gốc dầu, chống dính hiệu quả.",
      compressiveStrength: null,
      waterDilutionRatio: null,
      pack: "200 lít/phuy",
      pdfUrl: "/pdf/tpi-bc-g.pdf",
      price: 1050000,
      salePrice: null,
      stock: 90,
      seoTitle: "TPI BC-G - Chất tháo khuôn cốp pha gỗ | TPI",
      seoDescription:
        "Chất tháo khuôn TPI BC-G chuyên dụng cho cốp pha gỗ, gốc dầu.",
      categoryId: "cat-thao-khuon",
      tagIds: ["tag-thao-khuon", "tag-goc-dau"],
    },
    {
      id: "prod-sbr-latex",
      name: "TPI SBR LATEX",
      slug: "tpi-sbr-latex",
      isFeatured: false,
      isNew: true,
      isBestSeller: false,
      sku: "TPI-SBRLATEX-5",
      imageUrl: "/products/sbr-latex.jpg",
      description:
        "Phụ gia SBR Latex tăng cường bám dính, chống thấm cho vữa sửa chữa.",
      compressiveStrength: null,
      waterDilutionRatio: "Pha với 1 phần nước",
      pack: "5 lít/can",
      pdfUrl: "/pdf/tpi-sbr-latex.pdf",
      price: 380000,
      salePrice: null,
      stock: 170,
      seoTitle: "TPI SBR LATEX - Phụ gia SBR Latex | TPI",
      seoDescription:
        "Phụ gia SBR Latex TPI tăng cường bám dính, chống thấm cho vữa sửa chữa.",
      categoryId: "cat-phu-gia-be-tong",
      tagIds: ["tag-phu-gia", "tag-chong-tham"],
    },
  ];

  // Tạo sản phẩm kèm tags
  const products = await Promise.all(
    productData.map(async (p) => {
      const { tagIds, ...productFields } = p;
      const product = await prisma.product.create({
        data: {
          ...productFields,
          tags: {
            connect: tagIds.map((id) => ({ id })),
          },
        },
      });
      return product;
    }),
  );
  console.log(`    ✓ ${products.length} sản phẩm`);

  // ----------------------------------------------------------
  // 6. PRODUCT IMAGES
  // ----------------------------------------------------------
  console.log("  → Tạo ảnh sản phẩm...");

  const productImageData = products.flatMap((p) => [
    {
      url: p.imageUrl ?? `/products/placeholder.jpg`,
      sortOrder: 0,
      alt: `${p.name} - Ảnh chính`,
      productId: p.id,
    },
    {
      url: p.imageUrl?.replace(".jpg", "-2.jpg") ?? `/products/placeholder-2.jpg`,
      sortOrder: 1,
      alt: `${p.name} - Ảnh phụ 1`,
      productId: p.id,
    },
  ]);

  const productImages = await Promise.all(
    productImageData.map((img) => prisma.productImage.create({ data: img })),
  );
  console.log(`    ✓ ${productImages.length} ảnh sản phẩm`);

  // ----------------------------------------------------------
  // 7. TỔNG KẾT
  // ----------------------------------------------------------
  console.log("");
  console.log("========================================");
  console.log("  ✅ SEED HOÀN TẤT");
  console.log("========================================");
  console.log(`  Users:         1`);
  console.log(`  Categories:    ${categories.length}`);
  console.log(`  Tags:          ${tags.length}`);
  console.log(`  Products:      ${products.length}`);
  console.log(`  ProductImages: ${productImages.length}`);
  console.log("========================================");
}

// ============================================================
// EXECUTE
// ============================================================
main()
  .catch((e) => {
    console.error("❌ Seed thất bại:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
