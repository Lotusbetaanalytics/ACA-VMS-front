import React from "react";
import "../components.styles.css";
const SmallCard = ({ value, title }) => {
  return (
    <div className="smallcard__container">
      <h1>{value}</h1>
      <h3>{title}</h3>
    </div>
  );
};

export default SmallCard;
