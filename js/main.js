const btnCarrito = document.getElementById("btn-carrito");
const spanMostrarEsconderCarrito = document.getElementById("mostrar-esconder-carrito");
const carrito = document.getElementById("carrito");
const contenedorProductos = document.getElementById("contenedor-productos");
const carritoSubTotal = document.getElementById("subtotal");
const carritoImpuestos = document.getElementById("impuestos");
const carritoTotal = document.getElementById("total");
const carritoTotalItems = document.getElementById("total-items");
const btnLimpiarCarrito = document.getElementById("btn-limpiar-carrito");
const btnFinalizarCompra = document.getElementById("btn-finalizar-compra");
const contenedorProducto = document.getElementById("contenedor-producto");
let mostrandoCarrito = false;

const carro = new CarritoDeCompras();

fetch("./js/productos.json")
   .then(res => res.json())
   .then(productos => {
      productos.forEach(({ nombre, id, precio, categoria }) => {
         contenedorProducto.innerHTML += 
         `
            <div class="contenedor">
               <h2>${nombre}</h2>
               <p class="precio-contenedor">$COP ${precio}</p>
               <p class="categoria-contenedor">Categoría: ${categoria}</p>
               <button id="${id}" class="btn-añadir-al-carrito">Añadír al Carrito</button>
            </div>   
         `;
      });

      carro.cargarDesdeStorage();
      
      document.querySelectorAll(".btn-añadir-al-carrito").forEach(btn => {
         btn.addEventListener("click", e => {
            carro.añadirObjeto(Number(e.target.id), productos);
         });
      });
   });

// Mostrar / esconder carrito   
btnCarrito.addEventListener("click", () => {
   mostrandoCarrito = !mostrandoCarrito;
   spanMostrarEsconderCarrito.textContent = mostrandoCarrito ? "Esconder" : "Mostrar";
   carrito.style.display = mostrandoCarrito ? "block" : "none";
})

//Limpiar carrito
btnLimpiarCarrito.addEventListener("click", carro.limpiarCarro.bind(carro));

//Finalizar compra
btnFinalizarCompra.addEventListener("click", () => {
   if (carro.objetos.length === 0) {
      Swal.fire("Tu carrito está vacío", "Agrega algún producto antes de finalizar", "warning");
      return;
   }

   Swal.fire({
      title: "¡Compra realizada con exito!",
      text: "Gracias por confiar en Reshipi Market",
      icon: "succes",
      confirmButtonText: "Aceptar",
   });
   carro.limpiarCarro();
});