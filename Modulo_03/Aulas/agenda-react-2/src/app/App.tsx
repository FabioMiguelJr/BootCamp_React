import CalendarScreen from "./CalendarScreen";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { getToday } from "./dateFunction";
import { useEffect, useState } from "react";
import { getUserEndpoit, IUser } from "./backend";
import { LoginScreen } from "./LoginScreen";

function App() {
	const month = getToday().substring(0, 7);

	// const [hasSession, setHasSession] = useState<boolean>(false);
	const [user, setUser] = useState<IUser | null>(null);

	useEffect(() => {
		getUserEndpoit().then(setUser, signOut);
	}, []);

	function signOut() {
		setUser(null);
	}

	if (user) {
		return (
			<Router>
				<Switch>
					<Route path="/calendar/:month">
						<CalendarScreen user={user} onSingOut={signOut} />
					</Route>
					<Redirect to={{ pathname: "/calendar/" + month }} />
				</Switch>
			</Router>
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
