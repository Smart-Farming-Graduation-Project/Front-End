type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};
type ProductCart = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
};
export type { Product, ProductCart };
