import React from "react";

export default function Item({ children: value = "Valor", label = "Nome: ", negative = false }) {
	const colorFont = negative ? "text-red-600" : "text-green-600";
	return (
		<span className={`text-xl font-semibold ${colorFont}`}>
			<strong className="text-black">{label}</strong>
			{value}
		</span>
	);
}
