// ECMAScript 2015, mais conhecido como ES6

/* 
Melhorias no ES6
    ▪ Let + Const.
    ▪ Arrow functions.
    ▪ Classes.
    ▪ Template Strings.
    ▪ Destructing. ------> Importante
    ▪ Default + rest + spread. 
*/

// Let + Const

// Como era no ES5
if (true) {
    var v = "Aula";
}

console.log(v); // --> mesmo declarada dentro do um estrutura de bloco a variável continua global

// Como era no ES6

if (true) {
    let x = "Aula";
}

//console.log(x); // --> gera exceção devido ao escopo

const pi = Math.PI;

console.log(pi);

//pi = 3.14;

const Aluno = {
    nome: "Fábio",
    sobrenome: "Miguel",
};

console.log(Aluno.nome);
Aluno.nome = "Carlos";
console.log(Aluno.nome);

//Aluno = { nome: "Julia", sobrenome: "Silva" }; // gera exceção pois op objeto é constante

/*-----------------------------------------------------------------------------------------*/

// Arrow function
// ES5

var soma = function (a, b) {
    return a + b;
};

function soma1(a, b) {
    return a + b;
}

//ES6
let soma3 = (a, b) => {
    return a + b;
};

let soma4 = (a, b) => a + b;

let log = () => {
    console.log("Erro");
};

const Aluno1 = {
    nome: "Ana",
    getAluno: function () {
        return console.log(this);
    },
};

//Aluno1.getAluno();

const Aluno2 = {
    nome: "Ana",
    getAluno: () => {
        return console.log(this);
    },
};

Aluno2.getAluno();

/*-----------------------------------------------------------------------------------------*/

// Classes
// ES5

function Carro(marca) {
    this.marca = marca;
}

Carro.prototype.getMarca = function a() {};

//ES6

class Auto {
    constructor(marca) {
        this.marca = marca;
    }
    getMarca() {
        return this.marca;
    }
}

class Veiculo {
    constructor(marca, modelo) {
        this.marca = marca;
        this.modelo = modelo;
    }
    getMarca() {
        return this.marca;
    }
    getModelo() {
        return this.modelo;
    }
}

class Carro2 extends Veiculo {
    constructor(marca, modelo, estepe) {
        super(marca, modelo);
        this.estepe = estepe;
    }
    getInfo() {
        return console.log("Marca: " + super.getMarca() + " Modelo: ", super.getModelo());
    }
}

/*-----------------------------------------------------------------------------------------*/

// Template Strings
//ES5

var nome = "Fábio";
var idade = 51;
var curso = "Desenvolvedor React js";

var frase = nome + " tem " + idade + " anos e cursa " + curso;

console.log(frase);

//ES6

var frase1 = `${nome} tem ${idade} anos e cursa ${curso}`;

console.log(frase1);

/*-----------------------------------------------------------------------------------------*/

// Destructing

var carros = ["uno", "gol"];

//ES5
var car1 = carros[0];
var car2 = carros[1];

//ES6

let [a, b] = ["Uno", "Gol", "Onix"];

console.log(a);
console.log(b);

// Swap

[a, b] = [b, a];

console.log(a);
console.log(b);

// Destructing em Objetos

const c1 = { modelo: "Onix", ano: 2019 };

const { modelo, ano } = c1;

console.log(modelo);
console.log(ano);

const printCarInfo = ({ modelo, ano }) => console.log(`Modelo: ${modelo}, ano: ${ano}`);

printCarInfo(c1);

/*-----------------------------------------------------------------------------------------*/

//ES5
// DEFAULT + REST + SPREAD

var soma6 = function (a, b) {
    if (a === undefined) a = 1;
    if (b === undefined) b = 1;
    return a + b;
};

//ES6
let soma7 = (a = 1, b = 1) => a + b;

// Rest
function soma8(...valores) {
    return valores.reduce((anterior, atual) => {
        return anterior + atual;
    });
}

console.log(soma8(10, 10, 10));

// Spread

function soma9(a, b, c) {
    return a + b + c;
}

let numeros = [1, 2, 3];
let meuNome = "Fábio";

console.log(soma9(...numeros));

/*-----------------------------------------------------------------------------------------*/
//FOR OF - Arrays, maps, Strings, Sets

for (let numero of numeros) {
    console.log(numero);
}
for (let numero in numeros) {
    console.log(numero);
}

for (let n of meuNome) {
    console.log(n);
}

const aluno4 = {
    nome: "Pedro",
    idade: 27,
    curso: "Matemática",
    [Symbol.iterator]: function* () {
        yield this.nome;
        yield this.idade;
        yield this.curso;
    },
};

for (const al of aluno4) {
    console.log(al);
}

for (let al in aluno4) {
    console.log(al);
}
