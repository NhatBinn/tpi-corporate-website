// ============================================================
// SEED DATA — TPI App
// ============================================================
// Chạy lệnh:
//   bun --bun run prisma db seed
// ============================================================

import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// ============================================================
// HELPER: tạo slug từ tên
// ============================================================
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ============================================================
// MAIN SEED FUNCTION
// ============================================================
async function main() {
  console.log("🌱 Bắt đầu seed...");

  // ----------------------------------------------------------
  // 1. XOÁ DỮ LIỆU CŨ
  // ----------------------------------------------------------
  console.log("  → Xoá dữ liệu cũ...");
  await prisma.$transaction([
    prisma.projectProduct.deleteMany(),
    prisma.projectImage.deleteMany(),
    prisma.project.deleteMany(),
    prisma.projectCategory.deleteMany(),
    prisma.productImage.deleteMany(),
    prisma.$executeRawUnsafe('DELETE FROM "_ProductToTag"'),
    prisma.tag.deleteMany(),
    prisma.product.deleteMany(),
    prisma.productCategory.deleteMany(),
    prisma.feedback.deleteMany(),
    prisma.solution.deleteMany(),
    prisma.solutionCategory.deleteMany(),
  ]);
  console.log("    ✓ Đã xoá dữ liệu cũ");

  // ----------------------------------------------------------
  // 2. USER — Admin
  // ----------------------------------------------------------
  console.log("  → Tạo user admin...");
  const admin = await prisma.user.upsert({
    where: { email: "admin@tpi.vn" },
    update: {},
    create: {
      id: "admin-001",
      name: "Admin TPI",
      email: "admin@tpi.vn",
      emailVerified: true,
      role: "admin",
    },
  });
  console.log(`    ✓ Admin: ${admin.email}`);

  // ----------------------------------------------------------
  // 3. PRODUCT CATEGORIES (20 records)
  // ----------------------------------------------------------
  console.log("  → Tạo danh mục sản phẩm...");

  const categoryNames = [
    "Chất Tháo Khuôn", "Vữa Chuyên Dụng", "Chống Thấm",
    "Sửa Chữa & Bảo Vệ", "Sàn Bê Tông", "Phụ Gia Bê Tông",
    "Sơn Phủ & Hoá Chất", "Keo Dán Gạch Đá", "Chất Chống Rỉ",
    "Phụ Gia Vữa", "Sơn Nước", "Sơn Epoxy",
    "Vữa Tự San", "Chất Bảo Dưỡng", "Vữa Sửa Chữa",
    "Hoá Chất Tẩy Rửa", "Phụ Gia Bê Tông Đặc Biệt",
    "Vật Liệu Chống Nhiệt", "Bột Trộn Sẵn", "Phụ Kiện Xây Dựng",
  ];

  const categoryDescs = [
    "Các sản phẩm chất tháo khuôn cốp pha gốc dầu, gốc nước dùng cho nhôm, gangform, gỗ.",
    "Vữa rót bù co ngót, vữa tô nhẵn mịn, vữa sửa chữa bê tông.",
    "Màng chống thấm đàn hồi PU, sơn chống thấm acrylic, phụ gia chống thấm.",
    "Keo epoxy kết dính, vữa sửa chữa bê tông, bảo vệ kết cấu.",
    "Bột xoa nền tăng cứng, hóa chất đánh bóng, bảo dưỡng sàn bê tông.",
    "Phụ gia chống thấm, phụ gia kết nối, phụ gia bảo dưỡng bê tông.",
    "Sơn phủ bảo vệ bề mặt, hoá chất xây dựng chuyên dụng.",
    "Keo dán gạch đá, keo dán đá tự nhiên, keo dán gạch porcelain.",
    "Sơn chống rỉ, chất chống rỉ cho kết cấu thép và cốt thép.",
    "Phụ gia tăng dẻo, giữ nước, tăng cường độ cho vữa xây dựng.",
    "Sơn nước nội thất, ngoại thất, sơn lót, sơn phủ chất lượng cao.",
    "Sơn epoxy sàn công nghiệp, sơn epoxy chống hóa chất, sơn lót epoxy.",
    "Vữa tự san phẳng sàn, vữa tự san nhanh khô, vữa tự san công nghiệp.",
    "Chất bảo dưỡng bê tông, màng bảo dưỡng, chất tạo màng giữ ẩm.",
    "Vữa sửa chữa bê tông, vữa trám khe nứt, vữa tạo hình kết cấu.",
    "Hoá chất tẩy rỉ thép, tẩy dầu mỡ, tẩy sơn bê tông.",
    "Silicafume, phụ gia giảm nước cao cấp, phụ gia kéo dài thời gian đông kết.",
    "Sơn chống nóng, vật liệu cách nhiệt, phụ gia chống nhiệt cho bê tông.",
    "Bột trộn sẵn cho vữa xây, vữa tô, vữa dán gạch.",
    "Băng keo chống thấm, lưới sợi thủy tinh, phụ kiện thi công.",
  ];

  const categories = await Promise.all(
    categoryNames.map((name, i) => {
      const slug = slugify(name);
      return prisma.productCategory.create({
        data: {
          id: `cat-${slug}`,
          name,
          slug,
          seoTitle: `${name} Chất Lượng Cao | TPI`,
          seoDescription: categoryDescs[i],
        },
      });
    }),
  );
  console.log(`    ✓ ${categories.length} danh mục sản phẩm`);

  // ----------------------------------------------------------
  // 4. TAGS (20 records)
  // ----------------------------------------------------------
  console.log("  → Tạo tags...");

  const tagNames = [
    "Chống thấm", "Epoxy", "Acrylic", "Gốc nước", "Gốc dầu",
    "Bê tông", "Vữa", "Sơn phủ", "Phụ gia", "Tháo khuôn",
    "Keo dán", "Chống rỉ", "Sơn nước", "Tự san", "Bảo dưỡng",
    "Sửa chữa", "Cách nhiệt", "Bột trộn", "Phụ kiện", "Hoá chất",
  ];

  const tags = await Promise.all(
    tagNames.map((name) =>
      prisma.tag.create({
        data: { id: `tag-${slugify(name)}`, name, slug: slugify(name) },
      }),
    ),
  );
  console.log(`    ✓ ${tags.length} tags`);

  // ----------------------------------------------------------
  // 5. PRODUCTS (50 records)
  // ----------------------------------------------------------
  console.log("  → Tạo sản phẩm...");

  const productDefs = [
    { name: "TPI SKIMCOAT", cat: "vua-chuyen-dung", tags: ["vua"], feat: true, best: true, price: 180000, stock: 500, desc: "Vữa tô nhẵn mịn cho bề mặt tường và trần, thi công dễ dàng, độ bám dính cao.", comp: "≥ 10 MPa", water: "0.18 – 0.20 lít/kg", pack: "25 kg/bao" },
    { name: "TPI HARD P", cat: "san-be-tong", tags: ["be-tong"], feat: true, best: true, price: 250000, stock: 300, desc: "Bột xoa nền, tăng cứng bề mặt bê tông, chống bụi, chống thấm bề mặt.", pack: "25 kg/bao" },
    { name: "TPI PU21", cat: "chong-tham", tags: ["chong-tham"], feat: true, best: true, price: 850000, sale: 780000, stock: 200, desc: "Màng chống thấm đàn hồi cao dạng lỏng, gốc PU, dùng cho mái, sân thượng, hồ nước.", pack: "20 kg/thùng" },
    { name: "TPI BC-W", cat: "chat-thao-khuon", tags: ["thao-khuon", "goc-nuoc"], feat: true, price: 1200000, stock: 100, desc: "Chất tháo khuôn cốp pha nhôm và gangform, gốc nước, thân thiện môi trường.", water: "1:3 – 1:5 với nước", pack: "200 lít/phuy" },
    { name: "TPI BC-N", cat: "chat-thao-khuon", tags: ["thao-khuon", "goc-dau"], feat: true, price: 1100000, stock: 80, desc: "Chất tháo khuôn cốp pha gốc dầu, hiệu quả cao cho cốp pha gỗ và thép.", pack: "200 lít/phuy" },
    { name: "TPI Q-FIX 121", cat: "sua-chua-bao-ve", tags: ["epoxy"], feat: true, price: 650000, stock: 150, desc: "Chất kết dính gốc nhựa epoxy, 2 thành phần, dùng để gắn kết bê tông cũ và mới.", comp: "≥ 60 MPa", pack: "6 kg/bộ" },
    { name: "TPI WB-102", cat: "chat-thao-khuon", tags: ["thao-khuon", "goc-nuoc"], feat: true, new: true, price: 950000, stock: 120, desc: "Chất tháo khuôn đa dụng gốc nước, dùng được cho nhiều loại cốp pha.", water: "1:2 – 1:4 với nước", pack: "200 lít/phuy" },
    { name: "TPI A100", cat: "chong-tham", tags: ["chong-tham", "acrylic", "son-phu"], feat: true, price: 750000, sale: 690000, stock: 250, desc: "Sơn chống thấm tường gốc Acrylic, thấm sâu, chống kiềm hoá, chống nấm mốc.", water: "Pha với 10-15% nước sạch", pack: "18 lít/thùng" },
    { name: "TPI GROUT 60", cat: "vua-chuyen-dung", tags: ["vua", "be-tong"], feat: true, best: true, price: 220000, stock: 400, desc: "Vữa rót đa dụng gốc xi măng, bù co ngót, cường độ cao (>60 MPa).", comp: "≥ 60 MPa", water: "0.13 – 0.15 lít/kg", pack: "25 kg/bao" },
    { name: "TPI LATEX P100", cat: "phu-gia-be-tong", tags: ["phu-gia", "chong-tham"], feat: true, price: 350000, stock: 180, desc: "Phụ gia chống thấm và kết nối, tăng cường bám dính cho vữa và bê tông.", pack: "5 lít/can" },
    { name: "TPI GROUT 80", cat: "vua-chuyen-dung", tags: ["vua", "be-tong"], price: 280000, stock: 350, desc: "Vữa rót cường độ cao, bù co ngót, dùng cho chân máy, kết cấu chịu tải nặng.", comp: "≥ 80 MPa", water: "0.12 – 0.14 lít/kg", pack: "25 kg/bao" },
    { name: "TPI PU25", cat: "chong-tham", tags: ["chong-tham"], new: true, price: 980000, sale: 890000, stock: 150, desc: "Màng chống thấm PU cao cấp, đàn hồi cực tốt, chịu được thời tiết khắc nghiệt.", pack: "20 kg/thùng" },
    { name: "TPI EPOXY GROUT", cat: "sua-chua-bao-ve", tags: ["epoxy", "vua"], price: 1500000, stock: 60, desc: "Vữa epoxy rót bù co ngót, cường độ chịu nén và bám dính cực cao.", comp: "≥ 90 MPa", pack: "10 kg/bộ" },
    { name: "TPI HARD L", cat: "san-be-tong", tags: ["be-tong"], price: 450000, stock: 200, desc: "Hoá chất đánh bóng sàn bê tông, tạo độ bóng và bảo vệ bề mặt sàn.", water: "Pha với 2-3 phần nước", pack: "5 lít/can" },
    { name: "TPI CURING COMPOUND", cat: "phu-gia-be-tong", tags: ["phu-gia", "be-tong"], price: 550000, stock: 160, desc: "Chất bảo dưỡng bê tông, tạo màng giữ ẩm, giúp bê tông đạt cường độ tối ưu.", pack: "20 lít/thùng" },
    { name: "TPI ACRYLIC TOPCOAT", cat: "son-phu-hoa-chat", tags: ["son-phu", "acrylic"], new: true, price: 820000, stock: 220, desc: "Sơn phủ acrylic bảo vệ bề mặt tường ngoại thất, chống UV, chống thấm.", water: "Pha với 10-15% nước sạch", pack: "18 lít/thùng" },
    { name: "TPI EPOXY PRIMER", cat: "son-phu-hoa-chat", tags: ["son-phu", "epoxy"], price: 580000, stock: 140, desc: "Sơn lót epoxy 2 thành phần, tăng bám dính cho hệ thống sơn epoxy.", pack: "6 kg/bộ" },
    { name: "TPI BC-G", cat: "chat-thao-khuon", tags: ["thao-khuon", "goc-dau"], price: 1050000, stock: 90, desc: "Chất tháo khuôn chuyên dụng cho cốp pha gỗ, gốc dầu, chống dính hiệu quả.", pack: "200 lít/phuy" },
    { name: "TPI SBR LATEX", cat: "phu-gia-be-tong", tags: ["phu-gia", "chong-tham"], new: true, price: 380000, stock: 170, desc: "Phụ gia SBR Latex tăng cường bám dính, chống thấm cho vữa sửa chữa.", water: "Pha với 1 phần nước", pack: "5 lít/can" },
    { name: "TPI TILE ADHESIVE", cat: "keo-dan-gach-a", tags: ["keo-dan"], price: 160000, stock: 600, desc: "Keo dán gạch đá chất lượng cao, độ bám dính vượt trội, thi công dễ dàng.", comp: "≥ 15 MPa", water: "0.20 – 0.24 lít/kg", pack: "25 kg/bao" },
    { name: "TPI GROUT 100", cat: "vua-chuyen-dung", tags: ["vua", "be-tong"], price: 350000, stock: 250, desc: "Vữa rót cường độ siêu cao, bù co ngót tối đa, dùng cho kết cấu đặc biệt.", comp: "≥ 100 MPa", water: "0.11 – 0.13 lít/kg", pack: "25 kg/bao" },
    { name: "TPI PU31", cat: "chong-tham", tags: ["chong-tham"], new: true, price: 1200000, sale: 1100000, stock: 100, desc: "Màng chống thấm PU siêu đàn hồi, chịu được áp lực nước cao, dùng cho hồ bơi.", pack: "20 kg/thùng" },
    { name: "TPI EPOXY FLOOR", cat: "son-epoxy", tags: ["epoxy", "son-phu"], price: 1200000, stock: 80, desc: "Sơn epoxy sàn công nghiệp, chịu mài mòn, chịu hóa chất, độ bám dính cao.", pack: "12 kg/bộ" },
    { name: "TPI SELF LEVEL", cat: "vua-tu-san", tags: ["tu-san", "be-tong"], price: 280000, stock: 300, desc: "Vữa tự san phẳng sàn, thi công nhanh, bề mặt nhẵn mịn, cường độ cao.", comp: "≥ 30 MPa", water: "0.16 – 0.18 lít/kg", pack: "25 kg/bao" },
    { name: "TPI RUST CONVERTER", cat: "chat-chong-ri", tags: ["chong-ri", "hoa-chat"], price: 320000, stock: 200, desc: "Chất chuyển hoá rỉ sét thành lớp bảo vệ, dùng cho kết cấu thép trước khi sơn.", pack: "5 lít/can" },
    { name: "TPI WATERPROOF CEMENT", cat: "phu-gia-be-tong", tags: ["phu-gia", "chong-tham"], price: 250000, stock: 400, desc: "Phụ gia chống thấm trộn trực tiếp vào xi măng, tăng khả năng chống thấm toàn khối.", water: "0.5 lít/bao xi măng", pack: "5 lít/can" },
    { name: "TPI ACRYLIC EXTERIOR", cat: "son-nuoc", tags: ["son-nuoc", "acrylic"], price: 680000, sale: 620000, stock: 300, desc: "Sơn nước ngoại thất cao cấp, chống UV, chống kiềm, độ bền màu cao.", water: "Pha với 10-15% nước sạch", pack: "18 lít/thùng" },
    { name: "TPI ACRYLIC INTERIOR", cat: "son-nuoc", tags: ["son-nuoc", "acrylic"], price: 580000, stock: 350, desc: "Sơn nước nội thất cao cấp, lau chùi dễ dàng, kháng khuẩn, chống nấm mốc.", water: "Pha với 10-15% nước sạch", pack: "18 lít/thùng" },
    { name: "TPI SILICAFUME", cat: "phu-gia-be-tong-ac-biet", tags: ["phu-gia", "be-tong"], price: 450000, stock: 150, desc: "Phụ gia siêu mịn tăng cường độ bê tông, giảm tính thấm, tăng tuổi thọ.", pack: "25 kg/bao" },
    { name: "TPI HEAT REFLECTIVE", cat: "vat-lieu-chong-nhiet", tags: ["cach-nhiet", "son-phu"], new: true, price: 950000, sale: 880000, stock: 120, desc: "Sơn chống nóng phản xạ nhiệt, giảm nhiệt độ bề mặt lên đến 8-12°C.", water: "Pha với 5-10% nước sạch", pack: "18 lít/thùng" },
    { name: "TPI MORTAR REPAIR", cat: "vua-sua-chua", tags: ["sua-chua", "vua"], price: 240000, stock: 280, desc: "Vữa sửa chữa bê tông đa dụng, bám dính cao, co ngót thấp, thi công dễ.", comp: "≥ 40 MPa", water: "0.14 – 0.16 lít/kg", pack: "25 kg/bao" },
    { name: "TPI CONCRETE CLEANER", cat: "hoa-chat-tay-rua", tags: ["hoa-chat"], price: 180000, stock: 350, desc: "Hoá chất tẩy rửa bề mặt bê tông, loại bỏ dầu mỡ, xi măng thừa, sơn cũ.", water: "Pha với 2-5 phần nước", pack: "5 lít/can" },
    { name: "TPI PREMIX MORTAR", cat: "bot-tron-san", tags: ["bot-tron", "vua"], price: 120000, stock: 800, desc: "Bột trộn sẵn cho vữa xây tô, chất lượng đồng đều, tiết kiệm thời gian thi công.", comp: "≥ 7.5 MPa", water: "0.17 – 0.19 lít/kg", pack: "25 kg/bao" },
    { name: "TPI WATERSTOP", cat: "phu-kien-xay-dung", tags: ["phu-kien", "chong-tham"], price: 450000, stock: 200, desc: "Băng keo chống thấm PVC dùng cho khe co giãn, khe thi công trong bê tông.", pack: "30 m/cuộn" },
    { name: "TPI EPOXY INJECTION", cat: "sua-chua-bao-ve", tags: ["epoxy", "sua-chua"], price: 780000, stock: 90, desc: "Keo epoxy bơm vá khe nứt bê tông, độ nhớt thấp, thâm nhập sâu.", comp: "≥ 70 MPa", pack: "5 kg/bộ" },
    { name: "TPI SUPERPLASTICIZER", cat: "phu-gia-be-tong-ac-biet", tags: ["phu-gia", "be-tong"], price: 420000, stock: 180, desc: "Phụ gia giảm nước cao cấp, tăng độ sụt bê tông mà không giảm cường độ.", water: "0.5-1.5 lít/100 kg xi măng", pack: "5 lít/can" },
    { name: "TPI GROUT 40", cat: "vua-chuyen-dung", tags: ["vua", "be-tong"], price: 180000, stock: 500, desc: "Vữa rót đa dụng cường độ trung bình, dùng cho kết cấu thông thường.", comp: "≥ 40 MPa", water: "0.14 – 0.16 lít/kg", pack: "25 kg/bao" },
    { name: "TPI PU CAULK", cat: "phu-kien-xay-dung", tags: ["phu-kien", "chong-tham"], new: true, price: 85000, stock: 500, desc: "Keo trám khe PU đàn hồi, dùng cho khe co giãn, khe nối tường và sàn.", pack: "600 ml/ống" },
    { name: "TPI EPOXY TOPCOAT", cat: "son-epoxy", tags: ["epoxy", "son-phu"], price: 680000, stock: 120, desc: "Sơn phủ epoxy hoàn thiện, chịu mài mòn, chịu hóa chất, bóng đẹp.", pack: "6 kg/bộ" },
    { name: "TPI FIBER MESH", cat: "phu-kien-xay-dung", tags: ["phu-kien"], price: 150000, stock: 400, desc: "Lưới sợi thủy tinh chống nứt cho tường, tăng cường độ bền cho lớp vữa trát.", pack: "50 m/cuộn" },
    { name: "TPI WATERPROOF PAINT", cat: "chong-tham", tags: ["chong-tham", "son-phu"], price: 720000, sale: 660000, stock: 250, desc: "Sơn chống thấm tường ngoại thất, thấm sâu, chống kiềm, chống nấm mốc.", water: "Pha với 10-15% nước sạch", pack: "18 lít/thùng" },
    { name: "TPI VINYL FLOOR", cat: "keo-dan-gach-a", tags: ["keo-dan"], new: true, price: 380000, stock: 160, desc: "Keo dán sàn vinyl chuyên dụng, độ bám dính cao, không dung môi.", pack: "5 lít/can" },
    { name: "TPI GROUT EPOXY", cat: "sua-chua-bao-ve", tags: ["epoxy", "vua"], price: 1800000, stock: 50, desc: "Vữa rót epoxy cường độ siêu cao, chịu hóa chất, dùng cho môi trường khắc nghiệt.", comp: "≥ 100 MPa", pack: "10 kg/bộ" },
    { name: "TPI MOLD REMOVER", cat: "hoa-chat-tay-rua", tags: ["hoa-chat"], price: 220000, stock: 250, desc: "Hoá chất tẩy nấm mốc bề mặt tường, sàn, hiệu quả nhanh, an toàn.", water: "Pha với 1-2 phần nước", pack: "5 lít/can" },
    { name: "TPI BC-AL", cat: "chat-thao-khuon", tags: ["thao-khuon", "goc-nuoc"], price: 1300000, stock: 70, desc: "Chất tháo khuôn chuyên dụng cho cốp pha nhôm, gốc nước, không gây ăn mòn.", water: "1:2 – 1:4 với nước", pack: "200 lít/phuy" },
    { name: "TPI SBR BOND", cat: "phu-gia-vua", tags: ["phu-gia", "be-tong"], price: 360000, stock: 190, desc: "Phụ gia kết nối bê tông cũ và mới, tăng cường bám dính, chống thấm.", water: "Pha với 2-3 phần nước", pack: "5 lít/can" },
    { name: "TPI EPOXY MORTAR", cat: "sua-chua-bao-ve", tags: ["epoxy", "sua-chua"], price: 1350000, stock: 70, desc: "Vữa epoxy sửa chữa kết cấu bê tông, cường độ chịu nén và bám dính cực cao.", comp: "≥ 80 MPa", pack: "10 kg/bộ" },
    { name: "TPI CONCRETE DENSIFIER", cat: "san-be-tong", tags: ["be-tong", "hoa-chat"], price: 480000, stock: 140, desc: "Hoá chất đặc hoá bề mặt bê tông, tăng độ cứng, chống bụi, chống thấm.", water: "Pha với 1-2 phần nước", pack: "5 lít/can" },
    { name: "TPI GROUT 120", cat: "vua-chuyen-dung", tags: ["vua", "be-tong"], new: true, price: 420000, stock: 200, desc: "Vữa rót cường độ siêu cao 120MPa, bù co ngót, dùng cho kết cấu đặc biệt.", comp: "≥ 120 MPa", water: "0.10 – 0.12 lít/kg", pack: "25 kg/bao" },
    { name: "TPI EPOXY PRIMER WB", cat: "son-epoxy", tags: ["epoxy", "son-phu"], new: true, price: 520000, stock: 130, desc: "Sơn lót epoxy gốc nước, thân thiện môi trường, tăng bám dính cho hệ thống sơn.", pack: "6 kg/bộ" },
  ];

  // Danh sách ảnh thật từ thư mục public/
  const realProductImages = [
    "/Mockup-San-Pham-Chong-Tham.jpeg",
    "/Vua-tu-san.webp",
    "/Do-beton-tuoi-280x280-1.jpg",
    "/Grouting-580-280.jpg",
    "/Lab-green-700x700.webp",
    "/San-xuat-grayscale.jpg",
    "/Betong-duc-san.webp",
    "/Beton-Duc-san-cong-2-280x280-1.webp",
    "/Non-bao-ho.webp",
    "/Cua-hang-vlxd.jpg",
    "/oncrete-in-the-construction-e1736084881793.webp",
    "/Tham-quan-nha-may.jpg",
    "/Coteccons-250x250.webp",
    "/Ricons-250x250.webp",
    "/Hoa-Binh-250x250.webp",
    "/Unicons-250x250.webp",
    "/Delta-250x250.webp",
    "/Delta-V-250x250.webp",
    "/Ecoba-250x250.webp",
    "/Newtecons-250x250.webp",
    "/Phuoc-Thanh-250x250.webp",
    "/Central-250x250.webp",
    "/Tuan-Le-250x250.webp",
    "/Duy-Nguyen.webp",
    "/Duy-Nguyen-150x150.webp",
    "/Tu-Nguyen.webp",
    "/CUONG-NGUYEN-02.webp",
    "/AQS-ISO-9001.webp",
    "/AQS-VGBC.webp",
    "/VGBC-TRANS-300-X-250-150x125.webp",
    "/tpi-logo-2015-jpg.webp",
    "/TPI-logo-2025-169-nen-trang-cham-xanh-la.webp",
    "/tpi-logo-2025-jpg.webp",
    "/TPI-logo-2025-original-nen-trong-02-150x48.webp",
    "/ytb-poster.png",
  ];

  const products = await Promise.all(
    productDefs.map((p, i) => {
      const slug = slugify(p.name);
      const id = `prod-${slug}`;
      const tagIds = p.tags.map((t) => `tag-${t}`);
      const imgUrl = realProductImages[i % realProductImages.length];
      return prisma.product.create({
        data: {
          id,
          name: p.name,
          slug,
          isFeatured: p.feat ?? false,
          isNew: p.new ?? false,
          isBestSeller: p.best ?? false,
          sku: `TPI-${slug.toUpperCase().replace(/-/g, "")}-${i + 1}`,
          imageUrl: imgUrl,
          description: p.desc,
          compressiveStrength: p.comp ?? null,
          waterDilutionRatio: p.water ?? null,
          pack: p.pack ?? null,
          pdfUrl: null,
          price: p.price,
          salePrice: p.sale ?? null,
          stock: p.stock,
          seoTitle: `${p.name} | TPI`,
          seoDescription: p.desc,
          categoryId: `cat-${p.cat}`,
          tags: { connect: tagIds.map((id) => ({ id })) },
        },
      });
    }),
  );
  console.log(`    ✓ ${products.length} sản phẩm`);

  // ----------------------------------------------------------
  // 6. PRODUCT IMAGES
  // ----------------------------------------------------------
  console.log("  → Tạo ảnh sản phẩm...");
  const productImages = await Promise.all(
    products.flatMap((p, i) => {
      const img1 = realProductImages[(i * 2) % realProductImages.length];
      const img2 = realProductImages[(i * 2 + 1) % realProductImages.length];
      return [
        prisma.productImage.create({
          data: { url: img1, sortOrder: 0, alt: `${p.name} - Ảnh chính`, productId: p.id },
        }),
        prisma.productImage.create({
          data: { url: img2, sortOrder: 1, alt: `${p.name} - Ảnh phụ`, productId: p.id },
        }),
      ];
    }),
  );
  console.log(`    ✓ ${productImages.length} ảnh sản phẩm`);

  // ----------------------------------------------------------
  // 7. PROJECT CATEGORIES (20 records)
  // ----------------------------------------------------------
  console.log("  → Tạo danh mục dự án...");

  const projCatNames = [
    "Chung Cư", "Biệt Thự", "Nhà Máy", "Cầu Đường", "Bến Cảng",
    "Trường Học", "Bệnh Viện", "Trung Tâm Thương Mại", "Khách Sạn", "Sân Bay",
    "Công Trình Ngầm", "Khu Công Nghệ", "Khu Đô Thị", "Năng Lượng", "Công Trình Công",
    "Khu Công Nghiệp", "Hạ Tầng", "Cao Ốc Văn Phòng", "Nhà Ở Xã Hội", "Khu Du Lịch",
  ];

  const projCategories = await Promise.all(
    projCatNames.map((name) => {
      const slug = `du-an-${slugify(name)}`;
      return prisma.projectCategory.create({
        data: { id: `projcat-${slugify(name)}`, name, slug, sortOrder: projCatNames.indexOf(name) + 1 },
      });
    }),
  );
  console.log(`    ✓ ${projCategories.length} danh mục dự án`);

  // ----------------------------------------------------------
  // 8. PROJECTS (50 records)
  // ----------------------------------------------------------
  console.log("  → Tạo dự án...");

  const projectDefs = [
    { name: "Vinhomes Central Park", cat: "chung-cu", loc: "Bình Thạnh, TP. Hồ Chí Minh", inv: "Vingroup", con: "Coteccons", area: "100.000 m²", time: "2015-2019", year: 2019, feat: true },
    { name: "Landmark 81", cat: "cao-oc-van-phong", loc: "Bình Thạnh, TP. Hồ Chí Minh", inv: "Vingroup", con: "Coteccons", area: "141.000 m²", time: "2015-2018", year: 2018, feat: true },
    { name: "The Manor", cat: "chung-cu", loc: "Quận 2, TP. Hồ Chí Minh", inv: "Bitexco", con: "Unicons", area: "50.000 m²", time: "2016-2019", year: 2019, feat: true },
    { name: "Khu Đô Thị Phú Mỹ Hưng", cat: "khu-o-thi", loc: "Quận 7, TP. Hồ Chí Minh", inv: "Phú Mỹ Hưng", con: "Coteccons", area: "400.000 m²", time: "2015-2023", year: 2023, feat: true },
    { name: "Cầu Nhật Tân", cat: "cau-uong", loc: "Hà Nội", inv: "Bộ GTVT", con: "Nhà thầu Nhật Bản", area: "N/A", time: "2009-2015", year: 2015, feat: true },
    { name: "Sân Bay Quốc Tế Nội Bài", cat: "san-bay", loc: "Hà Nội", inv: "ACV", con: "Coteccons", area: "200.000 m²", time: "2018-2023", year: 2023, feat: true },
    { name: "Nhà Máy Thủy Điện Sơn La", cat: "nang-luong", loc: "Sơn La", inv: "EVN", con: "Lilama", area: "500.000 m²", time: "2005-2012", year: 2012, feat: true },
    { name: "Bệnh Viện Nhi Đồng 2", cat: "benh-vien", loc: "TP. Hồ Chí Minh", inv: "UBND TP HCM", con: "Unicons", area: "80.000 m²", time: "2019-2023", year: 2023, feat: true },
    { name: "Trường Đại Học FPT", cat: "truong-hoc", loc: "Hòa Lạc, Hà Nội", inv: "Tập đoàn FPT", con: "Ricons", area: "100.000 m²", time: "2020-2024", year: 2024, feat: true },
    { name: "Khách Sạn InterContinental", cat: "khach-san", loc: "Đà Nẵng", inv: "Sun Group", con: "Hoa Binh", area: "40.000 m²", time: "2021-2024", year: 2024, feat: true },
    { name: "Metro Số 1 Bến Thành - Suối Tiên", cat: "cong-trinh-ngam", loc: "TP. Hồ Chí Minh", inv: "MAUR", con: "Nhà thầu Nhật Bản", area: "N/A", time: "2014-2024", year: 2024, feat: true },
    { name: "Khu Công Nghệ Cao Quận 9", cat: "khu-cong-nghe", loc: "Quận 9, TP. Hồ Chí Minh", inv: "Ban Quản lý KCNC", con: "Ricons", area: "300.000 m²", time: "2020-2025", year: 2025, feat: true },
    { name: "Trung Tâm Thương Mại Saigon Centre", cat: "trung-tam-thuong-mai", loc: "Quận 1, TP. Hồ Chí Minh", inv: "Keppel Land", con: "Coteccons", area: "100.000 m²", time: "2019-2022", year: 2022, feat: true },
    { name: "KCN VSIP Bình Dương", cat: "khu-cong-nghiep", loc: "Bình Dương", inv: "VSIP", con: "Ricons", area: "500.000 m²", time: "2018-2024", year: 2024, feat: true },
    { name: "Cầu Vĩnh Tuy", cat: "cau-uong", loc: "Hà Nội", inv: "UBND TP Hà Nội", con: "Cienco 1", area: "N/A", time: "2016-2020", year: 2020 },
    { name: "Bến Cảng Quy Nhơn", cat: "ben-cang", loc: "Quy Nhơn", inv: "Cảng Quy Nhơn", con: "Cienco 4", area: "80.000 m²", time: "2019-2022", year: 2022 },
    { name: "Biệt Thự Sơn Trà", cat: "biet-thu", loc: "Đà Nẵng", inv: "Sun Group", con: "Hoa Binh", area: "25.000 m²", time: "2022-2025", year: 2025 },
    { name: "Nhà Máy Ô Tô Thaco", cat: "nha-may", loc: "Quảng Nam", inv: "Thaco", con: "Lilama", area: "200.000 m²", time: "2019-2022", year: 2022 },
    { name: "Ecopark Hưng Yên", cat: "khu-o-thi", loc: "Hưng Yên", inv: "Ecopark", con: "Unicons", area: "500.000 m²", time: "2015-2025", year: 2025 },
    { name: "Trang Trại Điện Gió Bạc Liêu", cat: "nang-luong", loc: "Bạc Liêu", inv: "Tập đoàn Năng lượng Xanh", con: "Lilama", area: "1000.000 m²", time: "2021-2024", year: 2024 },
    { name: "Bệnh Viện Đa Khoa Đà Nẵng", cat: "benh-vien", loc: "Đà Nẵng", inv: "Bộ Y tế", con: "Unicons", area: "50.000 m²", time: "2020-2023", year: 2023 },
    { name: "Trường Quốc Tế TP.HCM", cat: "truong-hoc", loc: "TP. Hồ Chí Minh", inv: "Tập đoàn Giáo dục Quốc tế", con: "Ricons", area: "20.000 m²", time: "2021-2023", year: 2023 },
    { name: "Khách Sạn 5 Sao Nha Trang", cat: "khach-san", loc: "Nha Trang", inv: "Tập đoàn Khách sạn Châu Á", con: "Hoa Binh", area: "40.000 m²", time: "2021-2024", year: 2024 },
    { name: "Hầm Thủ Thiêm", cat: "cong-trinh-ngam", loc: "TP. Hồ Chí Minh", inv: "UBND TP HCM", con: "Nhà thầu Nhật Bản", area: "N/A", time: "2018-2022", year: 2022 },
    { name: "Khu Công Nghệ Phần Mềm Đà Nẵng", cat: "khu-cong-nghe", loc: "Đà Nẵng", inv: "UBND TP Đà Nẵng", con: "Ricons", area: "30.000 m²", time: "2020-2023", year: 2023 },
    { name: "TTTM Sài Gòn", cat: "trung-tam-thuong-mai", loc: "Quận 1, TP. Hồ Chí Minh", inv: "Vingroup", con: "Coteccons", area: "100.000 m²", time: "2019-2022", year: 2022 },
    { name: "Khu Công Nghiệp Đồng Nai", cat: "khu-cong-nghiep", loc: "Đồng Nai", inv: "Sonadezi", con: "Ricons", area: "300.000 m²", time: "2020-2024", year: 2024 },
    { name: "Chung Cư The Vista", cat: "chung-cu", loc: "Quận 2, TP. Hồ Chí Minh", inv: "Capitaland", con: "Unicons", area: "60.000 m²", time: "2018-2021", year: 2021 },
    { name: "Biệt Thự An Bàng Hội An", cat: "biet-thu", loc: "Hội An", inv: "Công ty CP Du lịch Hội An", con: "Ricons", area: "15.000 m²", time: "2022-2024", year: 2024 },
    { name: "Nhà Máy Thép", cat: "nha-may", loc: "Bà Rịa - Vũng Tàu", inv: "Tập đoàn Thép Việt", con: "Lilama", area: "150.000 m²", time: "2018-2021", year: 2021 },
    { name: "Cầu Long Biên", cat: "cau-uong", loc: "Hà Nội", inv: "UBND TP Hà Nội", con: "Cienco 4", area: "N/A", time: "2022-2025", year: 2025 },
    { name: "Cảng Quốc Tế Lạch Huyện", cat: "ben-cang", loc: "Hải Phòng", inv: "Cảng Hải Phòng", con: "Cienco 1", area: "120.000 m²", time: "2018-2023", year: 2023 },
    { name: "Biệt Thự Đại Đô", cat: "biet-thu", loc: "Hà Nội", inv: "Mitsubishi Corporation", con: "Unicons", area: "40.000 m²", time: "2021-2024", year: 2024 },
    { name: "Nhà Máy Xi Măng Vicem", cat: "nha-may", loc: "Hà Tiên", inv: "Vicem", con: "Lilama", area: "100.000 m²", time: "2017-2020", year: 2020 },
    { name: "Cầu Tân Vũ - Lạch Huyện", cat: "cau-uong", loc: "Hải Phòng", inv: "Bộ GTVT", con: "Cienco 1", area: "N/A", time: "2014-2018", year: 2018 },
    { name: "Trang Trại Điện Mặt Trời Ninh Thuận", cat: "nang-luong", loc: "Ninh Thuận", inv: "Tập đoàn Năng lượng Tái tạo", con: "Lilama", area: "800.000 m²", time: "2020-2023", year: 2023 },
    { name: "Chung Cư Golden Palace", cat: "chung-cu", loc: "Bình Thạnh, TP. Hồ Chí Minh", inv: "Công ty CP Đầu tư Vàng", con: "Coteccons", area: "35.000 m²", time: "2020-2023", year: 2023 },
    { name: "Resort 6 Sao Phú Quốc", cat: "khach-san", loc: "Phú Quốc", inv: "Tập đoàn Khách sạn Thế giới", con: "Ricons", area: "80.000 m²", time: "2021-2025", year: 2025 },
    { name: "Trung Tâm Hội Nghị Quốc Gia", cat: "cong-trinh-cong", loc: "Hà Nội", inv: "UBND TP Hà Nội", con: "Hoa Binh", area: "30.000 m²", time: "2020-2023", year: 2023 },
    { name: "Chung Cư Opal Riverside", cat: "chung-cu", loc: "Bình Dương", inv: "Công ty CP Đầu tư Opal", con: "Coteccons", area: "20.000 m²", time: "2021-2023", year: 2023 },
    { name: "Biệt Thự Biển Phan Thiết", cat: "biet-thu", loc: "Phan Thiết", inv: "Novaland", con: "Ricons", area: "30.000 m²", time: "2021-2024", year: 2024 },
    { name: "Nhà Máy Nhựa Đồng Nai", cat: "nha-may", loc: "Đồng Nai", inv: "Tập đoàn Nhựa Việt", con: "Lilama", area: "50.000 m²", time: "2020-2022", year: 2022 },
    { name: "Trung Tâm Văn Hóa Hà Nội", cat: "cong-trinh-cong", loc: "Hà Nội", inv: "UBND TP Hà Nội", con: "Hoa Binh", area: "20.000 m²", time: "2021-2024", year: 2024 },
    { name: "Khu Đô Thị Vinhomes Grand Park", cat: "khu-o-thi", loc: "Quận 9, TP. Hồ Chí Minh", inv: "Vingroup", con: "Coteccons", area: "360.000 m²", time: "2019-2024", year: 2024 },
    { name: "Chung Cư Sala", cat: "chung-cu", loc: "Quận 2, TP. Hồ Chí Minh", inv: "Đại Quang Minh", con: "Hoa Binh", area: "40.000 m²", time: "2020-2023", year: 2023 },
    { name: "Biệt Thự Sinh Thái Đà Lạt", cat: "biet-thu", loc: "Đà Lạt", inv: "Công ty CP Địa ốc Xanh", con: "Hoa Binh", area: "60.000 m²", time: "2020-2023", year: 2023 },
    { name: "Nhà Máy Sản Xuất Ô Tô Hyundai", cat: "nha-may", loc: "Ninh Bình", inv: "Hyundai Thành Công", con: "Lilama", area: "180.000 m²", time: "2021-2024", year: 2024 },
    { name: "Cầu Phú Mỹ", cat: "cau-uong", loc: "TP. Hồ Chí Minh", inv: "UBND TP HCM", con: "Cienco 6", area: "N/A", time: "2006-2009", year: 2009 },
    { name: "Khu Du Lịch Bà Nà Hills", cat: "khu-du-lich", loc: "Đà Nẵng", inv: "Sun Group", con: "Hoa Binh", area: "200.000 m²", time: "2013-2020", year: 2020 },
    { name: "Nhà Ở Xã Hội Thuận An", cat: "nha-o-xa-hoi", loc: "Bình Dương", inv: "UBND Bình Dương", con: "Unicons", area: "100.000 m²", time: "2020-2023", year: 2023 },
    { name: "Cao Ốc Văn Phòng Bitexco", cat: "cao-oc-van-phong", loc: "Quận 1, TP. Hồ Chí Minh", inv: "Bitexco", con: "Coteccons", area: "30.000 m²", time: "2007-2010", year: 2010 },
  ];

  // Danh sách ảnh dự án thật từ thư mục public/
  const realProjectImages = [
    "/Cong-Truong-tong-hop-1398x606-BW.webp",
    "/Building-Cao-tang.webp",
    "/Slider-3.webp",
    "/Slider-8.webp",
    "/alternative-energy-slide-2.webp",
    "/TPI-AT-Sky-Garden-phoi-canh-4-500x500.webp",
    "/TPI-Elysian-Q9-phoi-canh-500x500.webp",
    "/TPI-Lumi-Hanoi-phoi-canh-1-500x500.webp",
    "/TPI-Picity-Sky-Park-phoi-canh-1-500x500.webp",
    "/TPI-Thuan-An-1-phoi-canh-500x500.webp",
    "/TPI-Victoria-Village-Novaland-phoi-canh-500x500.webp",
    "/Sycamore-–-Orchard-Heights-5-500x500.webp",
    "/oncrete-in-the-construction-e1736084881793.webp",
    "/San-xuat-grayscale.jpg",
    "/Tham-quan-nha-may.jpg",
    "/Cua-hang-vlxd.jpg",
    "/Do-beton-tuoi-280x280-1.jpg",
    "/Grouting-580-280.jpg",
    "/Lab-green-700x700.webp",
    "/Betong-duc-san.webp",
    "/Beton-Duc-san-cong-2-280x280-1.webp",
    "/Non-bao-ho.webp",
    "/Vua-tu-san.webp",
    "/Mockup-San-Pham-Chong-Tham.jpeg",
    "/ytb-poster.png",
  ];

  const projects = await Promise.all(
    projectDefs.map((p, i) => {
      const slug = slugify(p.name);
      const thumbUrl = realProjectImages[i % realProjectImages.length];
      return prisma.project.create({
        data: {
          id: `proj-${slug}`,
          name: p.name,
          slug,
          excerpt: p.name,
          description: "Dự án " + p.name + ". TPI cung cấp giải pháp chống thấm và vữa chuyên dụng.",
          thumbnailUrl: thumbUrl,
          location: p.loc,
          investor: p.inv,
          contractor: p.con,
          area: p.area,
          constructionTime: p.time,
          completedYear: p.year,
          isPublished: true,
          isFeatured: p.feat ?? false,
          sortOrder: projectDefs.indexOf(p) + 1,
          categoryId: "projcat-" + p.cat,
        },
      });
    }),
  );
  console.log("    ✓ " + projects.length + " dự án");

  // ----------------------------------------------------------
  // 9. PROJECT IMAGES
  // ----------------------------------------------------------
  console.log("  → Tạo ảnh dự án...");
  const projectImages = await Promise.all(
    projects.flatMap((p, i) => {
      const img1 = realProjectImages[(i * 2) % realProjectImages.length];
      const img2 = realProjectImages[(i * 2 + 1) % realProjectImages.length];
      return [
        prisma.projectImage.create({
          data: { url: img1, sortOrder: 0, alt: p.name + " - Ảnh chính", projectId: p.id },
        }),
        prisma.projectImage.create({
          data: { url: img2, sortOrder: 1, alt: p.name + " - Ảnh phụ", projectId: p.id },
        }),
      ];
    }),
  );
  console.log("    ✓ " + projectImages.length + " ảnh dự án");

  // ----------------------------------------------------------
  // 10. PROJECT-PRODUCT ASSOCIATIONS (Many-to-Many)
  // ----------------------------------------------------------
  console.log("  → Tạo liên kết dự án - sản phẩm...");

  // Mapping: project category slug → list of product category slugs
  const projectCatToProductCats: Record<string, string[]> = {
    "chung-cu": ["chong-tham", "keo-dan-gach-a", "son-nuoc", "vua-chuyen-dung"],
    "biet-thu": ["chong-tham", "son-nuoc", "keo-dan-gach-a", "son-phu-hoa-chat"],
    "nha-may": ["son-epoxy", "vua-chuyen-dung", "chat-chong-ri", "san-be-tong", "phu-gia-be-tong"],
    "cau-uong": ["vua-chuyen-dung", "phu-gia-be-tong", "san-be-tong"],
    "ben-cang": ["vua-chuyen-dung", "chat-chong-ri", "phu-gia-be-tong"],
    "truong-hoc": ["son-nuoc", "chong-tham", "keo-dan-gach-a", "vua-chuyen-dung"],
    "benh-vien": ["son-nuoc", "chong-tham", "keo-dan-gach-a", "son-epoxy"],
    "trung-tam-thuong-mai": ["son-nuoc", "chong-tham", "keo-dan-gach-a", "son-epoxy"],
    "khach-san": ["chong-tham", "son-nuoc", "keo-dan-gach-a", "son-epoxy", "vua-chuyen-dung"],
    "san-bay": ["vua-chuyen-dung", "chong-tham", "son-epoxy", "san-be-tong"],
    "cong-trinh-ngam": ["chong-tham", "vua-chuyen-dung", "phu-gia-be-tong"],
    "khu-cong-nghe": ["son-epoxy", "chong-tham", "vua-chuyen-dung"],
    "khu-o-thi": ["chong-tham", "son-nuoc", "keo-dan-gach-a", "vua-chuyen-dung", "phu-gia-be-tong"],
    "nang-luong": ["vua-chuyen-dung", "chat-chong-ri", "son-epoxy", "phu-gia-be-tong"],
    "cong-trinh-cong": ["chong-tham", "vua-chuyen-dung", "son-nuoc"],
    "khu-cong-nghiep": ["son-epoxy", "vua-chuyen-dung", "chat-chong-ri", "san-be-tong"],
    "ha-tang": ["vua-chuyen-dung", "phu-gia-be-tong", "san-be-tong", "chong-tham"],
    "cao-oc-van-phong": ["chong-tham", "son-nuoc", "vua-chuyen-dung", "keo-dan-gach-a"],
    "nha-o-xa-hoi": ["son-nuoc", "chong-tham", "vua-chuyen-dung", "keo-dan-gach-a"],
    "khu-du-lich": ["chong-tham", "son-nuoc", "keo-dan-gach-a", "son-phu-hoa-chat"],
  };

  // Build product lookup: product category slug → product IDs
  const productsByCatSlug: Record<string, string[]> = {};
  for (const p of products) {
    const catSlug = p.categoryId.replace("cat-", "");
    if (!productsByCatSlug[catSlug]) productsByCatSlug[catSlug] = [];
    productsByCatSlug[catSlug].push(p.id);
  }

  const projectProductData: { projectId: string; productId: string }[] = [];
  for (const proj of projects) {
    const catSlug = proj.categoryId.replace("projcat-", "");
    const relevantProductCats = projectCatToProductCats[catSlug] ?? [];

    // Collect all product IDs from relevant categories
    const relevantProductIds = relevantProductCats.flatMap(
      (pCat) => productsByCatSlug[pCat] ?? [],
    );

    // Take 3-6 random products per project (deterministic using index)
    const projIndex = projects.indexOf(proj);
    const count = Math.min(relevantProductIds.length, 3 + (projIndex % 4));
    const shuffled = [...relevantProductIds].sort(() => ((projIndex * 7 + 13) % 17 - 8) / 17);
    const selected = shuffled.slice(0, count);

    for (const productId of selected) {
      projectProductData.push({ projectId: proj.id, productId });
    }
  }

  // Remove duplicates (same project + same product)
  const uniquePairs = new Set<string>();
  const uniqueProjectProductData = projectProductData.filter((item) => {
    const key = `${item.projectId}:${item.productId}`;
    if (uniquePairs.has(key)) return false;
    uniquePairs.add(key);
    return true;
  });

  await prisma.projectProduct.createMany({ data: uniqueProjectProductData });
  console.log(`    ✓ ${uniqueProjectProductData.length} liên kết dự án - sản phẩm`);

  // ----------------------------------------------------------
  // 11. FEEDBACK (20 records)
  // ----------------------------------------------------------
  console.log("  → Tạo feedback...");

  const feedbackData = [
    { name: "Nguyễn Văn An", company: "Coteccons", position: "Giám đốc Kỹ thuật", rating: 5, content: "Sản phẩm chống thấm TPI PU21 rất tốt, thi công dễ dàng, hiệu quả cao." },
    { name: "Trần Thị Bình", company: "Ricons", position: "Kỹ sư xây dựng", rating: 5, content: "Vữa rót TPI GROUT 60 đáp ứng tốt yêu cầu kỹ thuật khắt khe." },
    { name: "Lê Văn Cường", company: "Hoa Binh", position: "Trưởng phòng Vật tư", rating: 4, content: "Chất tháo khuôn TPI BC-W giúp tiết kiệm thời gian thi công." },
    { name: "Phạm Thị Dung", company: "Unicons", position: "Kỹ sư chất lượng", rating: 5, content: "Sơn epoxy TPI EPOXY FLOOR cho sàn công nghiệp rất bền đẹp." },
    { name: "Hoàng Văn Em", company: "Lilama", position: "Giám sát thi công", rating: 4, content: "Vữa sửa chữa TPI MORTAR REPAIR bám dính tốt, co ngót thấp." },
    { name: "Mai Thị Phương", company: "Vingroup", position: "Quản lý dự án", rating: 5, content: "TPI cung cấp giải pháp chống thấm toàn diện cho dự án của chúng tôi." },
    { name: "Đặng Văn Giàu", company: "Sun Group", position: "Giám đốc Đầu tư", rating: 5, content: "Đội ngũ kỹ thuật TPI hỗ trợ rất nhiệt tình, sản phẩm chất lượng." },
    { name: "Vũ Thị Hạnh", company: "Novaland", position: "Kỹ sư vật liệu", rating: 4, content: "Keo dán gạch TPI TILE ADHESIVE có độ bám dính vượt trội." },
    { name: "Ngô Văn Huy", company: "Capitaland", position: "Giám đốc Kỹ thuật", rating: 5, content: "Sơn chống thấm TPI A100 rất hiệu quả cho tường ngoại thất." },
    { name: "Lý Thị Kiều", company: "Ecopark", position: "Trưởng ban QLDA", rating: 4, content: "Phụ gia bê tông TPI giúp nâng cao chất lượng công trình." },
    { name: "Trương Văn Lâm", company: "Thaco", position: "Kỹ sư trưởng", rating: 5, content: "Vữa rót TPI GROUT 80 đáp ứng yêu cầu kỹ thuật cho máy móc." },
    { name: "Bùi Thị Mai", company: "Bitexco", position: "Quản lý chất lượng", rating: 4, content: "Sơn nước TPI ACRYLIC INTERIOR cho màu sắc đẹp, bền màu." },
    { name: "Đỗ Văn Nhân", company: "Keppel Land", position: "Giám đốc dự án", rating: 5, content: "TPI là đối tác tin cậy trong các dự án của chúng tôi." },
    { name: "Hồ Thị Oanh", company: "Phú Mỹ Hưng", position: "Kỹ sư giám sát", rating: 5, content: "Màng chống thấm TPI PU25 rất đàn hồi, chịu thời tiết tốt." },
    { name: "Dương Văn Phúc", company: "MAUR", position: "Trưởng bộ phận kỹ thuật", rating: 4, content: "Giải pháp chống thấm cho metro của TPI rất chuyên nghiệp." },
    { name: "Tạ Thị Quyên", company: "ACV", position: "Giám đốc Kỹ thuật", rating: 5, content: "Sản phẩm TPI đạt tiêu chuẩn quốc tế, giá cả hợp lý." },
    { name: "Phan Văn Sang", company: "VSIP", position: "Quản lý dự án", rating: 4, content: "Dịch vụ hỗ trợ kỹ thuật của TPI rất tốt." },
    { name: "Lưu Thị Thắm", company: "Sonadezi", position: "Kỹ sư vật liệu", rating: 5, content: "Vữa tự san TPI SELF LEVEL thi công nhanh, bề mặt đẹp." },
    { name: "Nguyễn Văn Tùng", company: "Cienco 1", position: "Giám sát chất lượng", rating: 4, content: "Chất bảo dưỡng TPI CURING COMPOUND giúp bê tông đạt cường độ tốt." },
    { name: "Trần Quốc Vũ", company: "Hòa Bình", position: "Giám đốc Kỹ thuật", rating: 5, content: "Đã hợp tác với TPI nhiều năm, chất lượng sản phẩm luôn ổn định." },
  ];

  const feedbacks = await Promise.all(
    feedbackData.map((f, i) =>
      prisma.feedback.create({
        data: {
          id: `fb-${String(i + 1).padStart(2, "0")}`,
          name: f.name,
          email: `feedback${i + 1}@example.com`,
          phone: `090${String(1000000 + i).slice(0, 7)}`,
          company: f.company,
          message: f.content,
        },
      }),
    ),
  );
  console.log("    ✓ " + feedbacks.length + " feedback");

  // ----------------------------------------------------------
  // 12. SOLUTION CATEGORIES (20 records)
  // ----------------------------------------------------------
  console.log("  → Tạo danh mục giải pháp...");

  const solCatNames = [
    "Chống Thấm", "Sửa Chữa Bê Tông", "Bảo Vệ Kết Cấu",
    "Sàn Công Nghiệp", "Vữa Rót Chịu Lực", "Keo Dán Chuyên Dụng",
    "Bảo Dưỡng Bê Tông", "Chống Rỉ Sét", "Chống Nóng",
    "Trang Trí Nội Thất", "Trang Trí Ngoại Thất", "Chống Thấm Hồ Bơi",
    "Chống Thấm Mái", "Chống Thấm Tường", "Chống Thấm Sàn",
    "Sàn Epoxy", "Sơn Nước Cao Cấp", "Vữa Tự San",
    "Phụ Gia Bê Tông", "Giải Pháp Tổng Thể",
  ];

  const solCategories = await Promise.all(
    solCatNames.map((name) => {
      const slug = slugify(name);
      return prisma.solutionCategory.create({
        data: { id: `solcat-${slug}`, name, slug, sortOrder: solCatNames.indexOf(name) + 1 },
      });
    }),
  );
  console.log("    ✓ " + solCategories.length + " danh mục giải pháp");

  // ----------------------------------------------------------
  // 13. SOLUTIONS (20 records)
  // ----------------------------------------------------------
  console.log("  → Tạo giải pháp...");

  const solutionDefs = [
    { name: "Giải Pháp Chống Thấm Toàn Diện", cat: "chong-tham", desc: "Giải pháp chống thấm cho mọi hạng mục công trình từ mái, tường, sàn đến hồ bơi." },
    { name: "Giải Pháp Sửa Chữa Bê Tông", cat: "sua-chua-be-tong", desc: "Sửa chữa bê tông hư hỏng, trám khe nứt, phục hồi kết cấu." },
    { name: "Giải Pháp Bảo Vệ Kết Cấu Thép", cat: "bao-ve-ket-cau", desc: "Bảo vệ kết cấu thép khỏi ăn mòn, rỉ sét và tác động môi trường." },
    { name: "Giải Pháp Sàn Công Nghiệp", cat: "san-cong-nghiep", desc: "Sàn bê tông chịu lực, chống bụi, chống thấm cho nhà máy, kho xưởng." },
    { name: "Giải Pháp Vữa Rót Chịu Lực", cat: "vua-rot-chiu-luc", desc: "Vữa rót bù co ngót cường độ cao cho chân máy, kết cấu thép." },
    { name: "Giải Pháp Keo Dán Chuyên Dụng", cat: "keo-dan-chuyen-dung", desc: "Keo dán gạch đá, keo dán sàn vinyl, keo dán chuyên dụng." },
    { name: "Giải Pháp Bảo Dưỡng Bê Tông", cat: "bao-duong-be-tong", desc: "Bảo dưỡng bê tông tươi, giúp bê tông đạt cường độ tối ưu." },
    { name: "Giải Pháp Chống Rỉ Sét", cat: "chong-ri-set", desc: "Chống rỉ cho kết cấu thép, cốt thép và các chi tiết kim loại." },
    { name: "Giải Pháp Chống Nóng", cat: "chong-nong", desc: "Sơn chống nóng phản xạ nhiệt, giảm nhiệt độ bề mặt." },
    { name: "Giải Pháp Trang Trí Nội Thất", cat: "trang-tri-noi-that", desc: "Sơn nước nội thất cao cấp, màu sắc đa dạng, bền đẹp." },
    { name: "Giải Pháp Trang Trí Ngoại Thất", cat: "trang-tri-ngoai-that", desc: "Sơn nước ngoại thất chống UV, chống kiềm, độ bền màu cao." },
    { name: "Giải Pháp Chống Thấm Hồ Bơi", cat: "chong-tham-ho-boi", desc: "Chống thấm hồ bơi với màng PU siêu đàn hồi, chịu áp lực nước." },
    { name: "Giải Pháp Chống Thấm Mái", cat: "chong-tham-mai", desc: "Chống thấm mái bê tông, mái tôn với giải pháp phù hợp." },
    { name: "Giải Pháp Chống Thấm Tường", cat: "chong-tham-tuong", desc: "Chống thấm tường ngoại thất, chống kiềm, chống nấm mốc." },
    { name: "Giải Pháp Chống Thấm Sàn", cat: "chong-tham-san", desc: "Chống thấm sàn vệ sinh, sàn ban công, sàn tầng hầm." },
    { name: "Giải Pháp Sàn Epoxy", cat: "san-epoxy", desc: "Sơn epoxy sàn công nghiệp, chịu mài mòn, chịu hóa chất." },
    { name: "Giải Pháp Sơn Nước Cao Cấp", cat: "son-nuoc-cao-cap", desc: "Sơn nước nội thất và ngoại thất cao cấp, bền màu, an toàn." },
    { name: "Giải Pháp Vữa Tự San", cat: "vua-tu-san", desc: "Vữa tự san phẳng sàn, thi công nhanh, bề mặt nhẵn mịn." },
    { name: "Giải Pháp Phụ Gia Bê Tông", cat: "phu-gia-be-tong", desc: "Phụ gia bê tông tăng cường độ, chống thấm, kéo dài thời gian đông kết." },
    { name: "Giải Pháp Tổng Thể Cho Công Trình", cat: "giai-phap-tong-the", desc: "Giải pháp tổng thể từ chống thấm, sửa chữa đến bảo vệ và trang trí." },
  ];

  const solutions = await Promise.all(
    solutionDefs.map((s, i) => {
      const slug = slugify(s.name);
      return prisma.solution.create({
        data: {
          id: `sol-${slug}`,
          name: s.name,
          slug,
          description: s.desc,
          isPublished: true,
          sortOrder: i + 1,
          categoryId: "solcat-" + s.cat,
        },
      });
    }),
  );
  console.log("    ✓ " + solutions.length + " giải pháp");

  // ----------------------------------------------------------
  // KẾT THÚC
  // ----------------------------------------------------------
  console.log("✅ Seed hoàn tất!");
  console.log("");
  console.log("📊 Tổng kết:");
  console.log("  👤 User: 1");
  console.log("  📁 Danh mục sản phẩm: " + categories.length);
  console.log("  🏷️  Tags: " + tags.length);
  console.log("  📦 Sản phẩm: " + products.length);
  console.log("  🖼️  Ảnh sản phẩm: " + productImages.length);
  console.log("  📁 Danh mục dự án: " + projCategories.length);
  console.log("  🏗️  Dự án: " + projects.length);
  console.log("  🖼️  Ảnh dự án: " + projectImages.length);
  console.log("  🔗 Liên kết dự án - sản phẩm: " + uniqueProjectProductData.length);
  console.log("  💬 Feedback: " + feedbacks.length);
  console.log("  📁 Danh mục giải pháp: " + solCategories.length);
  console.log("  💡 Giải pháp: " + solutions.length);
}

main()
  .catch((e) => {
    console.error("❌ Seed thất bại:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
