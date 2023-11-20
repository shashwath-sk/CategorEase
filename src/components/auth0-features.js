import React from "react";
import { Auth0Feature } from "./auth0-feature";

export const Auth0Features = () => {
  const featuresList = [
    {
      title: "Lucina™ CNS",
      description:
        "CNS is an artificial intelligence powered software solution for detection of fetal Central Nervous System (CNS) anomalies. By analyzing 2D fetal ultrasound scan video loops, Lucina ™  CNS assists clinicians in conducting pregnancy ultrasound scans in accordance with clinical guidelines.",
      resourceUrl: "https://www.originhealth.ai/",
      icon: "https://cdn.auth0.com/blog/hello-auth0/private-cloud-logo.svg",
    },
    {
      title: "CategorEase",
      description:
        "The application facilitates administrators to upload and delete images, enables users to assign and reassign labels for structured categorization. The AI model utilizes the categorized images as input, leveraging the structured labels assigned by both administrators and users for enhanced and intelligent data processing.",
      resourceUrl: "http://localhost:4040/CategorEase",
      icon: "https://cdn.auth0.com/blog/hello-auth0/identity-providers-logo.svg",

    },
    {
      title: "Meet our team",
      description:
        "A dedicated health research team is diligently working to develop innovative solutions that empower pregnant individuals to detect potential health issues earlier in their journey. Leveraging advanced technologies",
      resourceUrl: "https://www.originhealth.ai/",
      icon: "https://cdn.auth0.com/blog/hello-auth0/mfa-logo.svg",
    },
    {
      title: "Evidence",
      description:
        "The team's work is underscored by robust evidence, showcasing tangible impact through improved prenatal health outcomes and early problem detection. Rigorous research methodologies and data-driven insights substantiate the positive influence of their innovations on both maternal and fetal health",
      resourceUrl: "https://www.originhealth.ai/",
      icon: "https://cdn.auth0.com/blog/hello-auth0/advanced-protection-logo.svg",
    },
  ];

  return (
    <div className="auth0-features">
      <h2 className="auth0-features__title">About Us</h2>
      <div className="auth0-features__grid">
        {featuresList.map((feature) => (
          <Auth0Feature
            key={feature.resourceUrl}
            title={feature.title}
            description={feature.description}
            resourceUrl={feature.resourceUrl}
            icon={feature.icon}
          />
        ))}
      </div>
    </div>
  );
};
