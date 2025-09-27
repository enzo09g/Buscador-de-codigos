const URL_DATA = 'data/MOCK_DATA.json'
const tBody = document.querySelector('tbody')
const palabras = ['corrediza', 'monoblock', 'silicona']

const template = document.querySelector('template');
const templateClone = template.content.cloneNode(true);

document.addEventListener('DOMContentLoaded', async () => {
    const input = document.querySelector('input')
    input.addEventListener('input', buscar)
    await generarFila()
    agregarEventos()
    input.focus()
})

async function generarFila() {
    const data = await cargar()

    data.forEach(element => {
        const template = document.querySelector('template');
        const templateClone = template.content.cloneNode(true);
        const tdNombre = templateClone.querySelector('td[data-column="column1"]')
        const tdSerie = templateClone.querySelector('td[data-column="column2"]')
        const tdMedida = templateClone.querySelector('td[data-column="column3"]')
        const tdCodigo = templateClone.querySelector('td[data-column="column4"]')


        let descripcion = palabras.some(p => element.nombre.toLowerCase().includes(p))
            ? `${element.nombre} ${element.medida}`
            : element.nombre

        tdNombre.textContent = descripcion
        tdCodigo.textContent = element.codigo
        tdSerie.textContent = element.serie
        tdMedida.textContent = element.medida
        const datoExcel = [element.codigo, element.serie, "", descripcion].join('\t')
        templateClone.querySelector('tr').dataset.info = datoExcel
        tBody.appendChild(templateClone)
    })

}

async function cargar() {
    const res = await fetch(URL_DATA);
    const data = await res.json();
    return data
}

function agregarEventos() {
    const buttons = document.querySelectorAll('td.columnButton')
    console.log(buttons)
    buttons.forEach(element => {
        element.addEventListener('click', (event) => {
            const tr = event.target.closest('tr')
            const copyData = tr.dataset.info
            copiarParaExcel(copyData)
        })
    })
}


function buscar() {
    const input = document.querySelector('input');
    const busqueda = input.value.toLowerCase().trim();
    const filas = document.querySelectorAll('tr.filas');

    // Separar la búsqueda en palabras
    const palabras = busqueda.split(/\s+/);

    filas.forEach(fila => {
        const texto = fila.textContent.toLowerCase();

        // Verificar si todas las palabras están en el texto
        const todasCoinciden = palabras.every(palabra => texto.includes(palabra));

        if (todasCoinciden) {
            fila.classList.remove('hidden');
        } else {
            fila.classList.add('hidden');
        }
    });
}

function copiarParaExcel(fila) {
    navigator.clipboard.writeText(fila)
        .then(() => {
            // alert("Fila copiada. Pega en Excel (Ctrl+V) y verás la última celda ocupando 4 columnas.");
        })
        .catch(err => {
            console.error("Error al copiar: ", err);
        });
}