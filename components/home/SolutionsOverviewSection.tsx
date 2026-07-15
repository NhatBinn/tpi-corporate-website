import SolutionForm from "../common/SolutionForm";

export default function SolutionsOverviewSection() {
  return (
    <section className="mx-auto max-w-350 px-4 md:px-6 py-12 md:py-16">
      <div className="flex items-baseline gap-3">
        <span className="text-[40px] md:text-[56px] font-black leading-none text-[#e9e9e9]">
          03
        </span>
        <p className="-ml-3 text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.1em] text-[#4a4a4a]">
          Đa dạng <span className="font-bold text-black">Giải Pháp</span> &{" "}
          <span className="font-bold text-black">Đối Tượng</span>
        </p>
      </div>

      <h2 className="-mt-1 text-[24px] md:text-[38px] leading-tight text-black">
        <span className="font-normal">Từ </span>
        <span className="font-extrabold">CÔNG NGHIỆP</span>
        <span className="font-normal"> đến </span>
        <span className="font-extrabold">DÂN DỤNG</span>
      </h2>

      <SolutionForm />
    </section>
  );
}
