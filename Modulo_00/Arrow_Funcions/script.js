function soma(a, b) {
    return a + b;
}

function Retangulo(altura, largura) {
    this.altura = altura;
    this.largura = largura;
    this.area = function () {
        return this.altura * this.largura;
    };
}

// Codificando com Arrow Function

var somaV2 = (a, b) => {
    return a + b;
};

function RetanguloV2(altura, largura) {
    this.altura = altura;
    this.largura = largura;
    this.area = () => this.altura * this.largura;
}

var r1 = new RetanguloV2(1, 2);

var imprimeMensagem = (m) => console.log(m);
