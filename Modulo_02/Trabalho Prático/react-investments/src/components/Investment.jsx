import React from "react";

export default function Investment({
	children,
	percentual = null,
	negatievValue = false,
	first = false,
}) {
	let period = new Date(children.year, children.month - 1);
	let periodString = period.toLocaleDateString("pt-BR", { year: "numeric", month: "short" });
	periodString = periodString.replace(". de ", "/");

	const formatedfundValue = children.value.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	});
	let colorFont = "";

	if (first) {
		colorFont = "text-black";
	} else {
		colorFont = negatievValue ? "text-red-600" : "text-green-600";
	}

	const sign = negatievValue ? "" : "+";

	return (
		<div className="flex flex-row justify-between border-b-2 p-2 text-base">
			<div className="flex flex-row space-x-6">
				<div className="font-mono text-sm">{periodString}</div>
				<div className={`${colorFont}`}>{formatedfundValue}</div>
			</div>
			<div className={`${colorFont}`}>{`${sign}${Math.round(percentual)} %`}</div>
		</div>
	);
}
