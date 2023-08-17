//VARIABLES
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

// Obtener la fecha actual
const fechaActual = new Date();
const opciones = { weekday: 'long' };
const nombreDiaSemana = fechaActual.toLocaleDateString('es-ES', opciones);

// E V E N T O S 
  // Función del evento onclick()
  function buscarCiudad() {
    let inputCiudad = document.getElementById("inputciudad").value.toLowerCase();
    let ciudadEncontrada = pais.filter(
      (ciudad) => ciudad.ciudad.toLowerCase() === inputCiudad
    );
  
    if (ciudadEncontrada.length > 0) {
      const cachedData = localStorage.getItem(ciudadEncontrada[0].ciudad);
      if (cachedData) {
        mostrarInfoClima(JSON.parse(cachedData));
      } else {
        obtenerClima(ciudadEncontrada[0].ciudad);
      }
    } else {
      mostrarInfoClima();
    }
  }


  // Función para obtener el clima y mostrarlo en un div
function obtenerClima(ciudad) {
  // Verificar si los datos están en el localStorage
  const cachedData = localStorage.getItem(ciudad);  
  if (cachedData) {
    // Mostrar los datos almacenados en el localStorage
    mostrarClimaEnDiv(JSON.parse(cachedData));
  } else {
    const apiKey = "000000000000000000000000000";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos del clima");
        }
        return response.json();
      })
      .then(data => {
        const ciudad = data.name;
        const temperatura = data.main.temp;
        const humedad = data.main.humidity;
        const condicionesClima = data.weather[0].description;
        const climaModel = new ClimaModel(ciudad, temperatura, humedad, condicionesClima);
        // Guardar los datos en el localStorage
        localStorage.setItem(ciudad, JSON.stringify(climaModel));
        mostrarClimaEnDiv(climaModel);
      })
      .catch(error => {
        console.error("Error:", error.message);
        mostrarErrorEnDiv();
      });
  }
}


// Función para mostrar el clima en un div
function mostrarClimaEnDiv(clima) {
  const infoClimaDiv = document.getElementById('infoClima');
  infoClimaDiv.innerHTML = 
  console.log(nombreDiaSemana);
  
   `<h3>Información $nombreDiaSemana del Clima:</h3>
    <p>Ciudad: ${clima.ciudad}</p>
    <p>Temperatura: ${clima.temperatura}°C</p>
    <p>Humedad: ${clima.humedad}%</p>
    <p>Condiciones: ${clima.condicionesClima}</p>`;

}
// Función para mostrar un mensaje de error en el div
function mostrarErrorEnDiv() {
  const infoClimaDiv = document.getElementById('infoClima');
  infoClimaDiv.innerHTML = "<p>Error al obtener los datos del clima.</p>";
}
    

  


  // Sub función que muestra la información del clima asociada a la ciudad ingresada sleccionada en el select de la ciudad
  function mostrarInfoClima(clima) {    
    let infoClimaDiv = document.getElementById('infoClima');
    if (clima) {
      var res = moment("01-06-2018", 'MM-DD-YYYY').locale("Es").format("dddd");
      console.log(res);
      infoClimaDiv.innerHTML = res + "<h3>Información del Clima:</h3><p>" + obtenerClima(clima) + "</p>";
      
      
    } else {
      infoClimaDiv.innerHTML = "<h3>No se encontró información para la ciudad ingresada.</h3>";
    }
  } 
