const express=require("express");
const bodyParser=require("body-parser");
const path=require("path");
const axios=require("axios");

const app=express();

app.set("view engine","ejs")
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
  res.render('mp');
});
app.post("/", function(req,res) {
  var {usrTxt} = req.body;

  fetchLocation(usrTxt)
    .then((coordinates) => {
      res.render('mp', { coordinates });
    })
    .catch((error) => {
      console.log('Error fetching location:', error);
      res.render('mp', { error: 'Failed to fetch location.' });
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

app.listen(3000, function () {
    console.log("Server Successfully Running On 3000");
});