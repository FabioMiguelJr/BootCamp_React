// Módulo de carga da API
import { getSummary } from "./summaryApi.js";

let response = await getSummary("summary");

let resDataGlobal = {};

resDataGlobal = response.data.Global;
const totalConfirmed = resDataGlobal.TotalConfirmed;
const totalDeaths = resDataGlobal.TotalDeaths;
const totalRecovered = resDataGlobal.TotalRecovered;

// Montagem dos componentes

// Totais - KPIs
const confirmed = document.getElementById("confirmed");
const deaths = document.getElementById("death");
const recovered = document.getElementById("recovered");
confirmed.textContent = totalConfirmed.toLocaleString("pt-BR");
deaths.textContent = totalDeaths.toLocaleString("pt-BR");
recovered.textContent = totalRecovered.toLocaleString("pt-BR");

// Gráfico em pizza
let pizza = new Chart(document.getElementById("pizza"), {
	type: "pie",
	data: {
		labels: ["Confirmados", "Mortos", "Recuperados"],
		datasets: [
			{
				data: [totalConfirmed, totalDeaths, totalRecovered],
				backgroundColor: ["#3e95cd", "#3c8523", "#42F39f"],
			},
		],
	},
	options: {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Distribuição de Casos",
			},
		},
	},
});

// Gráfio em barras
let resCountries = [];

resCountries = response.data.Countries;
//console.log(resCountries);

resCountries = resCountries.sort((countryA, countryB) => (countryA.TotalDeaths > countryB.TotalDeaths ? -1 : countryA.TotalDeaths < countryB.TotalDeaths ? 1 : 0));

console.log(resCountries);

let bar = new Chart(document.getElementById("barras"), {
	type: "bar",
	data: {
		labels: [
			resCountries[0].Country,
			resCountries[1].Country,
			resCountries[2].Country,
			resCountries[3].Country,
			resCountries[4].Country,
			resCountries[5].Country,
			resCountries[6].Country,
			resCountries[7].Country,
			resCountries[8].Country,
			resCountries[9].Country,
		],
		datasets: [
			{
				label: "",
				data: [
					resCountries[0].TotalDeaths,
					resCountries[1].TotalDeaths,
					resCountries[2].TotalDeaths,
					resCountries[3].TotalDeaths,
					resCountries[4].TotalDeaths,
					resCountries[5].TotalDeaths,
					resCountries[6].TotalDeaths,
					resCountries[7].TotalDeaths,
					resCountries[8].TotalDeaths,
					resCountries[9].TotalDeaths,
				],
				backgroundColor: "#9d4edd",
			},
		],
	},
	options: {
		reponsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Total de Mortes por País - Top 10",
			},
		},
	},
});
