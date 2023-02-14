import "./styles.css";
import { Link } from "react-router-dom";

export default function Login(props) {
  const { setAccess } = props;

  return (
    <div className="login">
      <h1>Bienvenidos</h1>
      <Link to={"/home"}>
        <button onClick={setAccess(true)}>Ingresar</button>
      </Link>
    </div>
  );
}
