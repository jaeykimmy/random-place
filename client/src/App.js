import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Maps from "./components/Maps";
import Geolocate from "./components/Geolocate";
// import MarkerMade from "./components/MarkerMade";

function App() {
  const [randomNum, setRandomNum] = useState(0);

  const handleRandomNum = () => {
    setRandomNum(Math.random());
  };

  return (
    <div>
      <h1 onClick={() => window.location.reload()}>5 Star Places</h1>
      {/* <span>{randomNum}</span>
      <button onClick={handleRandomNum}>click</button> */}
      {/* <Maps /> */}
      {/* <MarkerMade /> */}
      <Geolocate />
    </div>
  );
}

export default App;
