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