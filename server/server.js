const { default: axios } = require("axios");
const express = require("express");
const app = express();
require("dotenv").config();

app.get("/", (req, res) => {
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=coffee+shop&location=43.8646966,-79.4591268&radius=2000&region=us&type=cafe,bakery&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
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
