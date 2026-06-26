import React from 'react';

const ExpertiseCard = ({ icon, title, desc, bullets }) => {
  return (
    <div className="expertise-card">
      <div className="card-icon-wrapper">
        <i className={icon}></i>
      </div>
      <h3>{title}</h3>
      <p className="card-desc">{desc}</p>
      <ul className="card-highlights">
        {bullets.map((bullet, idx) => (
          <li key={idx}>
            <i className="fa-solid fa-check text-accent"></i>
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpertiseCard;
