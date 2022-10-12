import React from "react";

export default function TextInput({ labelDescription = "Descrição do Label", inputValue = "Valor padrão do input", onInputChange = null, id = "Id_do_Input_text", autoFocus = true }) {
	function handleInputChange({ currentTarget }) {
		if (onInputChange) {
			const newValue = currentTarget.value;
			onInputChange(newValue);
		}
	}
	return (
		<div className="flex flex-col my-4">
			<label className="text-sm mb-1" htmlFor={id}>
				{labelDescription}
			</label>
			<input autoFocus={autoFocus} id={id} className="border p-1" type="text" value={inputValue} onChange={handleInputChange}></input>
		</div>
	);
}
