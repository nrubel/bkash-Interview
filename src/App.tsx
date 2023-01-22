import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Cart } from "./components/cart";
import { Checkout } from "./components/checkout";
import { Product } from "./components/product";
import { productsState } from "./dataStore/recoil";
import { Stock } from "./models/stock";

function App() {
	const [products, updateProductList] = useRecoilState(productsState);
	console.log("====================================");
	console.log(products);
	console.log("====================================");

	useEffect(() => {
		(async () => {
			try {
				const stocks = await axios.get(`http://localhost:4000/stock`);
				updateProductList({ error: null, result: stocks.data });
			} catch (e: any) {
				updateProductList({ error: e?.message || "Something went wrong!", result: null });
			}
		})();
	}, []);

	if (products.error) {
		return (
			<div className={`p-5 w-full h-screen`}>
				<h1 className="text-2xl mb-3">Error!</h1>
				<p>{products.error || "List error"}</p>
			</div>
		);
	}

	return (
		<>
			<h1 className={`text-center p-4 bg-gray-200`}>Fish Stock</h1>

			<div className={`flex space-x-4 p-4`}>
				<div className={`basis-1/2`}>
					<h2 className={`text-2xl mb-5`}>Products</h2>
					<ul className={`flex -m-2`}>
						{products.result?.map((item: Stock, index: number) => (
							<Product key={`stock-item-${index}-id-${item.id}`} item={item} />
						))}
					</ul>
				</div>
				<div className={`flex flex-col basis-1/2`}>
					<Cart />
					<Checkout />
				</div>
			</div>
		</>
	);
}

export default App;
