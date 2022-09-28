const relogio = document.getElementById("relogio");
const btn = document.getElementById("btn");
let interval;

function inicia() {
    relogio.textContent = formataHora(new Date());
    interval = setInterval(() => {
        relogio.textContent = formataHora(new Date());
    }, 1000);
    btn.textContent = "Para Relógio";
}
//inicia();

function para() {
    clearInterval(interval);
    interval = undefined;
    btn.textContent = "Inicia relógio";
}

function iniciaOuPara() {
    if (interval) {
        console.log("Parou");
        para();
    } else {
        console.log("Iniciou");
        inicia();
    }
}

function formataHora(date) {
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    const s = date.getSeconds().toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
}
