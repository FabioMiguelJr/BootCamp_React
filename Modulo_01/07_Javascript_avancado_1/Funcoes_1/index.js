// EXEMPLO DE ESCOPO DE BLOCO

if (true) {
    // Escopo de bloco, a variável só definida aqui
    const message = "olá";
    console.log(message);
}
// console.log(message); ReferenceError: message is not defined

for (const color of ["verde", "vermelho", "amarelo"]) {
    const message = "olá";

    // Da mesma forma estas duas variáveis pertencem ao escopo do "for"
    console.log(color);
    console.log(message);
}

// A referencia a essas duas variáveis aqui produzirá erro
// console.log(color);
// console.log(message);

// EXEMPLO DE ESCOPO DE BLOCO COM VAR
if (true) {
    var count = 0;
    console.log(count);
}

// Embora esteja declarada dentro do bloco de "if" acima por ser declarada com "var"
// ela é de escopo global
// console.log(count);

// EXEMPLO DE ESCOPO LOCAL COM VAR
function executar() {
    var text = "Escopo local com VAR";
    console.log(text);
}
executar();
// console.log(text);

// EXEMPLO DE ESCOPO LOCAL COM LET E CONST
function executar1() {
    let count1 = 0;
    const test = 2;

    function executar2() {}

    console.log(count1);
    console.log(test);
    console.log(executar2);
}

executar1();
// console.log(count1);
// console.log(executar2);
// console.log(test);

// ESCOPO ANINHADO
function executar2() {
    const txt = "Escopo aninhado";
    if (true) {
        const name = "Carro";
        console.log(txt);
    }
    //console.log(name);
}

executar2();

// EXEMPLO DE ESCOPO GLOBAL
let gName = "Bruno";

console.log(gName);

// EXEMPLO DE HOISTING

printName();

function printName() {
    console.log("Nome: " + gName);
}
