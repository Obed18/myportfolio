import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import PortfolioCard from "../components/PortfolioCard";
import TechStack from "../components/TechStack";
import ExperienceSection from "../components/ExperienceSection";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import CursorGlow from "../components/CursorGlow";
import SocialImpact from "../components/SocialImpact";

const Home = () => {
  return (
    <div className="home">
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <PortfolioCard />
        <TechStack />
        <ExperienceSection />
        <SocialImpact />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
