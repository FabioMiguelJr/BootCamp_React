export interface IDespesas {
	id: number;
	descricao: string;
	categoria: string;
	valor: number;
	mes: string;
	dia: string;
}

export interface IDespesasCategoria {
	categoria: string;
	valor: number;
}

export interface IColunas {
	descricao: string;
	categoria: string;
	dia: string;
	valor: number;
}

export interface IUsuario {
	nome: string;
	email: string;
}

export function getDespesasEndpoint(): Promise<IDespesas[]> {
	return fetch("http://localhost:8080/despesas?_sort=mes", {
		credentials: "include",
	}).then(tartaResposta);
}

export function getDespesasMesEndpoit(mes: string): Promise<IDespesas[]> {
	return fetch(`http://localhost:8080/despesas?mes=${mes}&_sort=dia`, {
		credentials: "include",
	}).then(tartaResposta);
}

export function obtemUsuario(): Promise<IUsuario> {
	return fetch(`http://localhost:8080/sessao/usuario`, {
		credentials: "include",
	}).then(tartaResposta);
}

export function criaSessao(email: string, senha: string): Promise<IUsuario> {
	return fetch(`http://localhost:8080/sessao/criar`, {
		credentials: "include",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, senha }),
	}).then(tartaResposta);
}

export function finalizaSessao(): Promise<void> {
	return fetch(`http://localhost:8080/sessao/finalizar`, {
		method: "POST",
		credentials: "include",
	}).then(tartaResposta);
}

function tartaResposta(response: Response) {
	if (response.ok) {
		return response.json();
	} else {
		throw new Error("Erro ao carregar dados");
	}
}
