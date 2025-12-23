type CategoryCount = {
  products: number;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string; // ISO string from API
  updatedAt: string;
  _count: CategoryCount;
};
