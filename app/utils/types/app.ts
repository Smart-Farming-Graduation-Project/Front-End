type Product = {
  productId: number;
  productName: string;
  description: string;
  price: number;
  availability: string;
  categoryName?: string;
  images: string[];
};
type ProductId = {
  productId: number;
  productName: string;
  description: string;
  price: number;
  availability: string;
  categoryName?: string;
  images: string[];
  averageRating: number;
};

type ItemProps = {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  productAvailability: string;
  productImages: string[];
  productDescription: string;
};
type CartItem = ItemProps & {
  quantity: number;
};
type WishListItem = ItemProps & {
  fav: boolean;
};
type CategoryType = {
  categoryId: number;
  categoryName: string;
  categoryDescription: Product[];
};
type ReviewProps = {
  reviewID: string;
  userID: string;
  firstName: string;
  lastName: string;
  rating: number;
  reviewText: string;
  headline: string;
  reviewDate: string;
};
export type { Product, CategoryType, ProductId, WishListItem, CartItem, ItemProps, ReviewProps };
