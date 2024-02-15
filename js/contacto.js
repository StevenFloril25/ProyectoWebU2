function validarFormulario() {
    var nombre = $("#txtNombreT").val();
    var telefono = $("#txtTelefonoT").val();
    var direccion = $("#txtDireccionT").val();
    var email = $("#txtEmailT").val();
    var ciudad = $("#txtCiudadT").val();
    var cv = $("#CV").val();

    if (nombre === "" || telefono === "" || direccion === "" || email === "" || ciudad === "" || cv === "") {
        alert("Por favor, complete todos los campos obligatorios.");
        return false; // Evita el envío del formulario
    }

    return true; // Envía el formulario si todos los campos están completos
}

function cerrarSesion() {
    localStorage.removeItem('sesion');
}

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

function validarFormularioC() {
    var nombre = $("#txtNombre").val();
    var email = $("#txtEmail").val();
    var telefono = $("#txtTelefono").val();
    var mensaje = $("#txtMensaje").val();

    if (nombre === "" || email === "" || telefono === "" || mensaje === "" ) {
        alert("Por favor, complete todos los campos obligatorios.");
        return false; // Evita el envío del formulario
    }

    return true; // Envía el formulario si todos los campos están completos
}




$(document).ready(function(){
    $(".contact-form").hide();
    $(".contact-form").fadeIn(3000);

    $("#btnEnviarC").click(function(){
        if(validarFormularioC()){
            $("#im2").hide();
            $("#ima").slideUp();
            setTimeout(function () {
                $("#im1").slideDown();
            });
        }else{
            $("#im1").hide();
            $("#ima").slideUp();
            setTimeout(function () {
                $("#im2").slideDown();
            });
        }
    })

    $("#btnEnviarT").click(function(){
        if(validarFormulario()){
            $("#im4").hide();
            $("#ima1").fadeOut();
            $("#im3").fadeIn();
        }else{
            $("#im3").hide();
            $("#ima1").slideUp();
            setTimeout(function () {
                $("#im4").slideDown();
            },500);
        }
    })

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
    

})