import { ProductCategory } from "../enums/ProductCategory";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: ProductCategory;
  rating: {
    rate: number,
    count: number,
  }
}