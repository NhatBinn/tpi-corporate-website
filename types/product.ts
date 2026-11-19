export type ProductStatus = "active" | "low_stock" | "out_of_stock";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
};
