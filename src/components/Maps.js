import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import axios from "axios";

const libraries = ["places"];
export default function Maps() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
  var config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=coffee+shop&location=43.8646966,-79.4591268&radius=2000&region=us&type=cafe,bakery&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`, //the rest of your url
    secure: false, //important
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  return <div>Maps</div>;
}
