import Link from "next/link";
import YouTubeBackground from "./YoutubeBg";

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: "2015", label: "Thành lập từ" },
  { value: "1500", label: "Diện tích nhà xưởng" },
  { value: "60", label: "Nhà máy VLXD sử dụng thường xuyên" },
  { value: "300", label: "Tấn SP mỗi tháng" },
  { value: "5", label: "Xuất khẩu đến các quốc gia" },
  { value: "100", label: "Dự án đã tham gia" },
];

export default function EffortsVideoSection() {
  return (
    <section className="relative flex min-h-[680px] items-center overflow-hidden bg-black">
      <YouTubeBackground
        videoId="JVbWAoOlT1Y"
        fallbackImage="/no-luc-qua-con-so-bg-2.jpg"
        fallbackAlt="Nhà xưởng TPI"
        grayscale
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-[32px] font-bold leading-tight text-white sm:text-[38px]">
            Nỗ lực của chúng tôi qua các con số
          </h2>

          <Link
            href="/du-an"
            className="mt-6 inline-block rounded-sm bg-[#0a8a3f] px-6 py-3 text-[12px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#097535]"
          >
            Các dự án đã và đang tham gia
          </Link>
        </div>

        <div className="grid grid-cols-2">
          {stats.map((stat, i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            return (
              <div
                key={stat.label}
                className={`px-8 py-7 text-center ${
                  col === 1 ? "border-l border-white/15" : ""
                } ${row > 0 ? "border-t border-white/15" : ""}`}
              >
                <p className="text-[42px] font-bold leading-none text-white">
                  {stat.value}
                </p>
                <p className="mt-2 text-[13px] font-semibold uppercase leading-snug text-white/75">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
