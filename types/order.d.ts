type Order = {
  id: string;
  email: string;
  total: number;
  stripeCheckoutId: string;
  orderStatus: OrderStatus;
  createdAt: string;
  updatedAt: string;
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

type OrderStatus =
  | "created"
  | "succeeded"
  | "payment_failed"
  | "canceled"
  | "processing";
