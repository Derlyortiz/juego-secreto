let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 25;
const MAX_DIGITOS = numeroMaximo.toString().length;



function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('intentar').disabled = true;
    } else {
        //El usuario no acertó.
        if (intentos === 5) {
            asignarTextoElemento('p', `Perdiste! El número secreto era ${numeroSecreto}`);
            document.getElementById('valorUsuario').setAttribute('disabled','true');
            document.getElementById('reiniciar').removeAttribute('disabled');
            document.getElementById('intentar').disabled = true;
            return;
        }
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    let input = document.getElementById('valorUsuario');
    input.value = '';
    input.focus();

    document.getElementById('intentar').disabled = true;
}

function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    } else {
        //Si el numero generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    const input = document.getElementById('valorUsuario');
    input.addEventListener('keydown', function (event) {
        if (['e', 'E', '+', '-'].includes(event.key)) {
        event.preventDefault();
    }

    if (event.key === 'Enter' && !document.getElementById('intentar').disabled) {
        verificarIntento();
    }
    });

    input.addEventListener('input', function () {
    if (input.value.length > MAX_DIGITOS) {
        input.value = input.value.slice(0, MAX_DIGITOS);
    }
    });
    
    const botonIntentar = document.getElementById('intentar');
    input.addEventListener('input', function () {
    botonIntentar.disabled = input.value.trim() === '';})
    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('h2',`Tienes solo 5 intentos para acertar el número`);
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    asignarTextoElemento('h3',`1 al ${numeroMaximo}`);
    document.getElementById('valorUsuario').disabled = false;
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    console.log(numeroSecreto);
}

function reiniciarJuego() {
    //limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números 
    //Generar el número aleatorio
    //Inicializar el número intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    document.getElementById('intentar').disabled = true;
    
}

condicionesIniciales();