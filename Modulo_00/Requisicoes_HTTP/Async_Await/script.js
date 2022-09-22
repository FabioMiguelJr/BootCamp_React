// função auxiliar para a função soluction2
function fetchJson(url) {
    return fetch(url).then((r) => {
        return r.json();
    });
}

function soluction2() {
    fetchJson("http://localhost:3000/employees").then((employees) => {
        fetchJson("http://localhost:3000/roles").then((roles) => {
            let table = renderTable(employees, roles);
            document.getElementById("app").innerHTML = table;
        });
    });
}

//soluction2();

function soluction3() {
    Promise.all([fetchJson("http://localhost:3000/employees"), fetchJson("http://localhost:3000/roles")]).then(
        ([employees, roles]) => {
            let table = renderTable(employees, roles);
            document.getElementById("app").innerHTML = table;
        }
    );
}

// soluction3();

async function soluction4() {
    let employees = await fetchJson("http://localhost:3000/employees");
    let roles = await fetchJson("http://localhost:3000/roles");

    let table = renderTable(employees, roles);
    document.getElementById("app").innerHTML = table;
}

// soluction4();

async function soluction5() {
    let [employees, roles] = await Promise.all([
        fetchJson("http://localhost:3000/employees"),
        fetchJson("http://localhost:3000/roles"),
    ]);

    let table = renderTable(employees, roles);
    document.getElementById("app").innerHTML = table;
}

soluction5();

function renderTable(employees, roles) {
    let rows = employees.map((employee) => {
        let role = roles.find((role) => role.id == employee.role_id);
        return `<tr><td> ${employee.id} </td><td> ${employee.name} </td><td> ${role.name} </td></tr>`;
    });
    return `<table> ${rows.join("")} </table>`;
}
