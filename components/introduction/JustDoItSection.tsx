export default function JustDoItSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a8a3f] via-[#0fa84a] to-[#0a8a3f] px-6 py-20 sm:px-12 lg:px-20 my-10">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1px_1fr_1px_1fr]">
        {/* Cột trái - tiêu đề chính */}
        <div>
          <p className="text-[15px] font-semibold uppercase tracking-[0.1em] text-white/80">
            Làm tới đi !
          </p>
          <h2 className="mt-3 skew-x-[-8deg] text-[56px] font-black uppercase leading-none text-white sm:text-[68px]">
            Just Do It
          </h2>
        </div>

        {/* Vạch chia dọc - ẩn trên mobile */}
        <div className="hidden h-full w-px bg-white/25 lg:block" />

        {/* Cột giữa */}
        <div>
          <h3 className="text-[16px] font-bold text-white">
            Làm điều mình đam mê
          </h3>
          <p className="mt-4 text-[14px] leading-relaxed text-white/85">
            Niềm vui của chúng tôi là làm nên giải pháp tốt, sản phẩm tốt hơn
            mỗi ngày. Hiệu quả và giá trị cho khách hàng là điều ưu tiên hàng
            đầu, <span className="font-bold">KHÔNG PHẢI LỢI NHUẬN.</span>
          </p>
        </div>

        {/* Vạch chia dọc - ẩn trên mobile */}
        <div className="hidden h-full w-px bg-white/25 lg:block" />

        {/* Cột phải */}
        <div>
          <h3 className="text-[16px] font-bold text-white">
            Làm những việc mình giỏi
          </h3>
          <p className="mt-4 text-[14px] leading-relaxed text-white/85">
            TPI quy tụ những nhân sự chuyên môn sâu về hoá chất và VLXD, kinh
            nghiệm phong phú từ các công ty đa quốc gia cũng như doanh nghiệp
            uy tín trong nước.
          </p>
        </div>
      </div>
    </section>
  );
}
