import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function BlogCard(props) {
  return (
    <Card className="project-card-view" style={{ marginBottom: "30px" }}>
      <Card.Body style={{ display: "flex", padding: "20px", gap: "20px" }}>
        {props.imgPath && (
          <div
            style={{
              flexShrink: 0,
              width: "150px",
              height: "150px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={props.imgPath}
              alt="card-img"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </div>
        )}
        <div className="blog-post-preview" style={{ flex: 1 }}>
          <Link to={props.link} style={{ textDecoration: "none" }}>
            <Card.Title
              className="blog-post-title"
              style={{
                color: "#c770f0",
                fontSize: "1.5em",
                fontWeight: "600",
                marginBottom: "12px",
                lineHeight: "1.4",
              }}
            >
              {props.title}
            </Card.Title>
            <Card.Text
              className="blog-post-subtitle"
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "1em",
                marginBottom: "15px",
                lineHeight: "1.6",
                textAlign: "justify",
              }}
            >
              {props.subtitle}
            </Card.Text>
          </Link>
          <p
            className="blog-post-meta"
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "0.9em",
              marginBottom: "0",
            }}
          >
            Created by <span style={{ color: "#c770f0" }}>{props.author}</span>{" "}
            on {props.date}
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}

export default BlogCard;
