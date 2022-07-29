import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Maps() {
  const [data, setData] = useState([]);

  const handleChange = (event) => {
    setData(event.target.value);
  };
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

  return (
    <div>
      {goodCoffee.map((x) => {
        return (
          <div key={x.place_id}>
            <h2>{x.name}</h2>
            <p>{x.rating}</p>
          </div>
        );
      })}
    </div>
  );
}
