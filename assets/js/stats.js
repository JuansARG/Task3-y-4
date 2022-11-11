
let eventos;
let fechaActual;
let categorias;
let eventoMayorAsistencia;
let eventoMenorAsistencia;
let eventoMayorCapacidad;
let eventosProximos;
let eventosPasados;

fetch('https://amazing-events.herokuapp.com/api/events')
    .then(respuesta => respuesta.json())
    .then(datos => {
        eventos = datos.events;
        fechaActual = datos.currentDate;

        categorias = extraerCategorias(eventos);
        console.log(categorias);
        
        eventoMayorAsistencia = buscarEventoMayorAsistencia(eventos);
        console.log(eventoMayorAsistencia);
        
        eventoMenorAsistencia = buscarEventoMenorAsistencia(eventos);
        console.log(eventoMenorAsistencia);
       
        eventoMayorCapacidad = buscarEventoMayorCapacidad(eventos);
        console.log(eventoMayorCapacidad)

        eventosProximos = filtrarEventosPorFecha(eventos, fechaActual, true);
        console.log(eventosProximos);

        eventosPasados = filtrarEventosPorFecha(eventos, fechaActual, false);
        console.log(eventosPasados);

        let categoriasEventosPasados = extraerCategorias(filtrarEventosPorFecha(eventos, fechaActual, false));
        console.log(categoriasEventosPasados);

        let categoriasEventosProximos = extraerCategorias(filtrarEventosPorFecha(eventos, fechaActual, true));
        console.log(categoriasEventosProximos);

        


    })
    .catch(e => console.log(e));

function buscarEventoMayorAsistencia(eventos){
    let asistencias = eventos.map(evento => evento.assistance);
    asistencias = asistencias.filter(cant => cant !== undefined);
    asistencias = asistencias.map(cant => Number(cant));
    let mayorAsistencia = Math.max.apply(null, asistencias);
    let eventoMayorAsistencia = eventos.find(evento => Number(evento.assistance) === mayorAsistencia);
    return eventoMayorAsistencia;
};


function buscarEventoMenorAsistencia(eventos){
    let asistencias = eventos.map(evento => evento.assistance);
    asistencias = asistencias.filter(cant => cant !== undefined);
    asistencias = asistencias.map(cant => Number(cant));
    let menorAsistencia = Math.min.apply(null, asistencias);
    let eventoMenorAsistencia = eventos.find(evento => Number(evento.assistance) === menorAsistencia);
    return eventoMenorAsistencia;
};

function buscarEventoMayorCapacidad(eventos){
    let capacidades = eventos.map(evento => Number(evento.capacity));
    let mayorCapacidad = Math.max.apply(null, capacidades);
    let eventoMayoorCapacidad = eventos.find(evento => Number(evento.capacity) === mayorCapacidad);
    return eventoMayoorCapacidad;
}

function filtrarEventosPorFecha(eventos, fecha, bolean) {
    let fechaActual = new Date(fecha);
    if(bolean){ //si es true filtro los eventos posteriores a la fecha
        let eventosPosteriores = eventos.filter(evento => {
            let fechaEvento = new Date(evento.date);
            return fechaEvento > fechaActual;
          })
          return eventosPosteriores;
    }else{  //de lo contrario los eventos pasados
        let eventosPasados = eventos.filter(evento => {
            let fechaEvento = new Date(evento.date);
            return fechaEvento < fechaActual;
          })
          return eventosPasados;
    }
  };


  function extraerCategorias(eventos){
    let categorias = eventos.map(evento => evento.category);
    categorias = new Set(categorias);
    return categorias;
  }


  function estadisticasPorCategoria(eventos, categoria){


  }
