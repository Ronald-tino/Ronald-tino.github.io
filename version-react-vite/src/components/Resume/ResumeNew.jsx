import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle.jsx";
import { FaPhone, FaEnvelope, FaGlobe, FaLinkedin, FaTwitter, FaYoutube, FaGithub, FaMapMarkerAlt } from "react-icons/fa";

function ResumeNew() {
  const resumeStyle = {
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: "rgba(20, 20, 20, 0.8)",
    borderRadius: "8px",
    padding: "50px 40px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
  };

  const sectionStyle = {
    marginBottom: "35px",
    paddingBottom: "25px",
    borderBottom: "1px solid rgba(225, 29, 72, 0.2)",
  };

  const sectionTitleStyle = {
    color: "#e11d48",
    fontSize: "1.5em",
    fontWeight: "600",
    marginBottom: "20px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    borderBottom: "2px solid #e11d48",
    paddingBottom: "8px",
    display: "inline-block",
    width: "100%",
  };

  const contactItemStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
    color: "#ddd",
    fontSize: "0.95em",
  };

  const jobTitleStyle = {
    color: "#e11d48",
    fontSize: "1.2em",
    fontWeight: "600",
    marginBottom: "5px",
  };

  const companyStyle = {
    color: "#fff",
    fontSize: "1em",
    fontWeight: "500",
    marginBottom: "8px",
  };

  const dateLocationStyle = {
    color: "#9d9d9d",
    fontSize: "0.9em",
    fontStyle: "italic",
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
  };

  return (
    <Container fluid className="resume-section">
      <Particle />
      <Container>
        <Row>
          <Col lg={10} className="mx-auto">
            <div className="resume-container" style={resumeStyle}>
              {/* Header Section */}
              <div style={{ textAlign: "center", marginBottom: "40px", paddingBottom: "30px", borderBottom: "2px solid #e11d48" }}>
                <h1
                  style={{
                    fontSize: "2.8em",
                    fontWeight: "700",
                    color: "#e11d48",
                    marginBottom: "10px",
                    letterSpacing: "1px",
                  }}
                >
                  Ronald Tino
                </h1>
                <h2
                  style={{
                    fontSize: "1.3em",
                    color: "#fff",
                    fontWeight: "400",
                    marginBottom: "25px",
                    letterSpacing: "0.5px",
                  }}
                >
                  Cloud Engineer | DevOps Enthusiast | Solution Consultant
                </h2>
                
                {/* Contact Information - Grid Layout */}
                <Row style={{ justifyContent: "center" }}>
                  <Col xs={12} sm={6} md={3}>
                    <div style={contactItemStyle}>
                      <FaPhone style={{ marginRight: "10px", color: "#e11d48", minWidth: "20px" }} />
                      <span>+8615940998064</span>
                    </div>
                  </Col>
                  <Col xs={12} sm={6} md={4}>
                    <div style={contactItemStyle}>
                      <FaEnvelope style={{ marginRight: "10px", color: "#e11d48", minWidth: "20px" }} />
                      <a
                        href="mailto:Sir_ronald_98@proton.me"
                        style={{ color: "#ddd", textDecoration: "none" }}
                        onMouseEnter={(e) => (e.target.style.color = "#e11d48")}
                        onMouseLeave={(e) => (e.target.style.color = "#ddd")}
                      >
                        Sir_ronald_98@proton.me
                      </a>
                    </div>
                  </Col>
                  <Col xs={12} sm={6} md={3}>
                    <div style={contactItemStyle}>
                      <FaGlobe style={{ marginRight: "10px", color: "#e11d48", minWidth: "20px" }} />
                      <a
                        href="https://www.ron-tino.site/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#ddd", textDecoration: "none" }}
                        onMouseEnter={(e) => (e.target.style.color = "#e11d48")}
                        onMouseLeave={(e) => (e.target.style.color = "#ddd")}
                      >
                        Website
                      </a>
                    </div>
                  </Col>
                  <Col xs={12} sm={6} md={2}>
                    <div style={contactItemStyle}>
                      <FaLinkedin style={{ marginRight: "10px", color: "#e11d48", minWidth: "20px" }} />
                      <a
                        href="https://www.linkedin.com/in/ronald-tino-027a6122b"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#ddd", textDecoration: "none" }}
                        onMouseEnter={(e) => (e.target.style.color = "#e11d48")}
                        onMouseLeave={(e) => (e.target.style.color = "#ddd")}
                      >
                        LinkedIn
                      </a>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Summary Section */}
              <section style={sectionStyle}>
                <h2 style={sectionTitleStyle}>Professional Summary</h2>
                <p style={{ color: "#ddd", lineHeight: "1.8", fontSize: "1.05em", textAlign: "justify" }}>
                  A results-driven Cloud Engineer adept at designing and deploying scalable cloud
                  solutions using AWS, Terraform, and Kubernetes. Proven ability to improve
                  operational efficiency and reduce infrastructure costs through automation and
                  infrastructure-as-code. Passionate about leveraging cloud technologies to drive
                  business innovation and optimize performance. Seeking a challenging role in cloud
                  engineering or DevOps where I can leverage my expertise in AWS, automation, and
                  cloud security to deliver impactful results.
                </p>
              </section>

              {/* Experience Section */}
              <section style={sectionStyle}>
                <h2 style={sectionTitleStyle}>Professional Experience</h2>
                
                <div style={{ marginBottom: "30px", paddingLeft: "20px", borderLeft: "3px solid #e11d48", position: "relative" }}>
                  <div style={{ position: "absolute", left: "-8px", top: "5px", width: "13px", height: "13px", borderRadius: "50%", backgroundColor: "#e11d48", border: "2px solid rgba(20, 20, 20, 0.8)" }}></div>
                  <h3 style={jobTitleStyle}>Cloud Infrastructure Consultant</h3>
                  <div style={companyStyle}>E-Mudhumeni</div>
                  <div style={dateLocationStyle}>
                    <span><FaMapMarkerAlt style={{ marginRight: "5px" }} />Remote</span>
                    <span>August 2024 - Present</span>
                    <a
                      href="https://www.umojalands.co.zw/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#e11d48", textDecoration: "none" }}
                      onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                      onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                    >
                      Company Website
                    </a>
                  </div>
                  <ul style={{ paddingLeft: "20px", marginTop: "10px", color: "#ddd", lineHeight: "1.8" }}>
                    <li style={{ marginBottom: "8px" }}>
                      Consult with clients on cloud-based infrastructure strategies, aligning
                      technical solutions with business goals.
                    </li>
                    <li style={{ marginBottom: "8px" }}>
                      Designed and optimized AWS environments, reducing cloud costs by 30% through
                      resource optimization and automation.
                    </li>
                    <li style={{ marginBottom: "8px" }}>
                      Delivered pre-sales support with tailored technical presentations and solution
                      demonstrations to potential clients.
                    </li>
                    <li style={{ marginBottom: "8px" }}>
                      Conducted competitor research to effectively position cloud products and
                      services in the market.
                    </li>
                  </ul>
                </div>

                <div style={{ marginBottom: "30px", paddingLeft: "20px", borderLeft: "3px solid #e11d48", position: "relative" }}>
                  <div style={{ position: "absolute", left: "-8px", top: "5px", width: "13px", height: "13px", borderRadius: "50%", backgroundColor: "#e11d48", border: "2px solid rgba(20, 20, 20, 0.8)" }}></div>
                  <h3 style={jobTitleStyle}>Intern Trainee</h3>
                  <div style={companyStyle}>CM-Port</div>
                  <div style={dateLocationStyle}>
                    <span><FaMapMarkerAlt style={{ marginRight: "5px" }} />Shenzhen, China</span>
                    <span>February 2024 – June 2024</span>
                    <a
                      href="https://www.cmport.com.hk/en/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#e11d48", textDecoration: "none" }}
                      onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                      onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                    >
                      Company Website
                    </a>
                  </div>
                  <ul style={{ paddingLeft: "20px", marginTop: "10px", color: "#ddd", lineHeight: "1.8" }}>
                    <li style={{ marginBottom: "8px" }}>
                      Configured and optimized network infrastructure to support real-time data
                      transfer for IoT devices and 5G-powered automated systems.
                    </li>
                    <li style={{ marginBottom: "8px" }}>
                      Enhanced understanding of secure, high-speed data transmission and reliable
                      networking principles in mission-critical logistics environments.
                    </li>
                  </ul>
                </div>

                <div style={{ marginBottom: "30px", paddingLeft: "20px", borderLeft: "3px solid #e11d48", position: "relative" }}>
                  <div style={{ position: "absolute", left: "-8px", top: "5px", width: "13px", height: "13px", borderRadius: "50%", backgroundColor: "#e11d48", border: "2px solid rgba(20, 20, 20, 0.8)" }}></div>
                  <h3 style={jobTitleStyle}>Research-Analytics Intern</h3>
                  <div style={companyStyle}>SUS ENVIRONMENT</div>
                  <div style={dateLocationStyle}>
                    <span><FaMapMarkerAlt style={{ marginRight: "5px" }} />Shanghai, China</span>
                    <span>December 2021 – March 2022</span>
                    <a
                      href="https://en.shsus.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#e11d48", textDecoration: "none" }}
                      onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                      onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                    >
                      Company Website
                    </a>
                  </div>
                  <ul style={{ paddingLeft: "20px", marginTop: "10px", color: "#ddd", lineHeight: "1.8" }}>
                    <li style={{ marginBottom: "8px" }}>
                      Provided analytical insights for sustainable energy projects and client
                      presentations.
                    </li>
                    <li style={{ marginBottom: "8px" }}>
                      Participated in feasibility studies and business proposal development for
                      waste-to-energy solutions.
                    </li>
                    <li style={{ marginBottom: "8px" }}>
                      Delivered technical briefings to non-technical stakeholders, translating
                      complex data into actionable insights.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Education Section */}
              <section style={sectionStyle}>
                <h2 style={sectionTitleStyle}>Education</h2>
                
                <div style={{ marginBottom: "25px", paddingLeft: "20px", borderLeft: "3px solid #e11d48", position: "relative" }}>
                  <div style={{ position: "absolute", left: "-8px", top: "5px", width: "13px", height: "13px", borderRadius: "50%", backgroundColor: "#e11d48", border: "2px solid rgba(20, 20, 20, 0.8)" }}></div>
                  <h3 style={jobTitleStyle}>Master of Science in Communication Engineering</h3>
                  <div style={companyStyle}>Dalian Maritime University</div>
                  <div style={dateLocationStyle}>
                    <span>September 2022 - June 2024</span>
                  </div>
                </div>

                <div style={{ marginBottom: "25px", paddingLeft: "20px", borderLeft: "3px solid #e11d48", position: "relative" }}>
                  <div style={{ position: "absolute", left: "-8px", top: "5px", width: "13px", height: "13px", borderRadius: "50%", backgroundColor: "#e11d48", border: "2px solid rgba(20, 20, 20, 0.8)" }}></div>
                  <h3 style={jobTitleStyle}>Bachelor of Engineering in Information and Communication Engineering</h3>
                  <div style={companyStyle}>Nanjing University of Posts and Telecommunications</div>
                  <div style={dateLocationStyle}>
                    <span>September 2018 - June 2022</span>
                  </div>
                </div>
              </section>

              {/* Projects Section */}
              <section style={sectionStyle}>
                <h2 style={sectionTitleStyle}>Key Projects</h2>
                
                <div style={{ marginBottom: "25px", padding: "20px", backgroundColor: "rgba(225, 29, 72, 0.05)", borderRadius: "5px", borderLeft: "4px solid #e11d48" }}>
                  <h3 style={{ color: "#e11d48", fontSize: "1.15em", fontWeight: "600", marginBottom: "10px" }}>
                    Cloud Infrastructure Automation with Terraform
                  </h3>
                  <p style={{ color: "#ddd", lineHeight: "1.8", marginBottom: "0" }}>
                    Designed and implemented a fully automated cloud infrastructure provisioning
                    system using Terraform on AWS. Automated the creation of VPCs, EC2 instances,
                    security groups, and other cloud resources, reducing deployment time by 50% and
                    improving consistency across environments.
                  </p>
                </div>

                <div style={{ marginBottom: "25px", padding: "20px", backgroundColor: "rgba(225, 29, 72, 0.05)", borderRadius: "5px", borderLeft: "4px solid #e11d48" }}>
                  <h3 style={{ color: "#e11d48", fontSize: "1.15em", fontWeight: "600", marginBottom: "10px" }}>
                    <a
                      href="https://www.ron-tino.site/rons-blog/main/index.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#e11d48", textDecoration: "none" }}
                      onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                      onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                    >
                      Project Catalogue
                    </a>
                  </h3>
                  <p style={{ color: "#ddd", lineHeight: "1.8", marginBottom: "0" }}>
                    A collection of my cloud-related projects and blog posts showcasing practical implementations and technical insights.
                  </p>
                </div>
              </section>

              {/* Skills Section */}
              <section style={sectionStyle}>
                <h2 style={sectionTitleStyle}>Technical Skills</h2>
                <Row>
                  <Col md={6}>
                    <div style={{ marginBottom: "15px" }}>
                      <strong style={{ color: "#e11d48", fontSize: "1em", display: "block", marginBottom: "5px" }}>
                        Cloud Technologies
                      </strong>
                      <span style={{ color: "#ddd", fontSize: "0.95em", lineHeight: "1.6" }}>
                        AWS (EC2, Lambda, S3, IAM, CloudFront, Route 53, VPC, API Gateway), Azure (basics), GCP (basics), Serverless Architecture, Containerization (Docker)
                      </span>
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <strong style={{ color: "#e11d48", fontSize: "1em", display: "block", marginBottom: "5px" }}>
                        Automation Tools
                      </strong>
                      <span style={{ color: "#ddd", fontSize: "0.95em", lineHeight: "1.6" }}>
                        Terraform, Ansible, CloudFormation, Bash Scripting, Python Scripting, Jenkins, GitHub Actions
                      </span>
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <strong style={{ color: "#e11d48", fontSize: "1em", display: "block", marginBottom: "5px" }}>
                        Programming Languages
                      </strong>
                      <span style={{ color: "#ddd", fontSize: "0.95em", lineHeight: "1.6" }}>
                        Python, YAML, HCL, Bash
                      </span>
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <strong style={{ color: "#e11d48", fontSize: "1em", display: "block", marginBottom: "5px" }}>
                        Networking
                      </strong>
                      <span style={{ color: "#ddd", fontSize: "0.95em", lineHeight: "1.6" }}>
                        VPCs, Subnets, Routing, Firewalls, Load Balancing, DNS
                      </span>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div style={{ marginBottom: "15px" }}>
                      <strong style={{ color: "#e11d48", fontSize: "1em", display: "block", marginBottom: "5px" }}>
                        Operating Systems
                      </strong>
                      <span style={{ color: "#ddd", fontSize: "0.95em", lineHeight: "1.6" }}>
                        Linux (Ubuntu, Debian), Windows Server
                      </span>
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <strong style={{ color: "#e11d48", fontSize: "1em", display: "block", marginBottom: "5px" }}>
                        Databases
                      </strong>
                      <span style={{ color: "#ddd", fontSize: "0.95em", lineHeight: "1.6" }}>
                        DynamoDB, MySQL (basics)
                      </span>
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <strong style={{ color: "#e11d48", fontSize: "1em", display: "block", marginBottom: "5px" }}>
                        CI/CD
                      </strong>
                      <span style={{ color: "#ddd", fontSize: "0.95em", lineHeight: "1.6" }}>
                        GitHub Actions, Jenkins
                      </span>
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <strong style={{ color: "#e11d48", fontSize: "1em", display: "block", marginBottom: "5px" }}>
                        Monitoring & Logging
                      </strong>
                      <span style={{ color: "#ddd", fontSize: "0.95em", lineHeight: "1.6" }}>
                        CloudWatch (AWS), Prometheus (basics), Grafana (basics)
                      </span>
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <strong style={{ color: "#e11d48", fontSize: "1em", display: "block", marginBottom: "5px" }}>
                        Container Orchestration
                      </strong>
                      <span style={{ color: "#ddd", fontSize: "0.95em", lineHeight: "1.6" }}>
                        Kubernetes
                      </span>
                    </div>
                  </Col>
                </Row>
              </section>

              {/* Certifications Section */}
              <section style={{ ...sectionStyle, borderBottom: "none" }}>
                <h2 style={sectionTitleStyle}>Certifications</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ padding: "15px", backgroundColor: "rgba(225, 29, 72, 0.05)", borderRadius: "5px", borderLeft: "4px solid #e11d48" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                      <strong style={{ color: "#fff", fontSize: "1em" }}>
                        AWS Certified Solutions Architect – Associate
                      </strong>
                      <span style={{ color: "#9d9d9d", fontSize: "0.9em" }}>2024</span>
                    </div>
                    <a
                      href="https://aws.amazon.com/certification/certified-solutions-architect-associate/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#e11d48", textDecoration: "none", fontSize: "0.9em" }}
                      onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                      onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                    >
                      View Details →
                    </a>
                  </div>
                  
                  <div style={{ padding: "15px", backgroundColor: "rgba(225, 29, 72, 0.05)", borderRadius: "5px", borderLeft: "4px solid #e11d48" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                      <strong style={{ color: "#fff", fontSize: "1em" }}>
                        CCNA (Cisco)
                      </strong>
                      <span style={{ color: "#9d9d9d", fontSize: "0.9em" }}>Exam Scheduled 2024</span>
                    </div>
                    <a
                      href="https://www.netacad.com/courses/networking/ccna"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#e11d48", textDecoration: "none", fontSize: "0.9em" }}
                      onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                      onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                    >
                      View Details →
                    </a>
                  </div>
                  
                  <div style={{ padding: "15px", backgroundColor: "rgba(225, 29, 72, 0.05)", borderRadius: "5px", borderLeft: "4px solid #e11d48" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                      <strong style={{ color: "#fff", fontSize: "1em" }}>
                        HashiCorp Certified: Terraform Associate
                      </strong>
                      <span style={{ color: "#9d9d9d", fontSize: "0.9em" }}>Planned</span>
                    </div>
                    <a
                      href="https://www.hashicorp.com/certification/terraform-associate"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#e11d48", textDecoration: "none", fontSize: "0.9em" }}
                      onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                      onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                    >
                      View Details →
                    </a>
                  </div>
                  
                  <div style={{ padding: "15px", backgroundColor: "rgba(225, 29, 72, 0.05)", borderRadius: "5px", borderLeft: "4px solid #e11d48" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                      <strong style={{ color: "#fff", fontSize: "1em" }}>
                        Google Cloud Associate Cloud Engineer
                      </strong>
                      <span style={{ color: "#9d9d9d", fontSize: "0.9em" }}>Planned</span>
                    </div>
                    <a
                      href="https://cloud.google.com/certification/cloud-engineer"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#e11d48", textDecoration: "none", fontSize: "0.9em" }}
                      onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                      onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                    >
                      View Details →
                    </a>
                  </div>
                </div>
              </section>

              {/* Footer Section with Social Links */}
              <div style={{ marginTop: "50px", paddingTop: "30px", borderTop: "2px solid rgba(225, 29, 72, 0.3)", textAlign: "center" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "25px",
                    flexWrap: "wrap",
                    marginBottom: "20px",
                  }}
                >
                  <a
                    href="https://x.com/Nightwalka11"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#ddd",
                      fontSize: "1.8em",
                      textDecoration: "none",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#e11d48";
                      e.target.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#ddd";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="https://www.youtube.com/@Ron_can_cloud"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#ddd",
                      fontSize: "1.8em",
                      textDecoration: "none",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#e11d48";
                      e.target.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#ddd";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    <FaYoutube />
                  </a>
                  <a
                    href="https://www.ron-tino.site/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#ddd",
                      fontSize: "1.8em",
                      textDecoration: "none",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#e11d48";
                      e.target.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#ddd";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    <FaGlobe />
                  </a>
                  <a
                    href="https://github.com/Ronald-tino"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#ddd",
                      fontSize: "1.8em",
                      textDecoration: "none",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#e11d48";
                      e.target.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#ddd";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ronald-tino-027a6122b"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#ddd",
                      fontSize: "1.8em",
                      textDecoration: "none",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#e11d48";
                      e.target.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#ddd";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    <FaLinkedin />
                  </a>
                </div>
                <p
                  style={{
                    color: "#9d9d9d",
                    fontSize: "0.9em",
                    marginTop: "20px",
                  }}
                >
                  Copyright © 2024 Ron-Tino
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default ResumeNew;
