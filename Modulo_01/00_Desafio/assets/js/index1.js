// Módulo de carga da API
import { getSummary } from "./summaryApi.js";

let response = await getSummary("countries");

//console.log(response.data);

let countryList = [];

const countrySelect = document.getElementById("cmbCountry");
let cmbCountry = [];
countryList = response.data;

for (let index = 0; index < countryList.length; index++) {
	cmbCountry.push(countryList[index].Country);
}
console.log(cmbCountry);

loadComboOptions(countrySelect, cmbCountry);

function loadComboOptions(combo, data) {
	data.map((item) => combo.insertAdjacentHTML("beforeend", `<option>${item}</option>`));
}
