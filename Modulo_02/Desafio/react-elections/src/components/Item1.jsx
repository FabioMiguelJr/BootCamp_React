import React from "react";

export default function Item1({ children: value = "Valor", label = "Nome: " }) {
	return (
		<span className="text-sm">
			<strong>
				{label}
				{value}
			</strong>
		</span>
	);
}
