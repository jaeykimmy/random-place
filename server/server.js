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
    // console.log("coord", lat, lng);
  })
  .catch(function (error) {
    console.log(error);
  });

//make this later
// function buildAPIString(query, location, radius, rating) {
//   return https://maps.googleapis.com/maps/api/place/textsearch/json?query=coffee+shop&location=${lat},${lng}&radius=2000&region=us&type=cafe,bakery&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
// }
app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/", async (req, res) => {
  // console.log(req);
  await axios
    .get(`https://maps.googleapis.com/maps/api/place/textsearch/json`, {
      params: {
        query: "coffee+shop",
        location: { lat: lat, lng: lng },
        radius: 1000,
        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      },
    })
    .then(function (response) {
      res.header.append(
        "Access-Control-Allow-Origin",
        "https://jaeykimmy-makes-great-sites.netlify.app/"
      );
      res.send(response.data);
      // console.log(response.data.results);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.post("/", async (req, res) => {
  await axios
    .post(
      "https://good-coffee-server.herokuapp.com/https://jaeykimmy-makes-great-sites.netlify.app/"
    )

    .then(function (response) {
      res.header.append("Access-Control-Allow-Origin", "*");
      res.send(response.data);
      // console.log(response.data.results);
    });
});

app.listen(process.env.PORT || 4000);
