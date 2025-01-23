import { Link } from "react-router";
import { useAuth } from "../auth/AuthProvider";
import { Login, Logout } from "../auth/LoginOut";
import "./Home.scss";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home">
      <div className="auth-buttons">
        {user ? <Logout /> : <Login />}
      </div>
      <Link to="/cats">
        <button>Voir les Chats</button>
      </Link>
      <Link to="/races">
        <button>Voir races chats</button>
      </Link>
    </div>
  );
}