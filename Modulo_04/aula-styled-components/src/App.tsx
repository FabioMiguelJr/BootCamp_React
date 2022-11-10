import React from "react";
import styled, { css, keyframes } from "styled-components";

const StyledHeader = styled.h1`
	color: #3636e9;
	font-size: 3em;
`;

const StyledData = styled("p")`
	font-size: 1.4em;
	font-weight: 700;
	color: #8d8dff;
`;

type TStyledButtonProps = {
	varient?: "success" | "failed";
};

const RotateKeyFrames = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`;

const Rotate = styled.div`
	animation: ${RotateKeyFrames} 0.5s;
`;

const name = "Fábio";
const text = `Meu nome é ${name}`;

const StyledButton = styled.button<TStyledButtonProps>`
	background-color: transparent;
	border-radius: 8px;
	border: 2px solid black;
	padding: 8px 16px;

	:hover {
		cursor: pointer;
		animation: ${RotateKeyFrames} 0.5s;
	}

	${(props) => {
		if (props.varient === "success") {
			return css`
				border-color: green;
				color: green;
			`;
		}
		if (props.varient === "failed") {
			return css`
				border-color: red;
				color: red;
			`;
		}
	}};
`;

function App() {
	return (
		<div className="App">
			<StyledHeader>Fábio Miguel</StyledHeader>
			<StyledData>fabio.migueljr@gmail.com</StyledData>
			<StyledData>+55-21-9-9212-5122</StyledData>
			<StyledData>Brasileiro</StyledData>

			<StyledButton varient="success">Adicionar</StyledButton>
			<StyledButton style={{ marginLeft: "8px" }} varient="failed">
				Remover
			</StyledButton>
			<StyledButton style={{ marginLeft: "8px" }}>Detalhes</StyledButton>
		</div>
	);
}

export default App;
