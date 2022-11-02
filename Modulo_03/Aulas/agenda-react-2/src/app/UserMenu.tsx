import { IconButton, Avatar, Icon, Menu, MenuItem, Box, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { IUser, signOutEndpoit } from "./backend";

const useStyles = makeStyles({
	useDetails: {
		borderBottom: "1px solid rgb(224, 224, 224)",
		padding: "16px",
		display: "flex",
		marginBotton: "8px",
		flexDirection: "column",
		alignItems: "center",
		"& > *": {
			marginBotton: "8px",
		},
	},
});

interface IUserMenu {
	onSignOut: () => void;
	user: IUser;
}

export function UserMenu(props: IUserMenu) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	function signOut() {
		signOutEndpoit();
		props.onSignOut();
	}

	return (
		<div>
			{/* <Button >
				Open Menu
			</Button> */}
			<IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
				<Avatar>
					<Icon>person</Icon>
				</Avatar>
			</IconButton>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<Box className={classes.useDetails}>
					<Avatar>
						<Icon>person</Icon>
					</Avatar>
					<div>{props.user.name}</div>
					<small>{props.user.email}</small>
				</Box>
				<MenuItem onClick={signOut}>Sair</MenuItem>
			</Menu>
		</div>
	);
}
