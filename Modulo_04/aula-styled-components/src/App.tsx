import React, { useState } from "react";
import styled, { keyframes, ThemeProvider } from "styled-components";

const StyledHeader = styled.h1`
	/* color: #3636e9; */
	color: ${(props) => props.theme.main};
	font-size: 3em;
`;

const StyledData = styled("p")`
	color: ${(props) => props.theme.secondary};
	font-size: 1.4em;
	font-weight: 700;
`;

const themeBlue = {
	main: "blue",
	secondary: "8d8dff",
};

const themeRed = {
	main: "red",
	secondary: "ff4343",
};

const StyledButton = styled.button`
	background-color: transparent;
	border-radius: 8px;
	border: 2px solid black;
	padding: 8px 16px;
	margin: 0.5em;
	:hover {
		cursor: pointer;
		background-color: #f2f2f2;
	}
`;

const StyledSuccessButton = styled(StyledButton)`
	border-color: green;
	color: green;
`;

const StyledFailedButton = styled(StyledButton)`
	border-color: red;
	color: red;
`;

function App() {
	const [theme, setTheme] = useState(themeBlue);

	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<StyledHeader>Fábio Miguel</StyledHeader>
				<div>
					<StyledButton
						onClick={() => {
							setTheme(themeBlue);
						}}
					>
						Set Blue Theme
					</StyledButton>
					<StyledButton
						onClick={() => {
							setTheme(themeRed);
						}}
					>
						Set Red Theme
					</StyledButton>
				</div>
				<StyledData>fabio.migueljr@gmail.com</StyledData>
				<StyledData>+55-21-9-9212-5122</StyledData>
				<StyledData>Brasileiro</StyledData>

				<StyledSuccessButton>Adicionar</StyledSuccessButton>
				<StyledFailedButton>Remover</StyledFailedButton>
				<StyledButton>Detalhes</StyledButton>
			</ThemeProvider>
		</div>
	);
}

export default App;
