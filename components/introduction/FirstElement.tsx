import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaXTwitter,
  FaPinterestP,
  FaLinkedinIn,
  FaWhatsapp,
  FaTelegram,
  FaTiktok,
} from "react-icons/fa6";

const socials = [
  {
    href: "https://facebook.com",
    icon: FaFacebookF,
    hover: "hover:bg-[#1877F2]",
  },
  {
    href: "https://x.com",
    icon: FaXTwitter,
    hover: "hover:bg-black",
  },
  {
    href: "https://pinterest.com",
    icon: FaPinterestP,
    hover: "hover:bg-[#E60023]",
  },
  {
    href: "https://linkedin.com",
    icon: FaLinkedinIn,
    hover: "hover:bg-[#0A66C2]",
  },
  {
    href: "https://wa.me",
    icon: FaWhatsapp,
    hover: "hover:bg-[#25D366]",
  },
  {
    href: "https://t.me",
    icon: FaTelegram,
    hover: "hover:bg-[#229ED9]",
  },
];

function FirstElement() {
  return (
    <div className="flex gap-6 px-4 md:px-6 mx-8 mt-14">
      <div className="flex-1">
        <Image
          src={"/Lab-green-700x700.webp"}
          alt="Lab green"
          width={590}
          height={590}
          className="mx-auto rounded-sm"
        />
      </div>
      <div className="flex-1 mx-auto my-auto">
        <div className="max-w-[520px]">
          <h2 className="text-[#339966] text-[16px] font-medium">
            TRUST - PASSION - INNOVATION{" "}
          </h2>
          <h4 className="font-medium text-[36px]">
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
          <div className="text-[#353535] text-[14px] flex flex-row gap-1 items-center justify-between">
            <p>
              <strong>Đồng hành cùng TPI</strong>
            </p>
            <div className="border-t border-gray-100">
              <div className="flex items-center gap-2">
                {socials.map(({ href, icon: Icon, hover }) => (
                  <Link
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-300 hover:text-white ${hover}`}
                  >
                    <Icon size={15} />
                  </Link>
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
