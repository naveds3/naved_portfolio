import React from 'react';
import ExpertiseCard from '../molecules/ExpertiseCard';

const Expertise = ({ expertise }) => {
  if (!expertise) return null;

  return (
    <section id="expertise" className="expertise-section reveal">
      <div className="section-header">
        <h2 className="section-title">Domain Expertise</h2>
      </div>

      <p className="section-intro-text">
        Deep cross-domain expertise spanning e-commerce, supply chain, government digitisation, healthcare, and
        enterprise digital transformation — enabling the delivery of solutions that are both technically sound
        and business-relevant.
      </p>

      <div className="expertise-grid">
        {expertise.map((item, idx) => (
          <ExpertiseCard
            key={idx}
            icon={item.icon}
            title={item.title}
            desc={item.desc}
            bullets={item.bullets}
          />
        ))}
      </div>
    </section>
  );
};

export default Expertise;
