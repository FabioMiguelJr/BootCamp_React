import { create, exclude, read, edit } from "./httpService";
import { getNewId } from "./idService";

//const URL = "http://localhost:3001/flashcards";

export async function getAllFlashCards() {
	const allFlashCards = await read("/flashcards");
	return allFlashCards;
}

export async function deleteFlashCard(cardId) {
	await exclude(`/flashcards/${cardId}`);
}

export async function createFlashCard(title, description) {
	const newFlashCard = await create("/flashcards", { id: getNewId(), title, description });
	return newFlashCard;
}

export async function updateFlashCard(cardId, title, description) {
	const updatedFlashCard = edit(`/flashcards/${cardId}`, { title, description });
	return updatedFlashCard;
}
