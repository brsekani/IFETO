export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  products: Product[];
  slug: string;
}
