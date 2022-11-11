let $main = document.querySelector("main");
let id = new URLSearchParams(document.location.search).get("id");


fetch('https://amazing-events.herokuapp.com/api/events')
    .then(respuesta => respuesta.json())
    .then(datos => renderizarEventoDetallado(datos.eventos, id, $main))
    .catch(e => null);

function renderizarEventoDetallado(eventos, idEvento, idContenedor) {
    let eventoObjetivo = eventos.find(evento => evento._id === idEvento);
    idContenedor.innerHTML += `<div class="container bg-dark p-0 d-flex flex-column gap-2 p-2 w-90 border border-5" id="contenedor-details">
                                <img src=${eventoObjetivo.image} alt=${eventoObjetivo.name} title=${eventoObjetivo.name} width="100%">
                                <div class="">
                                    <h2 class="text-light text-center fs-1 pb-2"> ${eventoObjetivo.name}</h2>
                                    <p class="text-light fs-4"> ${eventoObjetivo.description}</p>
                                    <p class="text-light fs-4">Date: ${eventoObjetivo.date}</p>
                                    <p class="text-light fs-4">Place: ${eventoObjetivo.place}</p>
                                    <p class="text-light fs-4">Category: ${eventoObjetivo.category}</p>
                                    <p class="text-light fs-4">Capacity: ${eventoObjetivo.capacity}</p>
                                    <p class="text-light fs-4">Estimate: ${eventoObjetivo.assistance}</p>
                                    <p class="text-light fs-4">Price: ${eventoObjetivo.price}$</p>
                                </div>
                            </div>`
}