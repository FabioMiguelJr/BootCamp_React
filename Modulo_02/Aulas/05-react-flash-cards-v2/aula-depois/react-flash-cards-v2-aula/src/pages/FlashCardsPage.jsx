import { Fragment, useEffect, useState } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Header from "../components/Header";
import Main from "../components/Main";
import FlashCards from "../components/FlashCards";
import FlashCard from "../components/FlashCard";
import Button from "../components/Button";
import RadioButton from "../components/RadioButton";
import Loading from "../components/Loading";
import Error from "../components/Error";

import { helperShuffleArray } from "../helpers/arrayHelpers";
import {
	createFlashCard,
	deleteFlashCard,
	getAllFlashCards,
	updateFlashCard,
} from "../services/apiService";
import FlashCardItem from "../components/FlashCardItem";
import FlashCardForm from "../components/FlashCardForm";

export default function FlashCardsPage() {
	// Back end
	const [allCards, setAllCards] = useState([]);

	// Exclusivo para estudo
	const [studyCards, setStudyCards] = useState([]);

	const [loading, setLoading] = useState(true);
	const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);
	const [error, setError] = useState("");
	const [createMode, setCreateMode] = useState(true);
	const [selectedTab, setSelectedTab] = useState(0);
	const [selectedFlashCard, setSelectedFlashCard] = useState(null);

	useEffect(() => {
		// Promise
		// getAllFlashCards().then((allFlashCards) => {
		// 	setAllCards(allFlashCards);
		// });

		// IIFE
		// (async function getAllCards() {
		// 	const backEndAllcards = await getAllFlashCards();
		// 	setAllCards(backEndAllcards);
		// })();

		async function getAllCards() {
			try {
				const backEndAllcards = await getAllFlashCards();
				setAllCards(backEndAllcards);
				setLoading(false);
			} catch (error) {
				setError(error.message);
			}
		}
		getAllCards();
	}, []);

	function handleShuffle() {
		const shuffledCards = helperShuffleArray(studyCards);

		setStudyCards(shuffledCards);
	}

	useEffect(() => {
		setStudyCards(allCards.map((card) => ({ ...card, showTitle: true })));
	}, [allCards]);

	function handleRadioShowDescriptionClick() {
		const updatedCards = [...studyCards].map((card) => ({ ...card, showTitle: false }));

		setStudyCards(updatedCards);
		setRadioButtonShowTitle(false);
	}

	function handleRadioShowTitleClick() {
		const updatedCards = [...studyCards].map((card) => ({ ...card, showTitle: true }));

		setStudyCards(updatedCards);
		setRadioButtonShowTitle(true);
	}

	function handleToggleFlashCard(cardId) {
		const updatedCards = [...studyCards];
		const cardIndex = updatedCards.findIndex((card) => card.id === cardId);
		updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;

		setStudyCards(updatedCards);
	}

	async function handleDeleteFlashCard(cardId) {
		try {
			//Back-end
			await deleteFlashCard(cardId);
			//Front-end
			setAllCards(allCards.filter((card) => card.id !== cardId));
			setError("");
		} catch (error) {
			setError(error.message);
		}
	}

	function handleEditFlashCard(card) {
		setCreateMode(false);
		setSelectedTab(1);
		setSelectedFlashCard(card);
	}

	function handleNewFlashCard() {
		setCreateMode(true);
		setSelectedFlashCard(null);
	}

	function handleTabSelect(tabIndex) {
		setSelectedTab(tabIndex);
	}

	async function handlePersist(title, description) {
		if (createMode) {
			try {
				//Back-end
				const newFlashCard = await createFlashCard(title, description);
				//Front-end
				setAllCards([...allCards, newFlashCard]);
				setError("");
			} catch (error) {
				setError(error.message);
			}
		} else {
			try {
				// Back-end
				await updateFlashCard(selectedFlashCard.id, title, description);
				// Front-end
				setAllCards(
					allCards.map((card) => {
						if (card.id === selectedFlashCard.id) {
							return { ...card, title, description };
						}
						return card;
					})
				);
				setSelectedFlashCard(null);
				setCreateMode(true);
				setError("");
			} catch (error) {
				setError(error.message);
			}
		}
	}

	let mainJsx = (
		<div className="flex justify-center my-4">
			<Loading></Loading>
		</div>
	);

	if (error) {
		mainJsx = <Error>{error}</Error>;
	}

	if (!loading && !error) {
		mainJsx = (
			<Fragment>
				<Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
					<TabList>
						<Tab>Listagem</Tab>
						<Tab>Cadastro</Tab>
						<Tab>Estudo</Tab>
					</TabList>

					<TabPanel>
						{allCards.map((flashCard) => {
							return (
								<FlashCardItem
									key={flashCard.id}
									onDelete={handleDeleteFlashCard}
									onEdit={handleEditFlashCard}
								>
									{flashCard}
								</FlashCardItem>
							);
						})}
					</TabPanel>

					<TabPanel>
						<div className="my-4">
							<Button onButtonClick={handleNewFlashCard}>Novo Flash Card</Button>
						</div>
						<FlashCardForm createMode={createMode} onPersist={handlePersist}>
							{selectedFlashCard}
						</FlashCardForm>
					</TabPanel>

					<TabPanel>
						<div className="text-center mb-4">
							<Button onButtonClick={handleShuffle}>Embaralhar cards</Button>
						</div>

						<div className="flex flex-row items-center justify-center space-x-4 m-4">
							<RadioButton
								id="radioButtonShowTitle"
								name="showInfo"
								buttonChecked={radioButtonShowTitle}
								onButtonClick={handleRadioShowTitleClick}
							>
								Mostrar título
							</RadioButton>

							<RadioButton
								id="radioButtonShowDescription"
								name="showInfo"
								buttonChecked={!radioButtonShowTitle}
								onButtonClick={handleRadioShowDescriptionClick}
							>
								Mostrar descrição
							</RadioButton>
						</div>

						<FlashCards>
							{studyCards.map(({ id, title, description, showTitle }) => {
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
					</TabPanel>
				</Tabs>
			</Fragment>
		);
	}

	return (
		<>
			<Header>react-flash-cards-v2</Header>
			<Main>{mainJsx}</Main>
		</>
	);
}
