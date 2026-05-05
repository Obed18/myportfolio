import React from "react";
import "../styles/Services.css";
import { services } from "../data/portfolio";
import { Code, Smartphone, Palette, Network, Check } from "lucide-react";

type Service = {
  title: string;
  description: string;
  icon: keyof typeof iconMap;
  deliverables: string[];
};

const iconMap = {
  Code,
  Smartphone,
  Palette,
  Network,
};

const Services: React.FC = () => {
  const scrollTo = (id: string): void => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        <div className="services-header">
          <div className="services-badge">
            <span className="dot" />
            SERVICES / 05
          </div>

          <h2 className="services-title">
            What I can <span className="gradient-text">build for you</span>.
          </h2>

          <p className="services-subtitle">
            Beyond writing code — I deliver outcomes. Here's how I can help your
            team or product move forward.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s: Service, i: number) => {
            const Icon = iconMap[s.icon];

            return (
              <div key={s.title} className="service-card">
                <div className="service-glow" />

                <div className="service-content">
                  <div className="service-top">
                    <div className="service-icon">
                      <Icon size={24} />
                    </div>
                    <span className="service-index">{`0${i + 1}`}</span>
                  </div>

                  <h3 className="service-title">{s.title}</h3>
                  <p className="service-description">{s.description}</p>

                  <div className="service-deliverables">
                    {s.deliverables.map((d) => (
                      <div key={d} className="deliverable-item">
                        <Check size={14} className="check-icon" />
                        {d}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => scrollTo("#contact")}
                    className="service-btn"
                  >
                    Start a project <span>→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
