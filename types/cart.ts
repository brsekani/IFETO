export type UICartItem = {
  id: string;
  quantity: number;
  price: string;
  product: {
    name: string;
    images: string[];
  };
};

export type LocalCartItem = {
  productId: string;
  quantity: number;
};
