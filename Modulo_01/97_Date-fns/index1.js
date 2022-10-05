import { format } from "date-fns";

let today = new Date();

console.log(today);

let todayFormatted = format(today, "dd.MM.yyyy");
console.log(todayFormatted);
