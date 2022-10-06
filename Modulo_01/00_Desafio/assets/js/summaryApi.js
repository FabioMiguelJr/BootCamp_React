//import axios from "axios";

const apiSummary = axios.create({
	baseURL: "https://api.covid19api.com/",
});

async function getSummary(folder) {
	console.log(folder);
	let res = await apiSummary.get(folder);
	return res;
}

export { getSummary };
