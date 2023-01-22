import type { FC } from "react";
import { Fragment } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { amountState, cartSelector, nameState, productsSelector } from "../dataStore/recoil";
import type { Stock } from "../models/stock";

export const Checkout: FC = () => {
	const { result } = useRecoilValue(productsSelector);
	const list = useRecoilValue(cartSelector);
	const [name, updateName] = useRecoilState(nameState);
	const [amount, updateAmount] = useRecoilState(amountState);

	if (Object.keys(list).length > 0)
		return (
			<>
				<h2 className={`flex justify-between mt-3 mb-4`}>
					<span className={`text-xl`}>Total</span>
					<span>
						$
						{result?.reduce((prev: number, cur: Stock) => {
							if (list[`${cur.type}`]) {
								return prev + list[`${cur.type}`] * cur.price;
							}
							return prev;
						}, 0)}
					</span>
				</h2>
				<input
					type="text"
					onChange={(e) => updateName(e.target.value)}
					defaultValue={name}
					className={`border border-grey-400 py-2 px-4`}
					placeholder={`Your name`}
				/>
				<input
					type={"number"}
					defaultValue={0}
					onChange={(e) => updateAmount(parseFloat(e.target.value))}
					className={`border border-grey-400 py-2 px-4 my-3`}
					placeholder={`Your payment`}
				/>
				<button
					{...((name.length === 0 || amount === 0) && { disabled: true })}
					className={`py-3 px-4 text-center bg-indigo-500 hover:bg-indigo-800 text-white transition-all ease-linear mt-3 rounded`}
					onClick={() => {
						console.log("====================================");
						console.log("clicked");
						console.log("====================================");
					}}>
					Checkout
				</button>
			</>
		);
	else return <Fragment />;
};
