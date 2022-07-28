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

  console.log(data);
  return (
    <div>
      {data.map((x) => {
        return <p>{x.name}</p>;
      })}
    </div>
  );
}
