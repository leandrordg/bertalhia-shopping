type Order = {
  id: string;
  email: string;
  total: number;
  createdAt: string;
  updatedAt: string;
  stripeCheckoutId: string;
};

type OrderItem = {
  id: string;
  total: number;
  quantity: number;
  productVariant: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
};

type OrderWithOrderItems = Order & {
  orderItems: OrderItem[];
};
