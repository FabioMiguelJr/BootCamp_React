import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getCalendarsEndpoit, getEventsEndpoit, ICalendar, IEvent } from "./backend";
import { getToday, todayStr } from "./dateFunction";
import { useParams } from "react-router-dom";
import { CalendarsView } from "./CalendarsView";
import { CalendarHeader } from "./CalendarHeader";
import { Calendar } from "./Calendar";
import { ICalenderCell, IEventWithCalender } from "./Calendar";
import EventFormDialog from "./EventFormaDialog";
import { IEditingEvent } from "./backend";

export default function CalendarScreen() {
	const { month } = useParams<{ month: string }>();

	const [events, setEvents] = useState<IEvent[]>([]);
	const [calendars, setCalendars] = useState<ICalendar[]>([]);
	const [calendarsSelected, setCalendarsSelected] = useState<boolean[]>([]);
	const [editingEvent, setEditingEvent] = useState<IEditingEvent | null>(null);

	// const weeks = generateCalendar(month + "-01", events, calendars, calendarsSelected);
	const weeks = useMemo(() => {
		return generateCalendar(month + "-01", events, calendars, calendarsSelected);
	}, [month, events, calendars, calendarsSelected]);

	const firstDate = weeks[0][0].date;
	const lastDate = weeks[weeks.length - 1][6].date;

	useEffect(() => {
		Promise.all([getCalendarsEndpoit(), getEventsEndpoit(firstDate, lastDate)]).then(
			([calendars, events]) => {
				setCalendarsSelected(calendars.map(() => true));
				setCalendars(calendars);
				setEvents(events);
			}
		);
	}, [firstDate, lastDate]);

	function refreshEvent() {
		getEventsEndpoit(firstDate, lastDate).then(setEvents);
	}

	const toggleCalendar = useCallback(
		(i: number) => {
			const newValue = [...calendarsSelected];
			newValue[i] = !newValue[i];
			setCalendarsSelected(newValue);
		},
		[calendarsSelected]
	);

	const openNewEvent = useCallback(
		(date: string) => {
			setEditingEvent({
				date,
				desc: "",
				calendarId: calendars[0].id,
			});
		},
		[calendars]
	);

	return (
		<Box display="flex" height="100%" alignItems="stretch">
			<Box borderRight="1px solid rgb(224, 224, 224)" width="16em" padding="8px 16px">
				<h2>Agenda React</h2>
				<Button
					variant="contained"
					color="primary"
					onClick={() => openNewEvent(getToday())}
				>
					Novo Evento
				</Button>
				<CalendarsView
					calendars={calendars}
					toggleCalendar={toggleCalendar}
					calendarsSelected={calendarsSelected}
				/>
			</Box>
			<Box flex="1" display="flex" flexDirection="column">
				<CalendarHeader month={month} />
				<Calendar weeks={weeks} onClickDay={openNewEvent} onClickEvent={setEditingEvent} />
				<EventFormDialog
					event={editingEvent}
					onCancel={() => setEditingEvent(null)}
					onSave={() => {
						setEditingEvent(null);
						refreshEvent();
					}}
					calendars={calendars}
				/>
			</Box>
		</Box>
	);
}

function generateCalendar(
	date: string,
	allEvents: IEvent[],
	allCalendars: ICalendar[],
	allCalendarsSelected: boolean[]
): ICalenderCell[][] {
	const weeks: ICalenderCell[][] = [];
	const jsDate = new Date(date + "T12:00:00");
	const currentMonth = jsDate.getMonth();

	const currentDay = new Date(jsDate.valueOf());
	currentDay.setDate(1);
	const dayOfWeek = currentDay.getDay();
	currentDay.setDate(1 - dayOfWeek);

	do {
		const week: ICalenderCell[] = [];
		for (let i = 0; i < 7; i++) {
			const isoDate = todayStr(currentDay);

			const events: IEventWithCalender[] = [];

			for (const event of allEvents) {
				if (event.date === isoDate) {
					const calIndex = allCalendars.findIndex((cal) => cal.id === event.calendarId);
					if (allCalendarsSelected[calIndex]) {
						events.push({ ...event, calendar: allCalendars[calIndex] });
					}
				}
			}

			week.push({
				dayOfMonth: currentDay.getDate(),
				date: isoDate,
				events,
			});
			currentDay.setDate(currentDay.getDate() + 1);
		}
		weeks.push(week);
	} while (currentDay.getMonth() === currentMonth);

	return weeks;
}
