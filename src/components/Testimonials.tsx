import React from "react";
import "../styles/Testimonials.css";
import { testimonials } from "../data/portfolio";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  quote: string;
  avatar: string;
  name: string;
  title: string;
}

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-bg" />

      <div className="testimonials-container">
        <div className="testimonials-header">
          <div className="testimonials-badge">
            <span className="dot" />
            PROOF / 06
          </div>

          <h2 className="testimonials-title">
            Words from <span className="text-gradient-green">the room</span>.
          </h2>

          <p className="testimonials-subtitle">
            What collaborators, clients and teammates say about working
            together.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t: Testimonial, i: number) => (
            <div key={i} className="testimonial-card">
              <Quote size={32} className="quote-icon" />

              <p className="testimonial-text">"{t.quote}"</p>

              <div className="testimonial-footer">
                <div className="avatar">{t.avatar}</div>

                <div className="testimonial-info">
                  <div className="name">{t.name}</div>
                  <div className="title">{t.title}</div>
                </div>

                <div className="stars">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} className="star-icon" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
