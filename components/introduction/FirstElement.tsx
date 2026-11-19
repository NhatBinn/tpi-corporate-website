import Image from "next/image";
import {
  FaFacebookF,
  FaXTwitter,
  FaPinterestP,
  FaLinkedinIn,
  FaWhatsapp,
  FaTelegram,
} from "react-icons/fa6";
import { SITE_URL } from "@/lib/constants";

// Link chia sẻ thật của từng mạng xã hội cho trang /gioi-thieu (trước đây chỉ trỏ về trang chủ của mạng xã hội).
const PAGE_URL = encodeURIComponent(`${SITE_URL}/gioi-thieu`);
const PAGE_TEXT = encodeURIComponent("TPI – Nhà sản xuất hoá chất xây dựng");

const socials = [
  {
    name: "Facebook",
    href: `https://www.facebook.com/sharer/sharer.php?u=${PAGE_URL}`,
    icon: FaFacebookF,
    hover: "hover:bg-[#1877F2]",
  },
  {
    name: "X",
    href: `https://x.com/intent/post?url=${PAGE_URL}&text=${PAGE_TEXT}`,
    icon: FaXTwitter,
    hover: "hover:bg-black",
  },
  {
    name: "Pinterest",
    href: `https://www.pinterest.com/pin/create/button/?url=${PAGE_URL}&description=${PAGE_TEXT}`,
    icon: FaPinterestP,
    hover: "hover:bg-[#E60023]",
  },
  {
    name: "LinkedIn",
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${PAGE_URL}`,
    icon: FaLinkedinIn,
    hover: "hover:bg-[#0A66C2]",
  },
  {
    name: "WhatsApp",
    href: `https://wa.me/?text=${PAGE_TEXT}%20${PAGE_URL}`,
    icon: FaWhatsapp,
    hover: "hover:bg-[#25D366]",
  },
  {
    name: "Telegram",
    href: `https://t.me/share/url?url=${PAGE_URL}&text=${PAGE_TEXT}`,
    icon: FaTelegram,
    hover: "hover:bg-[#229ED9]",
  },
];

function FirstElement() {
  return (
    <div className="container-site mt-14 flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
      <div className="flex-1">
        <Image
          src={"/Lab-green-700x700.webp"}
          alt="Phòng thí nghiệm TPI"
          width={590}
          height={590}
          className="mx-auto h-auto w-full max-w-147.5 rounded-sm"
        />
      </div>
      <div className="flex-1 mx-auto my-auto">
        <div className="max-w-[520px]">
          <h2 className="text-[#339966] text-[16px] font-medium">
            TRUST - PASSION - INNOVATION{" "}
          </h2>
          <h4 className="mt-2 mb-4 font-medium text-[28px] leading-tight md:text-[36px]">
            TIN CẬY
            <br />
            NHIỆT HUYẾT
            <br />
            SÁNG TẠO
          </h4>
          <p className="text-[16px] text-[#353535] mb-5">
            Được thành lập vào năm 2015, TPI muốn mang đến những giải pháp về
            <strong> hoá chất </strong>
            và
            <strong> VLXD </strong>
            tiên tiến, chất lượng, hiệu quả, với công nghệ do chính người Việt
            làm chủ.
          </p>
          <p className="text-[18px] text-[#353535]">
            Khởi đầu khiêm tốn nhưng không ngừng nỗ lực. Đến nay,
            <strong> TPI </strong>
            đã từng bước phát triển, trở thành thương hiệu tin cậy với thị
            trường trong nước và dần vươn ra quốc tế.
          </p>
          <div className="border-t-2 my-7"></div>
          <div className="text-[#353535] text-[14px] flex flex-wrap gap-3 items-center justify-between">
            <p>
              <strong>Đồng hành cùng TPI</strong>
            </p>
            <div className="border-t border-gray-100">
              <div className="flex items-center gap-2">
                {socials.map(({ name, href, icon: Icon, hover }) => (
                  <a
                    key={name}
                    href={href}
                    aria-label={`Chia sẻ lên ${name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-300 hover:text-white ${hover}`}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstElement;
