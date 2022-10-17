import React from "react";

export default function FlashCard({
	id,
	title = "Título do Card",
	description = "Descrição do Card, que pode conter mais palacvras que o título",
	showFlashCardTitle = true,
	onToggleFlashCard = null,
}) {
	function handleCardClick() {
		if (onToggleFlashCard) {
			onToggleFlashCard(id);
		}
	}

	const fontSizeClassName = showFlashCardTitle ? "text-xl" : "text-md";

	return (
		<div
			className={`border shadow-lg p-4 m-2
                        w-80 h-48 flex cursor-pointer
                        flex-row items-center 
                        justify-center font-semibold 
                        ${fontSizeClassName}`}
			style={{ fontFamily: "'JetBrains Mono', monospace" }}
			onClick={handleCardClick}
		>
			{showFlashCardTitle ? title : description}
		</div>
	);
}
