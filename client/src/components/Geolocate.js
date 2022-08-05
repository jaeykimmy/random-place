import React from "react";
import { useState } from "react";
import MarkerMade from "./MarkerMade";
import Maps from "./Maps";

export default function Geolocate() {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  var axios = require("axios");

  var config = {
    method: "post",
    url: `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,

    headers: {},
  };

  axios(config)
    .then(function (response) {
      console.log(response.data);
      setLng(response.data.location.lng);
      setLat(response.data.location.lat);
    })
    .catch(function (error) {
      console.log(error);
    });
  return (
    <>
      {/* <div>
        Latitude {lat} Longitude {lng}
      </div> */}
      {/* <MarkerMade long={long} lat={lat} /> */}
      <Maps lat={lat} lng={lng} />
    </>
  );
}
