const btnCarrito = document.getElementById("btn-carrito");
const spanMostrarEsconderCarrito = document.getElementById("mostrar-esconder-carrito");
const carrito = document.getElementById("carrito");
const contenedorProductos = document.getElementById("contenedor-productos");
const carritoSubTotal = document.getElementById("subtotal");
const carritoImpuestos = document.getElementById("impuestos");
const carritoTotal = document.getElementById("total");
const carritoTotalItems = document.getElementById("total-items");
const btnLimpiarCarrito = document.getElementById("btn-limpiar-carrito");
const contenedorProducto = document.getElementById("contenedor-producto");
let mostrandoCarrito = false;

const productos = [
   {
      id: 1,
      nombre: "Aceite de Oliva 250ml.",
      precio: 27800,
      categoria: "Aceites",
   },
   {
      id: 2,
      nombre: "Aceite de Girasol 900ml.",
      precio: 19200,
      categoria: "Aceites",
   },
   {
      id: 3,
      nombre: "Aceite de Oliva 900ml.",
      precio: 36500,
      categoria: "Aceites",
   },
   {
      id: 4,
      nombre: "Cepillo Dental",
      precio: 4900,
      categoria: "Higiene Oral",
   },
   {
      id: 5,
      nombre: "Crema Dental 75ml.",
      precio: 17300,
      categoria: "Higiene Oral",
   },
   {
      id: 6,
      nombre: "Enjuague Bucal 500ml.",
      precio: 19700,
      categoria: "Higiene Oral",
   },
   {
      id: 7,
      nombre: "Detergente Líquido Regular 2840ml.",
      precio: 66900,
      categoria: "Detergentes",
   },
   {
      id: 8,
      nombre: "Detergente Polvo Triple Poder 4000g.",
      precio: 57600,
      categoria: "Detergentes",
   },
   {
      id: 9,
      nombre: "Barra de Jabón Azul 300g.",
      precio: 9350,
      categoria: "Detergentes",
   },
   {
      id: 10,
      nombre: "Menta Helada 100 Unidades",
      precio: 8950,
      categoria: "Confitería",
   },
   {
      id: 11,
      nombre: "Gomas Sour 72g.",
      precio: 2100,
      categoria: "Confitería",
   },
   {
      id: 12,
      nombre: "Chocolatina Crujiente 28g.",
      precio: 4600,
      categoria: "Confitería",
   },
   {
      id: 13,
      nombre: "Papas Rizadas Mayonesa 25g.",
      precio: 900,
      categoria: "Pasabocas",
   },
   {
      id: 14,
      nombre: "Nachos sabor Queso 190g.",
      precio: 6150,
      categoria: "Pasabocas",
   },
   {
      id: 15,
      nombre: "Papas sabor Natural 25g.",
      precio: 1950,
      categoria: "Pasabocas",
   },
]

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
   }
);

class CarritoDeCompras {
   constructor() {
      this.objetos = [];
      this.total = 0;
      this.tazaImpuestos = 19;
   }

   guardarEnStorage() {
      localStorage.setItem("carrito", JSON.stringify(this.objetos));
   }

   cargarDesdeStorage() {
      const data = localStorage.getItem("carrito");
      if (data) {
         this.objetos = JSON.parse(data);
         this.reconstruirCarrito();
         carritoTotalItems.textContent = this.obtenerTotal();
         this.calcularTotal();
      }
   }

   reconstruirCarrito() {
      contenedorProductos.innerHTML = "";
      const cuentaTotalPorProducto = {};
      this.objetos.forEach((elemento) => {
         cuentaTotalPorProducto[elemento.id] = (cuentaTotalPorProducto[elemento.id] || 0) + 1;
      });

      this.objetos.forEach(({ id, nombre, precio }) => {
         if(!document.getElementById(`elemento${id}`)) {
            contenedorProductos.innerHTML += 
            `
               <div id="elemento${id}" class="producto">
                  <p>
                     <span class="contador-productos" id="cuenta-de-producto-por-id${id}"></span>${nombre}
                  </p>
                  <p>$COP ${precio}</p>
                  <hr class="divider my-4" />
               </div>      
            `;  
         }
         const spanCuentaActualDeProducto = document.getElementById(`cuenta-de-producto-por-id${id}`);
         spanCuentaActualDeProducto.textContent = cuentaTotalPorProducto[id] > 1 ? `${cuentaTotalPorProducto[id]}x ` : "";
      });
   }

   añadirObjeto(id, productos) {
      const producto = productos.find((objeto) => objeto.id === id);
      this.objetos.push(producto);
      
      this.reconstruirCarrito();
      carritoTotalItems.textContent = this.obtenerTotal();
      this.calcularTotal();
      this.guardarEnStorage();
   }

   obtenerTotal() {
      return this.objetos.length;
   }

   limpiarCarro() {
      this.objetos = [];
      this.total = 0;
      contenedorProductos.innerHTML = "";
      carritoSubTotal.textContent = `$COP 0`;
      carritoImpuestos.textContent = `$COP 0`;
      carritoTotal.textContent = `$COP 0`;
      carritoTotalItems.textContent = 0;
      this.guardarEnStorage();
   }
   
   calcularImpuestos(monto) {
      return parseFloat(((this.tazaImpuestos / 100) * monto));
   }

   calcularTotal() {
      const subTotal = this.objetos.reduce((total, objeto) => total + objeto.precio, 0);
      const impuesto = this.calcularImpuestos(subTotal);
      this.total = subTotal + impuesto;
      carritoSubTotal.textContent = `$COP ${subTotal}`;
      carritoImpuestos.textContent = `$COP ${impuesto}`;
      carritoTotal.textContent = `$COP ${this.total}`;
      return this.total
   }   
};

const carro = new CarritoDeCompras();
carro.cargarDesdeStorage();

const botonesAñadirAlCarrito = document.getElementsByClassName("btn-añadir-al-carrito");
[...botonesAñadirAlCarrito].forEach(
   (boton) => {
      boton.addEventListener("click", (event) => {
         carro.añadirObjeto(Number(event.target.id), productos);
      });
   }
);

btnCarrito.addEventListener("click", () => {
   mostrandoCarrito = !mostrandoCarrito;
   spanMostrarEsconderCarrito.textContent = mostrandoCarrito ? "Esconder" : "Mostrar";
   carrito.style.display = mostrandoCarrito ? "block" : "none";
})

btnLimpiarCarrito.addEventListener("click", carro.limpiarCarro.bind(carro));