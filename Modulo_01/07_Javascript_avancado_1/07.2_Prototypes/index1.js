// EXEMPLO DE HERANÇA POR MEIO DE PROTÓTIPOS

function Pessoa(nome) {
    if (!nome) {
        this.nome = "Fulano";
    } else {
        this.nome = nome;
    }

    this.dizerOla = () => {
        console.log(this.nome + " diz Olá!");
    };
}

let pessoaA = new Pessoa("Alberto");

Pessoa.digaOla = function () {
    console.log("Olá, meu nome é: " + this.nome);
};

let pessoaB = new Pessoa("Maria");

console.log("\nprimeiro teste");
console.log("----------------------------------");

try {
    pessoaA.digaOla();
} catch (e) {
    console.log("Falha no pessoaA.digaOla");
}
try {
    pessoaB.digaOla();
} catch (e) {
    console.log("Falha no pessoaB.digaOla");
}

console.log("\nSegundo teste");
console.log("----------------------------------");

pessoaB.digaOla = function () {
    console.log("Olá, meu nome é: " + pessoaB.nome);
};

try {
    pessoaA.digaOla();
} catch (e) {
    console.log("Falha no pessoaA.digaOla");
}
try {
    pessoaB.digaOla();
} catch (e) {
    console.log("Falha no pessoaB.digaOla");
}

console.log("\nterceiro teste");
console.log("----------------------------------");

Pessoa.prototype.digaOla = function () {
    console.log("Olá, meu nome é: " + this.nome);
};

let pessoaC = new Pessoa("Ana");

try {
    pessoaA.digaOla();
} catch (e) {
    console.log("Falha no pessoaA.digaOla");
}
try {
    pessoaB.digaOla();
} catch (e) {
    console.log("Falha no pessoaB.digaOla");
}
try {
    pessoaC.digaOla();
} catch (e) {
    console.log("Falha no pessoaC.digaOla");
}

console.log("\nQuarto teste");
console.log("Sobrescrevendo função");
console.log("----------------------------------");

Pessoa.prototype.dizerOla = function () {
    console.log(this.nome + " vou dizer outro olá.");
};

pessoaB.dizerOla = function () {
    console.log(this.nome + " vou dizer outro olá.");
};

try {
    pessoaA.dizerOla();
} catch (e) {
    console.log("Falha no pessoaA.dizerOla");
}
try {
    pessoaB.dizerOla();
} catch (e) {
    console.log("Falha no pessoaB.dizerOla");
}
try {
    pessoaC.dizerOla();
} catch (e) {
    console.log("Falha no pessoaC.dizerOla");
}
