import React from "react";
import "./Footer.scss";
export default function Footer() {
  return (
    <div className="footer">
      <div className="container-left">
        Background Image by: <a href="https://twitter.com/16pxl">Jubilee</a>
      </div>
      <div className="container-right">
        Built using:{" "}
        <a href="https://developers.google.com/maps/documentation/places/web-service">
          Google Maps Places API
        </a>
      </div>
    </div>
  );
}
