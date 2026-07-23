import { Prisma } from "@/prisma/generated/prisma/client";
import { FeedbackInput } from "@/schemas/Feedback";

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

export type ProductCard = CategoryWithProducts["products"][number];

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

export type SolutionCardProps = {
  href: string;
  image: string;
  label: string;
  title: string;
  desc: string;
  span?: string;
  descWidth?: string;
  titleLine2?: string;
  titleTight?: boolean;
};

export interface PartnerItem {
  name: string;
  imageUrl: string | null;
}

export interface ProductItem {
  id?: string;
  name: string;
  imageUrl: string | null;
  slug?: string;
}

export interface ProjectList {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  thumbnailUrl: string;
  category: {
    name: string;
  };
}
