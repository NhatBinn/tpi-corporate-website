import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "TPI có chính sách dành cho đại lý, nhà phân phối không?",
    answers: [
      "Hiện nay, với nhu cầu mở rộng hệ thống kinh doanh, TPI hân hạnh chào đón tất cả các đối tác có năng lực phù hợp, niềm tin và mong muốn hợp tác phân phối các sản phẩm do chúng tôi cung cấp.",
      "Nếu bạn thực sự quan tâm, hãy liên hệ ngay với TPI qua số hotline hoặc nhân viên kinh doanh phía cuối trang.",
    ],
  },
  {
    question: "TPI có giao sản phẩm toàn quốc không?",
    answers: [
      "TPI hiện đang cung cấp cho các khách hàng, đại lý, nhà máy, dự án trên toàn quốc. Phương thức vận chuyển đa dạng, linh hoạt từ truyền thống như chành xe, tàu hoả, xe tải cẩu... đến hiện đại (Viettelpost, Grab, Lalamove...)",
      "Để tìm hiểu rõ hơn, quý khách vui lòng liên hệ hotline hoặc xem thêm trong phần Chính sách bán hàng (mục Giao hàng).",
    ],
  },
  {
    question: "TPI có nhận OEM / ODM sản phẩm không?",
    answers: [
      "OEM / ODM là hoạt động thường xuyên, liên tục của chúng tôi từ khi thành lập. Hiện tại chúng tôi vẫn đang gia công cho một số đơn vị uy tín trong và ngoài nước.",
      "Nguyên tắc của TPI luôn luôn đảm bảo chất lượng, trách nhiệm và tính bảo mật thông tin. Quý khách hàng hoàn toàn có thể yên tâm hợp tác cùng TPI.",
    ],
  },
  {
    question: "TPI nhận thanh toán như thế nào, có chính sách công nợ không?",
    answers: [
      "TPI chấp nhận thanh toán chuyển khoản công ty, tiền mặt dưới 20tr, bảo lãnh ngân hàng.",
      "Dựa vào lịch sử thanh toán, giao dịch TPI có thể cấp hạn mức công nợ phù hợp. Chúng tôi áp dụng chính sách chiết khấu rất tốt cho các đơn hàng thanh toán trước, sớm. Quý khách hàng có thể cân đối tuỳ vào nhu cầu của mình.",
    ],
  },
  {
    question: "Chứng từ, hoá đơn VAT,... của TPI như thế nào?",
    answers: [
      "TPI cam kết cung cấp chứng từ, hoá đơn... hợp lệ theo quy định hiện hành của nhà nước.",
      "Sản phẩm do TPI sản xuất có đầy đủ chứng từ xuất xưởng. Một số sản phẩm có thể có các hồ sơ khác như: hợp chuẩn hợp quy, test report, tài liệu kỹ thuật (TDS), Tài liệu an toàn (MSDS)...",
    ],
  },
];

export default function AccordionList() {
  return (
    <div className="py-2">
      <h2 className="text-[#a5a5a5] text-[16px]">FAQs</h2>
      <h3 className="text-[24px] font-medium my-2">NHỮNG VẤN ĐỀ THƯỜNG ĐƯỢC QUAN TÂM</h3>
      <Accordion defaultValue={["0"]} className="max-w-lg">
        {FAQS.map((faq, i) => (
          <AccordionItem key={faq.question} value={String(i)} className="my-3">
            <AccordionTrigger className="text-[16px] text-[#242424] font-semibold hover:text-[#008800] cursor-pointer aria-expanded:text-[#008800]">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              {faq.answers.map((answer) => (
                <p key={answer} className="mb-5 text-[14px] text-[#353535]">
                  {answer}
                </p>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
