import React from "react";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";

function Skills() {
  const skills = [
    { name: "Cloud Platforms: AWS, GCP", percentage: 95 },
    {
      name: "Programming Languages: Python, Terraform (HCL), YAML, Bash",
      percentage: 80,
    },
    { name: "Networking: VPC, Routing, Firewalls", percentage: 70 },
    { name: "Hardware & Troubleshooting", percentage: 90 },
    { name: "Tools: Terraform, Ansible, Docker, Kubernetes", percentage: 90 },
    {
      name: "Soft Skills: Public Speaking, Collaboration, Problem-Solving",
      percentage: 90,
    },
  ];

  return (
    <Container>
      <Row>
        <Col md={12}>
          {skills.map((skill, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                  color: "white",
                }}
              >
                <span>{skill.name}</span>
                <small>{skill.percentage}%</small>
              </div>
              <ProgressBar
                now={skill.percentage}
                variant="danger"
                style={{ height: "8px" }}
              />
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default Skills;
