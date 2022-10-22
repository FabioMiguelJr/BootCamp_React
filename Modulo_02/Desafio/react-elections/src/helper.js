const MoneyFormatter = new Intl.NumberFormat("pt-BR", {
	currency: "BRL",
});

function formatMoney(value) {
	return MoneyFormatter.format(value);
}

function formatPercent(value) {
	//   const symbol = value > 0 ? "+" : "";
	return value.toFixed(2).replace(".", ",") + "%";
}

export { formatMoney, formatPercent };
