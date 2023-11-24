// Acá está la clase Productos

let productos = [];

fetch('./js/remeras.json')
    .then( (response) => {
        return response.json();
    })
    .then(data => {
        productos = data;
        renderizarProducto(productos);
    })

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


