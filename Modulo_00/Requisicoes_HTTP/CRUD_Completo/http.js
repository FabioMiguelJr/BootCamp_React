// função auxiliar
function fetchJson(url, option) {
    return fetch(url, option)
        .then((r) => {
            if (r.ok) {
                return r.json();
            } else {
                throw new Error(r.statusText);
            }
        })
        .catch((error) => {
            showError("Error loading data", error);
            throw error;
        });
}

const baseURL = "http://localhost:3000";

function listEmployees() {
    return fetchJson(`${baseURL}/employees`);
}

function listRoles() {
    return fetchJson(`${baseURL}/roles`);
}

function updateEmployee(id, employee) {
    return fetchJson(`${baseURL}/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
    });
}

function createEmployee(employee) {
    return fetchJson(`${baseURL}/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
    });
}

function deleteEmployee(id) {
    fetchJson(`${baseURL}/employees/${id}`, {
        method: "DELETE",
    });
}
