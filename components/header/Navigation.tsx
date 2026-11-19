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
import Link from "next/link";
import { DOC_POST_LINKS, DOCUMENTS } from "@/lib/constants";

interface NavigationProps {
  megaMenuSlot: React.ReactNode;
  solutionMenuSlot: React.ReactNode;
}

function Navigation({ megaMenuSlot, solutionMenuSlot }: NavigationProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Trigger render thành <Link>: bấm vào là sang trang, rê chuột thì mở mega menu.
            Tránh lồng <a> trong <button> (HTML sai chuẩn, trên tablet chạm vào bị xử lý 2 lần). */}
        <NavigationMenuItem className={`hover:text-black mx-0.5`}>
          <NavigationMenuTrigger nativeButton={false} render={<Link href="/san-pham" />}>
            SẢN PHẨM
          </NavigationMenuTrigger>
          <NavigationMenuContent className={`p-2`}>
            {megaMenuSlot}
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className={`hover:text-black mx-0.5`}>
          <NavigationMenuTrigger nativeButton={false} render={<Link href="/giai-phap" />}>
            GIẢI PHÁP
          </NavigationMenuTrigger>
          <NavigationMenuContent>{solutionMenuSlot}</NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className={`hover:text-black mx-0.5`}>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            render={<Link href="/du-an">DỰ ÁN</Link>}
          />
        </NavigationMenuItem>
        <NavigationMenuItem className={`hover:text-black mx-0.5`}>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            render={<Link href="/gioi-thieu">GIỚI THIỆU</Link>}
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
                        href="/tai-lieu"
                        className="flex flex-row items-center gap-2 text-black hover:text-[#008800] text-[13px] font-bold uppercase tracking-wide mb-1"
                      >
                        Catalogue
                      </Link>
                    }
                  />
                  {DOCUMENTS.map((doc) => (
                    <NavigationMenuLink
                      key={doc.href}
                      render={
                        <a
                          href={doc.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-row items-center gap-2 text-[#838383] hover:text-[#008800] text-[14px] font-normal"
                        >
                          {doc.title}
                        </a>
                      }
                    />
                  ))}
                  {DOC_POST_LINKS.map((item, i) => (
                    <div key={item.href} className={i === 0 ? "mt-6 border-t border-gray-100 pt-6" : undefined}>
                      <NavigationMenuLink
                        render={
                          <Link
                            href={item.href}
                            className="block text-[14px] font-bold uppercase text-black hover:text-[#008800]"
                          >
                            {item.label}
                          </Link>
                        }
                      />
                    </div>
                  ))}
                </li>
              </ul>
              <div className="flex w-135 shrink-0 items-center justify-center rounded-md bg-[#f4f4f4] p-4">
                <Image
                  src="/Mockup-San-Pham-Chong-Tham.jpeg"
                  width={580}
                  height={580}
                  alt="Mockup sản phẩm chống thấm TPI"
                  className="h-auto w-full object-contain drop-shadow-md"
                />
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className={`hover:text-black mx-0.5`}>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            render={<Link href="/lien-he">LIÊN HỆ</Link>}
          />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default Navigation;
