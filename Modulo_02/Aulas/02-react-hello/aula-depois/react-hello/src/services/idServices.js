import { v4 as uuid } from "uuid";

export function getNewID() {
	return uuid();
}
