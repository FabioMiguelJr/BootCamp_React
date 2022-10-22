import React, { useEffect, useState } from "react";
import CitiesForms from "../components/CitiesForms";
import Error from "../components/Error";
import Header from "../components/Header";
import Item from "../components/Item";
import Item1 from "../components/Item1";
import Main from "../components/Main";
import { formatMoney } from "../helper";
import { getCities, getCandidates, getElection } from "../services/apiService";
import ClipLoader from "react-spinners/ClipLoader";
import CandidateByCity from "../components/CandidateByCity";

export default function ReactElectionsPage() {
	//Para o back-end
	const [allCities, setAllCities] = useState([]);
	const [allElections, setAllElections] = useState([]);
	const [allCandidates, setAllCandidates] = useState([]);
	const [allCandidatesFE, setAllCandidatesFE] = useState([]);

	const [city, setCity] = useState("");

	const [loading, setLoading] = useState(true);

	const [votingPopulation, setVotingPopulation] = useState(0);
	const [absence, setAbsence] = useState(0);
	const [presence, setPresence] = useState(0);

	const [error, setError] = useState("");

	const [firstIteraction, setFirstIteraction] = useState(true);

	useEffect(() => {
		async function getAllDatas() {
			try {
				let allCitiesBE = await getCities();
				const allCandidatesBE = await getCandidates();
				const allElectionsBE = await getElection();

				setAllCities(allCitiesBE);
				setAllCandidates(allCandidatesBE);
				setAllElections(allElectionsBE);

				setError("");
				setTimeout(() => {
					setLoading(false);
				}, 500);
			} catch (error) {
				setError(error.message);
			}
		}
		getAllDatas();
	}, []);

	function handleCities(event) {
		let v = 0;
		let a = 0;
		let p = 0;
		let c = "";

		allCities
			.filter((cityFiltered) => cityFiltered.id === event.target.value)
			.map((data) => {
				v = data.votingPopulation;
				a = data.absence;
				p = data.presence;
				c = data.name;
				return null;
			});

		setVotingPopulation(v);
		setAbsence(a);
		setPresence(p);
		setCity(c);

		const candidatesFE = [...allCandidates];

		const candidates = allElections
			.filter((E) => E.cityId === event.target.value)
			.map((mE) => {
				const candidato = candidatesFE
					.filter((C) => C.id === mE.candidateId)
					.map((mC) => {
						return mC.name;
					});
				return { candidato, ...mE };
			})
			.sort((a, b) => {
				return b.votes - a.votes;
			});

		setAllCandidatesFE(candidates);
		setFirstIteraction(false);
	}

	let mainJsx = <ClipLoader />;
	let candidatesJsx = <CitiesForms />;

	if (error) {
		mainJsx = <Error>{error}</Error>;
	}

	if (!firstIteraction) {
		candidatesJsx = (
			<CitiesForms>
				<div className="flex flex-row items-center justify-center space-x-4 m-4">
					{allCandidatesFE.map(({ candidateId, votes, candidato }) => {
						return (
							<CandidateByCity
								key={candidateId}
								name={candidato}
								votes={votes.toLocaleString("pt-BR", { currency: "BRL" })}
								// percent={`${((votes / presence) * 100).toLocaleString("pt-BR", {
								// 	currency: "BRL",
								// })} %`}
								percent={`${((votes / presence) * 100)
									.toFixed(2)
									.toLocaleString("pt-BR", {
										currency: "BRL",
									})} %`}
							></CandidateByCity>
						);
					})}
				</div>
			</CitiesForms>
		);
	} else {
	}

	if (!error && !loading) {
		mainJsx = (
			<>
				<CitiesForms>
					<div className="border p-2 flex flex-col items-center justify-center flex-wrap">
						<div className=" font-extrabold">
							<Item1 label="Eleição em ">{city}</Item1>
						</div>
						<div className="m-3">
							<Item label="Total de Eleitores: ">
								{formatMoney(votingPopulation)}
							</Item>
							<Item label="Absteção: ">{formatMoney(absence)}</Item>
							<Item label="Comparecimento: ">{formatMoney(presence)}</Item>
						</div>
					</div>
				</CitiesForms>
				{candidatesJsx}
			</>
		);
	}

	return (
		<>
			<div>
				<Header>Desafio Módulo 2 - React I - Elections</Header>
				<Main>
					<div className="text-center">
						<h2 className="my-2">Escolha o Município</h2>
						<select className="mb-5" onChange={handleCities}>
							<option value={"0"} key={"a"}>
								Cidade
							</option>
							{allCities.map((county) => {
								const { id, name } = county;
								return (
									<option value={id} key={id}>
										{name}
									</option>
								);
							})}
						</select>
					</div>
					{mainJsx}
				</Main>
			</div>
		</>
	);
}
