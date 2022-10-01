let Carro = {
    proprietario: "Fábio",
    ano: 2026,
};

const handler = {
    get(target, property, receiver) {
        console.log(`GET ${property}`);
        if (property in target) {
            return target[property];
        }
        return "Propriedade inexistente";
    },
    set(target, property, value) {
        if (typeof value == "string") {
            target[property] = value;
            return true;
        } else {
            return false;
        }
    },
};

let carroProxy = new Proxy(Carro, handler);
/* 
console.log(Carro.ano);
console.log(carroProxy.ano);

console.log(Carro.modelo);
console.log(carroProxy.modelo);

 */

//EXEMPLO PROXY PARA TRADUTOR.
let tradutor = {
    "Um Carro": "A Car",
    "Um Ano": "A Year",
};

let handler1 = {
    get(target, property) {
        if (property in target) {
            return target[property];
        }
        return property;
    },
};

let tradutorProxy = new Proxy(tradutor, handler1);

console.log(tradutorProxy["Um Carro"]);
console.log(tradutorProxy["Modelo"]);

tradutorProxy["Modelo"] = "model";
tradutorProxy["Marca"] = 123456;

console.log(tradutorProxy["Modelo"]);
console.log(tradutorProxy["Marca"]);
