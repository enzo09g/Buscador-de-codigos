const URL_DATA = 'data/MOCK_DATA.json'
const tBody = document.querySelector('tbody')

const template = document.querySelector('template');
const templateClone = template.content.cloneNode(true);

document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('input')
    input.addEventListener('input', buscar)
    generarFila()
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
        tdNombre.textContent = element.nombre
        tdCodigo.textContent = element.codigo
        tdSerie.textContent = element.serie
        tdMedida.textContent = element.medida
        tBody.appendChild(templateClone)
    })

}

async function cargar() {
    const res = await fetch(URL_DATA);
    const data = await res.json();
    return data
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