import { useNavigate } from "react-router";
import ApiFetch from "../../api/ApiFetch";
import "./FetchRaces.scss";

export default function FetchRaces() {
  const navigate = useNavigate();

  const handleRaceClick = (raceId) => {
    navigate(`/races/${raceId}`);
  };

  return (
    <ApiFetch
      url="https://api.thecatapi.com/v1/breeds"
      headers={{
        "x-api-key": "live_9RlMyhZcY88iX0QYmk3MBD5dXTT3aUKSlDsnaaSiaRQxmDSAX0zGY8U3KiXSwjg8",
      }}
    >
      {(data) => (
        <div className="race-container">
          <h1 className="race-title">Liste des Races de Chats</h1>
          <div className="race-gallery">
            {data.map((race) => (
              <div
                key={race.id}
                className="race-item"
                onClick={() => handleRaceClick(race.id)}
              >
                <img
                  src={race.image?.url || "https://via.placeholder.com/200"}
                  alt={race.name}
                  className="race-image"
                />
                <p className="race-name">{race.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </ApiFetch>
  );
}