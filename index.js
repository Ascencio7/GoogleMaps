// Configurar el mapa
function initialize() {
    var mapOptions = {
        // Nivel de zoom inicial del mapa
        zoom: 10,
        // Coordenadas iniciales al cargar el mapa (El Salvador)
        center: new google.maps.LatLng(13.6972, -89.1940),
        // Tipo de mapa (ROADMAP, SATELLITE, HYBRID, TERRAIN)
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        // Nivel mínimo de zoom permitido
        minZoom: 2
    };

    // Crear una nueva instancia del mapa utilizando las opciones proporcionadas
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Crear una ventana de información para mostrar detalles de ubicación
    var infoWindow = new google.maps.InfoWindow();

    // Array para almacenar todos los marcadores
    var markers = [];

    // Escuchar clics en el mapa para agregar marcadores dinámicamente
    map.addListener('click', function (event) {
        // Obtener las coordenadas donde se hizo clic
        var clickedLocation = event.latLng;

        // Crear un nuevo marcador en la ubicación seleccionada
        var marker = new google.maps.Marker({
            position: clickedLocation,
            map: map,
            title: `Marcador en: ${clickedLocation.lat().toFixed(4)}, ${clickedLocation.lng().toFixed(4)}`
        });

        // Agregar el marcador al array de marcadores
        markers.push(marker);

        // Agregar un evento al marcador para mostrar su información al hacer clic izquierdo
        marker.addListener('click', function () {
            infoWindow.setContent(marker.title);
            infoWindow.open(map, marker);
        });

        // Agregar un evento al marcador para eliminarlo al hacer clic derecho
        marker.addListener('rightclick', function () {
            // Eliminar el marcador del mapa
            marker.setMap(null);

            // Eliminar el marcador del array
            markers = markers.filter(m => m !== marker);
        });
    });

    // Ajustar el centro del mapa cuando se cambia el tamaño de la ventana
    google.maps.event.addDomListener(window, "resize", function () {
        map.setCenter(mapOptions.center);
    });
}

// Inicializar el mapa cuando se termine de cargar la ventana
google.maps.event.addDomListener(window, 'load', initialize);