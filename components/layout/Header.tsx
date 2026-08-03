import { getCategoriesWithProducts } from "@/services/product.service";
import Navbar from "../header/Navbar";
import ProductMegaMenu from "../header/ProductMegaMenu";

async function Header() {
  const result = await getCategoriesWithProducts();
  const categories = result.success ? result.data : [];

  return <Navbar megaMenuSlot={<ProductMegaMenu categories={categories} />} />;
}

export default Header;
