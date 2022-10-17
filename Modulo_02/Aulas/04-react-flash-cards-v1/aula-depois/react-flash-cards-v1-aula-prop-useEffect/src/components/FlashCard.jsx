import React, { useEffect, useState } from "react";

export default function FlashCard({
	title = "Título do Card",
	description = "Descrição do Card, que pode conter mais palacvras que o título",
	showFlashCardTitle = true,
}) {
	const [showTitle, setShowTitle] = useState(showFlashCardTitle);

	useEffect(() => {
		setShowTitle(showFlashCardTitle);
	}, [showFlashCardTitle]);

	function handleCardClick() {
		//setShowTitle(!showTitle);
		setShowTitle((currentShowTitle) => !currentShowTitle);
	}

	const fontSizeClassName = showTitle ? "text-xl" : "text-md";

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
			{showTitle ? title : description}
		</div>
	);
}
