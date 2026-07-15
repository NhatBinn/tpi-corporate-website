import Link from "next/link";

const features = [
  {
    label: "Giao hàng",
    sub: "Toàn quốc",
    link: "/giao-hang",
    icon: (
      <svg
        viewBox="0 0 40 46"
        fill="none"
        className="h-10 w-12 md:h-16 md:w-20 shrink-0"
      >
        <path
          d="M4 32V14a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v18"
          stroke="#0a8a3f"
          strokeWidth="2"
        />
        <path
          d="M28 20h9l6 7v5a2 2 0 0 1-2 2h-2"
          stroke="#0a8a3f"
          strokeWidth="2"
        />
        <circle cx="13" cy="34" r="3.5" stroke="#0a8a3f" strokeWidth="2" />
        <circle cx="35" cy="34" r="3.5" stroke="#0a8a3f" strokeWidth="2" />
        <path d="M16.5 34h15" stroke="#0a8a3f" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Thanh toán",
    sub: "Linh hoạt",
    link: "/thanh-toan",
    icon: (
      <svg
        viewBox="0 0 40 46"
        fill="none"
        className="h-10 w-12 md:h-16 md:w-20 shrink-0"
      >
        <rect
          x="5"
          y="12"
          width="30"
          height="21"
          rx="2"
          stroke="#0a8a3f"
          strokeWidth="2"
        />
        <path d="M5 19h30" stroke="#0a8a3f" strokeWidth="2" />
        <path d="M10 27h8" stroke="#0a8a3f" strokeWidth="2" />
        <circle
          cx="38"
          cy="30"
          r="8"
          fill="white"
          stroke="#0a8a3f"
          strokeWidth="2"
        />
        <path
          d="M34.5 30l2.3 2.3 4.7-4.7"
          stroke="#0a8a3f"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Dịch vụ",
    sub: "Hướng dẫn mua hàng",
    link: "/dich-vu",
    icon: (
      <svg
        viewBox="0 0 40 46"
        fill="none"
        className="h-10 w-12 md:h-16 md:w-20 shrink-0"
      >
        <circle cx="24" cy="15" r="7" stroke="#0a8a3f" strokeWidth="2" />
        <path
          d="M10 40v-3c0-6 6-10 14-10s14 4 14 10v3"
          stroke="#0a8a3f"
          strokeWidth="2"
        />
        <path d="M32 12a5 5 0 0 1 0 10" stroke="#0a8a3f" strokeWidth="2" />
      </svg>
    ),
  },
  {
    label: "Bảo mật",
    sub: "Thông tin khách hàng",
    link: "/bao-mat",
    icon: (
      <svg
        viewBox="0 0 40 46"
        fill="none"
        className="h-10 w-12 md:h-16 md:w-20 shrink-0"
      >
        <path
          d="M24 5l16 6v11c0 10-7 17-16 21-9-4-16-11-16-21V11z"
          stroke="#0a8a3f"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M17 24l5 5 9-10"
          stroke="#0a8a3f"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Đổi trả",
    sub: "Chính sách đổi trả",
    link: "/doi-tra",
    icon: (
      <svg
        viewBox="0 0 40 46"
        fill="none"
        className="h-10 w-12 md:h-16 md:w-20 shrink-0"
      >
        <path
          d="M8 18l16-9 16 9-16 9-16-9z"
          stroke="#0a8a3f"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M8 18v14l16 9 16-9V18" stroke="#0a8a3f" strokeWidth="2" />
        <path d="M24 27v14" stroke="#0a8a3f" strokeWidth="2" />
        <path
          d="M31 8l4 4-4 4"
          stroke="#0a8a3f"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M35 12c0 5-4 8-9 8"
          stroke="#0a8a3f"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

function Features() {
  return (
    <section className="mx-auto max-w-[1380px] px-4 md:px-6 py-10 md:py-13">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-3 md:gap-x-6 gap-y-6 md:gap-y-8">
        {features.map((feature) => (
          <Link href={feature.link} key={feature.label}>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="shrink-0">{feature.icon}</div>
              <div className="min-w-0">
                <p className="text-[13px] md:text-[16px] font-bold uppercase text-black leading-tight">
                  {feature.label}
                </p>
                <p className="text-[11px] md:text-[14px] text-[#9a9a9a] leading-tight mt-0.5">
                  {feature.sub}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Features;
