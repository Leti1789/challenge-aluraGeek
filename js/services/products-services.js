// GET

async function productList() {
  const conexion = await fetch("http://localhost:3001/products");
  const conexionFormateada = await conexion.json();
  return conexionFormateada;

}

//POST

async function createProduct(name, price, image) {
  const conexion = await fetch("http://localhost:3001/products", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      name: name,
      price: price,
      image: image,
    }),
  });
  const conexionConvertida = conexion.json();

  if (!conexion.ok) {
    throw new Error("Ha ocurrido un error al enviar el producto");
  }

  return conexionConvertida;
}

//DELETE


async function deleteProduct(id) {
  const conexion = await fetch(`http://localhost:3001/products/${id}`, {
    method: "DELETE",
  });

  if (!conexion.ok) {
    throw new Error("Ha ocurrido un error al eliminar el producto");
  }

  return "Producto eliminado exitosamente";
}




export const servicesProducts = {
  productList,
  createProduct,
  deleteProduct
}



