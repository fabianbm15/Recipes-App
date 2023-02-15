import "./styles.css";
import React from "react";
import facebookImage from "../facebook.png";
import correoImage from "../correo.png";

export default function Information() {
  return (
    <div className="information">
      <p>Created by: Carlos Melgarejo</p>
      <div className="contact">
        <p>Contact: </p>
        <a href="mailto:cmelgarejobm@gmail.com">
          <img src={correoImage} alt={correoImage} />
        </a>
        <a href="https://www.facebook.com/cmelgarejobm">
          <img src={facebookImage} alt={facebookImage} />
        </a>
      </div>
    </div>
  );
}
