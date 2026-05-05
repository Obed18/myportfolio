import React, { useState } from "react";
import "../styles/Projects.css";
import { projects } from "../data/portfolio";
import { ExternalLink, ArrowUpRight, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";

type Project = {
  id: string;
  name: string;
  image: string;
  category: string;
  year: string;
  tagline: string;
  problem: string;
  solution: string;
  role: string;
  tech: string[];
  features: string[];
  github: string;
  live: string;
  isPublic: boolean;
};

const filters: string[] = [
  "All",
  "Web Platform",
  "Mobile App",
  "Marketing Site",
  "Marketplace",
  "Social Network",
  "SaaS Tool",
];

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState<Project | null>(null);
  const [restrictedProject, setRestrictedProject] = useState<Project | null>(null);

  const filtered =
    filter === "All"
      ? (projects as Project[])
      : (projects as Project[]).filter((p) => p.category === filter);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        {/* Header */}
        <div className="projects-header">
          <div>
            <span className="projects-badge">WORK / 02</span>
            <h2 className="projects-title">
              Selected <span>case studies</span>
            </h2>
            <p className="projects-subtitle">
              Products I've shipped with real users, real metrics, and real
              results.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="projects-filters">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`filter-btn ${filter === f ? "active" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="projects-grid">
          {filtered.map((p, i) => (
            <article
              key={p.id}
              className="project-card"
              onClick={() => setActive(p)}
            >
              <div className="project-image-wrapper">
                <img src={p.image} alt={p.name} />
                <div className="project-overlay" />

                <div className="project-top">
                  <span className="tag green">{p.category}</span>
                  <span className="tag">{p.year}</span>
                </div>

                <div className="project-icon">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              <div className="project-content">
                <div className="project-head">
                  <h3>{p.name}</h3>
                  <span>{p.tagline}</span>
                </div>

                <p className="project-desc">{p.solution}</p>

                <div className="project-tech">
                  {p.tech.slice(0, 5).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>

                <div className="project-footer">
                  <span>
                    Role — <strong>{p.role}</strong>
                  </span>

                  <div className="project-links">
                    <a
                      href={p.github}
                      onClick={(e) => {
                        e.stopPropagation();

                        if (!p.isPublic) {
                          e.preventDefault();
                          setRestrictedProject(p);
                        }
                      }}
                    >
                      <FaGithub size={16} />
                    </a>
                    <a href={p.live} onClick={(e) => e.stopPropagation()}>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty">No projects in this category yet.</div>
        )}
      </div>

      {/* Modal */}
      {active && (
        <div className="modal" onClick={() => setActive(null)}>
          <div className="modal-overlay" />

          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActive(null)}>
              <X size={18} />
            </button>

            <img src={active.image} alt={active.name} />

            <div className="modal-body">
              <div className="modal-meta">
                <span className="tag green">{active.category}</span>
                <span>{active.year}</span>
              </div>

              <h3>{active.name}</h3>
              <p className="tagline">{active.tagline}</p>

              <div className="modal-section">
                <h4>Problem</h4>
                <p>{active.problem}</p>
              </div>

              <div className="modal-section">
                <h4>Solution</h4>
                <p>{active.solution}</p>
              </div>

              <div className="modal-section">
                <h4>My Role</h4>
                <p>{active.role}</p>
              </div>

              <div className="modal-section">
                <h4>Key Features</h4>
                <ul>
                  {active.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-section">
                <h4>Tech Stack</h4>
                <div className="project-tech">
                  {active.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <a href={active.live} className="btn primary">
                  <ExternalLink size={16} /> Live Demo
                </a>
                <a
                  href={active.github}
                  className="btn secondary"
                  onClick={(e) => {
                    if (!active.isPublic) {
                      e.preventDefault();
                      setRestrictedProject(active);
                    }
                  }}
                >
                  <FaGithub size={16} /> GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

{restrictedProject && (
  <div className="restricted-modal" onClick={() => setRestrictedProject(null)}>
    <div className="modal-overlay" />

    <div
      className="restricted-modal-content small"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="restricted-modal-close"
        onClick={() => setRestrictedProject(null)}
      >
        <X size={18} />
      </button>

      <div className="restricted-modal-body restricted-center">
        <h3>Access Restricted</h3>
        <p>
          Only preview of this project can be accessed. Files cannot be reviewed
          due to ownership rights belonging to the client.
        </p>

        <div className="restricted-modal-actions">
          <button
            className="restricted-btn restricted-secondary"
            onClick={() => setRestrictedProject(null)}
          >
            Cancel
          </button>

          <a
            href={restrictedProject.live}
            className="restricted-btn restricted-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Preview Project
          </a>
        </div>
      </div>
    </div>
  </div>
)}
    </section>
  );
};

export default Projects;
