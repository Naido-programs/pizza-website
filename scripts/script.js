document.addEventListener("DOMContentLoaded", () => {
    let products = document.getElementById("products")
    if (products != null) {

        let ofertas = document.getElementById("ofertas")
        let pizza = document.getElementById("pizza")
        let entrantes = document.getElementById("entrantes")
        let bebidas = document.getElementById("bebidas")
        let postres = document.getElementById("postres")

        ofertas.addEventListener("click", (e) => {
            cargaProductos("ofertas")
            markActiveFilter(ofertas)
        })

        pizza.addEventListener("click", (e) => {
            cargaProductos("pizza")
            markActiveFilter(pizza)
        })

        entrantes.addEventListener("click", (e) => {
            cargaProductos("entrantes")
            markActiveFilter(entrantes)
        })

        bebidas.addEventListener("click", (e) => {
            cargaProductos("bebidas")
            markActiveFilter(bebidas)
        })

        postres.addEventListener("click", (e) => {
            cargaProductos("postres")
            markActiveFilter(postres)
        })
    }

    cargaProductos("ofertas")
    markActiveFilter(ofertas)

})

function markActiveFilter(activeButton) {
    let filters = document.getElementById("filtros")
    let buttons = filters.querySelectorAll("button")
    buttons.forEach(e => {

        if (activeButton.id == e.id) {
            e.classList.add("brightness-100")
            e.classList.remove("brightness-75")
        }
        else if (e.classList.contains("brightness-100")) {
            e.classList.remove("brightness-100")
            e.classList.add("brightness-75")
        }
    })
}

function cargaProductos(activeOption) {
    products.innerHTML = ""
    fetch(window.location.href+"/data/productos.json")
        .then(data => { return data.json() })
        .then(json => {
            json[activeOption].forEach(element => {
                //console.log(element)
                products.appendChild(tarjeta(element.titulo, element.descripcion, element.descuento, element.precio, element.imagen))
            });
        })
}

function tarjeta(titulo, descripcion, descuento, precio, imagen) {
    let container = document.createElement("div")
    let html = `<img class="rounded-t-lg" src="images/${imagen}" alt="">
                <div class="flex flex-col h-full justify-between gap-3 p-3">
                    <h2 class="text-lg font-semibold text-neutral-800">${titulo}</h2>
                    <p class="text-sm text-neutral-700">${descripcion}</p>
                    <div class="flex flex-row justify-between items-center">
                        <span class="font-semibold">${precio} €</span>
                        <button class="uppercase text-white font-semibold px-3 py-2 rounded-md bg-green-600 hover:bg-green-500">añadir</button>
                    </div>
                </div>`

    container.innerHTML = html
    container.className = "flex flex-col bg-white rounded-md shadow"

    return container
}
