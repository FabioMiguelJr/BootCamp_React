//import axios from "axios";

const apiSummary = axios.create({
	baseURL: "https://api.covid19api.com/",
});

async function getSummary(folder) {
	console.log(folder);
	try {
		let res = await apiSummary.get(folder);
		return res;
	} catch (error) {
		alert("Erro ao baixar os dados\n" + error);
	}
}

export { getSummary };
