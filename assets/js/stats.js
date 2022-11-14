
let eventos;
let fechaActual;
let eventosProximos;
let eventosPasados;

fetch('https://amazing-events.herokuapp.com/api/events')
    .then(respuesta => respuesta.json())
    .then(datos => {
        eventos = datos.events;
        fechaActual = datos.currentDate;
        eventosProximos = filtrarEventosPorFecha(eventos, fechaActual, true);
        eventosPasados = filtrarEventosPorFecha(eventos, fechaActual, false);

        //TABLA1
        eventosPasados = eventosPasados.map(e => crearEventoResumido(e))
        eventosPasados = ordenarPorAsistencia(eventosPasados);
        //console.table(eventosPasados);
        let $tabla1col1 = document.getElementById("tabla1col1");
        let col1 = eventosPasados[0].name
        $tabla1col1.textContent = col1;
        let $tabla1col2 = document.getElementById("tabla1col2");
        let col2 = eventosPasados[eventosPasados.length - 1].name;
        $tabla1col2.textContent = col2;
        let $tabla1col3 = document.getElementById("tabla1col3");
        $tabla1col3.textContent = buscarEventoMayorCapacidad(eventos).name;

        //TABLA2
        eventosProximos = eventosProximos.map(e => crearEventoResumido(e));
        let categoriasEventosProximos = extraerCategorias(eventosProximos);
        let estadisticasCategorias1 = categoriasEventosProximos.map(c => estadisticasPorCategoria(eventosProximos, c));
        ordenarPorGanancias(estadisticasCategorias1);
        console.table(estadisticasCategorias1);
        imprimirEstadisiticas(estadisticasCategorias1, 'tabla2');

        //TABLA3
        eventosPasados = eventosPasados.map(e => crearEventoResumido(e));
        let categoriasEventosPasados = extraerCategorias(eventosPasados);
        let estadisticasCategorias2 = categoriasEventosPasados.map(c => estadisticasPorCategoria(eventosPasados, c));
        ordenarPorGanancias(estadisticasCategorias2);
        console.table(estadisticasCategorias2);
        imprimirEstadisiticas(estadisticasCategorias2, 'tabla3');

    })
    .catch(e => console.log(e));

function ordenarPorAsistencia(eventos) {
    eventos.sort((a, b) => b.percentageOfAttendance - a.percentageOfAttendance);
    return eventos;
};

function crearEventoResumido(evento) {
    return e = {
        name: evento.name,
        category: evento.category,
        assistance: cambiarTipoDeDato(evento.assistance),
        capacity: cambiarTipoDeDato(evento.capacity),
        estimate: cambiarTipoDeDato(evento.estimate),
        price: evento.price,
        percentageOfAttendance: sacarPorcentaje(evento)
    }
};

function cambiarTipoDeDato(valor) {
    if (valor === undefined) {
        return valor;
    } else {
        return Number(valor);
    }
};

function sacarPorcentaje(evento) {
    if (evento.assistance !== undefined) {
        return Number(((evento.assistance * 100) / evento.capacity).toFixed(1));
    } else {
        return Number(((evento.estimate * 100) / evento.capacity).toFixed(1));
    }
};

function buscarEventoMayorCapacidad(eventos) {
    let capacidades = eventos.map(evento => Number(evento.capacity));
    let mayorCapacidad = Math.max.apply(null, capacidades);
    let eventoMayorCapacidad = eventos.find(evento => Number(evento.capacity) === mayorCapacidad);
    return eventoMayorCapacidad;
};

function filtrarEventosPorFecha(eventos, fecha, bolean) {
    let fechaActual = new Date(fecha);
    if (bolean) { //si es true filtro los eventos posteriores a la fecha
        let eventosPosteriores = eventos.filter(evento => {
            let fechaEvento = new Date(evento.date);
            return fechaEvento > fechaActual;
        })
        return eventosPosteriores;
    } else {  //de lo contrario los eventos pasados
        let eventosPasados = eventos.filter(evento => {
            let fechaEvento = new Date(evento.date);
            return fechaEvento < fechaActual;
        })
        return eventosPasados;
    }
};

function extraerCategorias(eventos) {
    let categorias = eventos.map(evento => evento.category);
    categorias = new Set(categorias);
    categorias = Array.from(categorias);
    return categorias;
};

function imprimirEstadisiticas(estadisticas, id){
    let $id = document.getElementById(id);
    let fragmento = document.createDocumentFragment();
    estadisticas.forEach(c => {
        let $tr = document.createElement('tr');
        $tr.innerHTML = `
                        <td>${c.category}</td>
                        <td>$${c.revenues}</td>
                        <td>${c.percentageOfAttendance}%</td>
        `
        fragmento.appendChild($tr);
    })
    $id.appendChild(fragmento);
};

function estadisticasPorCategoria(eventos, categoria) {
    let eventosFiltrados = eventos.filter(e => categoria.includes(e.category));
    let c = {
        category: categoria,
        revenues: eventosFiltrados.reduce((acc, e) => acc + ganancias(e), 0),
        percentageOfAttendance: ((eventosFiltrados.reduce((acc, e) => acc + e.percentageOfAttendance, 0)) / eventosFiltrados.length).toFixed(1)
    }
    return c;
};

function ganancias(evento) {
    if (evento.assistance === undefined) {
        return (evento.price * evento.estimate);
    } else {
        return (evento.price * evento.assistance);
    }
};

function ordenarPorGanancias(eventos){
    eventos.sort((a, b) => b.revenues - a.revenues);
    return eventos;
};


  

 

  
