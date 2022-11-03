import CalendarScreen from "./CalendarScreen";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { getToday } from "./dateFunction";
import { useEffect, useState } from "react";
import { getUserEndpoit, IUser } from "./backend";
import { LoginScreen } from "./LoginScreen";
import { authContext } from "./authContext";

function App() {
	const month = getToday().substring(0, 7);

	// const [hasSession, setHasSession] = useState<boolean>(false);
	const [user, setUser] = useState<IUser | null>(null);

	useEffect(() => {
		getUserEndpoit().then(setUser, onSignOut);
	}, []);

	function onSignOut() {
		setUser(null);
	}

	if (user) {
		return (
			<authContext.Provider value={{ user, onSignOut }}>
				<Router>
					<Switch>
						<Route path="/calendar/:month">
							<CalendarScreen />
						</Route>
						<Redirect to={{ pathname: "/calendar/" + month }} />
					</Switch>
				</Router>
			</authContext.Provider>
		);
	} else {
		return (
			<div>
				{" "}
				<LoginScreen onSignIn={setUser} />{" "}
			</div>
		);
	}
}

export default App;
