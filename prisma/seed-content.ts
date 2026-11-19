// ============================================================
// DỮ LIỆU ẢO: nội dung giải pháp + blog. Được prisma/seed.ts import.
// Định dạng content: xem components/common/RichText.tsx
// ============================================================

// ------------------------------------------------------------
// GIẢI PHÁP: nội dung chi tiết + tên sản phẩm đề xuất (phải khớp
// đúng `name` trong productDefs của seed.ts, seed sẽ báo lỗi nếu sai).
// ------------------------------------------------------------
export const solutionDetails: Record<string, { content: string; products: string[] }> = {
  "nha-xuong": {
    content: `Sàn và kết cấu nhà xưởng phải chịu tải trọng lớn, xe nâng di chuyển liên tục, hoá chất và dầu mỡ rơi vãi. TPI cung cấp hệ giải pháp đồng bộ từ khâu đổ bê tông nền đến hoàn thiện bề mặt.

## Hạng mục chính

- **Sàn bê tông:** bột xoa nền tăng cứng, chất tăng cứng thẩm thấu, bảo dưỡng bê tông.
- **Chân đế máy, bu lông neo:** vữa rót bù co ngót cường độ cao.
- **Sàn sạch, sàn chịu hoá chất:** sơn lót và sơn phủ epoxy, vữa tự san phẳng.
- **Khe co giãn:** keo trám khe gốc PU đàn hồi.

## Lợi ích

- Tăng độ cứng bề mặt sàn gấp 2 – 3 lần, giảm bụi và mài mòn.
- Rút ngắn thời gian đưa sàn vào sử dụng.
- Một đầu mối cung cấp vật tư và hỗ trợ kỹ thuật tại công trường.`,
    products: [
      "TPI HARD P", "TPI CONCRETE DENSIFIER", "TPI GROUT 60", "TPI SELF LEVEL",
      "TPI EPOXY PRIMER", "TPI EPOXY FLOOR", "TPI PU CAULK", "TPI CURING COMPOUND",
    ],
  },
  "cao-tang": {
    content: `Nhà cao tầng thi công theo chu kỳ sàn nhanh, đòi hỏi vật tư ổn định và có sẵn số lượng lớn. TPI đồng hành cùng nhà thầu **từ móng đến mái**.

## Hạng mục chính

- **Cốp pha nhôm, gangform:** chất tháo khuôn giúp bề mặt bê tông phẳng, giảm công vệ sinh cốp pha.
- **Chống thấm:** tầng hầm, sàn vệ sinh, ban công, sân thượng, bể nước.
- **Hoàn thiện:** vữa tô nhẵn mịn (skimcoat) thay thế bả matit.
- **Xử lý kết cấu:** bơm epoxy vết nứt, vữa sửa chữa rỗ tổ ong.

## Vì sao chọn TPI

- Sản phẩm đã sử dụng tại nhiều dự án cao tầng của các tổng thầu lớn.
- Kỹ sư TPI hướng dẫn thi công mẫu trước khi triển khai đại trà.
- Giao hàng theo tiến độ, chia nhiều đợt.`,
    products: [
      "TPI BC-W", "TPI BC-AL", "TPI PU21", "TPI A100",
      "TPI SKIMCOAT", "TPI LATEX P100", "TPI EPOXY INJECTION", "TPI MORTAR REPAIR",
    ],
  },
  "be-tong-tuoi": {
    content: `Trạm trộn bê tông tươi cần phụ gia giúp kiểm soát độ sụt, kéo dài thời gian vận chuyển và đạt mác thiết kế với lượng xi măng tối ưu.

## Giải pháp phụ gia

- **Phụ gia giảm nước cao cấp:** giảm 20 – 30% nước, tăng cường độ sớm.
- **Silica fume:** bê tông cường độ cao, chống thấm, chống ăn mòn.
- **Phụ gia chống thấm:** cho bê tông tầng hầm, bể chứa.
- **Sợi gia cường:** hạn chế nứt co ngót dẻo.

TPI hỗ trợ thiết kế cấp phối và thí nghiệm mẫu tại phòng lab trước khi cung cấp cho trạm.`,
    products: [
      "TPI SUPERPLASTICIZER", "TPI SILICAFUME", "TPI WATERPROOF CEMENT", "TPI FIBER MESH", "TPI CURING COMPOUND",
    ],
  },
  "be-tong-duc-san": {
    content: `Nhà máy cấu kiện đúc sẵn (cọc PHC, cống, dầm, tấm tường) cần chất tháo khuôn phù hợp từng loại khuôn và phương pháp sản xuất.

## Hạng mục chính

- **Tháo khuôn thép, ly tâm, ép khô:** gốc dầu và gốc nước, dạng lăn hoặc phun.
- **Bảo dưỡng:** hợp chất tạo màng giữ ẩm cho cấu kiện sau khi tháo khuôn.
- **Vệ sinh khuôn và cốt thép:** tẩy cặn bê tông, chuyển hoá rỉ sét.

> Dùng đúng chất tháo khuôn giúp tăng số vòng quay khuôn và giảm tỷ lệ cấu kiện lỗi bề mặt.`,
    products: [
      "TPI BC-N", "TPI BC-G", "TPI MOLD REMOVER", "TPI RUST CONVERTER", "TPI CURING COMPOUND", "TPI SUPERPLASTICIZER",
    ],
  },
  "cua-hang-vlxd": {
    content: `TPI phát triển hệ sản phẩm đóng gói nhỏ, dễ bán, dễ thi công dành cho **đại lý và cửa hàng vật liệu xây dựng**.

## Chính sách cho đại lý

- Chiết khấu theo sản lượng, hỗ trợ công nợ.
- Cung cấp kệ trưng bày, catalogue, banner.
- Đào tạo nhân viên bán hàng về tính năng và cách tư vấn sản phẩm.

## Nhóm sản phẩm bán chạy

- Latex chống thấm, chống thấm 2 thành phần.
- Keo dán gạch, vữa tô, vữa grout.
- Sơn chống thấm, sơn ngoại thất.`,
    products: [
      "TPI LATEX P100", "TPI SBR LATEX", "TPI TILE ADHESIVE", "TPI WATERPROOF PAINT",
      "TPI GROUT 40", "TPI PREMIX MORTAR", "TPI SKIMCOAT", "TPI ACRYLIC EXTERIOR",
    ],
  },
  "thau-tho": {
    content: `Dành cho đội thợ và nhà thầu công trình dân dụng: nhà phố, biệt thự, sửa chữa cải tạo.

## Sản phẩm dễ dùng, hiệu quả cao

- Chống thấm sàn vệ sinh, sân thượng, tường ngoài.
- Kết nối bê tông cũ – mới, chống thấm cổ ống.
- Vữa rót chân cột, vữa tô hoàn thiện.

## Hỗ trợ thầu thợ

- Hướng dẫn thi công trực tiếp tại công trình.
- Video hướng dẫn và tài liệu định mức rõ ràng.
- Chương trình tích điểm đổi quà cho thợ.`,
    products: [
      "TPI SBR BOND", "TPI LATEX P100", "TPI PU25", "TPI WATERSTOP",
      "TPI GROUT 40", "TPI TILE ADHESIVE", "TPI SKIMCOAT", "TPI WB-102",
    ],
  },
};

// ------------------------------------------------------------
// BLOG
// ------------------------------------------------------------
// Slug 3 chuyên mục cuối khớp DOC_POST_LINKS trong lib/constants.ts.
export const postCategoryDefs = [
  { slug: "tin-tuc", name: "Tin tức" },
  { slug: "hoat-dong", name: "Hoạt động" },
  { slug: "huong-dan-thi-cong", name: "Hướng dẫn thi công" },
  { slug: "ung-dung-san-pham", name: "Ứng dụng sản phẩm" },
  { slug: "thong-bao-san-pham", name: "Thông báo sản phẩm" },
];

interface PostDef {
  slug: string;
  title: string;
  category: string;
  thumbnailUrl: string;
  publishedAt: string;
  author: string;
  excerpt: string;
  content: string;
}

export const postDefs: PostDef[] = [
  {
    slug: "tpi-tham-gia-le-cat-noc-du-an-the-infiniti-riviera-point",
    title: "TPI tham gia lễ cất nóc dự án The Infiniti – Riviera Point",
    category: "hoat-dong",
    thumbnailUrl: "/Cong-Truong-tong-hop-1398x606-BW.webp",
    publishedAt: "2025-05-28",
    author: "Ban Truyền thông TPI",
    excerpt:
      "Đại diện TPI vinh dự tham dự lễ cất nóc dự án The Infiniti – Riviera Point, nơi hệ chất tháo khuôn và chống thấm TPI được sử dụng xuyên suốt phần thân.",
    content: `Sáng ngày 28/05, lễ cất nóc dự án The Infiniti – Riviera Point đã diễn ra với sự tham gia của chủ đầu tư, tổng thầu và các nhà cung cấp chiến lược.

## Đồng hành từ móng đến mái

Trong suốt quá trình thi công phần thân, TPI cung cấp chất tháo khuôn cho hệ cốp pha nhôm cùng hệ chống thấm cho tầng hầm và khu vực sàn ướt. Đội ngũ kỹ thuật TPI có mặt định kỳ tại công trường để kiểm tra chất lượng và hướng dẫn thi công.

> Cất nóc đúng tiến độ là kết quả của sự phối hợp chặt chẽ giữa các đơn vị. TPI tự hào là một mắt xích trong chuỗi đó.

TPI tiếp tục đồng hành cùng dự án trong giai đoạn hoàn thiện với các sản phẩm vữa tô nhẵn mịn và sơn chống thấm.`,
  },
  {
    slug: "ve-dich-de-chay-tiep",
    title: "Về đích để chạy tiếp – Tổng kết hoạt động năm 2024",
    category: "hoat-dong",
    thumbnailUrl: "/Tham-quan-nha-may.jpg",
    publishedAt: "2025-01-15",
    author: "Ban Truyền thông TPI",
    excerpt: "Nhìn lại một năm nhiều thử thách nhưng cũng đầy dấu ấn của tập thể TPI và định hướng cho năm 2025.",
    content: `Năm 2024 khép lại với nhiều cột mốc đáng nhớ: sản lượng tăng trưởng, mở rộng hệ thống đại lý và ra mắt nhiều sản phẩm mới.

## Những con số nổi bật

- Hơn 40 dự án cao tầng và nhà xưởng sử dụng sản phẩm TPI.
- Mở rộng hệ thống đại lý tại khu vực miền Tây và Tây Nguyên.
- Ra mắt 8 sản phẩm mới trong nhóm vữa khô trộn sẵn và phụ gia bê tông.

## Hướng tới năm 2025

Năm 2025 đánh dấu 10 năm thành lập TPI. Chúng tôi đặt mục tiêu nâng cấp dây chuyền sản xuất, đầu tư phòng thí nghiệm và chuẩn hoá quy trình hỗ trợ kỹ thuật cho khách hàng.`,
  },
  {
    slug: "bo-xay-dung-ra-soat-quy-chuan-cat-bien",
    title: "Bộ Xây dựng rà soát quy chuẩn cát biển phục vụ san lấp",
    category: "tin-tuc",
    thumbnailUrl: "/San-xuat-grayscale.jpg",
    publishedAt: "2025-03-10",
    author: "Ban Truyền thông TPI",
    excerpt: "Bộ Xây dựng đang rà soát các tiêu chuẩn, quy chuẩn liên quan để mở rộng việc sử dụng cát biển cho hoạt động san lấp.",
    content: `Trước tình trạng khan hiếm cát sông, Bộ Xây dựng đang rà soát các tiêu chuẩn kỹ thuật nhằm tạo hành lang pháp lý cho việc sử dụng cát biển làm vật liệu san lấp.

## Ảnh hưởng đến ngành vật liệu

Việc sử dụng cát biển đặt ra yêu cầu cao hơn về kiểm soát hàm lượng muối và khả năng chống ăn mòn cốt thép. Các giải pháp phụ gia và lớp phủ bảo vệ sẽ đóng vai trò quan trọng.

TPI đang nghiên cứu các sản phẩm phụ gia ức chế ăn mòn phù hợp với xu hướng này.`,
  },
  {
    slug: "xu-huong-vat-lieu-xanh-2025",
    title: "Xu hướng vật liệu xây dựng xanh năm 2025",
    category: "tin-tuc",
    thumbnailUrl: "/Lab-green-700x700.webp",
    publishedAt: "2025-04-02",
    author: "Phòng Kỹ thuật TPI",
    excerpt: "Vật liệu ít phát thải, gốc nước và có thể tái chế đang trở thành tiêu chí bắt buộc ở nhiều dự án.",
    content: `Các chứng chỉ công trình xanh như LOTUS, LEED, EDGE ngày càng phổ biến tại Việt Nam, kéo theo nhu cầu về vật liệu thân thiện môi trường.

## Ba xu hướng nổi bật

- **Sản phẩm gốc nước** thay thế dần gốc dung môi, giảm VOC.
- **Phụ gia giảm xi măng** giúp giảm phát thải CO₂ của bê tông.
- **Vữa khô trộn sẵn** giảm hao hụt vật tư tại công trường.

Là hội viên Hội đồng Công trình Xanh Việt Nam, TPI ưu tiên phát triển các sản phẩm theo định hướng này.`,
  },
  {
    slug: "huong-dan-thi-cong-chong-tham-san-ve-sinh",
    title: "Hướng dẫn thi công chống thấm sàn vệ sinh bằng vữa 2 thành phần",
    category: "huong-dan-thi-cong",
    thumbnailUrl: "/Mockup-San-Pham-Chong-Tham.jpeg",
    publishedAt: "2025-06-12",
    author: "Phòng Kỹ thuật TPI",
    excerpt: "Quy trình 5 bước chống thấm sàn vệ sinh bằng vữa chống thấm gốc xi măng – polymer 2 thành phần.",
    content: `Sàn vệ sinh là hạng mục dễ thấm nhất trong nhà ở. Thi công đúng quy trình giúp chống thấm bền vững hơn 10 năm.

## Bước 1: Chuẩn bị bề mặt

Bề mặt bê tông phải sạch, không dính dầu mỡ, vữa yếu. Đục mở rộng các vết nứt và xử lý cổ ống bằng vữa không co ngót.

## Bước 2: Làm ẩm

Tưới ẩm bề mặt nhưng không để đọng nước.

## Bước 3: Trộn vật liệu

Đổ phần lỏng vào thùng, cho từ từ phần bột vào và trộn bằng máy khoan tốc độ thấp trong 3 – 5 phút đến khi đồng nhất.

## Bước 4: Thi công

- Quét lớp thứ nhất, chân tường quét cao tối thiểu 30 cm.
- Gia cố lưới tại góc tường và cổ ống.
- Quét lớp thứ hai vuông góc với lớp thứ nhất sau 4 – 6 giờ.

## Bước 5: Ngâm nước thử

Sau 72 giờ, ngâm nước thử 24 – 48 giờ trước khi cán vữa bảo vệ và lát gạch.`,
  },
  {
    slug: "huong-dan-su-dung-chat-thao-khuon-cop-pha-nhom",
    title: "Hướng dẫn sử dụng chất tháo khuôn cho cốp pha nhôm",
    category: "huong-dan-thi-cong",
    thumbnailUrl: "/Building-Cao-tang.webp",
    publishedAt: "2025-02-20",
    author: "Phòng Kỹ thuật TPI",
    excerpt: "Cách lăn, phun chất tháo khuôn đúng định mức để bề mặt bê tông phẳng mịn và tăng tuổi thọ cốp pha.",
    content: `Cốp pha nhôm có ưu điểm nhẹ, luân chuyển nhanh nhưng dễ bám dính vữa nếu dùng chất tháo khuôn không phù hợp.

## Định mức

Khoảng 30 – 50 m²/lít tuỳ phương pháp thi công và độ nhám bề mặt cốp pha.

## Cách thi công

- Vệ sinh sạch cốp pha sau mỗi lần tháo.
- Lăn hoặc phun một lớp mỏng, đều. Không để chảy giọt.
- Đổ bê tông sau 15 – 30 phút khi màng đã khô se.

> Lưu ý: không dùng quá nhiều chất tháo khuôn, vì sẽ gây rỗ khí và loang màu bề mặt bê tông.`,
  },
  {
    slug: "huong-dan-thi-cong-vua-rot-chan-de-may",
    title: "Thi công vữa rót bù co ngót cho chân đế máy",
    category: "huong-dan-thi-cong",
    thumbnailUrl: "/Grouting-580-280.jpg",
    publishedAt: "2024-11-05",
    author: "Phòng Kỹ thuật TPI",
    excerpt: "Những lưu ý quan trọng khi rót vữa grout cho bệ máy, bu lông neo và chân cột thép.",
    content: `Vữa rót bù co ngót giúp truyền tải trọng đều từ thiết bị xuống móng, hạn chế rung và lún lệch.

## Chuẩn bị

- Làm nhám và tưới bão hoà bề mặt bê tông trong 6 – 24 giờ.
- Lắp ván khuôn kín, cao hơn mặt đế 5 cm ở phía rót.

## Trộn và rót

- Dùng đúng lượng nước theo tài liệu kỹ thuật, **không** tự ý thêm nước.
- Rót liên tục từ một phía để đẩy không khí ra ngoài.

## Bảo dưỡng

Phủ bao tải ẩm hoặc phun hợp chất bảo dưỡng ngay sau khi vữa ninh kết ban đầu.`,
  },
  {
    slug: "ung-dung-vua-tu-san-cho-nha-xuong",
    title: "Ứng dụng vữa tự san phẳng cho sàn nhà xưởng thực phẩm",
    category: "ung-dung-san-pham",
    thumbnailUrl: "/Vua-tu-san.webp",
    publishedAt: "2025-05-06",
    author: "Phòng Kỹ thuật TPI",
    excerpt: "Giải pháp tạo phẳng sàn trước khi thi công epoxy cho nhà máy chế biến thực phẩm tại Bình Dương.",
    content: `Nhà máy yêu cầu sàn phẳng tuyệt đối để thi công epoxy kháng khuẩn, trong khi sàn bê tông hiện hữu bị lồi lõm 5 – 15 mm.

## Giải pháp

- Mài sàn, hút bụi và quét lớp lót epoxy.
- Thi công vữa tự san dày trung bình 8 mm.
- Sau 24 giờ thi công sơn epoxy hoàn thiện.

## Kết quả

Diện tích 3.200 m² hoàn thành trong 6 ngày, độ phẳng đạt yêu cầu kiểm tra bằng thước 3 m.`,
  },
  {
    slug: "ung-dung-phu-gia-cho-be-tong-duc-san",
    title: "Giảm 15% chi phí xi măng nhờ phụ gia cho nhà máy cọc ly tâm",
    category: "ung-dung-san-pham",
    thumbnailUrl: "/Betong-duc-san.webp",
    publishedAt: "2024-12-18",
    author: "Phòng Kỹ thuật TPI",
    excerpt: "Câu chuyện tối ưu cấp phối cùng một nhà máy sản xuất cọc PHC khu vực Đông Nam Bộ.",
    content: `Nhà máy cần tăng cường độ sớm để rút ngắn chu kỳ hấp, đồng thời giảm chi phí vật liệu.

## Cách TPI triển khai

- Thí nghiệm 6 cấp phối tại phòng lab.
- Chạy thử trên dây chuyền trong 2 tuần.
- Chuẩn hoá quy trình định lượng phụ gia.

## Kết quả

Giảm 15% lượng xi măng mà vẫn đạt cường độ thiết kế, đồng thời bề mặt cọc đẹp hơn nhờ chất tháo khuôn phù hợp.`,
  },
  {
    slug: "ung-dung-chong-tham-tang-ham",
    title: "Chống thấm tầng hầm dự án căn hộ bằng hệ thẩm thấu kết tinh",
    category: "ung-dung-san-pham",
    thumbnailUrl: "/oncrete-in-the-construction-e1736084881793.webp",
    publishedAt: "2024-09-22",
    author: "Phòng Kỹ thuật TPI",
    excerpt: "Xử lý triệt để thấm ngược tầng hầm 2 tầng trong điều kiện mực nước ngầm cao.",
    content: `Tầng hầm thường xuyên chịu áp lực nước ngầm. Hệ chống thấm cần bám dính tốt với bê tông và chịu được áp lực ngược.

## Giải pháp áp dụng

- Phụ gia chống thấm trộn trực tiếp vào bê tông vách và đáy.
- Băng cản nước tại mạch ngừng.
- Vữa chống thấm 2 thành phần cho bề mặt trong.

Sau hai mùa mưa, tầng hầm khô ráo, không phát sinh điểm thấm.`,
  },
  {
    slug: "thong-bao-thay-doi-quy-cach-bao-bi-2026",
    title: "Thông báo thay đổi quy cách bao bì từ năm 2026",
    category: "thong-bao-san-pham",
    thumbnailUrl: "/Mockup-San-Pham-Chong-Tham.jpeg",
    publishedAt: "2025-12-20",
    author: "Ban Truyền thông TPI",
    excerpt: "Bao bì sản phẩm TPI được cập nhật theo bộ nhận diện thương hiệu mới, áp dụng dần từ quý I/2026.",
    content: `Cùng với việc ra mắt bộ nhận diện thương hiệu mới, TPI cập nhật thiết kế bao bì toàn bộ sản phẩm.

## Những điểm thay đổi

- Logo và màu sắc theo nhận diện 2025.
- Bổ sung mã QR tra cứu tài liệu kỹ thuật.
- Thông tin định mức in rõ trên mặt trước bao bì.

Bao bì cũ vẫn lưu hành song song đến hết quý II/2026. Chất lượng sản phẩm **không thay đổi**.`,
  },
  {
    slug: "ra-mat-tpi-grout-120",
    title: "Ra mắt vữa rót cường độ siêu cao TPI GROUT 120",
    category: "thong-bao-san-pham",
    thumbnailUrl: "/Slider-8.webp",
    publishedAt: "2025-08-01",
    author: "Ban Truyền thông TPI",
    excerpt: "Sản phẩm mới đạt cường độ nén trên 120 MPa, dành cho kết cấu chịu tải trọng đặc biệt.",
    content: `TPI chính thức giới thiệu TPI GROUT 120 – vữa rót gốc xi măng bù co ngót, cường độ nén trên 120 MPa sau 28 ngày.

## Ứng dụng

- Liên kết cấu kiện bê tông đúc sẵn.
- Chân đế tua bin, máy móc tải trọng động lớn.
- Gia cố, sửa chữa kết cấu cầu.

Liên hệ phòng kinh doanh để nhận tài liệu kỹ thuật và mẫu thử.`,
  },
];
