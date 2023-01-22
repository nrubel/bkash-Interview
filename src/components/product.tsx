import type { FC } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { cartState } from "../dataStore/recoil";
import type { Stock } from "../models/stock";

export const Product: FC<{ item: Stock }> = ({ item }) => {
	const { type, price, count, size } = item;
	const [cartCount, setCount] = useState<number>(1);
	const [cart, setCart] = useRecoilState(cartState);

	return (
		<li className={`p-3 m-2 border-indigo-400 border basis-1/2`}>
			Type: {type} <br />
			Price: {price} <br />
			Size: {size} <br />
			{count <= 0 && <span>Out of stock</span>} <br />
			<div className={`flex`}>
				<input
					type="number"
					min={0}
					max={item.count}
					defaultValue={cartCount}
					onChange={(e) => setCount(parseInt(e.target.value))}
					className={`border border-grey-500 py-2 px-3 w-1/2`}
				/>
				<button
					onClick={() => {
						setCart({ ...cart, [type]: cartCount + (cart[`${type}`] || 0) });
						setCount(1);
					}}
					className={`py-2 px-3 w-1/2 text-center bg-indigo-600 text-white hover:bg-indigo-900 rounded-tr rounded-br transition-all ease-linear`}>
					Add to cart
				</button>
			</div>
		</li>
	);
};
