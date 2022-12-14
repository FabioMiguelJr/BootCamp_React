export interface IPontuacao {
	gols_fora_casa: number;
	empates_fora_casa: number;
	total_jogos: number;
	gols_casa: number;
	jogos_fora_casa: number;
	vitorias_casa: number;
	derrotas_casa: number;
	total_pontos: number;
	empates_casa: number;
	pontos_fora_casa: number;
	total_gols_sofridos: number;
	total_vitorias: number;
	vitorias_fora_casa: number;
	total_derrotas: number;
	pontos_casa: number;
	derrotas_fora_casa: number;
	total_gols_marcados: number;
	jogos_casa: number;
	total_empates: number;
}

export interface IPartidas {
	visitante: string;
	resultado: string;
	data_partida: string;
	pontuacao_geral_mandante: IPontuacao;
	placar_visitante: number;
	hora_partida: string;
	mandante: string;
	placar_mandante: number;
	estadio: string;
	pontuacao_geral_visitante: IPontuacao;
}

export interface IRodadas {
	partidas: IPartidas[];
	numero: number;
}

export interface ITabela {
	time: string;
	pontos: number;
	vitorias: number;
	empates: number;
	derrotas: number;
	golsPro: number;
	golsContra: number;
	saldoGols: number;
}

export function getTemporadaEndpoit(ano: string): Promise<IRodadas[]> {
	return fetch(`http://localhost:3001/${ano}`).then((resp) => {
		if (resp.ok) {
			return resp.json();
		} else {
			throw new Error("Erro ao carregar dados");
		}
	});
}
