let employeesPromise = fetch("http://localhost:3000/employees");
//
//console.log("log 1");
employeesPromise.then((resp) => {
    resp.json().then((employees) => {
        //console.log(employees);
        //console.log("log 2");
        let table = renderTable(employees);
        document.getElementById("app").innerHTML = table;
    });
    //console.log("log 3");
});
//console.log("log 4");

function renderTable(employees) {
    let rows = employees.map((employee) => {
        return `<tr><td> ${employee.id} </td><td> ${employee.name} </td></tr>`;
    });
    return `<table> ${rows.join("")} </table>`;
}
