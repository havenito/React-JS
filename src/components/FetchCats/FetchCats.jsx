import React, { useState } from "react";
import ApiFetch from "../../api/ApiFetch";
import CardDetails from "../CatDetails/CatDetails";
import { Comment } from "../Comments/Comments";
import "./FetchCats.scss";

export default function FetchCats() {
  const [hoveredCat, setHoveredCat] = useState(null); 

  const handleMouseEnter = (cat) => {
    setHoveredCat(cat);
  };

  const handleMouseLeave = () => {
    setHoveredCat(null);
  };

  return (
    <ApiFetch
      url="https://api.thecatapi.com/v1/images/search?limit=20"
      headers={{
        'x-api-key': "live_9RlMyhZcY88iX0QYmk3MBD5dXTT3aUKSlDsnaaSiaRQxmDSAX0zGY8U3KiXSwjg8", 
      }}
    >
      {(data) => (
        <div className="cat-container">
          <h1 className="cat-title">Galerie de Chats</h1>
          <div className="cat-gallery">
            {data.map((cat) => (
              <div
                key={cat.id}
                className="cat-item"
                onMouseEnter={() => handleMouseEnter(cat)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="cat-link" role="button" tabIndex={0}>
                  <img
                    src={cat.url}
                    alt={`Chat #${cat.id}`}
                    className="cat-image"
                  />
                  <p className="cat-name">Chat #{cat.id}</p>
                </div>
                <div className="cat-comment-section">
                  <p className="comment-title">Ajouter un commentaire :</p>
                  <Comment />
                </div>
              </div>
            ))}
          </div>
          <CardDetails card={hoveredCat} />
        </div>
      )}
    </ApiFetch>
  );
}
