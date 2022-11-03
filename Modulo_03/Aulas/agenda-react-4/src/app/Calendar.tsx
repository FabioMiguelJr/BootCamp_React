import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";
import Icon from "@material-ui/core/Icon";
import { ICalendar, IEvent } from "./backend";
import React from "react";
import { getToday } from "./dateFunction";

const DAYS_OF_WEEK = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

const useStyles = makeStyles({
	table: {
		borderTop: "1px solid rgb(224, 224, 224)",
		minHeight: "100%",
		tableLayout: "fixed",
		"& td ~ td, & th ~ th": {
			borderLeft: "1px solid rgb(224, 224, 224)",
		},
		"& td": {
			verticalAlign: "top",
			overflow: "hidden",
			padding: "8px 4px",
		},
	},
	dayOfMonth: {
		display: "inline-block",
		fontWeight: 500,
		width: "24px",
		lineHeight: "24px",
		marginBottom: "4px",
		borderRadius: "50%",
		"&.today": {
			backgroundColor: "#3f51b5",
			color: "white",
		},
	},
	event: {
		display: "flex",
		alignItems: "center",
		background: "none",
		border: "none",
		cursor: "pointer",
		textAlign: "left",
		whiteSpace: "nowrap",
		margin: "4px 0",
	},
	eventBackground: {
		display: "inline-block",
		color: "white",
		padding: "2px 4px",
		borderRadius: "4px",
	},
});

interface ICalendarProps {
	weeks: ICalenderCell[][];
	onClickDay: (date: string) => void;
	onClickEvent: (event: IEvent) => void;
}

export const Calendar = React.memo(function Calendar(props: ICalendarProps) {
	// Para alteração dos estilos dos componentes
	const classes = useStyles();

	const { weeks } = props;

	function handleClick(evt: React.MouseEvent, date: string) {
		if (evt.target === evt.currentTarget) {
			props.onClickDay(date);
		}
	}

	return (
		<TableContainer style={{ flex: "1" }} component={"div"}>
			<Table className={classes.table} aria-label="a dense table">
				<TableHead>
					<TableRow>
						{DAYS_OF_WEEK.map((day) => (
							<TableCell align="center" key={day}>
								{day}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{weeks.map((week, i) => {
						return (
							<TableRow key={i}>
								{week.map((cell) => (
									<TableCell
										align="center"
										key={cell.date}
										onClick={(me) => handleClick(me, cell.date)}
									>
										<div
											className={
												classes.dayOfMonth +
												(cell.date === getToday() ? " today" : "")
											}
										>
											{cell.dayOfMonth}
										</div>
										{cell.events.map((event) => {
											const color = event.calendar.color;
											return (
												<button
													key={event.id}
													className={classes.event}
													onClick={() => {
														props.onClickEvent(event);
													}}
												>
													{event.time && (
														<>
															<Icon
																style={{ color }}
																fontSize="inherit"
															>
																watch_later
															</Icon>
															<Box component="span" margin="0 4px">
																{event.time}
															</Box>
														</>
													)}
													{event.time ? (
														<span> {event.desc}</span>
													) : (
														<span
															className={classes.eventBackground}
															style={{
																backgroundColor: color,
															}}
														>
															{" "}
															{event.desc}
														</span>
													)}
												</button>
											);
										})}
									</TableCell>
								))}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
});

// Bloco de funções e interfaces
export type IEventWithCalender = IEvent & { calendar: ICalendar };

export interface ICalenderCell {
	date: string;
	dayOfMonth: number;
	events: IEventWithCalender[];
}
