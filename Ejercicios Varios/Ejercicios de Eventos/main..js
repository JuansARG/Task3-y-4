let formulario = document.getElementById("formularioIMC");
//console.log([formulario]);

function calcularIMC(e){
    e.preventDefault();
    //console.log([e.target]);
    let altura = e.target[0].value / 100;
    let peso = e.target[1].value;
    formulario.reset();
    e.target[3].value = (peso / (altura * altura)).toFixed(1);
}

formulario.addEventListener("submit", (e) => {calcularIMC(e)});
//
//
//
let inputPesos = document.querySelector("#pesos");

let inputDolares = document.querySelector("#dolares");


function convertirPesos(e){
    let pesos = e.target.value;
    e.target.parentNode.parentNode[1].value = (pesos / 180).toFixed(2);
}

inputPesos.addEventListener("keyup", (e)=>{convertirPesos(e)});

function convertirDolares(e){
    let dolares = e.target.value;
    e.target.parentNode.parentNode[0].value = dolares * 180;
}

inputDolares.addEventListener("keyup", (e)=>{convertirDolares(e)});