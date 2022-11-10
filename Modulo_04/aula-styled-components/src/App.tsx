import React from "react";
import styled from "styled-components";

const StyledHeader = styled.h1`
	color: #3636e9;
	font-size: 3em;
`;

const StyledData = styled("p")`
	font-size: 1.4em;
	font-weight: 700;
	color: #8d8dff;
`;

const StyledButton = styled.button`
	background-color: transparent;
	border-radius: 8px;
	border: 2px solid black;
	padding: 8px 16px;
	margin: 0.5em;
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
	return (
		<div className="App">
			<StyledHeader>Fábio Miguel</StyledHeader>
			<StyledData>fabio.migueljr@gmail.com</StyledData>
			<StyledData>+55-21-9-9212-5122</StyledData>
			<StyledData>Brasileiro</StyledData>

			<StyledSuccessButton>Adicionar</StyledSuccessButton>
			<StyledFailedButton>Remover</StyledFailedButton>
			<StyledButton>Detalhes</StyledButton>
		</div>
	);
}

export default App;
