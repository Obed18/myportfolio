import React from "react";
import "../styles/About.css";
import { skills, stats } from "../data/portfolio";
import { Layers, Smartphone, Server, Wrench } from "lucide-react";

type Skill = {
  name: string;
  level: number;
};

type SkillsType = {
  [key: string]: Skill[];
};

const categoryIcons: Record<string, React.ElementType> = {
  Frontend: Layers,
  Mobile: Smartphone,
  Backend: Server,
  Tools: Wrench,
};

const About: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-blur-bg" />

      <div className="about-container">
        {/* Header */}
        <div className="about-header">
          <div className="about-badge">
            <span className="dot" />
            ABOUT / 01
          </div>
      <div className="about-main-content">
        <div className="about-text">
          <h2 className="about-title">
            Engineer building{" "}
            <span className="text-gradient-green">products that ship</span>.
          </h2>
          <p className="about-description">
            I’m a Tech Lead and Full-Stack Engineer passionate about building scalable, high-impact web and mobile products. I specialize in working with startups, NGOs, and growth-driven African brands, helping them transform ideas into reliable, user-focused digital solutions.

With strong expertise in React and React Native, I develop modern, responsive applications that combine performance with elegant design. Beyond coding, I bring a product-driven mindset—aligning technology with business goals, user needs, and long-term scalability.

I’m particularly driven by opportunities to create solutions that empower communities, support innovation, and accelerate growth across Africa’s digital ecosystem.
          </p>
          </div>

        <div className="about-image">
          <div
            className="about-image-wrapper">
            <img src="/Obed.jpeg" alt="Obed" />
            <div className="border-outline" />
          </div>
        </div>
        </div>
        </div>

        {/* Stats */}
        <div className="about-stats">
          {stats.map((s: { label: string; value: string }) => (
            <div key={s.label} className="stat-card">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="skills-grid">
          {Object.entries(skills as SkillsType).map(
            ([category, items], index) => {
              const Icon = categoryIcons[category];

              return (
                <div key={category} className="skill-card">
                  <div className="skill-glow" />

                  <div className="skill-header">
                    <div className="skill-title-group">
                      <div className="skill-icon">
                        <Icon size={20} />
                      </div>
                      <h3>{category}</h3>
                    </div>
                    <span className="skill-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="skill-list">
                    {items.map((skill) => (
                      <div key={skill.name} className="skill-item">
                        <div className="skill-top">
                          <span>{skill.name}</span>
                          <span className="skill-percent">{skill.level}%</span>
                        </div>

                        <div className="skill-bar">
                          <div
                            className="skill-progress"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
