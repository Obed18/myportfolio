import React from "react";
import "../styles/Footer.css";
import { ArrowUp, Mail } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FiLinkedin } from "react-icons/fi";
import { RiTwitterXLine } from "react-icons/ri";

const Footer: React.FC = () => {
  const scrollTo = (id: string): void => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const sitemap: string[] = ["About", "Projects", "Stack", "Experience"];
  const services: string[] = [
    "Web Development",
    "Mobile Apps",
    "UI/UX Engineering",
    "System Design",
  ];

const [subscribing, setSubscribing] = React.useState(false);
const [subscribed, setSubscribed] = React.useState(false);
const [subscribeError, setSubscribeError] = React.useState<string | null>(null);

const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setSubscribeError(null);

  const form = e.currentTarget;
  const email = (form.elements.namedItem("email") as HTMLInputElement).value;

  if (!email) return;

  setSubscribing(true);

  try {
    const formData = new FormData();
    formData.append("email", email);

    const response = await fetch("https://formspree.io/f/maqvoyaa", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || "Subscription failed");
    }

    setSubscribed(true);
    form.reset();

    setTimeout(() => setSubscribed(false), 5000);
  } catch (err: any) {
    setSubscribeError(err?.message || "Failed to subscribe");
  } finally {
    setSubscribing(false);
  }
};

  return (
    <footer className="footer">
      <div className="footer-noise" />

      <div className="footer-container">
        {/* Big name */}
        <div className="footer-heading">
          <h3>OBED.</h3>
        </div>

        <div className="footer-grid">
          {/* Left */}
          <div className="footer-left">
            <div className="footer-brand">
              <img src="/icon.png" className="logo-image" alt="Logo" />
              <div>
                <div className="footer-title">TheObed.Avenue</div>
                <div className="footer-version">v2.4.0 — 2026</div>
              </div>
            </div>

            <p className="footer-description">
              Tech Lead & Full-Stack Engineer | Building Scalable Web & Mobile
              Products for Startups, NGOs & Growth-Driven African Brands |
              React, React Native, Product Strategy
            </p>

            <div className="footer-socials">
              <a href="https://github.com/Obed18">
                <FaGithub size={16} />
              </a>
              <a href="www.linkedin.com/in/obed-otu-ayor-2a700926a">
                <FiLinkedin size={16} />
              </a>
              <a href="https://x.com/theobedavenue?s=21">
                <RiTwitterXLine size={16} />
              </a>
              <a href="mailto:obedotuayor18@gmail.com">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Sitemap */}
          <div>
            <div className="footer-label">Sitemap</div>
            <ul>
              {sitemap.map((item) => (
                <li key={item}>
                  <button onClick={() => scrollTo(`#${item.toLowerCase()}`)}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <div className="footer-label">Services</div>
            <ul>
              {services.map((item) => (
                <li key={item}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <div className="footer-label">Newsletter</div>
            <p className="footer-news-text">
              Engineering notes, monthly. No spam.
            </p>

            <form onSubmit={handleSubscribe} className="footer-form">
              <input type="email" name="email" placeholder="you@email.com" required />
              <button type="submit">{subscribing ? "Joining..." : "Join"}</button>
            </form>
            {subscribed && <p className="success-text">You're subscribed 🎉</p>}

{subscribeError && <p className="error-text">{subscribeError}</p>}
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <div>© 2026 Obed Otu Ayor | Software Engineering</div>

          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Back to top <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
