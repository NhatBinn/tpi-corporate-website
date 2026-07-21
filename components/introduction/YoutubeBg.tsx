"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface YouTubeBackgroundProps {
  videoId: string;
  fallbackImage: string;
  fallbackAlt: string;
  grayscale?: boolean;
}

function buildEmbedUrl(videoId: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1", // bắt buộc phải mute thì trình duyệt mới cho autoplay
    loop: "1",
    playlist: videoId, // YouTube yêu cầu playlist = chính video đó thì loop mới hoạt động
    controls: "0",
    showinfo: "0",
    modestbranding: "1",
    rel: "0",
    playsinline: "1",
    iv_load_policy: "3", // ẩn annotation
    disablekb: "1", // tắt điều khiển bàn phím vì đây chỉ là nền trang trí
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

export default function YouTubeBackground({
  videoId,
  fallbackImage,
  fallbackAlt,
  grayscale = false,
}: YouTubeBackgroundProps) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = () => {
      setShowVideo(!media.matches);
    };

    handleChange();

    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);
    
  return (
    <div className="absolute inset-0 overflow-hidden">
      {showVideo ? (
        <iframe
          src={buildEmbedUrl(videoId)}
          title="Video nền"
          aria-hidden="true"
          tabIndex={-1}
          allow="autoplay; encrypted-media"
          className={`pointer-events-none absolute left-1/2 top-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 sm:h-[200%] sm:w-[200%] ${
            grayscale ? "grayscale" : ""
          }`}
        />
      ) : (
        <Image
          src={fallbackImage}
          alt={fallbackAlt}
          fill
          className={`object-cover ${grayscale ? "grayscale" : ""}`}
        />
      )}
    </div>
  );
}
