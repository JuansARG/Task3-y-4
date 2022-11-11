
let eventos;
let categorias;
fetch('https://amazing-events.herokuapp.com/api/events')
    .then(respuesta => respuesta.json())
    .then(datos => {
        eventos = datos.events;
        categorias = eventos.map(evento => evento.category);
        categorias = new Set(categorias);
        categorias = Array.from(categorias);
        buscarEventoMayorAsistencia(eventos);
    })
    .catch(e => console.log(e));

function buscarEventoMayorAsistencia(eventos){
    let asistencias = eventos.map(evento => evento.assistance);
    asistencias = asistencias.filter(cant => cant !== undefined);
    asistencias = asistencias.map(cant => Number(cant));
    console.log(asistencias)
    //let mayorAsistencia = Math.max(asistencias);
    //let eventoMayorAsistencia = eventos.find(evento => evento.assistance === mayorAsistencia);
    //console.log(eventoMayorAsistencia);
}

