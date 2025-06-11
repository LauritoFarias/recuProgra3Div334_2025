// Ejercicio 1

const arrayFrutas = [
    {id: 1, nombre: "Ananá", precio: 3000, ruta: "img/anana.jpg"},
    {id: 2, nombre: "Arándano", precio: 5000, ruta: "img/arandano.jpg"},
    {id: 3, nombre: "Banana", precio: 1600, ruta: "img/banana.jpg"},
    {id: 4, nombre: "Frambuesa", precio: 2800, ruta: "img/frambuesa.png"},
    {id: 5, nombre: "Frutilla", precio: 4500, ruta: "img/frutilla.jpg"},
    {id: 6, nombre: "Kiwi", precio: 4200, ruta: "img/kiwi.jpg"},
    {id: 7, nombre: "Mandarina", precio: 2000, ruta: "img/mandarina.jpg"},
    {id: 8, nombre: "Manzana", precio: 3000, ruta: "img/manzana.jpg"},
    {id: 9, nombre: "Naranja", precio: 2000, ruta: "img/naranja.jpg"},
    {id: 10, nombre: "Pera", precio: 2200, ruta: "img/pera.jpg"},
    {id: 11, nombre: "Pomelo Amarillo", precio: 2500, ruta: "img/pomelo-amarillo.jpg"},
    {id: 12, nombre: "Pomelo Rojo", precio: 3000, ruta: "img/pomelo-rojo.jpg"},
    {id: 13, nombre: "Sandía", precio: 4000, ruta: "img/sandia.jpg"}
];

/*
Declaro el array como una variable 'const', ya que la lista de objetos es, en principio, fija. Podria cambiar, pero solo 
se agregarian a la tienda de forma manual y no debido a alguna interaccion del usuario con el sitio web. 
Creamos los objetos con sus claves y valores. Para 'ruta', el valor un string que refiere a la ruta de acceso de los 
archivos. Los strings empiezan con '..\' para referir al directorio padre.
*/

// Ejercicio 2

function imprimirDatosAlumno() {
    const alumno = {dni: 41316778, nombre: "Iván", apellido: "Laurito"};

    let mensaje = `Alumno ${alumno.nombre} ${alumno.apellido}, DNI ${alumno.dni}`;
    console.log(mensaje);

    const nombreCompletoAlumno = `${alumno.nombre} ${alumno.apellido}`;

    const nav = document.createElement("nav");
    nav.textContent = nombreCompletoAlumno;

    const body = document.body;
    const header = document.querySelector("header");
    body.insertBefore(nav, header);
    console.log(nombreCompletoAlumno);
}

function init() {
    imprimirDatosAlumno();
    mostrarProductos(arrayFrutas);
    crearBotonesAgregarCarrito();
    recuperarCarritoLocalStorage();
}

/*
Uso los datos del objeto alumno directamente para imprimirlos. Genero un nuevo header antes del body.
*/

// Ejercicio 3

function mostrarProductos(arrayProductos) {
    const contenedor = document.querySelector(".contenedor-productos");
    contenedor.innerHTML = '';
    arrayProductos.forEach(fruta => {
        const div = document.createElement('div');
        div.className = 'card-producto';
        div.innerHTML = `
        <img src="${fruta.ruta}" alt="${fruta.nombre}">
        <h3>${fruta.nombre}</h3>
        <p>$${fruta.precio}</p>
        <button id=${fruta.id}>Agregar al carrito</button>
        `;
        contenedor.appendChild(div);
    });
}

/*
Tengo que generar un pequeño código HTML por cada producto a mostrar. Uso 'forEach' porque tiene mejor performance que 'for'.
*/

// Ejercicio 4

const input = document.querySelector('.barra-busqueda');

input.addEventListener('input', () => {
    filtrarFrutas(input.value);
});

function filtrarFrutas(input) {
    const texto = input.toLowerCase();
    const filtrados = arrayFrutas.filter(fruta =>
    fruta.nombre.toLowerCase().includes(texto)
    );
    mostrarProductos(filtrados);
}

/*
Le agrego un manejador de eventos al input. Uso ´filter´ para filtrar datos ya que tiene mejor performance que 'for' o
'foreach'
*/

// Ejercicio 5

let arrayCarrito = [];
const contenedorCarrito = document.getElementById("items-carrito");

function crearBotonesAgregarCarrito() {
    const contenedorProductos = document.querySelector(".contenedor-productos");
    const botones = contenedorProductos.querySelectorAll('button');

    botones.forEach(function(boton) {
    boton.addEventListener("click", function() {
            arrayCarrito.push(arrayFrutas.find(fruta => fruta.id == boton.id));
            mostrarCarrito();
        });
    });
}

function mostrarCarrito() {
    contenedorCarrito.innerHTML = '';
    arrayCarrito.forEach(fruta => {
        const item = document.createElement('li');
        item.className = 'bloque-item';
        item.innerHTML = `
        <p class="nombre-item">${fruta.nombre} - ${fruta.precio}</p>
        <button id=${fruta.id} class="boton-eliminar">Eliminar</button>
        `;
        contenedorCarrito.appendChild(item);

        const conteo = document.createElement('div');
        conteo.className = 'botonesContadorCarrito';
        conteo.innerHTML = `
        <div class="botonesContadorCarrito">
            <button onclick="restarCantidadCarrito(${fruta.id})">-</button>
            <span id="${fruta.id}">1</span>
            <button onclick="sumarCantidadCarrito(${fruta.id})">+</button>
        </div>
        `;

        item.appendChild(conteo);
    });

    const botones = document.querySelectorAll('.boton-eliminar');
    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            eliminarProducto(boton.id);
        });
    });
    
    sumarCantidadCarrito();
    actualizarPrecioCarrito();
}

function eliminarProducto(idFruta) {
    arrayCarrito = arrayCarrito.filter((fruta) => fruta.id !== Number(idFruta));
    mostrarCarrito();
}

// Ejercicio 6

function almacenarCarritoLocalStorage() {
    const jsonFrutas = JSON.stringify(arrayFrutas);
    localStorage.setItem("frutas", jsonFrutas);

}

function recuperarCarritoLocalStorage() {
    const datosFrutasCarrito = localStorage.getItem("frutas");

    if (datosFrutasCarrito) {
        arrayCarrito = JSON.parse(datosFrutasCarrito);
        console.log("Se cargaron datos guardados del carrito.");
    } else {
    console.log("No se encontraron datos guardados del carrito");
    }

}

// Ejercicio 7

function actualizarContadorCarrito() {
    const contadorCarrito = document.getElementById("contador-carrito");
    contenedorCarrito.textContent = arrayCarrito.length;
}

function sumarCantidadCarrito(id) {
    const contadorCarrito = document.getElementById(id)
    parseInt(contadorCarrito.textContent)++;
}

function restarCantidadCarrito(id) {
    const contadorCarrito = document.getElementById(id)
    parseInt(contadorCarrito.textContent)--;
}

function actualizarPrecioCarrito() {
    const precioTotalCarrito = document.getElementById('precio-total');
    const precioTotal = arrayCarrito.reduce((a, c) => a + c, 0)
    precioTotalCarrito.textContent = arrayCarrito.length;
}

init();