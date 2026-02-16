import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Particle from "../Particle.jsx";

function BlogPost({ title, subtitle, author, date, content }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/project");
  };

  return (
    <Container fluid className="blog-post-section">
      <Particle />

      {/* Header Section */}
      <div
        className="blog-header"
        style={{
          background: "var(--section-background-color)",
          minHeight: "40vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <div className="blog-post-heading">
                <h1
                  style={{
                    fontSize: "2.5em",
                    fontWeight: "700",
                    color: "white",
                    marginBottom: "20px",
                  }}
                >
                  {title}
                </h1>
                <h2
                  style={{
                    fontSize: "1.3em",
                    color: "rgba(255,255,255,0.9)",
                    fontWeight: "300",
                    marginBottom: "20px",
                  }}
                >
                  {subtitle}
                </h2>
                <span
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "1em",
                  }}
                >
                  Created by <span className="purple">{author}</span> on {date}
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Navigation */}
      <Container style={{ paddingTop: "20px" }}>
        <Row>
          <Col>
            <button
              onClick={handleBackClick}
              style={{
                color: "#c770f0",
                backgroundColor: "transparent",
                border: "none",
                fontSize: "1.1em",
                fontWeight: "500",
                cursor: "pointer",
                padding: "0",
                textDecoration: "underline",
              }}
              onMouseOver={(e) => (e.target.style.color = "#a854f7")}
              onMouseOut={(e) => (e.target.style.color = "#c770f0")}
            >
              ← Back to Projects
            </button>
          </Col>
        </Row>
      </Container>

      {/* Content */}
      <Container style={{ paddingTop: "40px", paddingBottom: "60px" }}>
        <Row>
          <Col lg={8} className="mx-auto">
            <article className="blog-content">{content}</article>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default BlogPost;
