
// Función para obtener el clima y mostrarlo en un div
function obtenerClima(ciudad) {
  const apiKey = "00fdf0fd0500cf4c87da23cdf5f521de"; // Reemplaza "TU_API_KEY" con tu clave de API de OpenWeatherMap
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`;
  // Hacer la solicitud Fetch a la API
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al obtener los datos del clima");
      }
      return response.json();
    })
    .then(data => {
      // Obtener la información relevante del clima desde el JSON data
      const ciudad = data.name;
      const temperatura = data.main.temp;
      const humedad = data.main.humidity;
      const condicionesClima = data.weather[0].description;

      // Crear un objeto ClimaModel con la información
      const climaModel = new ClimaModel(ciudad, temperatura, humedad, condicionesClima);

      // Mostrar el clima en el div
      mostrarClimaEnDiv(climaModel);
    })
    .catch(error => {
      console.error("Error:", error.message);
      mostrarErrorEnDiv();
    });
}

// Función para mostrar el clima en un div
function mostrarClimaEnDiv(clima) {
  const infoClimaDiv = document.getElementById('infoClima');
  infoClimaDiv.innerHTML = `
    <h3>Información del Clima:</h3>
    <p>Ciudad: ${clima.ciudad}</p>
    <p>Temperatura: ${clima.temperatura}°C</p>
    <p>Humedad: ${clima.humedad}%</p>
    <p>Condiciones: ${clima.condicionesClima}</p>
  `;



  
}

// Función para mostrar un mensaje de error en el div
function mostrarErrorEnDiv() {
  const infoClimaDiv = document.getElementById('infoClima');
  infoClimaDiv.innerHTML = "<p>Error al obtener los datos del clima.</p>";
}


// Definir el modelo para representar la información del clima
class ClimaModel {
  constructor(ciudad, temperatura, humedad, condicionesClima) {
    this.ciudad = ciudad;
    this.temperatura = temperatura;
    this.humedad = humedad;
    this.condicionesClima = condicionesClima;
  }
}



const Clima = function(pais, ciudad, fecha, clima) {
  this.pais = pais;
  this.ciudad = ciudad;
  this.fecha = fecha;
  this.clima = clima;
}

// declaro las ciudades que tienen X clima para X fecha
let ciudad1 = new Clima("CHILE", "PUCON", "2023-07-31", "Min 6°, Max 16°, Nublado y chubascos");
let ciudad2 = new Clima("CHILE", "TEMUCO", "2023-07-31", "Min 7°, Max 17°, Parcialmente Nublado");
let ciudad3 = new Clima("CHILE", "VILLARICA", "2023-07-31", "Min 8°, Max 18°, nublado y brumoso");
let ciudad4 = new Clima("CHILE", "ANGOL", "2023-07-31", "Min 9°, Max 19°, Despejado y heladas");
let ciudad5 = new Clima("ARGENTINA", "JUNIN", "2023-07-31", "Min 6°, Max 16°, Nublado y chubascos");
let ciudad6 = new Clima("ARGENTINA", "BARILOCHE", "2023-07-31", "Min 7°, Max 17°, Parcialmente Nublado");
let ciudad7 = new Clima("ARGENTINA", "MENDOZA", "2023-07-31", "Min 8°, Max 18°, nublado y brumoso");
let ciudad8 = new Clima("ARGENTINA", "CORDOBA", "2023-07-31", "Min 9°, Max 19°, Despejado y heladas");

let pais = [ciudad1, ciudad2, ciudad3, ciudad4,ciudad5, ciudad6, ciudad7, ciudad8];

document.addEventListener("DOMContentLoaded", function() {
  // Obtener el elemento select del país y "llenarlo" dinámicamente con JS
  const selectPais = document.getElementById("selectPais");
  const selectCiudad = document.getElementById("selectCiudad");
  const ciudadesPorPais = {};

  // Llenar el select de países y crear un objeto con las ciudades por país
  pais.forEach((ciudad) => {
    if (!ciudadesPorPais[ciudad.pais]) {
      ciudadesPorPais[ciudad.pais] = [];
    }
    ciudadesPorPais[ciudad.pais].push(ciudad.ciudad);
  });

  // Llenar el select de países
  for (const pais in ciudadesPorPais) {
    const option = document.createElement("option");
    option.textContent = pais;
    option.value = pais;
    selectPais.appendChild(option);
    llenarCiudades();
  }

  // Función para llenar el select de ciudades según el país seleccionado
  function llenarCiudades() {
    const selectedPais = selectPais.value;
    selectCiudad.innerHTML = ""; // Limpiar opciones previas

    ciudadesPorPais[selectedPais].forEach((ciudad) => {
      const option = document.createElement("option");
      option.textContent = ciudad;
      option.value = ciudad;
      selectCiudad.appendChild(option);
    });
    //fuerzo el mostar clima al cambiar de pais a la primea ciudad deplegada
    buscaciudad();
  }

  // Asignar evento al cambio de selección de país
  selectPais.addEventListener("change", llenarCiudades);

  // Asignar evento al cambio de selección de ciudad
  selectCiudad.addEventListener("change", buscaciudad);

  

  // Función del evento onclick()
  function buscaciudad() {
    let inputCiudad = document.getElementById("selectCiudad").value.toLowerCase();
    let ciudadEncontrada = pais.filter(
      (ciudad) => ciudad.ciudad.toLowerCase() === inputCiudad
    );

    if (ciudadEncontrada.length > 0) {
      mostrarInfoClima(ciudadEncontrada[0].ciudad);
    } else {
      mostrarInfoClima(); // PASO CLIMA EN BLANCO PARA INFORMAR VIA HTML QUE NO HAY INFO
    }
  }

  // Sub función que muestra la información del clima asociada a la ciudad ingresada sleccionada en el select de la ciudad
  function mostrarInfoClima(clima) {
    
    let infoClimaDiv = document.getElementById('infoClima');
    if (clima) {
      infoClimaDiv.innerHTML = "<h3>Información del Clima:</h3><p>" + obtenerClima(clima); + "</p>";
    } else {
      infoClimaDiv.innerHTML = "<h3>No se encontró información para la ciudad ingresada.</h3>";
    }
  }

  
});
