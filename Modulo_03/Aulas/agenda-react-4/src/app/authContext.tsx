import { createContext } from "react";
import { IUser } from "./backend";

export interface IAuthContext {
	user: IUser;
	onSignOut: () => void;
}

export const authContext = createContext<IAuthContext>({
	user: {
		name: "Anônimo",
		email: "",
	},
	onSignOut: () => {},
});
