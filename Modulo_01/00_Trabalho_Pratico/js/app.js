import { listOfProducts, verifyImg } from "./http.js";

let products = [];

const listEl = document.querySelector("ul");

async function init() {
    // let p = listOfProducts();
    //console.log(p);
    [products] = await Promise.all([listOfProducts()]);
    renderProducts();
}
init();

function renderProducts() {
    listEl.innerHTML = "";
    for (const product of products) {
        const li = document.createElement("li");
        const divProduct = document.createElement("div");
        const secProdDesc = document.createElement("section");
        const h1Name = document.createElement("h1");
        const divBrand = document.createElement("div");
        const spanBrand = document.createElement("span");
        const spanPrice = document.createElement("span");
        const figProduct = document.createElement("figure");
        const imgProduct = document.createElement("img");

        spanBrand.className = "product-brand background-brand";
        spanBrand.textContent = product.brand;
        spanPrice.className = "product-brand background-price";
        spanPrice.textContent = product.price;
        divBrand.className = "product-brands";

        divBrand.appendChild(spanBrand);
        divBrand.appendChild(spanPrice);

        h1Name.className = "product-name";
        h1Name.textContent = product.name;
        imgProduct.width = 215;
        imgProduct.height = 215;
        imgProduct.alt = product.name;
        figProduct.className = "product-figure";
        imgProduct.src = verifyImg(product.image_link);
        figProduct.appendChild(imgProduct);

        secProdDesc.className = "product-description";
        secProdDesc.appendChild(figProduct);
        secProdDesc.appendChild(h1Name);
        secProdDesc.appendChild(divBrand);

        divProduct.className = "product";
        divProduct.appendChild(secProdDesc);
        li.appendChild(divProduct);
        listEl.appendChild(li);
    }
}

//EXEMPLO DO CÓDIGO PARA UM PRODUTO
function productItem(product) {
    const item = `<div class="product" data-name="NYX Mosaic Powder Blush Paradise" data-brand="nyx" data-type="bronzer" tabindex="508">
                    <section class="product-description">
                        <figure class="product-figure">
                            <img src="${product.image_link}" width="215" height="215" alt="NYX Mosaic Powder Blush Paradise" onerror="javascript:this.src='img/unavailable.png'">
                        </figure>
                        <h1 class="product-name"> ${product.name} </h1>
                        <div class="product-brands">
                            <span class="product-brand background-brand">${product.brand}</span>
                            <span class="product-brand background-price">$ ${product.price}</span>
                        </div>
                    </section>
                </div>`;
    return item;
}

//EXEMPLO DO CÓDIGO PARA OS DETALHES DE UM PRODUTO
function loadDetails(product) {
    let details = `<section class="product-details"><div class="details-row">
        <div>Brand</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">nyx</div>
        </div>
      </div><div class="details-row">
        <div>Price</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">10.49</div>
        </div>
      </div><div class="details-row">
        <div>Rating</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">5</div>
        </div>
      </div><div class="details-row">
        <div>Category</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250"></div>
        </div>
      </div><div class="details-row">
        <div>Product_type</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">bronzer</div>
        </div>
      </div></section>`;
}
