// *
// * Adicionar multiplos marcadores
// * 2013 - www.marnoto.com
// *

// Váriáveis necessárias
var map;
var infoWindow;

var lat = document.getElementById('planta_latitude').innerHTML;
var long = document.getElementById('planta_longitude').innerHTML;
var popular = document.getElementById('popular').innerHTML;
var descricao = document.getElementById('descricao').innerHTML;


// A variável markersData guarda a informação necessária a cada marcador
// Para utilizar este código basta alterar a informação contida nesta variável
var markersData = [
    {
        lat: lat,
        lng: long,
        nome: "Nome popular: ",
        morada1: popular,
        morada2: "Descrição: ",
        codPostal: descricao // não colocar virgula no último item de cada maracdor
    }
];


function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(lat),
        zoom: 18,
        mapTypeId: 'roadmap',
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    // cria a nova Info Window com referência à variável infowindow
    // o conteúdo da Info Window será atribuído mais tarde
    infoWindow = new google.maps.InfoWindow();

    // evento que fecha a infoWindow com click no mapa
    google.maps.event.addListener(map, 'click', function () {
        infoWindow.close();
    });

    // Chamada para a função que vai percorrer a informação
    // contida na variável markersData e criar os marcadores a mostrar no mapa
    displayMarkers();
}
google.maps.event.addDomListener(window, 'load', initialize);

// Esta função vai percorrer a informação contida na variável markersData
// e cria os marcadores através da função createMarker
function displayMarkers() {

    // esta variável vai definir a área de mapa a abranger e o nível do zoom
    // de acordo com as posições dos marcadores
    var bounds = new google.maps.LatLngBounds();

    // Loop que vai estruturar a informação contida em markersData
    // para que a função createMarker possa criar os marcadores
    for (var i = 0; i < markersData.length; i++) {

        var latlng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
        var nome = markersData[i].nome;
        var morada1 = markersData[i].morada1;
        var morada2 = markersData[i].morada2;
        var codPostal = markersData[i].codPostal;

        createMarker(latlng, nome, morada1, morada2, codPostal);

        // Os valores de latitude e longitude do marcador são adicionados à
        // variável bounds
        bounds.extend(latlng);
    }

    // Depois de criados todos os marcadores
    // a API através da sua função fitBounds vai redefinir o nível do zoom
    // e consequentemente a área do mapa abrangida.
    map.fitBounds(bounds);
}

// Função que cria os marcadores e define o conteúdo de cada Info Window.
function createMarker(latlng, nome, morada1, morada2, codPostal) {
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        title: nome
    });

    // Evento que dá instrução à API para estar alerta ao click no marcador.
    // Define o conteúdo e abre a Info Window.
    google.maps.event.addListener(marker, 'click', function () {

        // Variável que define a estrutura do HTML a inserir na Info Window.
        var iwContent = '<div id="iw_container">' +
            '<div class="iw_title">' + nome + '</div>' +
            '<div class="iw_content">' + morada1 + '<br />' +
            morada2 + '<br />' +
            codPostal + '</div></div>';

        // O conteúdo da variável iwContent é inserido na Info Window.
        infoWindow.setContent(iwContent);

        // A Info Window é aberta.
        infoWindow.open(map, marker);
    });
}