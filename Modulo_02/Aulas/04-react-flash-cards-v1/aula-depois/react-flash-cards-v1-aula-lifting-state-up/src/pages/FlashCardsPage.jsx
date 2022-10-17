import React, { Fragment, useState } from "react";
import ButtonJS from "../components/ButtonJS";
import Cabecalho from "../components/Cabecalho";
import FlashCard from "../components/FlashCard";
import FlashCards from "../components/FlashCards";
import Principal from "../components/Principal";
import RadioButtonJS from "../components/RadioButtonJS";
import { allFlashCards } from "../data/allFlashCards";
import { helperShuffleArray } from "../helpers/arrayHelpers";

export default function FlashCardsPage() {
	const [allCards, setAllCards] = useState(allFlashCards);
	const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);

	function handleButtonClick() {
		const shuffledCards = helperShuffleArray(allCards);
		setAllCards(shuffledCards);
	}
	function handleRadioShowTitleClick() {
		const updatedCards = [...allCards].map((card) => ({ ...card, showTitle: true }));

		setAllCards(updatedCards);
		setRadioButtonShowTitle(true);
	}

	function handleRadioShowDescrClick() {
		const updatedCards = [...allCards].map((card) => ({ ...card, showTitle: false }));

		setAllCards(updatedCards);
		setRadioButtonShowTitle(false);
	}

	function handleToggleFlashCard(cardId) {
		const updatedCards = [...allCards];
		const cardIndex = updatedCards.findIndex((card) => card.id === cardId);
		updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;
		setAllCards(updatedCards);
	}

	return (
		<Fragment>
			<Cabecalho>React Flash Card v.1</Cabecalho>
			<Principal>
				<div className="text-center mb-4">
					<ButtonJS onButtonClick={handleButtonClick}>Embaralhar Cards</ButtonJS>
				</div>
				<div className="flex flex-row items-center justify-center space-x-4 m-4">
					<RadioButtonJS
						id="radioButtonShowTitle"
						name="showInfo"
						buttonChecked={radioButtonShowTitle}
						onButtonClick={handleRadioShowTitleClick}
					>
						Mostrar Título
					</RadioButtonJS>
					<RadioButtonJS
						id="radioButtonShowDescr"
						name="showInfo"
						buttonChecked={!radioButtonShowTitle}
						onButtonClick={handleRadioShowDescrClick}
					>
						Mostrar Descrição
					</RadioButtonJS>
				</div>
				<FlashCards>
					{allCards.map(({ id, title, description, showTitle }) => {
						return (
							<FlashCard
								key={id}
								id={id}
								title={title}
								description={description}
								showFlashCardTitle={showTitle}
								onToggleFlashCard={handleToggleFlashCard}
							/>
						);
					})}
				</FlashCards>
			</Principal>
		</Fragment>
	);
}
