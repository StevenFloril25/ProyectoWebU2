function cerrarSesion() {
    localStorage.removeItem('sesion');
}
$(document).ready(function () {
    if (localStorage.getItem('sesion') === 'iniciada') {
        $("#login").hide();
        $("#Cerrar").show();
    }
    $("#botonC").click(function () {
        // Verificar si el usuario ha iniciado sesión consultando localStorage
        if (localStorage.getItem('sesion') === 'iniciada') {
            window.location.href = "Carrito.html";
        } else {
            alert("Inicie sesión primero");
            window.location.href = "Usuario.html";
        }
    });

    $("#Cerrar").click(function() {
        cerrarSesion();
        $("#login").show();
        $("#Cerrar").hide();
    });

    function displayCountryCard(country) {
        var cardHtml = `
    <div class="country-card">
      <h3>${country.name}</h3>
      <p>Ciudad: ${country.name}</p>
      <p>País: ${country.sys.country}</p>
      <p>Temperatura: ${country.main.temp} °C</p>
      <p>Humedad: ${country.main.humidity}%</p>
      <p>Metros sobre el nivel del mar: ${country.coord.alt} m</p>
    </div>
  `;
        var card = $(cardHtml);
        $("#country-cards").append(card);

        // Aplicar animación slideDown a la tarjeta recién agregada
        card.hide().slideDown(500);
    }

    function fetchCountriesWeather() {
        $("#country-cards").empty(); // Limpiar tarjetas de países anteriores
        // Realizar solicitud a la API de OpenWeatherMap para obtener información del clima de Santo Domingo, Ecuador
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?q=Santo%20Domingo,EC&appid=85a78b846ebecd1729738bfd0d753f65&units=metric`,
            dataType: "json",
            success: function (data) {
                displayCountryCard(data); // Mostrar la tarjeta con la información de Santo Domingo, Ecuador
            }
        });
    }

    $("#toggleButton").click(function () {
        fetchCountriesWeather(); // Llamar a la función para obtener el clima de Santo Domingo, Ecuador
    });

});

document.getElementById('toggleButton').addEventListener('click', function () {
    var barra = document.getElementById('sidebar');
    var boton = document.getElementById('content');

    if (barra.style.left === '-200px') {
        // Si la barra está oculta, mostrarla
        barra.style.left = "0px";
    } else {
        // Si la barra está mostrándose, ocultarla
        barra.style.left = "-200px";
    }


});
