export interface IDespesas {
	id: number;
	descricao: string;
	categoria: string;
	valor: number;
	mes: string;
	dia: string;
}

export interface IColunas {
	descricao: string;
	categoria: string;
	dia: string;
	valor: number;
}

export function getDespesasEndpoint(): Promise<IDespesas[]> {
	return fetch("http://localhost:3001/despesas?_sort=mes").then((resp) => {
		return resp.json();
	});
}

export function getDespesasMesEndpoit(mes: string): Promise<IDespesas[]> {
	return fetch(`http://localhost:3001/despesas?mes=${mes}&_sort=dia`).then((resp) => {
		if (resp.ok) {
			return resp.json();
		} else {
			throw new Error("Erro ao carregar dados");
		}
	});
}
