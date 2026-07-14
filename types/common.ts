import { Prisma } from "@/prisma/generated/prisma/client";

export type CategoryWithProducts = Prisma.CategoryGetPayload<{
  select: {
    id: true;
    name: true;
    products: {
      select: {
        id: true;
        name: true;
        slug: true;
        imageUrl: true;
        description: true;
      };
    };
  };
}>;

export type ProductCard =
  CategoryWithProducts["products"][number];
  
export interface ProductCategoryBrowserProps {
  categories: CategoryWithProducts[];
  columns?: 4 | 5;
  pageSize?: number;
  variant?: "nav" | "section";
  interaction?: "hover" | "click";
}

interface CategoriesProps {
  categories: CategoryWithProducts[];
}

export interface NavbarProps extends CategoriesProps {}

export interface NavigationProps extends CategoriesProps {}

export interface ProductMegaProps extends CategoriesProps {}
