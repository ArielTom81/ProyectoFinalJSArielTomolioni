// Acá está la clase Productos

class Remeras {
    constructor(id, nombre, imagen, precio) {
        this.id = id;
        this.nombre =  nombre;
        this.imagen = imagen;
        this.precio = precio;
    }
}

// Productos
const remera01 = new Remeras("remera01", "Vue.JS", "./img/1.jpg", 6000);
const remera02 = new Remeras("remera02", "Angular.JS", "./img/2.jpg", 6000);
const remera03 = new Remeras("remera03", "React.JS", "./img/3.jpg", 5000);
const remera04 = new Remeras("remera04", "Redux.JS", "./img/4.jpg", 5000);
const remera05 = new Remeras("remera05", "Node.JS", "./img/5.jpg", 5000);
const remera06 = new Remeras("remera06", "SASS", "./img/6.jpg", 5000);
const remera07 = new Remeras("remera07", "HTML5", "./img/7.jpg", 5000);
const remera08 = new Remeras("remera08", "Git Hub", "./img/8.jpg", 5000);
const remera09 = new Remeras("remera09", "Bulma.CSS", "./img/9.jpg", 5000);
const remera10 = new Remeras("remera10", "TypeScript", "./img/10.jpg", 5000);
const remera11 = new Remeras("remera11", "Drupal", "./img/11.jpg", 5000);
const remera12 = new Remeras("remera12", "JavaScript", "./img/12.jpg", 5000);
const remera13 = new Remeras("remera13", "GraphQL", "./img/13.jpg", 5000);
const remera14 = new Remeras("remera14", "Word Press", "./img/14.jpg", 5000);

const productos = [remera01, remera02, remera03, remera04, remera05, remera06, remera07, remera08, remera09, remera10,remera11, remera12, remera13, remera14];

const contenedorProductos = document.querySelector("#grid");
const imagenCamisas = document.querySelector("#grafico-camisas");
const imagenNode = document.querySelector("#grafico-node");

//Acá agrego las remeras al local storage, ver que pasa si ya están en el local storage
function agregarRemerasALS(producto, cantidad) {
    const productosAlCarrito = {
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad: parseInt(cantidad),
    }

    const ls = localStorage.getItem("carrito");

    if(ls === null) {
        const carrito = [productosAlCarrito];

        localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
        const carrito = JSON.parse(ls);

        const remeraEnLS = carrito.findIndex( (e) => {
            return e.nombre === productosAlCarrito.nombre;
        });

        if(remeraEnLS === -1) {
            carrito.push(productosAlCarrito);
        } else {
            carrito[remeraEnLS].cantidad += parseInt(cantidad);
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    
}


function renderizarProducto(productos) {
    const grid = document.querySelector("#grid");

    for (const producto of productos) {
        const divPadre = document.createElement("div");
        divPadre.className = "producto";

        const imagenRemera = document.createElement("img");
        imagenRemera.className = "producto__imagen";
        imagenRemera.src = `${producto.imagen}`; 

        const divProducto = document.createElement("div");
        divProducto.className = "producto__informacion";

        const divBotones = document.createElement("div");
        divBotones.className = "camisa-contenido-acciones"

        const productoNombre = document.createElement("p");
        productoNombre.className = "producto__nombre";
        productoNombre.innerText = `${producto.nombre}`;

        const productoPrecio = document.createElement("p");
        productoPrecio.className = "producto__precio";
        productoPrecio.innerText = `$${producto.precio}`;

        const cantidad = document.createElement("input");
        cantidad.type = "number";
        cantidad.className = "formulario__campo";
        cantidad.value = 1;

        const boton = document.createElement("button");
        boton.className = "formulario__carrito";
        boton.innerText = "Agregar al carrito";

        // Agregando remeras al carrito
        boton.addEventListener("click", () => {
            let remeraAgregada = cantidad.value;

            remeraAgregada > 0 ? agregarRemerasALS(producto, remeraAgregada) : Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Colocaste un valor inválido en la cantidad de remeras",
              });
            
            if (remeraAgregada > 0) {
                Toastify({
                    text: "Remera agregada al carrito",
                    duration: 2000,
                    destination: "https://arieltom81.github.io/ProyectoFinalJSArielTomolioni/producto.html",
                    newWindow: false,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    className:"toastify", 
                    style: {
                      background: "linear-gradient(to right, #FFCE00, rgb(233, 187, 2))",
                      color: "#89119D",
                    },
                    onClick: function(){} // Callback after click
                  }).showToast();
            }

 
        });

        divBotones.append(cantidad, boton);
        divProducto.append(productoNombre, productoPrecio, divBotones);
        divPadre.append(imagenRemera, divProducto);
        grid.append(divPadre);

    }

}

renderizarProducto(productos);


function cargarImagenes() {
    const div = document.createElement("div");
    div.classList.add("grafico--camisas");
    div.innerHTML = `
    <img src="./img/grafico1.jpg" alt="imagen camisa">
    `;
    imagenCamisas.append(div);
    
}
cargarImagenes();

function cargarNode() {
    const div = document.createElement("div");
    div.classList.add("grafico--node");
    div.innerHTML = `
    <img src="./img/grafico2.jpg" alt="imagen node" >
    `;
    imagenNode.append(div);
}
cargarNode();


