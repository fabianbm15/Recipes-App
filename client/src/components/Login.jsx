import "./styles.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import loginImage from "../wallpaperFood.jpg";

export default function Login(props) {
  const location = useLocation();
  const { setAccess } = props;

  return (
    <div className="login">
      {location.pathname !== "/" ? null : (
        <img className="loginImage" src={loginImage} alt={loginImage} />
      )}
      <div className="bienvenidos">
        <h1>Bienvenidos</h1>
        <Link to={"/home"}>
          <button title="login" onClick={() => setAccess(true)}>
            Ingresar
          </button>
        </Link>
      </div>
    </div>
  );
}
