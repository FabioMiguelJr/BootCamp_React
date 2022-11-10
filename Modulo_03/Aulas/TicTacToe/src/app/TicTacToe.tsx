import { Action, PayloadAction } from "@reduxjs/toolkit";

type CellValue = "X" | "O" | "";

interface TicTacToeState {
	nextPlayer: "X" | "O";
	board: CellValue[][];
}

const initialState: TicTacToeState = {
	nextPlayer: "X",
	board: [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	],
};

type ActionPlay = PayloadAction<{ i: number; j: number }, "play">;
type ActionReset = Action<"reset">;

function TicTacToeReducer(state = initialState, action: ActionPlay | ActionReset): TicTacToeState {
	switch (action.type) {
		case "play":
			const board = state.board.map((row) => row.map((cell) => cell));
			return { nextPlayer: state.nextPlayer === "X" ? "O" : "X", board };
		case "reset":
	}
	return state;
}

export function TicTacToe() {
	const state: TicTacToeState = {
		nextPlayer: "O",
		board: [
			["", "", ""],
			["", "", ""],
			["", "", ""],
		],
	};

	return (
		<div className="ticTacToe">
			<div>Aguardando jogada de {state.nextPlayer}</div>
			<table>
				<tbody>
					{state.board.map((row, i) => (
						<tr key={i}>
							{row.map((cell, j) => (
								<td key={j}>{cell}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<button>Reiniciar Partida</button>
		</div>
	);
}
