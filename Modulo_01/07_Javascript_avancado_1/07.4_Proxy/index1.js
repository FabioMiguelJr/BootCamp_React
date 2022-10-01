// EXEMPLO DE PROXY COM REFLECT

let tradutor = {
    "Um Carro": "A Car",
    "Um Ano": "A Year",
};

let handler1 = {
    get(target, property) {
        if (property in target) {
            return Reflect.get(target, property);
        }
        return property;
    },
    set(target, property, value) {
        if (typeof value == "string") {
            return Reflect.set(target, property, value);
        } else {
            return false;
        }
    },
};

tradutor = new Proxy(tradutor, handler1);

console.log(tradutor["Um Carro"]);
console.log(tradutor["Modelo"]);

tradutor["Modelo"] = "model";
tradutor["Marca"] = 123456;

console.log(tradutor["Modelo"]);
console.log(tradutor["Marca"]);

// EXEMPLO DE PROXY/REFLECT PARA OCULTAR PROPRIEDADES NO OBJETO
const hide = (target, prefix = "_") =>
    new Proxy(target, {
        has: (target, property) => !property.startsWith(prefix) && property in target,
        get: (target, property, receiver) => (property in receiver ? target[property] : undefined),
        ownKeys: (target) =>
            Reflect.ownKeys(target).filter((property) => !property.startsWith(prefix) || typeof property !== "string"),
    });

let Carro = hide({ Ano: 2020, Modelo: "polo", _proprietario: "João" });

console.log(Carro._proprietario);
console.log("_proprietario" in Carro);
console.log(Object.keys(Carro));
