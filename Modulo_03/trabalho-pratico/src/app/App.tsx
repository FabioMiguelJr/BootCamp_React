import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DespesasScreen from "./DespesasScreen";

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/despesas">
					<DespesasScreen />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
