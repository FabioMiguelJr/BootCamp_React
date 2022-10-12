import { Fragment, useEffect, useState } from "react";
import CheckboxInput from "./components/CheckboxInput";

import DateInput from "./components/DateInput";
import Header from "./components/Header";
import Main from "./components/Main";
import OnlineOffline from "./components/OnlineOffline";
import TextInput from "./components/TextInput";
import Timer from "./components/Timer";
import { getAgeFrom } from "./helpers/DateHelpers";
import { getNewID } from "./services/idServices";

export default function App() {
	const [name, setName] = useState("Fábio");
	const [birthDate, setBirthDate] = useState("1971-09-28");
	const [showTimer, setShowTimer] = useState(false);
	const [isOnline, setIsOnLine] = useState(true);

	useEffect(() => {
		document.title = name;
	}, [name]);

	useEffect(() => {
		// Online
		// Offline

		function toggleOnLine() {
			setIsOnLine(true);
		}

		function toggleOffLine() {
			setIsOnLine(false);
		}

		window.addEventListener("online", toggleOnLine);
		window.addEventListener("offline", toggleOffLine);

		return () => {
			window.removeEventListener("online", toggleOnLine);
			window.removeEventListener("offline", toggleOffLine);
		};
	}, []);

	function handleNameChange(newName) {
		setName(newName);
	}

	function handleBirthDateChange(newBirthDate) {
		setBirthDate(newBirthDate);
	}

	function toggleShowTimer() {
		setShowTimer((currentShowTimer) => !currentShowTimer);
	}

	return (
		<Fragment>
			<Header size="large">React Hello</Header>
			<Main>
				<OnlineOffline isOnLine={isOnline}></OnlineOffline>

				{showTimer && (
					<div className="text-right mt-1 font-semibold">
						<Timer />
					</div>
				)}

				<CheckboxInput labelDescription="Mostrar cronômetro" onCheckboxChange={toggleShowTimer} />

				<TextInput id={getNewID()} labelDescription="Digite o seu nome: " inputValue={name} onInputChange={handleNameChange}></TextInput>

				<DateInput id={getNewID()} labelDescription="Digite a sua data de Nascimento: " inputValue={birthDate} onInputChange={handleBirthDateChange}></DateInput>

				<p>
					O Seu Nome é {name}, com {name.length} caracteres e você possui {getAgeFrom(birthDate)} anos
				</p>
				<p>O Sua data de nascinmento é {birthDate}</p>
			</Main>
		</Fragment>
	);
}
