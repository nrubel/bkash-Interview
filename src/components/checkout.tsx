import axios from "axios";
import type { FC, FormEvent } from "react";
import { Fragment } from "react";
import { useRecoilState } from "recoil";
import { amountState, cartState, nameState, productsState } from "../dataStore/recoil";
import type { Stock } from "../models/stock";

export const Checkout: FC = () => {
	const [data, setProducts] = useRecoilState(productsState);
	const { result } = data;
	const [list, updateCart] = useRecoilState(cartState);
	const [name, updateName] = useRecoilState(nameState);
	const [amount, updateAmount] = useRecoilState(amountState);
	const productTotal = (result || []).reduce((prev: number, cur: Stock) => {
		if (list[`${cur.type + "__" + cur.size + "__" + cur.id}`]) {
			return prev + list[`${cur.type + "__" + cur.size + "__" + cur.id}`] * cur.price;
		}
		return prev;
	}, 0);

	const handleCheckout = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (amount < productTotal) {
			alert("Insufficient amount!");
		} else {
			// check if product available
			const finds: { [key: string]: string } = {};
			for (const cartItem in list) {
				const productFind = (await axios.get(`http://localhost:4000/stock/${cartItem.split("__")[2]}`)).data;
				if (productFind.count === 0) {
					finds[cartItem] = `Out of stock`;
				} else if (productFind.count < list[cartItem]) {
					finds[cartItem] = `Stock not sufficient!`;
				}
			}
			if (Object.values(finds).filter((v: string) => !!v).length > 0) {
				alert(
					Object.keys(finds).reduce(
						(prev: string, cur: string) => prev + `\nItem ${cur.split("__")[0]}: ${finds[cur]}`,
						""
					)
				);
			} else {
				// Change amount
				const change = amount - productTotal;
				const order = await axios.post("http://localhost:4000/orders", {
					name,
					products: list,
					amount,
					total: productTotal,
					change,
				});
				if (!!order) {
					for (const cartItem in list) {
						const id = cartItem.split("__")[2];
						const updateProd = await axios.patch(`http://localhost:4000/stock/${id}`, {
							count: (result?.find((item: Stock) => item.id === parseInt(id))?.count || 0) - list[cartItem],
						});
					}
				}
				const finalProducts = await axios.get(`http://localhost:4000/stock`);
				setProducts({ error: null, result: finalProducts.data });
				updateCart({});
				alert(`Checkout done. ${change > 0 ? `please provide customer change amount ${change}` : ""}`);
			}
		}
	};

	if (Object.keys(list).length > 0)
		return (
			<>
				<h2 className={`flex justify-between mt-3 mb-4`}>
					<span className={`text-xl`}>Total</span>
					<span>${productTotal}</span>
				</h2>
				<form onSubmit={handleCheckout} className={`flex flex-col space-y-4`}>
					<input
						type="text"
						onChange={(e) => updateName(e.target.value)}
						defaultValue={name}
						className={`border border-grey-400 py-2 px-4`}
						placeholder={`Your name`}
					/>
					<input
						type={"number"}
						min={0}
						defaultValue={0}
						onChange={(e) => {
							const val = e.target.value;
							if (!!val) {
								updateAmount(parseFloat(e.target.value));
							}
						}}
						className={`border border-grey-400 py-2 px-4`}
						placeholder={`Your payment`}
					/>
					<button
						{...((name.length === 0 || amount === 0) && { disabled: true })}
						type={"submit"}
						className={`py-3 px-4 text-center bg-indigo-500 hover:bg-indigo-800 text-white transition-all ease-linear rounded`}>
						Checkout
					</button>
				</form>
			</>
		);
	else return <Fragment />;
};
