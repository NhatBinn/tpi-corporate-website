import AccordionList from "../common/AccordionList";

function ProjectFAQs() {
  return (
    <div className="my-10 bg-[##f7f7f7] flex flex-row items-center">
      <div className="flex-2/3">
        <h2 className="text-[20px] font-semibold text-[#242424]">
          Khu dân cư phức hợp cao cấp Victoria Village
        </h2>
        <p>
          Khu dân cư phức hợp cao cấp Victoria Village được triển khai xây dựng
          trên mặt tiền đường Đồng Văn Cống, liền kề ngay trục huyết mạch Mai
          Chí Thọ – Thạnh Mỹ Lợi – Quận 2 – TP Hồ Chí Minh. Dự án được mệnh danh
          là “Vùng đất cho người chiến thắng” đảm bảo đem lại không gian sống
          xanh, thượng lưu cho cư dân tại quận 2 nói riêng và Sài Gòn nói chung.
        </p>
        <p>
          <strong>TPI</strong> tự hào được tham gia cung cấp vật liệu và hóa
          chất xây dựng phục vụ cho dự án.
        </p>
      </div>
      <div className="flex-1/3">
        <AccordionList />
      </div>
    </div>
  );
}

export default ProjectFAQs;
