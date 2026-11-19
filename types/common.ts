import { Prisma } from "@/prisma/generated/prisma/client";

export type ProductDetail = Prisma.ProductGetPayload<{
  select: {
    id: true;
    name: true;
    slug: true;
    sku: true;
    description: true;
    imageUrl: true;
    pdfUrl: true;
    compressiveStrength: true;
    waterDilutionRatio: true;
    pack: true;
    price: true;
    salePrice: true;
    isFeatured: true;
    isNew: true;
    isBestSeller: true;
    seoTitle: true;
    seoDescription: true;
    category: { select: { id: true; name: true; slug: true } };
    tags: { select: { id: true; name: true; slug: true } };
    productImages: {
      select: { id: true; url: true; alt: true; sortOrder: true };
    };
  };
}>;
export type CategoryWithProducts = Prisma.ProductCategoryGetPayload<{
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

export type NavbarProps = CategoriesProps;

export type NavigationProps = CategoriesProps;

export type ProductMegaProps = CategoriesProps;

export type SolutionCardProps = {
  href: string;
  image: string;
  label: string;
  title: string;
  desc: string;
  span?: string;
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

type ProjectImage = {
  id: string;
  url: string;
  alt: string | null;
  sortOrder: number;
};

type ProjectProducts = {
  product: {
    id: string;
    name: string;
    slug: string;
  };
};

export type ProjectDetail = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  excerpt: string | null;
  location: string | null;
  investor: string | null;
  contractor: string | null;
  area: string | null;
  constructionTime: string | null;
  completedYear: number | null;
  thumbnailUrl: string;
  category: { id: string; name: string };
  images: ProjectImage[];
  projectProducts: ProjectProducts[];
};
export interface FeedbackActionState {
  success?: boolean;
  message?: string;
  errors?: Partial<
    Record<"name" | "email" | "phone" | "company" | "message", string[]>
  >;
}

export interface LoginActionState {
  success?: boolean;
  message?: string;
  errors?: Partial<Record<"email" | "password", string[]>>;
}
