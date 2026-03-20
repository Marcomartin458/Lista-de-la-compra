// Scripst para cargar los productos

const contenedor = document.querySelector(".contenedor");
let arrayProductos = [];

// Funcion para cargar en el contenedor las tarjetas en el formato que se muestra

function mostrarProductos(lista) {
  contenedor.innerHTML = "";

  for (let producto of lista) {
    contenedor.innerHTML += `
      <div class="productos">
          <img src="${producto.imagen}" width="300px" height="250px">
          <p class="nombre"> Nombre: ${producto.nombre}</p>
          <p class="nombre"> Cantidad: ${producto.cantidad}</p>
          <p class="descripcion"> Decripción: ${producto.descripcion}</p>
      </div>`;
  }
}

// Funcion que extrae la informacion del xml a traves del tagname 'producto'

function cargarInformacion() {
  fetch("data/dataMercado.xml")
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "text/xml");
      const productosMercado = xml.getElementsByTagName("producto");

      for (let producto of productosMercado) {
        const imagen = producto.getElementsByTagName("imagen")[0].textContent;
        const nombre = producto.getElementsByTagName("nombre")[0].textContent;
        const cantidad =
          producto.getElementsByTagName("cantidad")[0].textContent;
        const descripcion =
          producto.getElementsByTagName("descripcion")[0].textContent;

        arrayProductos.push({ imagen, nombre, cantidad, descripcion });
      }

      mostrarProductos(arrayProductos);
    });
}

cargarInformacion();

// Scripts para agregar productos

const añadir = document.getElementById("añadir");
const botonAñadir = document.getElementById("btn-agregar");
const modal = document.getElementById("modal");
const aceptar = document.getElementById("aceptar");
const mensaje = document.getElementById("mensaje");

let nombreNuevo = document.getElementById("nombreProducto");
let descripcionNuevo = document.getElementById("descripcionProducto");
let cantidadNuevo = document.getElementById("cantidadProducto");
let imagenInput = document.getElementById("imagenProducto");

// Listener del boton para mostrar el modal para añadir la informacion del nuevo producto

botonAñadir.addEventListener("click", () => {
  modal.showModal();
});

// Listener del boton aceptar del modal que solo funcioina si se rellenan los datos del producto a añadir

aceptar.addEventListener("click", () => {
  const nombre = nombreNuevo.value.trim();
  const descripcion = descripcionNuevo.value.trim();
  const cantidad = cantidadNuevo.value;
  const archivo = imagenInput.files[0];

  if (nombre == "" || descripcion == "" || cantidad <= 0 || !archivo) {
    mensaje.innerText = "Es obligatorio rellenar los campos";
    return;
  }

  let reader = new FileReader();

  if (nombre == "" || descripcion == "" || cantidad <= 0 || !archivo) {
    mensaje.innerText = "Es obligatorio rellenar los campos";
    return;
  }

  reader.onload = function (e) {
    const imagen = e.target.result;

    arrayProductos.push({ imagen, nombre, cantidad, descripcion });

    mostrarProductos(arrayProductos);

    modal.close();
  };

  reader.readAsDataURL(archivo);
});

//Scripts del buscador por nombre

const inputBuscador = document.getElementById("buscador");
const botonBuscar = document.querySelector(".btn-buscar");

// Funvion que se utiliza para actualizar la lista y de esa manera poder cargar solo el producto buscado

function actualizarLista() {
  let texto = inputBuscador.value.toLowerCase();
  let listaFiltrada = [];

  for (let producto of arrayProductos) {
    let coincideNombre = producto.nombre.toLowerCase().includes(texto);

    if (coincideNombre) {
      listaFiltrada.push(producto);
    }
  }

  mostrarProductos(listaFiltrada);
}

botonBuscar.addEventListener("click", actualizarLista);

// Scripts para cambiar el tema

const modalTema = document.getElementById("modal-tema");
const btnAceptarTema = document.getElementById("aceptar-tema");
let select = document.querySelector(".temas");

// Listener del select para que en cada opcion del mismo ejecute un cambio en los valores del styles

select.addEventListener("change", () => {
  let tema = select.value;

  if (tema == "elegante") {
    document.documentElement.style.setProperty("--color-primario", "#eb6267a4");
    document.documentElement.style.setProperty("--color-texto", "#000000");
    document.documentElement.style.setProperty(
      "--color-secundario",
      "#eb6267a4",
    );
  } else if (tema == "gamer") {
    document.documentElement.style.setProperty("--color-primario", "#00e51b9f");
    document.documentElement.style.setProperty("--color-texto", "#C70AE5");
    document.documentElement.style.setProperty(
      "--color-secundario",
      "#00e51b9f",
    );
  } else if (tema == "normal") {
    document.documentElement.style.setProperty("--color-primario", "#fdfdfd17");
    document.documentElement.style.setProperty("--color-texto", "#1d1d1d");
    document.documentElement.style.setProperty(
      "--color-secundario",
      "#f0f0f062",
    ); // Corregido
  } else if (tema == "personalizado") {
    //Modal que se activa al seleccionar el tema 'personalizado'
    modalTema.showModal();
  }
});

// Listener del boton de aceptar al seleccionar los colores para efectuar los cambios

btnAceptarTema.addEventListener("click", () => {
  let colorPrimario = document.getElementById("color-primario").value;
  let colorSecundario = document.getElementById("color-secundario").value;
  let colorTexto = document.getElementById("color-texto").value;

  document.documentElement.style.setProperty("--color-primario", colorPrimario);
  document.documentElement.style.setProperty(
    "--color-secundario",
    colorSecundario,
  );
  document.documentElement.style.setProperty("--color-texto", colorTexto);

  modalTema.close();
});

// Listener para cerrar el modal de productos(patata)
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.close();
  }
});

// Listener para cerrar el modal de temas
modalTema.addEventListener("click", (e) => {
  if (e.target === modalTema) {
    modalTema.close();
  }
});
