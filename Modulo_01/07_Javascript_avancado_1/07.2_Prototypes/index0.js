// EXEMPLO PROTOTYPE - HERANÇA.

function Carro() {
    this.propietario = "Fábio";
    this.ano = 2013;
}
Carro.prototype.getAno = function () {
    console.log("Ano: " + this.Ano);
    return this.ano;
};
let carObject = new Carro();
