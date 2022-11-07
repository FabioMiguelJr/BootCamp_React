import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { IUsuario, obtemUsuario } from "./backend";
import DespesasScreen from "./DespesasScreen";
import TelaLogin from "./TelaLogin";

function App() {
	const [usuario, setUsuario] = useState<IUsuario | null>(null);

	useEffect(() => {
		obtemUsuario().then(
			(usuario) => setUsuario(usuario),
			() => setUsuario(null)
		);
	}, []);

	if (usuario) {
		return (
			<Router>
				<Switch>
					<Route path="/despesas">
						<DespesasScreen />
					</Route>
					<Redirect to="/despesas" />
				</Switch>
			</Router>
		);
	} else {
		return <TelaLogin onLogin={setUsuario} />;
	}
}

export default App;
