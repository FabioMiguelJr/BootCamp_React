import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { ICalendar } from "./backend";
import React from "react";

interface ICalendarViewProps {
	calendars: ICalendar[];
	calendarsSelected: boolean[];
	toggleCalendar: (i: number) => void;
}

export const CalendarsView = React.memo(function (props: ICalendarViewProps) {
	const { calendars, calendarsSelected, toggleCalendar } = props;
	return (
		<Box marginTop="64px">
			<h4>Agendas</h4>
			{calendars.map((calendar: ICalendar, i) => (
				<div key={calendar.id}>
					<FormControlLabel
						control={
							<Checkbox
								style={{ color: calendar.color }}
								checked={calendarsSelected[i]}
								onChange={() => toggleCalendar(i)}
							/>
						}
						label={calendar.name}
					/>
				</div>
			))}
		</Box>
	);
});
