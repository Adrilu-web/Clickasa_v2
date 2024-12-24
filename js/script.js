document.addEventListener("DOMContentLoaded", () => {
    //Insertar dentro del DOM los inmuebles
    //selecciono el elemento con el id 'propiedades'
    const container = document.getElementById('propiedades');
    const card = document.createElement('div');
    card.classList.add('propiedad_contenedor');
    mostrarFav();
    
    // Cargar el JSON de inmuebles 
    fetch('inmuebles.json')
        .then(response => response.json())
        .then(data => {
            // Crear cards por cada inmueble
            data.forEach((inmueble, indice) => {
                card.innerHTML += `
                <div class="propiedad_card">
                    <img src="${inmueble.img}" alt=${inmueble.direccion}">
                    <h4>${inmueble.operacion} - ${inmueble.tipo_inmueble}</h4>
                    <p>${inmueble.direccion}</p> 
                    <p>Precio: ${inmueble.precio.toLocaleString("en-CA", {style:"currency", currency:"USD"})}<br>   
                    ${inmueble.descripcion_corta}</p>           
                    <button class="vermas_btn" data-index="${indice}">Ver Más</button>
                    <button class="favoritos_btn" data-index="${indice}">Agregar a Favoritos</button>
                </div>
                 `;
                 container.appendChild(card);
             });

            // Agregar eventos a "Ver Más"
            const botver= document.querySelectorAll('.vermas_btn');
            botver.forEach(btn => {
                btn.addEventListener('click', (event) => {
                    const index = event.target.dataset.index;
                    verDetalles(data[index]);
                });
            });

            // Agregar eventos a  "Favoritos"
            const botfav= document.querySelectorAll('.favoritos_btn');
            botfav.forEach(btn => {
                btn.addEventListener('click', (event) => {
                    const index = event.target.dataset.index;
                    agregarFav(data[index]);

                });
            });

        })
        
        .catch(error => console.error('Error al cargar el archivo JSON:', error));

    // Función para agregar a favoritos
    function agregarFav(inmueble) {
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || []; 

        //LocalStorage
        if (typeof(Storage) !== "undefined") {
            //ver si es un inmueble repetido
            if (!favoritos.some(fav => fav.id === inmueble.id)) {
                favoritos.push(inmueble);
                localStorage.setItem('favoritos', JSON.stringify(favoritos));
                alert('Inmueble agregado a favoritos.');
                mostrarFav();
            } else {
                alert('Este inmueble ya está en favoritos.');
            }
        } 
        return false;
    }

    // Función para mostrar favoritos
    function mostrarFav() {
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || []; 
        const container = document.getElementById('mostrarFav');
        container.innerHTML = '<h4>Lista de Inmuebles Favoritos</h4>'
          if (favoritos.length === 0) {
            container.innerHTML = '<h4>No hay inmuebles en favoritos.</h4>';
        } 
        else {
            const card = document.createElement('div');
            card.classList.add('favoritos_contenedor');

            // Crear cards por cada favorito
            favoritos.forEach((inmueble, index) => {
                card.innerHTML += `
                <div class="favoritos_card">
                        <h4>${inmueble.operacion} - ${inmueble.tipo_inmueble}</h4>
                        <p>${inmueble.direccion}</p>
                        <p>Precio: ${inmueble.precio.toLocaleString("en-CA", {style:"currency", currency:"USD"})}</p>  
                        <button class="elimfav_btn" data-index="${index}">Eliminar</button>
                </div>       
                `; 
                container.appendChild(card);
            });

            // Evento para eliminar favoritos
            document.querySelectorAll('.elimfav_btn').forEach(button => {
                button.addEventListener('click', event => {
                    const index = event.target.dataset.index;
                    eliminarFav(index);
                });
            });
        }
        // Función para eliminar de favoritos
        function eliminarFav(id) {
            // elimino de localStorage
            favoritos.splice(id, 1);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
            // elimino del Documento
            const elemento = document.getElementsByClassName('favoritos_card');

            elemento[id].remove();       

        }
    }

});

// Función para mostrar detalles
function verDetalles(inmueble) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
        // Crear modal
        modal.innerHTML = `
            <div class="modal_content">
                <span class="close_btn">&times;</span>
  				<div class="carousel_content">
                    <div class="carousel_elemento">
                        <img src="${inmueble.img}" alt="${inmueble.direccion}" width=200 height="200">
                    </div>
                    <div class="carousel_elemento">
                        <img src="${inmueble.img1}" alt="${inmueble.direccion}" width=200 height="200">
                    </div>
                    <div class="carousel_elemento">
                        <img src="${inmueble.img2}" alt="${inmueble.direccion}" width=200 height="200">
                    </div>
                    <div class="carousel_elemento">
                        <img src="${inmueble.img3}" alt="${inmueble.direccion}" width=200 height="200">
                    </div>
                    <div class="carousel_elemento">
                        <img src="${inmueble.img4}" alt="${inmueble.direccion}" width=200 height="200">
                    </div>
                    <div class="carousel_elemento">
                        <img src="${inmueble.img5}" alt="${inmueble.direccion}" width=200 height="200">
                    </div>
                </div>
                <h4>${inmueble.operacion}-${inmueble.tipo_inmueble}-${inmueble.direccion}</h4>
                <p><strong>Precio: ${inmueble.precio.toLocaleString("en-CA", {style:"currency", currency:"USD"})}</strong></p>
                <p>${inmueble.descripcion_larga}</p>     
            </div>
        `;
        document.body.appendChild(modal);

        // Cerrar modal
        modal.querySelector('.close_btn').addEventListener('click', () => {
            modal.remove();
        });
        
}
