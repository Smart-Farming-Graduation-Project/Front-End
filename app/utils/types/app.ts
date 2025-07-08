type Product = {
  productId: number;
  productName: string;
  description: string;
  price: number;
  availability: string;
  categoryName?: string;
  images: string[];
  averageRating: number;
  isFavorite: boolean;
  productOwner: string;
}
type ProductId = {
  productId: number;
  productName: string;
  description: string;
  price: number;
  availability: string;
  categoryName?: string;
  images: string[];
  averageRating: number;
  isFavorite: boolean;
  productOwner: string;
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
  categoryDescription: string;
  categoryImage: string;
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
type UserPostProps = {
  id: number;
  userId: string;
  userName: string;
  userImageUrl: string;
  title: string;
  content: string;
  voteCount: number;
  createdAt: string;
  updatedAt?: string;
  userVoteStatus: number;
};
type OrderItem = {
  id: number;
  productId: number;
  quantity: number;
  unitPrice: number;
};

type CreateOrderItem = {
  productId: number;
  quantity: number;
  cupon: null;
};

type Order = {
  orderId: number;
  userId: string;
  shippingAddress: string;
  orderDate: string;
  status: string;
  totalAmount: number;
  orderItems: OrderItem[];
};

type CreateOrder = {
  shippingAddress: string;
  orderItems: CreateOrderItem[];
};

type UpdateOrder = {
  id: number;
  shippingAddress: string;
  status: string;
};

type OrderTotals = {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
};

export type { Product, CategoryType, ProductId, WishListItem, CartItem, ItemProps, ReviewProps, UserPostProps, Order, OrderItem, CreateOrder, CreateOrderItem, UpdateOrder, OrderTotals };
