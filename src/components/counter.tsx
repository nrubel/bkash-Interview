import type { FC } from "react";

export const Counter: FC<{ value: number; onChange: Function }> = ({ value, onChange }) => {
	return (
		<div className={`flex space-x-2 items-center ml-auto`}>
			<div
				className={`border py-1 px-2 leading-3 cursor-pointer border-gray-500`}
				onClick={() => onChange(value - 1)}
				style={{}}>
				-
			</div>
			<div>{value}</div>
			<div className={`border py-1 px-2 leading-3 cursor-pointer border-gray-500`} onClick={() => onChange(value + 1)}>
				+
			</div>
		</div>
	);
};
