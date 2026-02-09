import React from "react";
import "./ToolCard.css";

const ToolCard = ({ icon, title, description, selected, onClick }) => {
  return (
    <div className={`tool-card${selected ? " selected" : ""}`} onClick={onClick}>
      <div className="tool-card-icon">{icon}</div>
      <div className="tool-card-content">
        <h3 className="tool-card-title">{title}</h3>
        <p className="tool-card-desc">{description}</p>
      </div>
    </div>
  );
};

export default ToolCard;
