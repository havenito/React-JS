import { useParams } from "react-router";
import { useEffect, useState } from "react";
import "./RaceDetails.scss";

export default function RaceDetails() {
  const { breedId } = useParams(); 
  const [raceDetails, setRaceDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.thecatapi.com/v1/breeds`)
      .then((response) => response.json())
      .then((data) => {
        const breed = data.find((item) => item.id === breedId);
        setRaceDetails(breed || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des informations :", error);
        setRaceDetails(null);
        setLoading(false);
      });
  }, [breedId]);

  if (loading) {
    return <div className="race-preview">Chargement des détails...</div>;
  }

  if (!raceDetails) {
    return (
      <div className="race-preview">
        Aucune information disponible pour cette race.
      </div>
    );
  }

  const { name, origin, temperament, weight, life_span, wikipedia_url, image } =
    raceDetails;

  return (
    <div className="race-preview">
      <h3 className="race-preview__name">{name || "Race inconnue"}</h3>
      <img
        src={image?.url || "https://via.placeholder.com/300"}
        alt={name || "Un chat"}
        className="race-preview__image"
      />
      <p className="race-preview__info">
        <strong>Origine :</strong> {origin || "Inconnue"}
      </p>
      <p className="race-preview__info">
        <strong>Tempérament :</strong> {temperament || "Non spécifié"}
      </p>
      <p className="race-preview__info">
        <strong>Poids :</strong>{" "}
        {weight?.metric ? `${weight.metric} kg` : "Inconnu"}
      </p>
      <p className="race-preview__info">
        <strong>Espérance de vie :</strong>{" "}
        {life_span ? `${life_span} ans` : "Inconnue"}
      </p>
      {wikipedia_url && (
        <p className="race-preview__info">
          <strong>En savoir plus :</strong>{" "}
          <a href={wikipedia_url} target="_blank" rel="noopener noreferrer">
            Wikipédia
          </a>
        </p>
      )}
    </div>
  );
}