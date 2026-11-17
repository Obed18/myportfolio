
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

import { impactProjects } from "../data/impactProjects";
import "../styles/SocialImpact.css";

type CategoryFilter =
  | "All"
  | "Education"
  | "Technology"
  | "Leadership"
  | "Community";

const categories: CategoryFilter[] = [
  "All",
  "Education",
  "Technology",
  "Leadership",
  "Community",
];

// Map the editorial project categories to the gallery filters.
const getFilterCategory = (category: string): CategoryFilter => {
  const value = category.toLowerCase();

  if (value.includes("technology")) return "Technology";
  if (value.includes("leadership")) return "Leadership";
  if (value.includes("education") || value.includes("literacy")) {
    return "Education";
  }

  return "Community";
};

const featuredProjects = impactProjects.filter(
  (project) => project.featured
);

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const SocialImpact = () => {
  const [activeCategory, setActiveCategory] =
    useState<CategoryFilter>("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return impactProjects;

    return impactProjects.filter(
      (project) => getFilterCategory(project.category) === activeCategory
    );
  }, [activeCategory]);

  const projectCount = impactProjects.length;

  return (
    <section className="social-impact" id="social-impact">
      <div className="social-impact-container">

        {/* Section heading */}
        <motion.div
          className="impact-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="impact-eyebrow">
            <span className="impact-eyebrow-line" />
            BEYOND TECHNOLOGY
          </div>

          <div className="impact-heading-row">
            <div>
              <h2>
                Social Impact <span>Programs.</span>
              </h2>

              <p>
                Contributing to meaningful change through technology,
                education, leadership development, advocacy and
                community initiatives.
              </p>
            </div>

            <span className="impact-count">
              {String(projectCount).padStart(2, "0")}{" "}
              <span>PROJECTS</span>
            </span>
          </div>
        </motion.div>

        {/* Featured projects */}
        {featuredProjects.length > 0 && (
          <motion.div
            className="impact-featured"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.13 },
              },
            }}
          >
            {featuredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                className={`impact-featured-card ${
                  index === 0 ? "impact-featured-large" : ""
                }`}
                variants={cardVariants}
                transition={{
                  duration: 0.65,
                  ease: "easeOut",
                }}
              >
                <Link
                  to={`/impact/${project.slug}`}
                  className="impact-card-link"
                  aria-label={`Read about ${project.title}`}
                >
                  <div
                    className="impact-card-image"
                    style={{
                      backgroundImage: `url("${project.coverImage}")`,
                    }}
                  />

                  <div className="impact-card-overlay" />

                  <div className="impact-featured-content">
                    <span className="impact-card-category">
                      {project.category}
                    </span>

                    <div className="impact-card-bottom">
                      <div>
                        <h3>{project.title}</h3>

                        <span className="impact-location">
                          <MapPin size={12} />
                          {project.location}
                        </span>
                      </div>

                      <span className="impact-card-action">
                        <ArrowUpRight size={19} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* Filters and gallery heading */}
        <div className="impact-gallery-header">
          <div
            className="impact-filters"
            role="group"
            aria-label="Filter social impact projects"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`impact-filter ${
                  activeCategory === category ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          <span className="impact-gallery-label">
            SELECTED PROJECTS
          </span>
        </div>

        {/* Projects gallery */}
        <motion.div className="impact-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                id={`project-${project.id}`}
                className="impact-grid-card"
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{
                  opacity: 0,
                  scale: 0.96,
                  transition: { duration: 0.2 },
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  layout: { duration: 0.35 },
                }}
              >
                <Link
                  to={`/impact/${project.slug}`}
                  className="impact-grid-link"
                  aria-label={`Explore ${project.title}`}
                >
                  <div className="impact-grid-image-wrapper">
                    <div
                      className="impact-grid-image"
                      style={{
                        backgroundImage: `url("${project.coverImage}")`,
                      }}
                    />

                    <div className="impact-grid-overlay" />

                    <div className="impact-grid-image-content">
                      <span className="impact-grid-category">
                        {project.category}
                      </span>

                      <span className="impact-grid-action">
                        <ArrowUpRight size={17} />
                      </span>
                    </div>
                  </div>

                  <div className="impact-grid-details">
                    <h3>{project.title}</h3>

                    <span className="impact-grid-location">
                      <MapPin size={13} />
                      {project.location}
                    </span>

                    <p>{project.shortDescription}</p>

                    <span className="impact-project-role">
                      {project.role}
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="impact-empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>No projects found in this category.</p>

            <button
              type="button"
              onClick={() => setActiveCategory("All")}
            >
              View all projects
            </button>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          className="impact-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span>
            MAKING TECHNOLOGY AND PURPOSE WORK TOGETHER.
          </span>

          <span className="impact-footer-dot" />
        </motion.div>

      </div>
    </section>
  );
};

export default SocialImpact;
