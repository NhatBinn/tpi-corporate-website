import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/common/LegalPage";

export const metadata: Metadata = {
  title: "Chính sách đổi trả hàng",
  description: "Điều kiện, thời hạn và quy trình đổi trả sản phẩm hoá chất xây dựng TPI.",
};

const sections: LegalSection[] = [
  {
    id: "dieu-kien",
    title: "Điều kiện đổi trả",
    content: `TPI chấp nhận đổi trả sản phẩm trong các trường hợp sau:

- Sản phẩm bị lỗi do nhà sản xuất: vón cục, tách lớp, đông đặc trước hạn sử dụng.
- Giao sai chủng loại, sai quy cách hoặc sai số lượng so với đơn hàng.
- Bao bì bị rách, móp, rò rỉ trong quá trình vận chuyển của TPI.

Sản phẩm đổi trả phải còn nguyên tem nhãn, số lô sản xuất và **chưa qua sử dụng** (trừ trường hợp lỗi chất lượng đã được xác minh).`,
  },
  {
    id: "khong-ap-dung",
    title: "Trường hợp không áp dụng",
    content: `- Sản phẩm đã pha trộn, thi công hoặc đã mở nắp mà không phải do lỗi nhà sản xuất.
- Sản phẩm hư hỏng do bảo quản sai hướng dẫn (để ngoài nắng, nhiệt độ cao, ẩm ướt).
- Sản phẩm pha chế hoặc sản xuất riêng theo yêu cầu của khách hàng.
- Quá thời hạn đổi trả quy định tại mục 3.`,
  },
  {
    id: "thoi-han",
    title: "Thời hạn đổi trả",
    content: `- Giao sai, thiếu hàng, hư hỏng do vận chuyển: thông báo trong vòng **48 giờ** kể từ khi nhận hàng.
- Lỗi chất lượng do nhà sản xuất: thông báo trong vòng **07 ngày** kể từ khi nhận hàng và còn trong hạn sử dụng.`,
  },
  {
    id: "quy-trinh",
    title: "Quy trình đổi trả",
    content: `### Bước 1: Thông báo
Liên hệ nhân viên kinh doanh phụ trách hoặc hotline, cung cấp số đơn hàng, số lô sản xuất và hình ảnh sản phẩm.

### Bước 2: Xác minh
Bộ phận kỹ thuật TPI kiểm tra và phản hồi trong vòng 02 ngày làm việc. Với lỗi chất lượng, TPI có thể lấy mẫu về phòng thí nghiệm để đối chứng với mẫu lưu.

### Bước 3: Đổi trả
TPI đổi sản phẩm mới cùng loại hoặc hoàn tiền theo thoả thuận. Chi phí vận chuyển do TPI chịu nếu lỗi thuộc về TPI.`,
  },
  {
    id: "hoan-tien",
    title: "Hình thức hoàn tiền",
    content: `Tiền được hoàn bằng chuyển khoản vào tài khoản của khách hàng trong vòng 07 ngày làm việc kể từ khi TPI nhận lại hàng, hoặc cấn trừ vào đơn hàng kế tiếp nếu khách hàng đồng ý.`,
  },
];

export default function ReturnPolicyPage() {
  return (
    <LegalPage
      title="Chính sách đổi trả hàng"
      href="/chinh-sach-doi-tra-hang"
      updatedAt="01/06/2025"
      intro="TPI cam kết cung cấp sản phẩm đúng chất lượng công bố. Trong trường hợp sản phẩm không đạt yêu cầu, khách hàng được hỗ trợ đổi trả theo các điều kiện dưới đây."
      sections={sections}
    />
  );
}
