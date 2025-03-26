export function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

export function formatDate(date: string, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("pt-BR", options).format(new Date(date));
}

export function formatOrderStatus(status: OrderStatus) {
  switch (status) {
    case "processing":
      return "Processando";
    case "canceled":
      return "Cancelado";
    case "created":
      return "Criado";
    case "payment_failed":
      return "Pagamento falhou";
    case "succeeded":
      return "Concluído";
    default:
      return status;
  }
}
