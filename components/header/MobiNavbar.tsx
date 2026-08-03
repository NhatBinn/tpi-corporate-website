"use client"
function MobiNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
      <div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
            className="md:hidden ml-2 flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-0 left-0 z-40 h-screen w-full bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-[300px] max-w-[85vw] bg-white shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
              <span className="text-[13px] font-bold uppercase text-black">
                Menu
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Đóng menu"
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-4 py-4">
              <Field orientation="horizontal">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full px-3 py-3 rounded-xl border-gray-200 text-black placeholder:text-gray-400"
                />
              </Field>
            </div>

            <div className="border-t border-gray-100 px-4 py-2">
              <MobileMenuItem href="/" label="TRANG CHỦ" />
              <MobileMenuItem href="/san-pham" label="SẢN PHẨM" />
              <MobileMenuItem href="/giai-phap" label="GIẢI PHÁP" />
              <MobileMenuItem href="/du-an" label="DỰ ÁN" />
              <MobileMenuItem href="/gioi-thieu" label="GIỚI THIỆU" />
              <MobileMenuItem href="/tai-lieu" label="TÀI LIỆU & ỨNG DỤNG" />
              <MobileMenuItem href="/lien-he" label="LIÊN HỆ" />
            </div>

            <div className="border-t border-gray-100 px-4 py-4">
              <div className="flex items-center gap-3">
                <Link
                  href="https://www.facebook.com/TPIVN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-[#0a8a3f] hover:text-white"
                >
                  <FaFacebookF size={16} />
                </Link>
                <Link
                  href="https://www.tiktok.com/@tpivn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-[#0a8a3f] hover:text-white"
                >
                  <FaTiktok size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileMenuItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block border-b border-gray-50 py-3 text-[14px] font-bold text-gray-700 transition-colors hover:text-[#0a8a3f]"
    >
      {label}
    </Link>
  );
}

export default MobiNavbar;
