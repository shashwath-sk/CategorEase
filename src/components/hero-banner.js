import React from "react";
import oh from "../assets/logo/oh.png";

export const HeroBanner = () => {
  const logo = "https://cdn.auth0.com/blog/developer-hub/react-logo.svg";

  return (
    <div className="hero-banner hero-banner--pink-yellow">
      <div className="hero-banner__logo">
        <img className="hero-banner__image" src={oh} alt="React logo" />
      </div>
      <h1 className="hero-banner__headline">Origin Health</h1>
      <p className="hero-banner__description">
      Democratizing quality prenatal care for every expecting mother globally <strong>Auth0</strong>.
      </p>
      <a
        id="code-sample-link"
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.originhealth.ai/"
        className="button button--secondary"
      >
        Check out our services →
      </a>
    </div>
  );
};
