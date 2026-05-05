import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Download,
  BriefcaseBusiness,
  Code2,
  Smartphone,
  Palette,
  Network,
  Zap,
  Cpu,
} from "lucide-react";
import "../styles/Hero.css";

const roles: string[] = [
  "Frontend Engineer",
  "React Specialist",
  "Product Builder",
  "Systems Thinker",
];

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState<number>(0);
  const [display, setDisplay] = useState<string>("");
  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!deleting && display.length < current.length) {
          setDisplay(current.slice(0, display.length + 1));
        } else if (!deleting && display.length === current.length) {
          setTimeout(() => setDeleting(true), 1600);
        } else if (deleting && display.length > 0) {
          setDisplay(current.slice(0, display.length - 1));
        } else if (deleting && display.length === 0) {
          setDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
        }
      },
      deleting ? 40 : 90
    );

    return () => clearTimeout(timeout);
  }, [display, deleting, roleIndex]);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const floatIcons = [
    { Icon: Code2, className: "icon-1", color: "#01DE10" },
    { Icon: Smartphone, className: "icon-2", color: "#8b5cf6" },
    { Icon: Palette, className: "icon-3", color: "#3b82f6" },
    { Icon: Network, className: "icon-4", color: "#00FFB2" },
    { Icon: Zap, className: "icon-5", color: "#fbbf24" },
    { Icon: Cpu, className: "icon-6", color: "#ec4899" },
  ];

  return (
    <section id="hero" className="hero">
      {/* Floating icons */}
      {floatIcons.map(({ Icon, className, color }, i) => (
        <div key={i} className={`floating-icon ${className}`}>
          <div
            className="icon-box"
            style={{ boxShadow: `0 0 30px ${color}40` }}
          >
            <Icon size={24} style={{ color }} />
          </div>
        </div>
      ))}

      <div className="hero-container">
        <div className="hero-grid">
          {/* LEFT */}
          <div className="hero-left">
            <div className="badge">
              <span className="dot" />
              AVAILABLE FOR WORK — Q1 2026
            </div>

            <h1 className="hero-title">
              Obed Otu Ayor
              <span className="highlight">theobedavenue.</span>
            </h1>

            <div className="hero-role">
              <span>Building </span>
              <span className="typed">{display}</span>
            </div>

            <p className="hero-text">
              Tech Lead & Full-Stack Engineer building scalable web and mobile products for startups, NGOs, and African brands with a focus on product strategy and impact.
            </p>

            <div className="hero-buttons">
              <button
                onClick={() => scrollTo("#projects")}
                className="btn primary"
              >
                View Projects <ArrowRight size={16} />
              </button>

              <button
                onClick={() => scrollTo("#contact")}
                className="btn secondary"
              >
                <BriefcaseBusiness size={16} /> Hire Me
              </button>

              <a href="/documents/Obed Otu Ayor CV.pdf" download="Obed Otu Ayor CV.pdf" className="btn link">
                <Download size={16} /> Resume
              </a>
            </div>
            <div className="hero-bottom">
              <h1 className="hero-bottom-title">Trusted tooling</h1>
              <div className="hero-bottom-list">
                <ul>
                  <li>React</li>
                  <li>React Native</li>
                  <li>TypeScript</li>
                  <li>JavaScript</li>
                  <li>Next.js</li>
                  <li>Node</li>
                  <li>Supabase</li>
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-right">
            <div className="terminal">
              <div className="terminal-header">
                <span className="circle red" />
                <span className="circle yellow" />
                <span className="circle green" />
                <span className="file">~/obed/portfolio.tsx</span>
              </div>

              <div className="terminal-body">
                <p className="grey-text">// engineer.ts</p>
                <p>
                  <span className="deep-blue-text">const</span>{" "}
                  <span className="green-text">theobedavenue</span> = {"{"}
                </p>
                <p className="indent">
                  <span className="blue-text"> name</span> :{" "}
                  <span className="yellow-text">'Obed Otu Ayor'</span>,
                </p>
                <p className="indent">
                  <span className="blue-text">role</span> :{" "}
                  <span className="yellow-text"> 'Software Engineer'</span>,
                </p>
                <p className="indent">
                  <span className="blue-text">stack</span> : [
                  <span className="yellow-text"> 'React', 'TS', 'RN'</span>],
                </p>
                <p className="indent">
                  <span className="blue-text">based</span> :{" "}
                  <span className="yellow-text"> 'Ghana'</span>,
                </p>
                <p className="indent">
                  <span className="blue-text"> shipping</span> :{" "}
                  <span className="dark-green-text"> true,</span>
                </p>
                <p>{"}"}</p>
                <div className="terminal-footer">
                  <p className="terminal-footer-text">
                    <span className="grey-text">{">"}</span>
                    <span className="green-text">obed</span>.
                    <span className="blue-text">buildSomething</span>()
                    <span className="green-text big-text">|</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
