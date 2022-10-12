import React from "react";

export default function DateInput({ labelDescription = "Descrição do Label", inputValue = "2022-01-01", onInputChange = null, id = "Id_do_input_date", autoFocus = false }) {
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
			<input autoFocus={autoFocus} id={id} className="border p-1" type="date" value={inputValue} onChange={handleInputChange}></input>
		</div>
	);
}
