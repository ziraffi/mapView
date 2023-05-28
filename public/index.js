// Initialize and add the map
let map;

async function initMap() {
  // The location of Rajupet
  const position = { lat: 18.165315, lng: 80.622980 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Rajupet",
  });
}

initMap();
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const input = document.querySelector('input[name="usrTxt"]');
    const mapView = document.getElementById('map');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const location = input.value;
      fetchLocation(location)
        .then((coordinates) => {
          displayMap(coordinates);
        })
        .catch((error) => {
          console.log('Error fetching location:', error);
        });
    });
  
    function fetchLocation(location) {
      return new Promise((resolve, reject) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: location }, (results, status) => {
          if (status === 'OK' && results && results.length > 0) {
            const { lat, lng } = results[0].geometry.location;
            resolve({ lat: lat(), lng: lng() });
          } else {
            reject(new Error('Failed to fetch location data'));
          }
        });
      });
    }
  
    function displayMap(coordinates) {
      const map = new google.maps.Map(mapView, {
        center: coordinates,
        zoom: 12,
      });
  
      const marker = new google.maps.Marker({
        position: coordinates,
        map: map,
      });
    }
  });
  
