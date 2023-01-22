import type { FC } from "react";
import { Fragment } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState, productsSelector } from "../dataStore/recoil";
import { Counter } from "./counter";

export const Cart: FC = () => {
	const data = useRecoilValue(productsSelector);
	const [list, updateList] = useRecoilState(cartState);

	return (
		<>
			<h2 className={`mb-5 flex`}>
				<span className={`text-2xl`}>Cart</span>
				<span className={`ml-auto`}>{Object.keys(list).length} items</span>
			</h2>
			<ul className={`flex flex-col space-y-2`}>
				{data.result?.map((item: any) => {
					if (list[`${item.type + "__" + item.size + "__" + item.id}`]) {
						return (
							<li
								key={`cart-item-${item.type}`}
								className={`flex justify-between border items-center border-gray-100 py-2 px-3`}>
								<div className={`mr-4`}>{item.type}</div>
								<div className={`mr-auto tracking-[2px]`}>[{item.size}]</div>
								<Counter
									value={list[`${item.type + "__" + item.size + "__" + item.id}`] || 0}
									onChange={(c: number) => {
										updateList({ ...list, [item.type + "__" + item.size + "__" + item.id]: c });
									}}
								/>

								<div className={`ml-10`}>
									$ {item.price * (list[`${item.type + "__" + item.size + "__" + item.id}`] || 0)}
								</div>
							</li>
						);
					} else {
						return <Fragment key={`cart-item-${item.type}`} />;
					}
				})}
			</ul>
		</>
	);
};
