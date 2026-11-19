import { getProductCatalog } from "@/services/product.service";
import Navbar from "../header/Navbar";
import ProductMegaMenu from "../header/ProductMegaMenu";

async function Header() {
  const result = await getProductCatalog();
  const categories = result.success ? result.data : [];

  return <Navbar megaMenuSlot={<ProductMegaMenu categories={categories} />} />;
}

export default Header;
