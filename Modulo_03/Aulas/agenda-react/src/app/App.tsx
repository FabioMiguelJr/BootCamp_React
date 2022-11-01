import CalendarScreen from "./CalendarScreen";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { getToday } from "./dateFunction";

function App() {
	const month = getToday().substring(0, 7);

	interface MeuTipo {
		descricao: string;
	}

	return (
		<Router>
			<Switch>
				<Route path="/calendar/:month">
					<CalendarScreen />
				</Route>
				<Redirect to={{ pathname: "/calendar/" + month }} />
			</Switch>
		</Router>
	);
}

export default App;
