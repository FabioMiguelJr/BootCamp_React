import React from "react";

export default function CandidateByCity({
	percent = "0%",
	votes = 0,
	name = "Candidato",
	primeiro = false,
}) {
	const eleito = primeiro ? "Eleito" : "Não Eleito";
	const textEleito = primeiro ? "#FFA900" : "text-black";
	return (
		<div
			className="shadow-lg p-4 m-2 w-80 h-64 cursor-pointer
                flex flex-row items-center justify-center 
                font-semibold"
			style={{ fontFamily: "'JetBrains Mono', monospace" }}
		>
			<div className="flex flex-col m-2 items-center">
				<img
					className="rounded-full"
					src={`${process.env.PUBLIC_URL}/img/${name}.png`}
					alt={`Candidato ${name}`}
					width={90}
				/>
				<div>{percent}</div>
				<div>{votes} Votos</div>
				<div>{name}</div>
				<div className={`${textEleito}`}>{eleito}</div>
			</div>
		</div>
	);
}
