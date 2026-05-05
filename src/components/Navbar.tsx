import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FiLinkedin } from "react-icons/fi";
import { RiTwitterXLine } from "react-icons/ri";
import "../styles/Navbar.css";

type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [active, setActive] = useState<string>("#about");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      for (const link of [...navLinks].reverse()) {
        const el = document.querySelector(link.href);
        if (el) {
          const top = (el as HTMLElement).getBoundingClientRect().top;
          if (top < 120) {
            setActive(link.href);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        <nav className={`navbar-inner ${scrolled ? "glass shadow" : ""}`}>
          {/* Logo */}
          <button onClick={() => go("#hero")} className="logo">
            <div className="logo-box">
              <img src="/toa-logo.png" className="logo-image" alt="Logo" />
              <div className="logo-glow" />
            </div>
            <div className="logo-text">
              <span className="title">TheObed.Avenue</span>
              <span className="version">v2.4.0</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="nav-links">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => go(link.href)}
                className={`nav-item ${active === link.href ? "active" : ""}`}
              >
                {link.label}
                {active === link.href && <span className="underline" />}
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div className="nav-actions">
            <div className="socials">
              <a href="https://github.com/Obed18">
                <FaGithub size={18} />
              </a>
              <a href="www.linkedin.com/in/obed-otu-ayor-2a700926a">
                <FiLinkedin size={18} />
              </a>
              <a href="https://x.com/theobedavenue?s=21">
                <RiTwitterXLine size={18} />
              </a>
            </div>

            <button onClick={() => go("#contact")} className="cta-btn">
              Let's Talk
            </button>

            <button onClick={() => setOpen(!open)} className="menu-btn">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {open && (
          <div className="mobile-menu">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => go(link.href)}
                className="mobile-item"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
