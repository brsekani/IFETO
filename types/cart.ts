export type UICartItem = {
  id: string;
  productId: string;
  quantity: number;
  price: string;
  product: {
    id: string;
    name: string;
    images: string[];
  };
};

// types/cart.ts
export type LocalCartItem = {
  id: string; // productId (used as cart item id)
  productId: string;
  quantity: number;
  price: string; // formatted price e.g. "₦12,000"
  product: {
    name: string;
    images: string[];
  };
};

export type AddToLocalCartPayload = {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity?: number;
  weight?: number;
  categoryName?: string;
};
