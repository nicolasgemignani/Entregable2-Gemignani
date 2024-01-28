//Array del Historial.
const historial = []

//Agrega y concatena el valor asignado.
function agregarValor(valor) {

    //El atajo += nos permite concatenar
    document.getElementById('valor').value += valor
}

//Borra el ultimo valor selecionado.
function sacarValor() {

    //Busca en Html referencia con el id 'valor'
    let valor = document.getElementById('valor')

    //slice permite extraer una porcion deseada de un array
    valor.value = valor.value.slice(0, -1)
}

//Borra todo lo que haya en el id 'valor'.
function borrar() {

    //Busca en Html referencia con el id 'valor'
    let valor = document.getElementById('valor')

    //slice permite extraer una porcion deseada de un array
    valor.value = valor.value.slice(0, 0)
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

        try { //Codigo que puede dar error.

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
        } catch (error) { //Si hay un error al intentar parsear se ejecuta.

            //Mensaje de Error.
            textArea.value = 'Error al parsear el historial almacenado.';
        }
    } else { //Si no hay un historial en localstorage.

        //Aviso.
        textArea.value = 'No hay historial almacenado.';
    }
}

//Funcionamiento de la calculadora.
function calcular() {

    //Estructura try - catch. (Podria haber usado if - else pero lo vi mas prolijo con asi.)
    try { //Codigo que puede dar error.

        //Busca en el Html el value del id 'valor'.
        const cuenta = document.getElementById('valor').value

        //eval, Evalua y obtiene el resultado, en este caso de la variable cuenta.
        const resultado = eval(cuenta)

        //.push Nos permite agregar al Array historial las variables "cuenta" y "resultado".
        historial.push({ cuenta, resultado })

        //Busca en el Html el value del id valor y lo cambia por la variable "resultado".
        document.getElementById('valor').value = resultado

        //Funcion json para actualizar el historial en el localstorage.
        json()

        //Funcion mostrarLocalStorageEnTextArea para mostrar el historial en el textarea.
        mostrarLocalStorageEnTextArea()

    } catch (error) { //Si hay un error se ejecuta.

        //Busca en el Html el value del id 'valor' y lo cambia por un mensaje de error.
        document.getElementById('valor').value = 'Error: Ingresa un número válido'
    }
}

//Elimna el contenido del array 'historial', junto con el localstorage y textarea.
function eliminarHistorial() {

    //Elimina todo lo que hay dentro del array historial.
    historial.length = 0;

    //Pasaje a JSON y localstorage. Actualiza el localstorage.
    json();

    //Parsea y muestra el localstorage en el textarea. Actualiza el valor de textarea.
    mostrarLocalStorageEnTextArea();
}

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

        try { //Codigo que puede dar error.

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