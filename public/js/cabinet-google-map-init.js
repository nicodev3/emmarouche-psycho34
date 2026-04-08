function initMap() {
  var customMapType = new google.maps.StyledMapType(
    [
      {
        elementType: "geometry",
        stylers: [
          { hue: "#ff4400" },
          { saturation: -68 },
          { lightness: -4 },
          { gamma: 0.72 },
        ],
      },
      { featureType: "road", elementType: "labels.icon" },
      {
        featureType: "landscape.man_made",
        elementType: "geometry",
        stylers: [{ hue: "#0077ff" }, { gamma: 3.1 }],
      },
      {
        featureType: "water",
        stylers: [{ hue: "#00ccff" }, { gamma: 0.44 }, { saturation: -33 }],
      },
      {
        featureType: "poi.park",
        stylers: [{ hue: "#44ff00" }, { saturation: -23 }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          { hue: "#007fff" },
          { gamma: 0.77 },
          { saturation: 65 },
          { lightness: 99 },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [
          { gamma: 0.11 },
          { weight: 5.6 },
          { saturation: 99 },
          { hue: "#0091ff" },
          { lightness: -86 },
        ],
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [
          { lightness: -48 },
          { hue: "#ff5e00" },
          { gamma: 1.2 },
          { saturation: -23 },
        ],
      },
      {
        featureType: "transit",
        elementType: "labels.text.stroke",
        stylers: [
          { saturation: -64 },
          { hue: "#ff9100" },
          { lightness: 16 },
          { gamma: 0.47 },
          { weight: 2.7 },
        ],
      },
    ],
    { name: "Style" },
  );
  var customMapTypeId = "custom_style";
  var coordo = { lat: 43.6297177, lng: 3.8980905999999322 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: coordo,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId],
    },
  });
  var marker = new google.maps.Marker({
    position: coordo,
    map: map,
    title: "Cabinet de psychologie",
  });

  map.mapTypes.set(customMapTypeId, customMapType);
  map.setMapTypeId(customMapTypeId);
}
