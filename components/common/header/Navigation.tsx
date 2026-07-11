import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import ProductMegaMenu from "./ProductMegaMenu";

function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className={`hover:text-black mx-0.5`}>
          <NavigationMenuTrigger>SẢN PHẨM</NavigationMenuTrigger>
          <NavigationMenuContent className={`p-2`}>
            <ProductMegaMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className={`hover:text-black mx-0.5`}>
          <NavigationMenuTrigger>GIẢI PHÁP</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="relative left-1/2 w-screen -translate-x-1/2 bg-white shadow-lg">
              <div className="mx-auto flex max-w-350 flex-col gap-6 p-8">
                {/* Hàng 1 */}
                <div className="flex gap-6">
                  {/* Nhà Xưởng */}
                  <NavigationMenuLink
                    className="group relative h-70 flex-5 overflow-hidden rounded-sm"
                    render={
                      <Link href="/giai-phap/nha-xuong">
                        <Image
                          src="/Grouting-580-280.jpg"
                          alt="Nhà Xưởng"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-white via-white/80 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-5">
                          <p className="text-[13px] text-[#9a9a9a]">
                            Công Nghiệp
                          </p>
                          <h4 className="text-[20px] font-bold text-black">
                            Nhà Xưởng
                          </h4>
                          <p className="mt-1 max-w-60 text-[13px] leading-snug text-[#9a9a9a]">
                            Vữa rót, vữa tự san, trám khe, sơn sàn, bột xoa
                            nền...
                          </p>
                        </div>
                      </Link>
                    }
                  />

                  {/* Cao Tầng */}
                  <NavigationMenuLink
                    className="group relative h-70 flex-4 overflow-hidden rounded-sm"
                    render={
                      <Link href="/giai-phap/cao-tang">
                        <Image
                          src="/Building-Cao-tang.webp"
                          alt="Cao Tầng"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-white via-white/80 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-5">
                          <p className="text-[13px] text-[#9a9a9a]">
                            Công Nghiệp
                          </p>
                          <h4 className="text-[20px] font-bold text-black">
                            Cao Tầng
                          </h4>
                          <p className="mt-1 max-w-55 text-[13px] leading-snug text-[#9a9a9a]">
                            Tháo cốp pha, chống thấm, vữa tô, xử lý nứt...
                          </p>
                        </div>
                      </Link>
                    }
                  />

                  {/* Bê Tông Tươi */}
                  <NavigationMenuLink
                    className="group relative h-70 flex-3 overflow-hidden rounded-sm"
                    render={
                      <Link href="/giai-phap/be-tong-tuoi">
                        <Image
                          src="/Do-beton-tuoi-280x280-1.jpg"
                          alt="Bê Tông Tươi"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-white via-white/80 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-5">
                          <p className="text-[13px] text-[#9a9a9a]">Nhà Máy</p>
                          <h4 className="text-[20px] font-bold text-black">
                            Bê Tông Tươi
                          </h4>
                          <p className="mt-1 max-w-45 text-[13px] leading-snug text-[#9a9a9a]">
                            Phụ gia giảm nước, hoá dẻo, silicafume...
                          </p>
                        </div>
                      </Link>
                    }
                  />
                </div>

                {/* Hàng 2 */}
                <div className="flex gap-6">
                  {/* Bê Tông Đúc Sẵn */}
                  <NavigationMenuLink
                    className="group relative h-70 flex-3 overflow-hidden rounded-sm"
                    render={
                      <Link href="/giai-phap/be-tong-duc-san">
                        <Image
                          src="/Beton-Duc-san-cong-2-280x280-1.webp"
                          alt="Bê Tông Đúc Sẵn"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-white via-white/80 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-5">
                          <p className="text-[13px] text-[#9a9a9a]">Nhà Máy</p>
                          <h4 className="text-[20px] font-bold leading-tight text-black">
                            Bê Tông Đúc Sẵn
                          </h4>
                          <p className="mt-1 max-w-50 text-[13px] leading-snug text-[#9a9a9a]">
                            Tháo khuôn, bảo dưỡng, tẩy rỉ cốt thép...
                          </p>
                        </div>
                      </Link>
                    }
                  />

                  {/* Cửa Hàng VLXD - card lớn nhất */}
                  <NavigationMenuLink
                    className="group relative h-70 flex-6 overflow-hidden rounded-sm"
                    render={
                      <Link href="/giai-phap/cua-hang-vlxd">
                        <Image
                          src="/Cua-hang-vlxd.jpg"
                          alt="Cửa Hàng VLXD Kênh Phân Phối"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-white via-white/80 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-5">
                          <p className="text-[13px] text-[#9a9a9a]">Dân Dụng</p>
                          <h4 className="text-[20px] font-bold leading-tight text-black">
                            Cửa Hàng VLXD
                            <br />
                            Kênh Phân Phối
                          </h4>
                          <p className="mt-1 max-w-75 text-[13px] leading-snug text-[#9a9a9a]">
                            Latex, chống thấm 2 thành phần, vữa grout, phụ
                            gia...
                          </p>
                        </div>
                      </Link>
                    }
                  />

                  {/* Thầu Thợ */}
                  <NavigationMenuLink
                    className="group relative h-70 flex-3 overflow-hidden rounded-sm"
                    render={
                      <Link href="/giai-phap/thau-tho">
                        <Image
                          src="/Non-bao-ho.webp"
                          alt="Thầu Thợ"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-white via-white/80 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-5">
                          <p className="text-[13px] text-[#9a9a9a]">Dân Dụng</p>
                          <h4 className="text-[20px] font-bold text-black">
                            Thầu Thợ
                          </h4>
                          <p className="mt-1 max-w-55 text-[13px] leading-snug text-[#9a9a9a]">
                            Latex, chống thấm 2 thành phần, vữa grout, phụ
                            gia...
                          </p>
                        </div>
                      </Link>
                    }
                  />
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className={`hover:text-black mx-0.5`}>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            render={<Link href="/">DỰ ÁN</Link>}
          />
        </NavigationMenuItem>
        <NavigationMenuItem className={`hover:text-black mx-0.5`}>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            render={<Link href="/">GIỚI THIỆU</Link>}
          />
        </NavigationMenuItem>

        <NavigationMenuItem className={`hover:text-black mx-0.5`}>
          <NavigationMenuTrigger>TÀI LIỆU & ỨNG DỤNG</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex flex-row gap-10 p-8">
              <ul className="grid w-full">
                <li className="flex flex-col gap-3">
                  <NavigationMenuLink
                    render={
                      <Link
                        href="#"
                        className="flex flex-row items-center gap-2 text-black hover:text-[#008800] text-[13px] font-bold uppercase tracking-wide mb-1"
                      >
                        Catalogue
                      </Link>
                    }
                  />
                  <NavigationMenuLink
                    render={
                      <Link
                        href="#"
                        className="flex flex-row items-center gap-2 text-[#838383] hover:text-[#008800] text-[14px] font-normal"
                      >
                        Giải pháp hoá chất & vật liệu
                      </Link>
                    }
                  />
                  <NavigationMenuLink
                    render={
                      <Link
                        href="#"
                        className="flex flex-row items-center gap-2 text-[#838383] hover:text-[#008800] text-[14px] font-normal"
                      >
                        Nhà xưởng công nghiệp
                      </Link>
                    }
                  />
                  <NavigationMenuLink
                    render={
                      <Link
                        href="#"
                        className="flex flex-row items-center gap-2 text-[#838383] hover:text-[#008800] text-[14px] font-normal"
                      >
                        Bê tông đúc sẵn
                      </Link>
                    }
                  />
                  <NavigationMenuLink
                    render={
                      <Link
                        href="#"
                        className="flex flex-row items-center gap-2 text-[#838383] hover:text-[#008800] text-[14px] font-normal"
                      >
                        Chống thấm
                      </Link>
                    }
                  />
                  <div className="mt-6 border-t border-gray-100 pt-6">
                    <strong className="block text-[14px] font-bold uppercase text-black hover:text-[#008800] cursor-pointer mb-3">
                      HƯỚNG DẪN THI CÔNG
                    </strong>
                  </div>
                  <div>
                    <strong className="block text-[14px] font-bold uppercase text-black hover:text-[#008800] cursor-pointer mb-3">
                      ỨNG DỤNG SẢN PHẨM
                    </strong>
                  </div>
                  <div>
                    <strong className="block text-[14px] font-bold uppercase text-black hover:text-[#008800] cursor-pointer">
                      THÔNG BÁO VỀ SẢN PHẨM
                    </strong>
                  </div>
                </li>
              </ul>
              <div className="flex w-135 shrink-0 items-center justify-center rounded-md bg-[#f4f4f4] p-4">
                <Image
                  src="/Mockup-San-Pham-Chong-Tham.jpeg"
                  width={580}
                  height={580}
                  alt="mockup"
                  priority
                  className="h-auto w-full object-contain drop-shadow-md"
                />
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className={`hover:text-black mx-0.5`}>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            render={<Link href="/">LIÊN HỆ</Link>}
          />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default Navigation;
