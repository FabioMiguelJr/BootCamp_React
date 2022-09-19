/* Declaração de classe */
class Retangulo {
    constructor(altura, largura) {
        this.altura = altura;
        this.largura = largura;
    }

    area() {
        return this.altura * this.largura;
    }

    imprimeNome() {
        console.log("Retângulo");
    }
}

/* Declaração de class com heraqnça */
class Quadrado extends Retangulo {
    constructor(dimensao) {
        super(dimensao, dimensao);
    }

    /* Sobrescrita de membros */
    imprimeNome() {
        console.log("Quadrado");
    }
}

/* Instanciando a classe Retângulo (criando objetos) */
var r1 = new Retangulo(3, 4);
var r2 = new Retangulo(3, 8);
r2.imprimeNome();

/* Instanciando a classe Quadrado (criando objetos) 
   que herda os atributos e eventos de Retangulo    */
var q1 = new Quadrado(6);
q1.imprimeNome();

/* OBS: EM JAVASCRIPT NÃO É POSSÍVEL ENCAPSULAR DADOS */
