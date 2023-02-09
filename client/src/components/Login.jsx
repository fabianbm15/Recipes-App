import "./styles.css";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login">
      <Link to={"/home"}>
        <button>Ingresar</button>
      </Link>
    </div>
  );
}
