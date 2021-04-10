
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

    const appId = '52b8161b672d49cc8cddf491cba61fdd';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&lang=es&&units=metric&appid=${appId}`;

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
   const id = datos.weather[0].id;
   const cambio = datos.weather[0].description;
   const descripcion = cambio.toLocaleUpperCase();
   const humedad = humidity; 
   const centigrados = parseInt(temp);
   const centigra_max = parseInt(temp_max);
   const centigra_min = parseInt(temp_min);
   const nombre_ciudad = name;

    
    console.log(id)
    console.log(nombre_ciudad);

    // actaul 
    const actual = document.createElement('p');
    if(id< 250){
        // Poner imagenes
        actual.innerHTML = `
        <p class="fs-2 img-fluid ">${descripcion}</p>
            <img src="../img/tormenta.png">
            <p class="fs-1"><b>${centigrados} &#8451;</b></p>
            <p class="fs-3">Ciudad: <b>${nombre_ciudad}</b></p>
            <p class="fs-3">Humedad: <b>${humedad}</b> 💧</p>
            <p class="fs-3">Temp Max. <b>${centigra_max}</b> 🌡️</p>
            <p class="fs-3">Temp Min. <b>${centigra_min}</b> 🌡️</p>
            
        `;
    }else if(id < 350){
        actual.innerHTML = `
        <p class="fs-2 img-fluid ">${descripcion}</p>
        <img src="../img/sol-agua.png">
        <p class="fs-1"><b>${centigrados} &#8451;</b></p>
        <p class="fs-3">Ciudad: <b>${nombre_ciudad}</b></p>
        <p class="fs-3">Humedad: <b>${humedad}</b> 💧</p>
        <p class="fs-3">Temp Max. <b>${centigra_max}</b> 🌡️</p>
        <p class="fs-3">Temp Min. <b>${centigra_min}</b> 🌡️</p>
        
    `;

    }else if(id < 550){
        actual.innerHTML = `
        <p class="fs-2 img-fluid ">${descripcion}</p>
        <img src="../img/lluvia.png">
        <p class="fs-1"><b>${centigrados} &#8451;</b></p>
        <p class="fs-3">Ciudad: <b>${nombre_ciudad}</b></p>
        <p class="fs-3">Humedad: <b>${humedad}</b> 💧</p>
        <p class="fs-3">Temp Max. <b>${centigra_max}</b> 🌡️</p>
        <p class="fs-3">Temp Min. <b>${centigra_min}</b> 🌡️</p>
        
    `;
    }else if(id < 650){
        actual.innerHTML = `
        <p class="fs-2 img-fluid ">${descripcion}</p>
        <img src="../img/nieve.png">
        <p class="fs-1"><b>${centigrados} &#8451;</b></p>
        <p class="fs-3">Ciudad: <b>${nombre_ciudad}</b></p>
        <p class="fs-3">Humedad: <b>${humedad}</b> 💧</p>
        <p class="fs-3">Temp Max. <b>${centigra_max}</b> 🌡️</p>
        <p class="fs-3">Temp Min. <b>${centigra_min}</b> 🌡️</p>
        
    `;
    }else if(id < 800){
        actual.innerHTML = `
        <p class="fs-2 img-fluid ">${descripcion}</p>
        <img src="../img/niebla.png">
        <p class="fs-1"><b>${centigrados} &#8451;</b></p>
        <p class="fs-3">Ciudad: <b>${nombre_ciudad}</b></p>
        <p class="fs-3">Humedad: <b>${humedad}</b> 💧</p>
        <p class="fs-3">Temp Max. <b>${centigra_max}</b> 🌡️</p>
        <p class="fs-3">Temp Min. <b>${centigra_min}</b> 🌡️</p>
        
    `;
    }else if(id === 800){
        actual.innerHTML = `
        <p class="fs-2 img-fluid ">${descripcion}</p>
        <img src="../img/sol.png">
        <p class="fs-1"><b>${centigrados} &#8451;</b></p>
        <p class="fs-3">Ciudad: <b>${nombre_ciudad}</b></p>
        <p class="fs-3">Humedad: <b>${humedad}</b> 💧</p>
        <p class="fs-3">Temp Max. <b>${centigra_max}</b> 🌡️</p>
        <p class="fs-3">Temp Min. <b>${centigra_min}</b> 🌡️</p>
        
    `;
    }else if(id > 800){
        actual.innerHTML = `
        <p class="fs-2 img-fluid ">${descripcion}</p>
        <img src="../img/nublado.png">
        <p class="fs-1"><b>${centigrados} &#8451;</b></p>
        <p class="fs-3">Ciudad: <b>${nombre_ciudad}</b></p>
        <p class="fs-3">Humedad: <b>${humedad}</b> 💧</p>
        <p class="fs-3">Temp Max. <b>${centigra_max}</b> 🌡️</p>
        <p class="fs-3">Temp Min. <b>${centigra_min}</b> 🌡️</p>
        
    `;
    }

    //
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