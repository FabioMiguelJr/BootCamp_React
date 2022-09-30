// Busca produtos de beleza
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

const baseURL = "";

export function listOfProducts() {
    return fetchJson(`http://makeup-api.herokuapp.com/api/v1/products.json`);
}

export function verifyImg(url) {
    fetch(url).then((r) => {
        if (r.ok) {
            return url;
        } else {
            return "img/unavailable.png";
        }
    });
}

// function updateEmployee(id, employee) {
//     return fetchJson(`${baseURL}/employees/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(employee),
//     });
// }

// function createEmployee(employee) {
//     return fetchJson(`${baseURL}/employees`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(employee),
//     });
// }

// function deleteEmployee(id) {
//     fetchJson(`${baseURL}/employees/${id}`, {
//         method: "DELETE",
//     });
// }
