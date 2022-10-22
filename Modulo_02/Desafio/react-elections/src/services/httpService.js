import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:3001", timeout: 1000 });

export async function read(url) {
	const { data } = await axiosInstance.get(url);
	//console.log(data);
	return data;
}
