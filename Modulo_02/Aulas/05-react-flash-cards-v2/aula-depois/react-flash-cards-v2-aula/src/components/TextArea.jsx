import React from "react";
import { getNewId } from "../services/idService";

export default function TextArea({
	labelDescription = "Descrição do label:",
	textAreaValue = "Valor padrão do input area",
	onTextAreaChange = null,
	id = getNewId(),
	maxLength = 230,
	rows = 4,
}) {
	function handleInputChange({ currentTarget }) {
		if (onTextAreaChange) {
			const newValue = currentTarget.value;
			onTextAreaChange(newValue);
		}
	}

	const currentCharacterCount = textAreaValue.length;

	return (
		<div className="flex flex-col my-4">
			<label className="text-sm mb-1" htmlFor={id}>
				{labelDescription}
			</label>

			<textarea
				id={id}
				className="border p-1"
				type="text"
				value={textAreaValue}
				maxLength={maxLength}
				rows={rows}
				onChange={handleInputChange}
			/>

			<div className="text-right mr-1">
				<span>
					{currentCharacterCount}/{maxLength}
				</span>
			</div>
		</div>
	);
}
