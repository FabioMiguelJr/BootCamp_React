import React from "react";
import { AiOutlineEdit as EditIcon, AiOutlineDelete as DeleteIcon } from "react-icons/ai";

export default function FlashCardItem({ children: flashCard, onDelete = null, onEdit = null }) {
	const { title, description } = flashCard;

	function handleDeleteIconClick() {
		if (onDelete) {
			onDelete(flashCard.id);
		}
	}

	function handleEditIconClick() {
		if (onEdit) {
			onEdit(flashCard);
		}
	}

	return (
		<div className="border p-2 m-2">
			<ul className="flex flex-col space-y-4">
				<li>
					<strong>Título: </strong> <span>{title}</span>
				</li>
				<li>
					<strong>Descrição: </strong> <span>{description}</span>
				</li>
			</ul>
			<div className="flex flex-row justify-end  space-x-2">
				<EditIcon onClick={handleEditIconClick} className="cursor-pointer" size={24} />
				<DeleteIcon onClick={handleDeleteIconClick} className="cursor-pointer" size={24} />
			</div>
		</div>
	);
}
