import React from "react";
import { getNewId } from "../services/idService";

export default function RadioButtonJS({
	id = getNewId(),
	name = "radioButtonName",
	children: buttonDescription = "Descrição do Botão",
	buttonChecked = false,
	onButtonClick = null,
}) {
	function handleRadioButtonChange() {
		if (onButtonClick) {
			onButtonClick();
		}
	}
	return (
		<div className="space-x-2">
			<input
				id={id}
				type="radio"
				name={name}
				checked={buttonChecked}
				onChange={handleRadioButtonChange}
			/>
			<label htmlFor={id}>{buttonDescription}</label>
		</div>
	);
}
