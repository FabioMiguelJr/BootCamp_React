import React from "react";

export default function Item({ children: value = "Valor", label = "Nome: " }) {
	return (
		<span className="text-sm p-2">
			<strong>{label}</strong>
			{value}
		</span>
	);
}
