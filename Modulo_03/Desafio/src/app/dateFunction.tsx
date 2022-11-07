export const MONTHS = [
	"Janeiro",
	"Fevereiro",
	"Março",
	"Abril",
	"Maio",
	"Junho",
	"Julho",
	"Agosto",
	"Setembro",
	"Outubro",
	"Novembro",
	"Dezembro",
];

export function todayStr(data: Date): string {
	const monthStr = (data.getMonth() + 1).toString().padStart(2, "0");
	const dayStr = data.getDate().toString().padStart(2, "0");
	const yearStr = data.getFullYear();
	return `${yearStr}-${monthStr}-${dayStr}`;
}

export function getToday() {
	const data = todayStr(new Date());
	return data;
}

export function formatMonth(isoMonth: string) {
	const [year, month] = isoMonth.split("-");
	return `${MONTHS[parseInt(month)]} de ${year}`;
}

export function addMonth(month: string, increment: boolean) {
	const jsDate = new Date(month + "-01T12:00:00");
	if (increment) {
		jsDate.setMonth(jsDate.getMonth() + 1);
	} else {
		jsDate.setMonth(jsDate.getMonth() - 1);
	}
	// console.log(`${jsDate.getFullYear()}-${(jsDate.getMonth() + 1).toString().padStart(2, "0")}`);
	return `${jsDate.getFullYear()}-${(jsDate.getMonth() + 1).toString().padStart(2, "0")}`;
}

export function formatCurrency(valor: number): string {
	return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
