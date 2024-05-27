import { servicesProducts } from "../services/products-services.js";
const productContainer = document.querySelector("[data-product]");
const formulario = document.querySelector("[data-form]");
 const nameInput = document.querySelector("[data-name]");
 const priceInput = document.querySelector("[data-price]");
 const imageInput = document.querySelector("[data-image]");
const botonLimpiar = document.querySelector("[data-limpiar]");

function createCard(name, price, image, id) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `<div class="card-img"><img src="${image}" alt="${name}">
    </div>
    <div class="card-info">
      <p class="text-title">${name} </p>
    </div>
    
    <div class="card-footer">
    <span class="text-price">$${price}</span>
    <div class="card-button" data-id="${id}">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
    </div>
  </div>`;

  //Captando el boton de eliminar producto

  const deleteButton = card.querySelector(".card-button");

  deleteButton.addEventListener("click", () => deleteCard(id, card));

  productContainer.appendChild(card);
  return card;
  
}

//Eliminar productos

async function deleteCard(id, card) {
  try {
    await servicesProducts.deleteProduct(id);
    card.remove();
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
  }
}


// Mostrar productos
async function showProducts() {

  try {
    const products = await servicesProducts.productList();
    products.forEach(product => {
      productContainer.appendChild(createCard(
        product.name,
        product.price,
        product.image,
        product.id))
      
    });
    
  } catch (error) {
    console.log(error)
    
  }
  
}

showProducts();


// Agregar producto desde el formulario
async function agregarProducto(evento) {
  evento.preventDefault();


    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;
  
  await servicesProducts.createProduct(name, price, image)
  window.location.href = "../index.html"
  
}

//Eventos

formulario.addEventListener("submit", evento => agregarProducto(evento));

botonLimpiar.addEventListener("click", () => {
  nameInput.value = "";
  priceInput.value = "";
  imageInput.value = "";
  
});