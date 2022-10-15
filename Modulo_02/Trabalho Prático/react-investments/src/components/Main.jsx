import React from "react";

export default function Main({ children }) {
	return (
		<div>
			<div className="container mx-auto p-4">
				<div>{children}</div>
			</div>
		</div>
	);
}
