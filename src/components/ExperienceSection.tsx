import React from "react";
import "../styles/ExperienceSection.css";

interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  duration: string;
  location: string;
  image: string;
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    company: "ClueCode",
    role: "Founder & Software Engineer",
    duration: "2026",
    location: "Hybrid",
    image: "/logos/ClueCode.png",
  },
  {
    id: 2,
    company: "RAY Healthcare",
    role: "Web Developer",
    duration: "2026",
    location: "Remote",
    image: "/logos/RAY.png",
  },
  {
    id: 3,
    company: "Traved Consult",
    role: "Software Engineer",
    duration: "2026",
    location: "Remote",
    image: "/logos/traved.png",
  },
  {
    id: 4,
    company: "NexaGrowth Africa",
    role: "Tech Lead & Software Engineer",
    duration: "2025",
    location: "Remote",
    image: "/logos/Nexa.png",
  },
  {
    id: 5,
    company: "Giant-Merce",
    role: "CO-Founder & Chief Technology Officer",
    duration: "2025",
    location: "Remote",
    image: "/logos/GM.png",
  },
  {
    id: 6,
    company: "Addie's Afrique Foundation",
    role: "Chief Technology Officer",
    duration: "2024",
    location: "Remote",
    image: "/logos/FLOGO.jpg",
  },
  {
    id: 7,
    company: "Heidelberg Materials Digital Hub, Ghana",
    role: "Intern Web Developer",
    duration: "2023",
    location: "On-site",
    image: "/logos/dh.png",
  },
  {
    id: 8,
    company: "Explore Ghana",
    role: "Web & Mobile App Developer",
    duration: "2023",
    location: "Remote",
    image: "/logos/EG.png",
  },
];

const ExperienceSection: React.FC = () => {
  return (
    <section className="experience-section">
      <div className="container">
        <div className="services-badge">
            <span className="dot" />MY EXPERIENCE /04</div>
        <h2 className="stack-title">Companies & Organizations <span className="gradient-text">I’ve worked with</span></h2>

        <div className="grid">
          {experiences.map((exp) => (
            <div key={exp.id} className="card">
              <div className="image-wrapper">
                <img src={exp.image} alt={exp.company} />
              </div>

              <div className="card-content">
                <span className="location">{exp.location}</span>
                <h3>{exp.company}</h3>
                <p className="role">{exp.role}</p>
                <p className="duration">{exp.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;