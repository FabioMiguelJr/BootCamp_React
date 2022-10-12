import React from "react";

export default function CheckboxInput({ labelDescription = "Descrição do Checkbox", inputValue = "Valor padrão do input", onCheckboxChange = null, id = "Id_do_Input_checkbox", autoFocus = false }) {
	function handleInputChange() {
		if (onCheckboxChange) {
			onCheckboxChange();
		}
	}
	return (
		<div className="flex flex-row items-center space-x-2 my-4">
			<input autoFocus={autoFocus} id={id} className="border p-1" type="checkbox" value={inputValue} onChange={handleInputChange}></input>
			<label className="text-sm" htmlFor={id}>
				{labelDescription}
			</label>
		</div>
	);
}
