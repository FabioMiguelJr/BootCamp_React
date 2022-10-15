import React from "react";

export default function Header({ children = "Header padrão" }) {
	return (
		<div>
			<div className="bg-blue-100 mx-auto p-4">
				<h1 className="text-center font-semibold text-xl">{children}</h1>
			</div>
		</div>
	);
}
