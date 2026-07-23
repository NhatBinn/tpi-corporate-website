import { getCategoriesWithProducts } from "@/services/product.service";
import Navbar from "../header/Navbar";

async function Header() {
  const result = await getCategoriesWithProducts();
  return <Navbar categories={result.success ? result.data : []} />;
}

export default Header;
