let idGlobal = 5;

const $filtroCheckbox = document.getElementById("filtroCheckbox");
const $filtroSearch = document.getElementById("filtroSearch");

function renderizarNotas(listaNotas, idContenedorPadre) {
    let contenedor = document.getElementById(idContenedorPadre);
    let fragmento = document.createDocumentFragment();
    contenedor.innerHTML = "";
    if (listaNotas.length === 0) {
        let h2 = document.createElement('h2');
        h2.className = "text-center";
        h2.textContent = "No hay notas para mostrar!";
        contenedor.appendChild(h2);
    } else {
        listaNotas.forEach(nota => {
            let div = document.createElement('div')
            div.setAttribute("id", nota.id)
            div.className = "card text-bg-warning mb-3";
            div.style = "width: 18rem; height: 12rem";
            div.innerHTML = `
                <div class="card-header d-flex justify-content-between align-items-center">
                    <input onClick="marcarRealizada(${nota.id})" type="checkbox" ${nota.realizada ? "checked" : ""}>
                    Nota Nro. ${nota.id}
                    <button onclick="borrarNota(${nota.id})" type="button" class="btn btn-dark px-2 py-1">x</button>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${nota.titulo}</h5>
                    <p class="card-text">${nota.texto}</p>
                </div>
            `
            fragmento.appendChild(div);
        });
        contenedor.appendChild(fragmento);
    }
}

renderizarNotas(notas, "contenedor-notas");

function agregarNota(titulo, texto) {
    idGlobal++;
    let nota = {
        id: idGlobal,
        titulo: titulo.trim(),
        texto: texto.trim(),
        realizada: false
    }
    notas.push(nota);
    //console.log(notas)
}

let $formulario = document.getElementById("formulario");
$formulario.addEventListener("submit", (e => {
    e.preventDefault();
    let tituloNota = e.target[0].value;
    let contenidoNota = e.target[1].value;
    if (tituloNota !== "" && contenidoNota !== "") {
        agregarNota(tituloNota, contenidoNota);
        renderizarNotas(notas, "contenedor-notas");
    }
}));

function borrarNota(idNota) {
    idGlobal--;
    notas = notas.filter(nota => nota.id !== idNota);
    renderizarNotas(notas, "contenedor-notas");
}

let botonBorrar = document.getElementById("borrar");
botonBorrar.addEventListener("click", e => formulario.reset());

let marcarRealizada = (id) => {
    let notaObjetivo = notas.find(nota => nota.id > id);
    notaObjetivo.realizada = !notaObjetivo.realizada;
    //console.log(notaObjetivo)
}

function filtrarNotasRealizas(notas) {
    let checked = document.getElementById("checkbox").checked;
    let notasRealizadas = notas.filter(nota => nota.realizada === checked);
    return notasRealizadas;
}

function filtrarPorTexto(notas) {
    let texto = document.getElementById("inputSearch").value;
    texto = texto.trim().toLowerCase();
    if (texto === "") {
        return notas;
    } else {
        let notasFiltradasPorTexto = notas.filter(nota => {
            if (nota.titulo.toLowerCase().includes(texto) || nota.texto.toLowerCase().includes(texto)) {
                return nota;
            }
        });
        return notasFiltradasPorTexto;
    }
}

$filtroCheckbox.addEventListener("change", () => {
    let notasFiltradas = filtrarNotasRealizas(notas); //PRIMERO FILTRO POR CHECKBOX
    notasFiltradas = filtrarPorTexto(notasFiltradas); //SEGUNDO FILTRO POR VALUE DEL INPUT DEL BUSCADOR
    renderizarNotas(notasFiltradas, "contenedor-notas") //TERCERO RENDERIZO
});

$filtroSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    let notasFiltradas = filtrarPorTexto(notas); //PRIMERO FILTRO POR VALUE DEL INPUT DEL BUSCADOR
    notasFiltradas = filtrarNotasRealizas(notasFiltradas); //SEGUNDO FILTRO POR CHECKBOX
    renderizarNotas(notasFiltradas, "contenedor-notas") //TERCERO RENDERIZO
})

