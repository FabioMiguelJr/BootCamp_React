import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TemporadasScreen from "./TemporadasScreen";

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/temporadas">
					<TemporadasScreen />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
