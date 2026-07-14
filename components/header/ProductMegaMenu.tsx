import { ProductMegaProps } from "@/types/common";
import ProductCategoryBrowser from "../common/ProductCategoryBrowser";

export default function ProductMegaMenu({ categories }: ProductMegaProps) {
  return (
    <ProductCategoryBrowser
      categories={categories}
      columns={5}
      pageSize={10}
      variant="nav"
      interaction="hover"
    />
  );
}
