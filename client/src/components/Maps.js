import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Maps.scss";
import {
  TextField,
  Rating,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";

export default function Maps() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lat, setLat] = useState(
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
    })
  );
  const [lng, setLng] = useState(
    navigator.geolocation.getCurrentPosition(function (position) {
      setLng(position.coords.longitude);
    })
  );

  const coordinates = async () => {
    return navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  };
  const searchPlace = async () => {
    setIsLoading(true);
    await coordinates();

    axios
      .get(
        `https://immense-ridge-22530.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?location=${lat},${lng}`,
        {
          params: {
            radius: 5000,
            // location: `lat: ${lat}, lng: ${lng}`,
            // syntax literal is needed to avoid search collisions
            query: `${search}`,
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          },
        }
      )
      .then(function (response) {
        setData(response.data.results);
        setIsLoading(false);
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  const goodCoffee = data.filter((x) => {
    return x.rating > 4.4 && x.user_ratings_total > 100;
  });

  return (
    <div>
      <Box className="textfield-button">
        <h1 onClick={() => window.location.reload()}> 5 Star Places</h1>
        <TextField onChange={(e) => setSearch(e.target.value)} />
        <Button onClick={searchPlace}>search</Button>
        {isLoading && <CircularProgress />}
      </Box>
      {/* <Box m={2}>
        <TextField onChange={handleChange} />
        <Button onClick={localStorage.setItem("search", search)}>Search</Button>
      </Box> */}

      {goodCoffee.map((x) => {
        return (
          <Box key={x.place_id} m={2}>
            <Card
              className="card"
              variant="outlined"
              href={`https://maps.googleapis.com/maps/api/place/details/json?place_id=${x.place_id}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {x.name}
                </Typography>
                <Rating
                  name="read-only"
                  value={x.rating}
                  precision={0.1}
                  readOnly
                />
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Rating: {x.rating}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>{x.formatted_address}</Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                  {x.user_ratings_total} Reviews
                </Typography>
              </CardContent>
            </Card>
          </Box>
        );
      })}
    </div>
  );
}
