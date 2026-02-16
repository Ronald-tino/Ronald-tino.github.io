import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Ronald Tino</span>, a
            <span className="purple"> Cloud Engineer </span>
            from <span className="purple"> China, Zimbabwe.</span>
            <br />
            <br />
            I am a self-driven and adaptable Cloud Engineer with a background in
            IT and network engineering, now focused on delivering cloud-native
            solutions and DevOps practices. After transitioning from traditional
            IT to cloud computing, I have gained practical experience in cloud
            infrastructure, automation, and deployment.
            <br />
            <br />
            I specialize in designing scalable and secure cloud environments,
            optimizing resource usage, and aligning infrastructure with business
            goals. My expertise includes leveraging tools like Terraform,
            Ansible, Docker, and GitHub Actions to automate CI/CD workflows and
            build resilient, high-performing architectures on platforms such as
            AWS.
            <br />
            <br />
            With a passion for continuous learning, I bring both technical
            precision and strategic insight to every project I undertake. Apart
            from cloud engineering, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Creating YouTube Tutorials
            </li>
            <li className="about-activity">
              <ImPointRight /> Writing Tech Blogs
            </li>
            <li className="about-activity">
              <ImPointRight /> Building Cloud Solutions
            </li>
            <li className="about-activity">
              <ImPointRight /> Public Speaking
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build scalable solutions that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Ronald</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
