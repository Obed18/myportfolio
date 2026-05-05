import React, { useState } from "react";
import "../styles/TechStack.css";
import { techStack } from "../data/portfolio";

type Category = "All" | "Frontend" | "Backend" | "Mobile" | "Tools";

interface TechItem {
  name: string;
  category: Category;
  color: string;
  logo: string;
}

const categories: Category[] = [
  "All",
  "Frontend",
  "Backend",
  "Mobile",
  "Tools",
];

const TechStack: React.FC = () => {
  const [cat, setCat] = useState<Category>("All");

  const filtered: TechItem[] =
    cat === "All"
      ? techStack
      : techStack.filter((t: TechItem) => t.category === cat);

  return (
    <section id="stack" className="stack-section">
      <div className="grid-bg" />

      <div className="stack-container">
        {/* Header */}
        <div className="stack-header">
          <div className="stack-badge">
            <span className="dot" />
            STACK / 03
          </div>

          <h2 className="stack-title">
            The tools I <span className="gradient-text">swing with</span>.
          </h2>

          <p className="stack-subtitle">
            Carefully chosen tech that maximises shipping speed without
            compromising on quality.
          </p>
        </div>

        {/* Filters */}
        <div className="stack-filters">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`filter-btn ${cat === c ? "active" : ""}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="stack-grid">
          {filtered.map((t) => (
            <div key={t.name} className="stack-card">
              <div
                className="stack-glow"
                style={{
                  background: `radial-gradient(circle at center, ${t.color}, transparent 70%)`,
                }}
              />

              <div
                className="stack-icon"
                style={{
                  borderColor: `${t.color}40`,
                  backgroundColor: `${t.color}15`,
                  color: t.color,
                }}
              >
                <img src={t.logo} alt={`${t.name} logo`} className="stack-logo" />
              </div>

              <div className="stack-info">
                <div className="stack-name">{t.name}</div>
                <div className="stack-category">{t.category}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Marquee */}
        <div className="stack-marquee">
          <div className="marquee-track">
            {[...techStack, ...techStack].map((t, i) => (
              <span key={i} className="marquee-item">
                {t.name}
                <span className="divider">//</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
