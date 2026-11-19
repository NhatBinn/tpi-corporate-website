import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/common/LegalPage";

export const metadata: Metadata = {
  title: "Chính sách bán hàng",
  description: "Hướng dẫn mua hàng, giao hàng và thanh toán khi mua sản phẩm TPI.",
};

// id các mục khớp với link trong components/common/Features.tsx.
const sections: LegalSection[] = [
  {
    id: "huong-dan-mua-hang",
    title: "Hướng dẫn mua hàng",
    content: `Khách hàng có thể đặt hàng qua các kênh:

- Gửi yêu cầu tại trang **Liên hệ** trên website.
- Gọi hoặc nhắn Zalo cho nhân viên kinh doanh phụ trách (khách hàng doanh nghiệp / cửa hàng, đại lý).
- Đặt hàng tại các đại lý phân phối chính thức của TPI.

Với công trình, đội ngũ kỹ thuật TPI sẽ khảo sát và đề xuất giải pháp, khối lượng vật tư trước khi báo giá.`,
  },
  {
    id: "giao-hang",
    title: "Giao hàng",
    content: `- Giao hàng **toàn quốc** qua xe tải của TPI hoặc đơn vị vận chuyển đối tác.
- Nội thành TP.HCM, Bình Dương, Đồng Nai: giao trong 24 – 48 giờ kể từ khi xác nhận đơn.
- Các tỉnh thành khác: 03 – 07 ngày tuỳ khu vực.
- Miễn phí giao hàng cho đơn từ 10.000.000đ trong bán kính 30 km tính từ nhà máy.

Khách hàng vui lòng kiểm tra số lượng, chủng loại và tình trạng bao bì khi nhận hàng.`,
  },
  {
    id: "thanh-toan",
    title: "Thanh toán",
    content: `TPI hỗ trợ các hình thức thanh toán linh hoạt:

- Chuyển khoản ngân hàng theo thông tin trên báo giá / hoá đơn.
- Tiền mặt khi nhận hàng (COD) cho đơn hàng nhỏ lẻ.
- Công nợ theo hợp đồng đối với khách hàng doanh nghiệp, đại lý.

TPI xuất hoá đơn VAT điện tử cho mọi đơn hàng.`,
  },
  {
    id: "bao-hanh",
    title: "Bảo hành chất lượng",
    content: `Sản phẩm TPI được sản xuất theo hệ thống quản lý chất lượng ISO 9001:2015. Mỗi lô hàng đều có mẫu lưu và phiếu kiểm định. Các vấn đề về chất lượng được xử lý theo **Chính sách đổi trả hàng**.`,
  },
];

export default function SalesPolicyPage() {
  return (
    <LegalPage
      title="Chính sách bán hàng"
      href="/chinh-sach-ban-hang"
      updatedAt="01/06/2025"
      sections={sections}
    />
  );
}
