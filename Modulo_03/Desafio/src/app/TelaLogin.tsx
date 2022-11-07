import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useState } from "react";
import { criaSessao, IUsuario } from "./backend";

export default function TelaLogin(props: { onLogin: (usuario: IUsuario) => void }) {
	const [email, setEmail] = useState<string>("");
	const [senha, setSenha] = useState<string>("");
	const [erro, setErro] = useState<string>("");

	function onSubmit(evt: React.FormEvent) {
		evt.preventDefault();
		setErro("");
		criaSessao(email, senha).then(
			(usuario) => props.onLogin(usuario),
			() => setErro("E-mail ou senha incorretos.")
		);
	}

	return (
		<Container>
			<h1>Despesas</h1>
			<p>Digite e-mail e senha para entrar</p>
			<form onSubmit={onSubmit}>
				<TextField
					margin="normal"
					fullWidth
					variant="filled"
					label="Email"
					value={email}
					error={!!erro}
					onChange={(evt) => setEmail(evt.target.value)}
				/>
				<TextField
					type="password"
					margin="normal"
					fullWidth
					variant="filled"
					label="Senha"
					value={senha}
					error={!!erro}
					helperText={erro}
					onChange={(evt) => setSenha(evt.target.value)}
				/>
				<Box textAlign="right" padding="16px 0">
					<Button type="submit" variant="contained" color="primary">
						Entrar
					</Button>
				</Box>
			</form>
		</Container>
	);
}
