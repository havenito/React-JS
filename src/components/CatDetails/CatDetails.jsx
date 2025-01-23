import React, { useEffect, useState } from "react";
import "./CatDetails.scss";

export default function CardDetails({ card }) {
  const [catDetails, setCatDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (card?.id) {
      setLoading(true);
      fetch(`https://api.thecatapi.com/v1/images/${card.id}`, {
        headers: {
          "x-api-key": "live_9RlMyhZcY88iX0QYmk3MBD5dXTT3aUKSlDsnaaSiaRQxmDSAX0zGY8U3KiXSwjg8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCatDetails(data);
          setLoading(false);
        })
        .catch(() => {
          setCatDetails(null);
          setLoading(false);
        });
    } else {
      setCatDetails(null);
    }
  }, [card]);

  if (!card) return null; // Aucun chat sélectionné
  if (loading) return <div className="card-preview">Chargement...</div>; // Chargement en cours

  // Extraire les informations du chat
  const { breeds, url, width, height } = catDetails || {};
  const breed = breeds && breeds.length > 0 ? breeds[0] : null;

  return (
    <div className="card-preview">
      <h3 className="card-preview__name">{breed?.name || "Chat inconnu"}</h3>
      <img
        src={url}
        alt={breed?.name || "Un chat"}
        className="card-preview__image"
      />
      <p className="card-preview__info">
        <strong>Origine :</strong> {breed?.origin || "Inconnue"}
      </p>
      <p className="card-preview__info">
        <strong>Tempérament :</strong> {breed?.temperament || "Non spécifié"}
      </p>
      <p className="card-preview__info">
        <strong>Poids :</strong>{" "}
        {breed?.weight?.metric ? `${breed.weight.metric} kg` : "Inconnu"}
      </p>
      <p className="card-preview__info">
        <strong>Espérance de vie :</strong>{" "}
        {breed?.life_span ? `${breed.life_span} ans` : "Inconnue"}
      </p>
      <p className="card-preview__info">
        <strong>Dimensions de l'image :</strong> {width} x {height} pixels
      </p>
      {breed?.wikipedia_url && (
        <p className="card-preview__info">
          <strong>En savoir plus :</strong>{" "}
          <a
            href={breed.wikipedia_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Wikipédia
          </a>
        </p>
      )}
    </div>
  );
}