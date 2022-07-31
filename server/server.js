const { default: axios } = require("axios");
const express = require("express");
const app = express();
require("dotenv").config();

let lat;
let lng;
axios
  .post(
    `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
  )
  .then(function (response) {
    lat = response.data.location.lat;
    lng = response.data.location.lng;
    console.log("coord", lat, lng);
  })
  .catch(function (error) {
    console.log(error);
  });

//make this later
// function buildAPIString(query, location, radius, rating) {
//   return https://maps.googleapis.com/maps/api/place/textsearch/json?query=coffee+shop&location=${lat},${lng}&radius=2000&region=us&type=cafe,bakery&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
// }

app.get("/", async (req, res) => {
  console.log(req.query);
  await axios
    .get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=coffee+shop&location=${lat},${lng}&radius=1000&region=us&type=cafe,bakery&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    )
    .then(function (response) {
      res.header("Access-Control-Allow-Origin", "http://localhost:3000");
      res.send(response.data);
      // console.log(response.data.results);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.post("/", (req, res) => {
  console.log(req.query);
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=coffee+shop&location=${lat},${lng}&radius=1000&region=us&type=cafe,bakery&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    )
    .then(function (response) {
      res.header("Access-Control-Allow-Origin", "http://localhost:3000");
      res.send(response.data);
      // console.log(response.data.results);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(4000);
