import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  TextField,
  Rating,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";

export default function Maps() {
  const [data, setData] = useState([]);

  const handleChange = (event) => {
    setData(event.target.value);
  };
  // axios.post("http://localhost:4000/", {
  //   query: e.target.value,
  // });

  useEffect(() => {
    axios("http://localhost:4000/")
      .then(function (response) {
        setData(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const goodCoffee = data.filter((x) => {
    return x.rating > 4.4;
  });
  console.log(goodCoffee);

  return (
    <div>
      <TextField onChange={(e) => console.log(e.target.value)} />
      {goodCoffee.map((x) => {
        return (
          <Box key={x.place_id} m={2}>
            <Card className="card" variant="outlined">
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
