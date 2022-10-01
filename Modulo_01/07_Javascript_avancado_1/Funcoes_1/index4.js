// EXEMPLO CLOSURE

function IMC() {
    let altura = 1.8;

    function calcula() {
        let peso = 70;
        console.log("IMC: " + peso / (altura * altura));
    }
    return calcula;
}

let imc = IMC();

//imc();

function carro() {
    proprietario = "Fábio";
    ano = 2020;

    this.getAno = function () {
        return ano;
    };
    this.getProprietario = function () {
        return proprietario;
    };
    this.setAno = function (a) {
        ano = a;
    };
}

let auto = new carro();

console.log(auto.proprietario);
console.log(auto.getProprietario());
console.log(auto.ano);
console.log(auto.getAno());
