import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/common/LegalPage";

export const metadata: Metadata = {
  title: "Chính sách bảo mật thông tin",
  description: "Cách TPI thu thập, sử dụng và bảo vệ thông tin cá nhân của khách hàng.",
};

const sections: LegalSection[] = [
  {
    id: "muc-dich",
    title: "Mục đích thu thập thông tin",
    content: `TPI thu thập thông tin cá nhân nhằm phục vụ việc tư vấn sản phẩm, báo giá, giao hàng và chăm sóc khách hàng. Cụ thể:

- Liên hệ tư vấn giải pháp kỹ thuật và báo giá theo yêu cầu.
- Xác nhận đơn hàng, giao hàng và xuất hoá đơn.
- Gửi thông tin về sản phẩm mới, tài liệu kỹ thuật khi khách hàng đồng ý nhận.
- Giải quyết khiếu nại, đổi trả và bảo hành.`,
  },
  {
    id: "pham-vi",
    title: "Phạm vi thông tin thu thập",
    content: `Thông tin được thu thập khi khách hàng gửi biểu mẫu liên hệ, đặt hàng hoặc làm việc trực tiếp với nhân viên kinh doanh, bao gồm:

- Họ tên, số điện thoại, email.
- Tên công ty, mã số thuế, địa chỉ giao hàng (với khách hàng doanh nghiệp).
- Nội dung yêu cầu tư vấn, thông tin công trình.

TPI **không** thu thập thông tin thẻ thanh toán trên website.`,
  },
  {
    id: "thoi-gian-luu-tru",
    title: "Thời gian lưu trữ",
    content: `Thông tin cá nhân được lưu trữ cho đến khi khách hàng yêu cầu huỷ bỏ, hoặc tối đa 05 năm kể từ lần giao dịch cuối cùng, trừ trường hợp pháp luật yêu cầu lưu trữ lâu hơn (chứng từ kế toán, hoá đơn).`,
  },
  {
    id: "chia-se",
    title: "Chia sẻ thông tin",
    content: `TPI cam kết không bán, trao đổi hay cho thuê thông tin cá nhân của khách hàng. Thông tin chỉ được chia sẻ trong các trường hợp:

- Đơn vị vận chuyển, để giao hàng đến đúng địa chỉ.
- Đại lý phân phối chính thức tại khu vực của khách hàng, để hỗ trợ cung ứng nhanh hơn.
- Cơ quan nhà nước có thẩm quyền khi có yêu cầu theo quy định pháp luật.`,
  },
  {
    id: "bao-mat",
    title: "Cam kết bảo mật",
    content: `Thông tin được lưu trên hệ thống có phân quyền truy cập, chỉ nhân viên phụ trách mới được xem. Website sử dụng kết nối mã hoá HTTPS cho mọi biểu mẫu.

Trong trường hợp hệ thống bị tấn công dẫn đến mất dữ liệu, TPI sẽ thông báo cho khách hàng và cơ quan chức năng trong thời gian sớm nhất.`,
  },
  {
    id: "quyen-khach-hang",
    title: "Quyền của khách hàng",
    content: `Khách hàng có quyền yêu cầu xem, chỉnh sửa hoặc xoá thông tin cá nhân của mình, cũng như từ chối nhận thông tin quảng cáo, bằng cách gửi email tới **info@tpi.pro.vn**. TPI sẽ phản hồi trong vòng 07 ngày làm việc.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Chính sách bảo mật thông tin"
      href="/chinh-sach-bao-mat-thong-tin"
      updatedAt="01/06/2025"
      intro="Công ty TNHH Đầu Tư Phát Triển TPI tôn trọng và cam kết bảo vệ thông tin cá nhân của khách hàng. Chính sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin khi bạn sử dụng website và dịch vụ của TPI."
      sections={sections}
    />
  );
}
