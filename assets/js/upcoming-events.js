//CONTENEDORES DE INTERES
const $contenedorCartas = document.querySelector("#contenedor-cartas");
const $contenedorBusqueda = document.getElementById("contenedor-busqueda");
const $contenedorCheckbox = document.getElementById("contenedor-checkbox");

//EXTRAYENDO CATEGORIAS
let categoriasEventos = data.events.map(evento => evento.category);
categoriasEventos = new Set(data.events.map(evento => evento.category));
categoriasEventos = Array.from(categoriasEventos);

//FILTRANDO EVENTOS POR FECHA Y RENDERIZANDO MANUALMENTE
let $fragment = document.createDocumentFragment();
let fechaActual = new Date(data.currentDate);
data.events.forEach(evento => {
  let fechaEvento = new Date(evento.date);
  if (fechaEvento > fechaActual) {
    $fragment.appendChild(crearCarta(evento));
  }
  $contenedorCartas.appendChild($fragment);
});

renderizarBarraBusqueda($contenedorBusqueda);
renderizarCheckbox(categoriasEventos, $contenedorCheckbox);

//FUNCION PARA CREAR CADA CARTA DE EVENTO
function crearCarta(evento) {
  let div = document.createElement("div");
  div.className = "card shadow-lg text-bg-dark";
  div.style = "width: 18rem";
  div.innerHTML += `
    <img src=${evento.image} class="card-img-top" alt=${evento.name} title=${evento.name}>
    <div class="card-body d-flex flex-column">
      <h5 class="card-title fs-3">${evento.name}</h5>
      <p class="card-text">${evento.description}</p>
      <div class="d-flex justify-content-between mt-auto align-items-center">
        <p class="m-0 fs-4 fw-bold">Price: $${evento.price}</p>
        <a href="./details.html?id=${evento._id}" class="btn btn-secondary mt-auto w-30 boton-carta">See more...</a>
      </div>
    </div>
    `
  return div;
};

//RENDERIZA CONJUNTO DE CARTAS
function renderizarCartas(datos, idContenedor) {
  idContenedor.innerHTML = "";
  let fragment = document.createDocumentFragment();
  datos.forEach(evento => fragment.appendChild(crearCarta(evento)));
  idContenedor.appendChild(fragment);
};

//RENDERIZAR BARRA BUSQUEDA
function renderizarBarraBusqueda(idContenedor) {
  idContenedor.innerHTML = `
    <form id="formulario-busqueda" class="d-flex mx-auto px-2" role="search">
      <input id="input-busqueda" class="form-control me-2" type="search" placeholder="Name of the event..." aria-label="Search">
      <button class="btn btn-dark" type="submit">Search</button>
    </form>
    `
};

//RENDERIZAR CHECKBOXS
function renderizarCheckbox(categorias, idContenedor) {
  let template = "";
  categorias.forEach(categoria => {
    template += `
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="${categoria}" name="${categoria}" value="${categoria}" checked>
        <label class="form-check-label" for="${categoria}">${categoria}</label>
      </div>
      `
  });
  idContenedor.innerHTML = template;
};

//RECIBE LISTA DE EVENTOS Y VALOR DEL SEARCH PARA FILTRAR Y DEVOLVER NUEVA LISTA DE EVENTOS FILTRADOS
function filtrarPorBusqueda(eventos) {
  let valor = (document.getElementById("input-busqueda")).value.trim().toLowerCase();
  if(valor === ""){
    return eventos;
  }else{
    let eventosFiltrados = eventos.filter(evento => evento.name.toLowerCase().includes(valor));
    return eventosFiltrados;
  }
};

//LISTENER DE EVENTO SUBMIT DEL CONTENEDOR DEL SEARCH
$contenedorBusqueda.addEventListener("submit", (e) => {
  e.preventDefault();
  let filtrado = filtrarPorBusqueda(data.events)
  filtrado = filtrarPorCategoria(filtrado);
  renderizarCartas(filtrado, $contenedorCartas);
});

//FUNCION DE LOS CHECKBOXS
function filtrarPorCategoria(eventos) {
  let checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value)
  if(checked.length === 0){
    return eventos;
  }
  let eventosFiltrado = eventos.filter(evento => checked.includes(evento.category));
  return eventosFiltrado
}

//LISTENER DE EVENTO CHANGE DEL CONTENEDOR DE LOS CHECKBOXS
$contenedorCheckbox.addEventListener("change", () => {
  let filtrado = filtrarPorCategoria(data.events);
  filtrado = filtrarPorBusqueda(filtrado)
  renderizarCartas(filtrado, $contenedorCartas);
});



