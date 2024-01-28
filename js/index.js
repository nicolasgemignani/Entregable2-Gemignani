const historial = []

function agregarValor(value) {
    document.getElementById('valor').value += value
}

function sacarValor() {
    let valor = document.getElementById('valor')
    valor.value = valor.value.slice(0, -1)
}

function borrar() {
    let valor = document.getElementById('valor')
    valor.value = valor.value.slice(0, 0)
}

function calcular() {
    try {
        const cuenta = (document.getElementById('valor').value)
        const resultado = eval(cuenta)
        historial.push({cuenta,resultado})
        document.getElementById('valor').value = resultado
        historialTextArea()
    } catch (error) {
        document.getElementById('valor').value = 'Error: Ingresa un número válido'
    }
}

function historialTextArea(){
    const textArea = document.getElementById('historial')
    const contHistorial = historial.map(item => `${item.cuenta} = ${item.resultado}`).join('\n')
    textArea.value = contHistorial
}