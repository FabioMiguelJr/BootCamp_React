// Módulo de carga de API's
import { getSummary } from "./summaryApi.js";

// Declaração de variáveis
let response = null;
let countryList = [];
var initialDate = undefined;
var finalDate = undefined;
var dataBaseIni = undefined;
var dataBaseFin = undefined;
const countrySelect = document.getElementById("cmbCountry");
const dateStart = document.getElementById("date_start");
const dateEnd = document.getElementById("date_end");
const btnAply = document.getElementById("filtro");
const kpiconfirmed = document.getElementById("kpiconfirmed");
const kpideaths = document.getElementById("kpideaths");
const kpirecovered = document.getElementById("kpirecovered");
const cmbData = document.getElementById("cmbData");

// Função imediata - IIFE
(async () => {
	response = await getSummary("countries");

	countryList = response.data;
	countryList = _.sortBy(countryList, function (obj) {
		return obj.Country;
	});

	let firstOfList = _.find(countryList, function (obj) {
		if (obj.Country == "Brazil") {
			return true;
		}
	});

	countrySelect.insertAdjacentHTML("beforeend", `<option>${firstOfList.Country}</option>`);
	for (let index = 0; index < countryList.length; index++) {
		if (!(countryList[index].Country == "Brazil")) {
			countrySelect.insertAdjacentHTML("beforeend", `<option>${countryList[index].Country}</option>`);
		}
	}

	const d = new Date();
	dateRange(d, d);
	dateStart.value = moment(d, "yyyy-MM-DD").subtract(1, "months").format("YYYY-MM-DD");
	dateEnd.value = moment(d, "yyyy-MM-DD").format("YYYY-MM-DD");
})();

// Função de filtragem para a carga da página Country.html
async function filterCountry() {
	let resFilterCountry = [];
	let dados = [];
	let dias = [];
	let oldData = 0;
	linhas.data.labels = [];
	linhas.data.datasets.data = [];

	var newDataset = {
		data: [],
		label: "",
		borderColor: "",
		backgroundColor: "",
	};

	const tipoDropDown = cmbData.options[cmbData.selectedIndex].text;

	dateRange(dateStart.value, dateEnd.value);
	const par1 = countrySelect.options[countrySelect.selectedIndex].text;
	const par2 = dataBaseIni;
	const par3 = dataBaseFin;

	const parFilter = `/country/${par1}?from=${par2}&to=${par3}`;
	let response = await getSummary(parFilter);

	if (response.data.length != 0) {
		resFilterCountry = response.data;

		for (let index = 0; index < resFilterCountry.length; index++) {
			const element = resFilterCountry[index];
			if (index == 0) {
				switch (tipoDropDown) {
					case "Casos Confirmados":
						oldData = element.Confirmed;
						break;
					case "Número de Óbitos":
						oldData = element.Deaths;
						break;
					case "Recuperados":
						oldData = element.Recovered;
						break;
				}
			} else {
				console.log(element.Date);
				switch (tipoDropDown) {
					case "Casos Confirmados":
						dados.push(element.Confirmed - oldData);
						oldData = element.Confirmed;
						break;
					case "Número de Óbitos":
						dados.push(element.Deaths - oldData);
						oldData = element.Deaths;
						break;
					case "Recuperados":
						dados.push(element.Recovered - oldData);
						oldData = element.Recovered;
						break;
				}
				dias.push(moment(element.Date, "YYYY-MM-DDTHH:mm:ssZ").format("DD/MM/YYYY"));
			}
		}
		console.log(`Tipo: ${tipoDropDown}`);
		console.log(`Dados: ${dias}`);

		linhas.data.labels = dias;

		linhas.data.datasets[0].data = dados;
		linhas.data.datasets[0].label = tipoDropDown;
		linhas.data.datasets[0].borderColor = "rgb(60,186,159)";
		linhas.data.datasets[0].backgroundColor = "rgb(60,186,159,0.1)";

		// Cálculo da média
		let somaMedia = 0;
		let medias = [];
		for (const iterator of dados) {
			somaMedia = somaMedia + iterator;
		}

		for (const iterator of dados) {
			medias.push(Math.trunc(somaMedia / dados.length));
		}

		// Linha da média
		newDataset.data = medias;
		newDataset.label = `Média do ${tipoDropDown}`;
		newDataset.borderColor = "rgb(255,140,13)";
		newDataset.backgroundColor = "rgb(255,140,13, 0.1)";
		if (linhas.data.datasets.length > 1) {
			linhas.data.datasets = _.dropRight(linhas.data.datasets);
		}

		linhas.data.datasets.push(newDataset);

		linhas.update();

		dados = _.last(resFilterCountry);
		kpiconfirmed.innerHTML = dados.Confirmed.toLocaleString("pt-BR");
		kpideaths.innerHTML = dados.Deaths.toLocaleString("pt-BR");
		kpirecovered.innerHTML = dados.Recovered.toLocaleString("pt-BR");
	} else {
		alert("Não há dados disponíveis");
	}
}

// Gráfico de linhas
let linhas = new Chart(document.getElementById("linhas"), {
	type: "line",
	data: {
		labels: [],
		datasets: [{}],
	},
	options: {
		responsive: true,
		plugins: {
			legend: {
				display: true,
				position: "left", //top, bottom, left, rigth
			},
			title: {
				display: true,
				text: "Curva de Covid",
			},
			layout: {
				padding: {
					left: 100,
					right: 100,
					top: 50,
					bottom: 10,
				},
			},
		},
	},
});

// Função que monta datas para pesquisa e filtragem
function dateRange(dataI, dataF) {
	initialDate = moment(dataI, "yyyy-MM-DD").format("YYYY-MM-DD") + "T23:59:59";
	finalDate = moment(dataF, "yyyy-MM-DD").format("YYYY-MM-DD") + "T23:59:59";
	dataBaseIni = moment(initialDate, "YYYY-MM-DD").subtract(1, "days").format("YYYY-MM-DD") + "T23:59:59";
	dataBaseFin = moment(finalDate, "YYYY-MM-DD").add(1, "days").format("YYYY-MM-DD") + "T23:59:59";
}

// Função de escuta do evento "click" da filtragem da API '/Countries'
btnAply.addEventListener("click", () => {
	filterCountry();
});
