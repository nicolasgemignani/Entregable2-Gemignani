/////////////////////////////////////////////////Arrays


const historial = []


/////////////////////////////////////////////////Manejo Calculadora


//Agrega y concatena el valor asignado.
function agregarValor(valor) {

    //El atajo += nos permite concatenar.
    document.getElementById('valor').value += valor
}

//Borra el ultimo valor selecionado.
function sacarValor() {

    //Busca en Html referencia con el id 'valor'.
    const valor = document.getElementById('valor')

    //slice permite extraer una porcion deseada de un array.
    valor.value = valor.value.slice(0, -1)
}

//Borra todo lo que haya en el id 'valor'.
function borrar() {

    //Busca en Html referencia con el id 'valor'
    const valor = document.getElementById('valor')

    //Asignamos un string vacio, lo que hace borrar el contenido.
    valor.value = ''
}


/////////////////////////////////////////////////Calculo.


//Valida con ciertos criterios la expresion, antes de realizar el calculo.
function esExpresionValidaParaCalculo(expresion) {

    //Se crea un patron de validacion.
    const patron = /^[0-9+\-*/. ]*$/;

    //La expresion trim() elimina espacios vacios, Si la expresion esta vacio se ejecuta lo que este dentro de las llaves {}.
    if (expresion.trim() === '') {

        //theow new Error, La clase Error se utiliza para representar errores y exepciones al codigo.
        throw new Error('Error: La expresión está vacía.'); //Si la condicion esta vacia, se lanza el error.
    }

    //!patron.test, Metodo para verifica si coincide con el patron.
    if (!patron.test(expresion)) {

        //Error sin la expresion contiene caracteres que no esten en 'patron'.
        throw new Error('Error: La expresión contiene caracteres no permitidos.');
    }

    //Retorna true si pasa ambas verificaciones.
    return true;
}

//Calcular + verificaciones.
function calcularExpresion(expresion) {

    try { //Bloque que se deberia ejecutar.

        //Se llama a la funcion contieneDivisionPorCero.
        if (contieneDivisionPorCero(expresion)) {

            //Si la division contiene 0.
            throw new Error('Error: División por cero no permitida.');
        }

        //Crea una funcion dinamica y la invoca inmediatamente, y su resultado lo devuelve como resultado de la funcion calcularExpresion.
        return new Function('return ' + expresion)();

    } catch (error) { //Si alguna exepsion en el bloque try.

        //Error si en el bloque if hay una exepcion.
        throw new Error('Error al calcular la expresión');
    }
}

//Verificar si la expresion dada como dice la funcion, contieneDivisionPorCero
function contieneDivisionPorCero(expresion) {

    //expresión regular (regex)
    const patronDivisionPorCero = /\/\s*0/;

    //.test , Verifica que se cumpla con la cadena patronDivisionPorCero, devuelve true si hay coincidencia y si no, false
    return patronDivisionPorCero.test(expresion);
}

//Maneja el error segun el tipo.
function manejarError(error) {

    //Si hay una instacia de SyntaxError se llama a actualizar valor.
    if (error instanceof SyntaxError) {
        actualizarValor('Error de sintaxis en la expresión.');

        //Si el error no es un SyntaxError
    } else {

        //Se utiliza para errores que no son de sintaxis.
        actualizarValor(error.message);
    }
}

//Actualiza el elemento HTML con el id valor.
function actualizarValor(valor) {

    //Llama al id value del ID valor y establece el valor proporcionado.
    document.getElementById('valor').value = valor;
}

//Funcion
function calcular() {

    //Obtenemos el valor de un elemente en HTML con el ID valor.
    const cuenta = document.getElementById('valor').value;

    try { //Bloque que se deberia ejecutar.

        //Valida con ciertos criterios la expresion, antes de realizar el calculo.
        if (!esExpresionValidaParaCalculo(cuenta)) {

            //Al no ser valida.
            throw new Error('Error: La expresión no es válida para el cálculo.');
        }

        //Si la expresion es valida de calcula con la funcion calcularExpresion
        const resultado = calcularExpresion(cuenta);

        //Se agrega un objeto al array historial(cuenta,resultado).
        historial.push({ cuenta, resultado });

        //Actualiza el valor del elemento con el id valor del html.
        document.getElementById('valor').value = resultado;

        //Pasaje a JSON y localstorage. Actualiza el localstorage.
        json();

        //Parsea y muestra el localstorage en el textarea. Actualiza el valor de textarea.
        mostrarLocalStorageEnTextArea();

    } catch (error) { //Si alguna exepsion en el bloque try.

        //manejarError, Gestiona el error.
        manejarError(error);
    }
}


/////////////////////////////////////////////////Manejo de Historial


//Elimna el contenido del array 'historial', junto con el localstorage y textarea.
function eliminarHistorial() {

    //Elimina todo lo que hay dentro del array historial.
    historial.length = 0;

    //Pasaje a JSON y localstorage. Actualiza el localstorage.
    json();

    //Parsea y muestra el localstorage en el textarea. Actualiza el valor de textarea.
    mostrarLocalStorageEnTextArea();
}

//Pasaje a JSON y localstorage.
function json() {

    //JSON.stringify, Nos permite convertir el array historial en JSON
    const historialEnJSON = JSON.stringify(historial);

    //Almacenamos en el localstorage los argumentos: 'historialGuardado' como clave y 'historialEnJSON' como valor
    localStorage.setItem('historialGuardado', historialEnJSON);
}

//Parsea y muestra el localstorage en el textarea.
function mostrarLocalStorageEnTextArea() {

    //Busca en el Html el id 'historial'.
    const textArea = document.getElementById('historial');

    //get.item, Nos proporciona la clave 'historialGuardado' almacenada en el localstorage.
    const historialRecuperadoEnJson = localStorage.getItem('historialGuardado');

    if (historialRecuperadoEnJson !== null) { //Si hay un historial en el localstorage.

        try { //Bloque que se deberia ejecutar.

            //JSON.parse Nos permite convertir la cadena JSON en un objeto de JavaScript.
            const historialRecuperado = JSON.parse(historialRecuperadoEnJson);

            //Verificamos que historialRecupero sea un array y no este vacio
            if (Array.isArray(historialRecuperado) && historialRecuperado.length > 0) {

                //.map Nos permite crear un nuevo array, .join une las cadenas, en este caso con un salto de linea.
                const contHistorialRecuperado = historialRecuperado.map(item => `${item.cuenta} = ${item.resultado}`).join('\n');

                //Cambiamos el valor del textarea por el nuevo array contHistorialRecuperado.
                textArea.value = contHistorialRecuperado;
            } else {

                //Si historialRecuperado no es un array y esta vacio.
                textArea.value = 'El historial almacenado está vacío.';
            }
        } catch (error) { //Si alguna exepsion en el bloque try.

            //Mensaje de Error.
            textArea.value = 'Error al parsear el historial almacenado.';
        }
    } else { //Si no hay un historial en localstorage.

        //Aviso.
        textArea.value = 'No hay historial almacenado.';
    }
}


/////////////////////////////////////////////////Event Listeners


//DOMContentLoaded, Despues de que el DOM haya cargado y parseado se ejecuta la funcion.
document.addEventListener('DOMContentLoaded', function () {

    //Busca en el Html por el id 'eliminarHistorial'.
    const btnEliminar = document.getElementById('eliminarHistorial');

    //Si se enconstro el boton con el id 'eliminarHistorial'.
    if (btnEliminar) {

        //Se añade el evento click y se ejecuta 'eliminarHistorial'.
        btnEliminar.addEventListener('click', eliminarHistorial);
    }
});

//Agrega o pushea al textArea los calculos
document.addEventListener('DOMContentLoaded', function () { //Espera que el DOM cargue completamente antes de ejecutar la funcion

    //get.item, Nos proporciona la clave 'historialGuardado' almacenada en el localstorage.
    const historialRecuperadoEnJson = localStorage.getItem('historialGuardado');

    //Verifica que historialRecuperadoEnJson no es null o undefined (si la clave no existe o la variable no fue declarada)
    if (historialRecuperadoEnJson) {

        try { //Bloque que se deberia ejecutar.

            //JSON.parse Nos permite convertir la cadena JSON en un objeto de JavaScript.
            const historialRecuperado = JSON.parse(historialRecuperadoEnJson);

            //.push Nos permite pushear historialRecuperado a historial.
            //Spread operator "..." , Se logra una combinacion de elementos indivuales, ya que descompone el array en elementos individuales
            historial.push(...historialRecuperado);

        } catch (error) { //Si hay un error al intentar parsear se ejecuta.
            console.error('Error al parsear el historial recuperado:', error);
        }
    }

    //Parsea y muestra el localstorage en el textarea.
    mostrarLocalStorageEnTextArea();
});

//Se ejecuta la funcion json cuando el DOM este completamente cargado
document.addEventListener('DOMContentLoaded', json);