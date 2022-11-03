import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { formatMonth, addMonth } from "./dateFunction";
import { Link } from "react-router-dom";
import { UserMenu } from "./UserMenu";
import React from "react";

interface ICalendarHeaderProps {
	month: string;
}

export const CalendarHeader = React.memo(function (props: ICalendarHeaderProps) {
	const { month } = props;
	return (
		<Box display="flex" alignItems="center" padding="8px 16px">
			<Box flex="1">
				<IconButton
					aria-label="Mês Anterior"
					component={Link}
					to={"/calendar/" + addMonth(month, false)}
				>
					<Icon>chevron_left</Icon>
				</IconButton>
				<IconButton
					aria-label="Próximo Mês"
					component={Link}
					to={"/calendar/" + addMonth(month, true)}
				>
					<Icon>chevron_right</Icon>
				</IconButton>
				<Box marginLeft="16px" component="strong">
					{formatMonth(month)}
				</Box>
			</Box>
			<Box>
				<UserMenu />
			</Box>
		</Box>
	);
});
