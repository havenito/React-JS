import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router";
import "./header.scss";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const pageName = location.pathname.split("/").pop();
  const displayName = pageName ? pageName : "Minouverse";

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="header">
      {displayName !== "Minouverse" && (
        <a onClick={handleGoBack}>
          <img
            className="header__arrow"
            src="./fleche-chat.png"
            alt="Retour"
          />
        </a>
      )}
      <img className="header__logo" src="logo-chat.png" alt="Logo Chat" />
      <h1 className="header__title">{displayName}</h1>
      <nav>
        <Link to="/contact">Contact</Link>
      </nav>
    </div>
  );
}