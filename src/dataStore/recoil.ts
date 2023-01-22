import { atom, selector } from "recoil";
import { Stock } from "../models/stock";

export const productsState = atom({
	key: "productList",
	default: { error: null, result: [] } as { error: null | string; result: null | Stock[] },
});

export const productsSelector = selector({
	key: "productListValue",
	get: ({ get }) => get(productsState),
});

export const cartState = atom({
	key: "cartItems",
	default: {} as { [key: string]: number },
});

export const nameState = atom({
	key: "customerName",
	default: "",
});

export const amountState = atom({
	key: "customerAmount",
	default: 0,
});

export const cartSelector = selector({
	key: "cartValue",
	get: ({ get }) => {
		const val = get(cartState);
		return val;
	},
});
