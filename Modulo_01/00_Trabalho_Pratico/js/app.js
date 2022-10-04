let brand = document.getElementById("filter-brand");
let type = document.getElementById("filter-type");
let name = document.getElementById("filter-name");
let sort = document.getElementById("sort-type");

(async () => {
    let response = await fetch("data/products.json");

    loadProducts(await response.json());
})();

let productElement = document.querySelector(".catalog");

function loadProducts(json) {
    const productsView = json.map((product) => productItem(product)).join("");

    productElement.innerHTML = productsView;
}

function sortProducts(products, sortType) {
    switch (sortType) {
        case "Melhores Avaliados":
            return products.sort((prodA, prodB) =>
                prodA.rating > prodB.rating ? -1 : prodA.rating < prodB.rating ? 1 : 0
            );

        case "Menores Preços":
            return products.sort((prodA, prodB) =>
                prodA.price > prodB.price ? 1 : prodA.price < prodB.price ? -1 : 0
            );

        case "Maiores Preços":
            return products.sort((prodA, prodB) =>
                prodA.price > prodB.price ? -1 : prodA.price < prodB.price ? 1 : 0
            );

        case "A-Z":
            return products.sort((prodA, prodB) => (prodA.name > prodB.name ? 1 : prodA.name < prodB.name ? -1 : 0));

        case "Z-A":
            return products.sort((prodA, prodB) => (prodA.name > prodB.name ? -1 : prodA.name < prodB.name ? 1 : 0));
    }
}

//EXEMPLO DO CÓDIGO PARA UM PRODUTO
function productItem(product) {
    return `<div class="product" data-name="${product.name}" data-brand="${product.brand}" data-type="${
        product.product_type
    }" tabindex="${product.id}">
                <figure class="product-figure">
                    <img src="${product.image_link}" width="215" height="215" alt="${
        product.name
    }" onerror="javascript:this.src='img/unavailable.png'">
                </figure>
                <section class="product-description">
                    <h1 class="product-name">${product.name}</h1>
                    <div class="product-brands"><span class="product-brand background-brand">${product.brand}</span>
                    <span class="product-brand background-price">R$ ${(parseFloat(product.price) * 5.5).toFixed(
                        2
                    )}</span></div>
                </section>
                <section class="product-details">${loadDetails(product)}</section>
             </div>`;
}

//EXEMPLO DO CÓDIGO PARA OS DETALHES DE UM PRODUTO
function loadDetails(product) {
    let details = ["brand", "price", "rating", "category", "product_type"];

    return Object.entries(product)
        .filter(([name, value]) => details.includes(name))
        .map(([name, value]) => {
            `<div class="details-row">
            <div>${name}</div>
            <div class="details-bar">
              <div class="details-bar-bg" style="width= 250">${value}</div>
            </div>
          </div>`;
        })
        .join("");
}
