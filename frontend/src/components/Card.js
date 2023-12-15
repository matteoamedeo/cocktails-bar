import React from "react";

const Card = ({ cocktail }) => {
  console.log("CARDS ", cocktail);
  return (
    <div className="card ">
      <img src={cocktail.src} className="card-img-top" alt={cocktail.src} />
      <div className="card-body">
        <h2 className="card-title">{cocktail.name}</h2>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
    </div>
  );
};

export default Card;
