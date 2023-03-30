import "./styles.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import loginImage from "../image/wallpaperFood.webp";

export default function Login(props) {
   const location = useLocation();
   const { setAccess } = props;

   return (
      <div className="container">
         <div className="box">
            <img className="loginImage" src={loginImage} alt={loginImage} />
            <div className="welcome">
               <div className="divWelcome">
                  <h1 className="welcomeH1">Welcome</h1>
               </div>
               <div className="divButton">
                  <Link to={"/home"}>
                     <button className="loginButton" title="login" onClick={() => setAccess(true)}>
                        Login
                     </button>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
}
