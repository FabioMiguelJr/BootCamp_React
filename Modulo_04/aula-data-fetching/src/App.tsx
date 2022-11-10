import styled from "styled-components";

const StyledButton = styled.button`

	background-color: red;
`;

function App() {
	return (
		<div>
			<span>Algum texto...</span>
			<StyledButton>Botão</StyledButton>
		</div>
	);
}

export default App;
