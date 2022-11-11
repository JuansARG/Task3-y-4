console.table(beers);
console.log("___________");

// 1 - Generar una función que reciba como parámetro el array de cervezas y un valor de alcohol.
// La función debe devolver un nuevo array con las cervezas que no excedan el nivel etílico.
// Cada elemento del nuevo array debe ser un objeto que tenga la propiedades nombre, alcohol(abv) y "amargor"(ibu)

const objetoCerveza = (cerveza) => {
    return {
        name : cerveza.name,
        abv : cerveza.abv,
        ibu : cerveza.ibu
    }
}

function filtrarCervezaPorNivelEtilico(cervezas, nivelEtilico){
    return cervezas.filter(cerveza => cerveza.abv <= nivelEtilico)
                    .map(objetoCerveza);
}
let cervezasFiltradasPorNivelEtilico = filtrarCervezaPorNivelEtilico(beers, 7);
console.table(cervezasFiltradasPorNivelEtilico);





// 2 - Generar una función que reciba como parámetro un array de cervezas y devuelva un nuevo array con las 10 cervezas más alcohólicas.

function filtrarCervezasMasAlcoholicas(cervezas){
    let cervezasMasAlcoholicas = cervezas.filter(e => e.abv)
                                .sort((a, b) => a.abv - b.abv)
                                .slice(0, 10)
                                .map(objetoCerveza);

    return cervezasMasAlcoholicas;
}
let cervezasMasAlcoholicas = filtrarCervezasMasAlcoholicas(beers);
console.table(cervezasMasAlcoholicas);





//3-  Generar una función que reciba como parámetro un array de cervezas y devuelva un nuevo array con las 10 cervezas menos amargas
function filtrarCervezasMenosAmargas(cervezas){
    let cervezasMenosAmargas = cervezas.filter(e => e.ibu)
                                .sort((a, b) => b.ibu - a.ibu)
                                .slice(0, 10)
                                .map(objetoCerveza);
    return cervezasMenosAmargas;
}

let cervezasMenosAmargas = filtrarCervezasMenosAmargas(beers);
console.table(cervezasMenosAmargas);





// 4-  Generar una función que reciba como parámetro un array de cervezas, un nombre de propiedad y un valor booleano.
// Debe devolver un nuevo array con 10 cervezas ordenadas por la propiedad ingresada como segundo argumento, de manera ascendente si el tercero es true o descendente si es false

function ordenarCervezasPorPropiedad(cervezas, propiedad, boleano){
    let orden;
    if(boleano){
        orden = 1;
    }else{
        orden = -1;
    }

    let cervezarOrdenadasPorPropiedad = cervezas.filter(e => e[propiedad])

    cervezarOrdenadasPorPropiedad.sort( (a, b) => {
        if( a[propiedad] > b[propiedad] ) return 1 * orden;
        if( b[propiedad] > a[propiedad] ) return -1 * orden;
        return 0;
    })

    return cervezarOrdenadasPorPropiedad.slice(0, 10).map(objetoCerveza);
}

let cervezarOrdenadasPorPropiedad = ordenarCervezasPorPropiedad(beers, "abv", true);
console.table(cervezarOrdenadasPorPropiedad);





// 5-  Generar una función que reciba como parámetro un array de cervezas y un id.
//  La función debe renderizar (renderear, dibujar, pintar, llenar, etc) en un  archivo html una tabla que contenga las columnas "Name", "ABV", "IBU",
//   y una fila por cada elemento del array. Cada fila debe tener los datos que se piden  de cada una de las cervezas.

function renderizarTabla(cervezas, id){
    let contenedor = document.getElementById(id);
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");

    thead.innerHTML = `
        <tr>
            <th>Name:</th>
            <th>ABV:</th>
            <th>IBU:</th>
        </tr>
    `

    cervezas.forEach(cerveza =>{
        tbody.innerHTML +=`
            <tr>
                <td>${cerveza.name}</td>
                <td>${cerveza.abv}</td>
                <td>${cerveza.ibu}</td>
            </tr>
        `
    })

    table.appendChild(thead);
    table.appendChild(tbody);
    contenedor.insertAdjacentElement("afterbegin", table);
}

renderizarTabla(beers, "contenedor");








