function Retangulo(altura, largura) {
    this.altura = altura;
    this.largura = largura;
    this.area = calculaArea;
}

function calculaArea() {
    return this.altura * this.largura;
}
