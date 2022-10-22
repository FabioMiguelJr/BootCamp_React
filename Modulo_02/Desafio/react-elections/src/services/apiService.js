import { read } from "./httpService";

export async function getCities() {
	const cities = await read("/cities");
	return cities;
}

export async function getCandidates() {
	const candidates = await read("/candidates");
	return candidates;
}

export async function getElection() {
	const election = await read("/election");
	return election;
}
