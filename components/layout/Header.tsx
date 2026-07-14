import { getCategoryByProduct } from "@/services/category.service";
import Navbar from "../header/Navbar";

async function Header() {
  const result = await getCategoryByProduct();
  return <Navbar categories={result.success ? result.data : []} />;
}

export default Header;
