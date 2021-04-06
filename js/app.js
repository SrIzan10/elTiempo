
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () =>{
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e){
    e.preventDefault();
    
    // Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad == '' || pais == '') {

        mostrarError('Ambos campos son obligatorios');
        return;

    }
    
    // Consultamos la API

    consultarApi(ciudad,pais);
};

function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100');
    if (!alerta) {
        
        console.log(mensaje);
    
        //Crear alerta
        const alerta = document.createElement('div');
    
        alerta.classList.add('alert','alert-danger', 'mb-5', 'pb-4' ,'text-center');
        alerta.innerHTML= `
            <sctrong class=" font-bold"> Error!</strong>
            <span class="block">${mensaje}</span>
        
            `;
            container.appendChild(alerta);

        // Se eleimine la alerta despues de 5 segundos

        setTimeout(()=>{
            alerta.remove();
        },2000);
    
    }

}



// Funcion API Llamada

function consultarApi(ciudad, pais){

    const appId = 'su_api';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&units=metric&appid=${appId}`;

    //console.log(url);

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos =>{
            // Limpiar campos
            limpiarHTML();
            // Si no existe la ciudad
            console.log(datos);
            if(datos.cod === "404"){
                mostrarError('Ciudad no encontrada');
                return; // lo mismo que un else
            }

            // Mostrar datos del Clima

            mostrarClima(datos);
        })
       

}

function mostrarClima(datos){
    
    const { name, main:{ temp, temp_max, temp_min, humidity }} = datos;

   const humedad = humidity; 
   const centigrados = parseInt(temp);
   const centigra_max = parseInt(temp_max);
   const centigra_min = parseInt(temp_min);
   const nombre_ciudad = name;

    
    
    console.log(nombre_ciudad);

    // actaul 
    const actual = document.createElement('p');
    actual.innerHTML = `
        <p class="fs-1"><b>${centigrados} &#8451;</b></p>
        <p class="fs-3">Ciudad: <b>${nombre_ciudad}</b></p>
        <p class="fs-3">Humedad: <b>${humedad}</b> 💧</p>
        <p class="fs-3">Temp Max. <b>${centigra_max}</b> 🌡️</p>
        <p class="fs-3">Temp Min. <b>${centigra_min}</b> 🌡️</p>
        
    `;
    actual.classList.add('font-bold');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-dark');
    resultadoDiv.appendChild(actual);

    resultado.appendChild(resultadoDiv);

}

// Limpiar Datos o campos una vez enviados
function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
  }
