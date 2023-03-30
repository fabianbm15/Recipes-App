import "./styles.css";
import React from "react";
import facebookImage from "../image/facebook.webp";
import correoImage from "../image/correo.webp";

export default function Information() {
   return (
      <div className="container">
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
      </div>
   );
}
