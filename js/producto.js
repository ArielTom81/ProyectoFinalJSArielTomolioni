const carritoVaciar = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#grid");
const carritoAcciones = document.querySelector("#carrito-acciones");
const carritoComprado = document.querySelector("#carrito-comprado");
const botonVaciar = document.querySelector("#vaciar-carrito");
const botonComprar = document.querySelector("#compra-realizada");
let totalCarrito = document.querySelector("#precioTotal");

let remerasEnCarrito = JSON.parse(localStorage.getItem("carrito"));
sumarTotalCarrito();



console.log(carritoProductos);

if(remerasEnCarrito.length != 0) {


    carritoVaciar.classList.add("disabled"); 
    carritoProductos.classList.remove("disabled");
    carritoAcciones.classList.remove("disabled");
    carritoComprado.classList.add("disabled"); 


    remerasEnCarrito.forEach(producto => {
        const divPadre = document.createElement("div");
        divPadre.className = "producto";

        const imagenRemera = document.createElement("img");
        imagenRemera.className = "producto__imagen";
        imagenRemera.src = `${producto.imagen}`; 

        const divProducto = document.createElement("div");
        divProducto.className = "producto__informacion";

        const productoNombre = document.createElement("p");
        productoNombre.className = "producto__nombre";
        productoNombre.innerText = `${producto.nombre}`;

        const productoPrecio = document.createElement("p");
        productoPrecio.className = "producto__precio";
        productoPrecio.innerText = `$${producto.precio}`;

        const cantidad = document.createElement("p");
        cantidad.className = "formulario__campo-carrito";
        cantidad.innerText = `${producto.cantidad}`;


        divProducto.append(productoNombre, productoPrecio, cantidad);
        divPadre.append(imagenRemera, divProducto);
        grid.append(divPadre);

    });
 

} else {

    carritoVaciar.classList.remove("disabled"); 
    carritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoComprado.classList.add("disabled"); 
}




botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    remerasEnCarrito.length = 0;
    localStorage.setItem("carrito", JSON.stringify(remerasEnCarrito));
    carritoVaciar.classList.remove("disabled"); 
    carritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoComprado.classList.add("disabled"); 

  /*   Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Carrito Vaciado",
        showConfirmButton: false,
        timer: 2000
      }); */
      Swal.fire({
        title: "¿Está usted seguro?",
        text: "¡Está por vaciar su carrito!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, vaciar!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
    
}

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
    remerasEnCarrito.length = 0;
    localStorage.setItem("carrito", JSON.stringify(remerasEnCarrito));
    carritoVaciar.classList.add("disabled"); 
    carritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoComprado.classList.remove("disabled"); 

    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Compra Realizada",
        showConfirmButton: false,
        timer: 2000
      });
}


function sumarTotalCarrito() {
    const sumaTotal = remerasEnCarrito.reduce((acc, producto) => (acc + producto.precio * producto.cantidad), 0);
    precioTotal.innerText = `$${sumaTotal}`;
}

