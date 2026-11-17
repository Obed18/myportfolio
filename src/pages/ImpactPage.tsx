
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  MoveUpRight,
} from "lucide-react";

import {
  getImpactProjectBySlug,
  getRelatedImpactProjects,
} from "../data/impactProjects";

import "../styles/ImpactPage.css";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
};

const ImpactPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const project = slug ? getImpactProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <main className="impact-not-found">
        <span>404 / PROJECT NOT FOUND</span>
        <h1>This story doesn't exist.</h1>
        <p>
          The impact project you're looking for may have been moved
          or is no longer available.
        </p>
        <Link to="/#social-impact">
          <ArrowLeft size={17} />
          Back to Social Impact
        </Link>
      </main>
    );
  }

  const relatedProjects = getRelatedImpactProjects(project.slug);

  return (
    <main className="impact-detail">

      {/* Top navigation */}
      <div className="impact-detail-nav">
        <Link to="/#social-impact" className="impact-back-link">
          <ArrowLeft size={17} />
          <span>Back to all initiatives</span>
        </Link>

        <span className="impact-nav-label">
          SOCIAL IMPACT / PROJECT STORY
        </span>
      </div>

      {/* Article hero */}
      <motion.header
        className="impact-detail-hero"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.7 }}
      >
        <div className="impact-detail-eyebrow">
          <span />
          {project.category}
        </div>

        <h1>{project.title}</h1>

        <p className="impact-detail-summary">
          {project.shortDescription}
        </p>

        <div className="impact-project-information">
          <div>
            <span>MY ROLE</span>
            <strong>{project.role}</strong>
          </div>

          <div>
            <span>ORGANIZED BY</span>
            <strong>{project.organizer}</strong>
          </div>

          <div>
            <span>DATE</span>
            <strong>{project.date}</strong>
          </div>

          <div>
            <span>DELIVERY</span>
            <strong>{project.format}</strong>
          </div>

          <div>
            <span>LOCATION</span>
            <strong>{project.location}</strong>
          </div>
        </div>
      </motion.header>

      {/* Article content */}
      <article className="impact-article">

        {/* Introduction */}
        <motion.section
          className="impact-introduction"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.65 }}
        >
          <span className="impact-section-label">
            THE STORY
          </span>

          <p>{project.introduction}</p>
        </motion.section>

        {/* Four alternating image and text sections */}
        <div className="impact-story-sections">
          {project.sections.map((section, index) => (
            <motion.section
              key={`${project.slug}-${index}`}
              className={`impact-story-row ${
                index % 2 !== 0 ? "reverse" : ""
              }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="impact-story-image">
                <img
                  src={section.image}
                  alt={section.imageAlt}
                  loading="lazy"
                />

                <span className="impact-image-number">
                  0{index + 1}
                </span>
              </div>

              <div className="impact-story-text">
                <span className="impact-section-label">
                  CHAPTER 0{index + 1}
                </span>

                <h2>{section.heading}</h2>

                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}
              </div>

              {section.imageCaption && (
                <span className="impact-image-caption">
                  {section.imageCaption}
                </span>
              )}
            </motion.section>
          ))}
        </div>

        {/* Closing statement */}
        <motion.div
          className="impact-closing"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.7 }}
        >
          <span className="impact-section-label">
            THE BIGGER PICTURE
          </span>

          <h2>{project.closingStatement}</h2>

          <div className="impact-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </motion.div>
      </article>

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <section className="impact-related">
          <div className="impact-related-heading">
            <div>
              <span className="impact-section-label">
                MORE STORIES
              </span>
              <h2>Explore other initiatives.</h2>
            </div>

            <Link to="/#social-impact">
              All projects <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="impact-related-grid">
            {relatedProjects.map((related) => (
              <Link
                key={related.slug}
                to={`/impact/${related.slug}`}
                className="impact-related-card"
              >
                <div className="impact-related-image">
                  <img src={related.coverImage} alt={related.coverImageAlt} />
                  <span>
                    <MoveUpRight size={19} />
                  </span>
                </div>

                <span className="impact-related-category">
                  {related.category}
                </span>

                <h3>{related.title}</h3>

                <span className="impact-related-location">
                  <MapPin size={13} />
                  {related.location}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

    </main>
  );
};

export default ImpactPage;
