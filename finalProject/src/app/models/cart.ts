import { CartItems } from "./cart-items";

export class Cart {
    cartId?: number;
    userId?: number;
    items: CartItems[] = [];
    totalPrice?: number = 0;
    totalCount: number = 0;

}

