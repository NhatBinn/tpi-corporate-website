"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

export default function AboutIntroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };

  return (
    <section className="relative flex flex-col md:flex-row items-center py-12 md:py-16">
      <div className="relative z-0 flex w-full max-w-[1280px] flex-col justify-center gap-8 md:gap-10 bg-[#0a8a3f] px-4 md:px-16 py-10 md:py-14">
        <div>
          <span className="text-[48px] md:text-[80px] font-bold leading-none text-white/10">
            01
          </span>
          <p className="-mt-4 md:-mt-6 text-[13px] md:text-[15px] font-semibold text-white/70">
            Trust - Passion - Innovation
          </p>
        </div>

        <div className="max-w-[600px]">
          <h2 className="text-[24px] md:text-[32px] font-bold text-white">
            Tin Cậy, Nhiệt Huyết, Sáng Tạo
          </h2>

          <p className="mt-4 md:mt-6 text-[14px] md:text-[15px] leading-relaxed text-white/90">
            <span className="font-semibold">
              Được thành lập vào năm 2015, TPI muốn mang đến những giải pháp
              về hoá chất và VLXD tiên tiến, chất lượng, hiệu quả, với công
              nghệ do chính người Việt làm chủ.
            </span>
          </p>

          <p className="mt-3 md:mt-4 text-[14px] md:text-[15px] leading-relaxed text-white/90">
            Khởi đầu khiêm tốn nhưng không ngừng nỗ lực. Đến nay, TPI đã từng
            bước phát triển, trở thành thương hiệu tin cậy với thị trường
            trong nước và dần vươn ra quốc tế.
          </p>
        </div>

        <div className="grid max-w-[600px] grid-cols-2 gap-x-6 md:gap-x-10 gap-y-6 md:gap-y-8">
          <div>
            <p className="text-[28px] md:text-[36px] font-bold text-white">300+</p>
            <p className="mt-1 text-[13px] md:text-[15px] text-white/80">
              Tấn sản phẩm / tháng
            </p>
          </div>
          <div>
            <p className="text-[28px] md:text-[36px] font-bold text-white">100+</p>
            <p className="mt-1 text-[13px] md:text-[15px] text-white/80">
              Dự án lớn & nhỏ
            </p>
          </div>
          <div>
            <p className="text-[28px] md:text-[36px] font-bold text-white">60+</p>
            <p className="mt-1 text-[13px] md:text-[15px] text-white/80">
              Nhà máy VLXD sử dụng
            </p>
          </div>
          <div>
            <p className="text-[28px] md:text-[36px] font-bold text-white">10+</p>
            <p className="mt-1 text-[13px] md:text-[15px] text-white/80">
              Xuất khẩu đi các nước
            </p>
          </div>
        </div>
      </div>

      <div className="relative md:absolute right-6 top-1/2 z-10 h-[260px] md:h-[78%] w-full md:w-[50%] md:-translate-y-1/2 overflow-hidden rounded-sm shadow-2xl">
        <video
          ref={videoRef}
          src="/YTSave_YouTube_Chat-thao-khuon-cop-pha-cho-be-tong_Media_JVbWAoOlT1Y_001_720p.mp4"
          poster="/ytb-poster.png"
          className="h-full w-full object-cover"
          controls={isPlaying}
        />

        {!isPlaying && (
          <button
            onClick={handlePlay}
            aria-label="Phát video giới thiệu"
            className="group absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/20"
          >
            <span className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full border-2 border-white transition-transform group-hover:scale-110">
              <Play size={24} className="ml-1 fill-white text-white" />
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
