// EXEMPLOS DE PROMISES
// DUAS FORMAS VIÁVEIS:

// EXEMPLO 1
// 1ª FORMA
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Sucesso ex1 forma 1ª");
    }, 2000);
});

p1.then(
    (res) => {
        console.log(res);
    },
    (rej) => {}
);

// 2ª FORMA
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Sucesso ex1 froma 2ª");
    }, 2000);
}).then(
    (res) => {
        console.log(res);
    },
    (rej) => {}
);

// COMO BOA PRÁTICA USA-SE O .catch()

// EXEMPLO 2

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Sucesso ex2");
    }, 2000);
});

p2.then((res) => {
    console.log(res);
});

p2.catch((rej) => {});

p2.then((res) => {
    console.log(res);
}).catch((rej) => {});

// EXEMPLO 3
// PROMISES COM CATCH UNICO PARA TODAS AS REJEIÇÕES
const p3 = new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
        resolve("Sucesso Ex3");
    } else {
        reject("Falha Ex3");
    }
});

// p3.then(console.log).catch(console.error);

// // EXEMPLO 4

const p4 = new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
        resolve("Sucesso Ex4");
    } else {
        reject("Falha Ex4");
    }
});

p4.then(function acao1(res) {
    console.log(`${res} da ação 1`);
    return res;
})
    .then(function acao2(res) {
        console.log(`${res} da ação 2`);
        return res;
    })
    .then(function acao3(res) {
        console.log(`${res} da ação 3`);
        return res;
    })
    .catch(function erro(rej) {
        console.error(rej);
    });

// // EXEMPLO 5 - encadeamentos de catch

const p5 = new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
        resolve("Sucesso Ex5");
    } else {
        reject("Falha Ex5");
    }
});

p5.then(function acao1(res) {
    console.log(`${res} da ação 1 de Ex5`);
    return res;
})
    .catch(function erro1(rej) {
        console.error("Erro no primeiro catch de Ex5");
        return rej;
    })
    .then(function acao2(res) {
        console.log(`${res} da ação 2 de Ex5`);
        return res;
    })
    .then(function acao3(res) {
        console.log(`${res} da ação 3 de Ex5`);
        return res;
    })
    .catch(function erro(rej) {
        console.error(rej);
    });

// EXEMPLO 6 - ENCADEAMENTO DE CATCH'S DIRETAMENTE NA PROMISE

const p6 = new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
        resolve("Sucesso Ex6");
    } else {
        reject("Falha Ex6");
    }
});

p6.catch(function erro1(rej) {
    console.error("Erro no primeiro catch");
    return rej;
});
p6.catch(function erro2(rej) {
    console.error(rej);
});

p6.then(function acao1(res) {
    console.log(`${res} da ação 1 de Ex6`);
    return res;
})
    .then(function acao2(res) {
        console.log(`${res} da ação 2 de Ex6`);
        return res;
    })
    .then(function acao3(res) {
        console.log(`${res} da ação 3 de Ex6`);
        return res;
    });

// EXEMPLO 7 - ENCADEAMENTO DE CATCH'S DIRETAMENTE NA PROMISE

const p7 = new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
        resolve("Sucesso Ex7");
    } else {
        reject("Falha Ex7");
    }
});

p7.catch(function erro1(rej) {
    console.error("Erro no primeiro catch P7");
    return rej;
});

p7.then(function acao1(res) {
    console.log("Promessa rejeitada P7 na acao1");
    throw new Error("Erro");
})
    .catch(function erro2(rej) {
        console.error("Tratamento das rejeicoes em P7 ou acao 1");
        return rej;
    })
    .then(function acao2(res) {
        console.log(`${res} da ação 2`);
        return res;
    })
    .then(function acao3(res) {
        console.log(`${res} da ação 3`);
        return res;
    })
    .catch(function erro3(rej) {
        console.error("Tratamento das rejeicoes em acao2 e acao3");
    });
