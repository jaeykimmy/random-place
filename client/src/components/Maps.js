import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { TextField, Rating } from "@mui/material";

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
          <div key={x.place_id}>
            <h2>{x.name}</h2>
            <p>
              Rating: {x.rating}
              <Rating
                name="read-only"
                value={x.rating}
                precision={0.1}
                readOnly
              />
            </p>

            <p>{x.user_ratings_total} Reviews</p>
          </div>
        );
      })}
    </div>
  );
}
