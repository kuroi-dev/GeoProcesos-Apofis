import React, { useState } from "react";
import "./SpecialToolCard.css";

export function SpecialToolCard({ imgSrc, title, summary }) {
  const [selected, setSelected] = useState(false);
  return (
    <div
      className={`special-tool-card${selected ? " selected" : ""}`}
      onClick={() => setSelected(!selected)}
    >
      <div className="special-tool-header ">
        <div className="special-tool-header-icon ">
          <img src={imgSrc} alt="icono" className="special-tool-logo" />
        </div>
        <div className="special-tool-header-title ">
          <h3 className="special-tool-title">{title}</h3>
        </div>
      </div>
      <div className="special-tool-content ">
        <p className="special-tool-summary">{summary}</p>
      </div>
    </div>
  );
}
