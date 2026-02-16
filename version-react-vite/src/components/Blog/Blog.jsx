import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle.jsx";
import BlogCard from "./BlogCard.jsx";
// Import images
import gameImg from "../../Assets/game-d.png";
import ubuntuImg from "../../Assets/ubuntu.jpg";
import gitJiraImg from "../../Assets/git-jira.jpg";
import cleanupImg from "../../Assets/cleanup.png";
import terraformImg from "../../Assets/terrra.jpg";
import projectGoalImg from "../../Assets/project_goal.png";
import catalogImg from "../../Assets/catalog_preview.png";

import weatherImg from "../../Assets/weather-archi.png";
import nbaImg from "../../Assets/nba.jpg";
import nbaAnalyticsImg from "../../Assets/nba-analytics.png";
import nflImg from "../../Assets/nfl-1.jpg";
import highlightsImg from "../../Assets/HIGHLIGHTS.jpg";
import cloudLogoImg from "../../Assets/logo-cloudd.png"
import ansibleImg from "../../Assets/2nJIuDzpq5f3Zib7gCC5aoOc9g.avif";
import topBrandImg from "../../Assets/Screenshot 2025-07-16 232725.png";
function Blog() {
  const blogPosts = [
    {
      id: "cloud-resume-challenge",
      title: "Cloud Resume Challenge - AWS Portfolio Project",
      subtitle: "My journey through the cloud resume challenge.",
      date: "January 04, 2025",
      link: "/project/cloud-resume-challenge",
      imgPath: cloudLogoImg,
    },
    {
      id: "post",
      title: "Full-Stack Ride-Sharing App on AWS",
      subtitle:
        "A comprehensive guide to building a ride-hailing application using various AWS services.",
      date: "January 04, 2025",
      link: "/project/aws-ride-sharing-app",
      imgPath: projectGoalImg,
    },
    {
      id: "sen",
      title: "Intelligent Vacuum System - IoT Collaboration",
      subtitle:
        "This is a project i am collaborating on for a company in China called Jitri",
      date: "July 15, 2025",
      link: "/project/intelligent-vacuum",
      imgPath: topBrandImg,
    },
    {
      id: "post-6",
      title: "Scalable Sports API - ECS, Fargate & API Gateway",
      subtitle:
        "Architecting a containerized backend for NFL game schedules using ECS and Fargate.",
      date: "January 29, 2025",
      link: "/project/scalable-sports-api",
      imgPath: nflImg,
    },
    {
      id: "post-5",
      title: "Sports Data Lake - AWS S3, Glue & Athena",
      subtitle:
        "My journey in creating a data lake to analyze NBA player data, while utilizing VS Code's AWS integration",
      date: "January 04, 2025",
      link: "/project/aws-sports-data-lake",
      imgPath: nbaAnalyticsImg,
    },
    {
      id: "post-7",
      title: "NCAA Highlight Pipeline - MediaConvert & S3 Automation",
      subtitle:
        "Serverless video transcoding with MediaConvert and S3 for NCAA highlights.",
      date: "January 04, 2025",
      link: "/project/ncaa-highlight-pipeline",
      imgPath: highlightsImg,
    },
    {
      id: "post-8",
      title: "Cloud Infrastructure with Terraform & Ansible",
      subtitle:
        "A step-by-step walkthrough for deploying a simple cloud infrastructure, even if you're a complete beginner.",
      date: "February 08, 2025",
      link: "/project/terraform-infrastructure",
      imgPath: terraformImg,
    },
    {
      id: "post-10",
      title: "AWS Cost Optimization - EBS Snapshot Cleanup Automation",
      subtitle:
        "A Step-by-Step Guide to Building and Deploying a Cost-Saving Lambda Function for EBS Snapshot Management",
      date: "February 9, 2025",
      link: "/project/aws-ebs-cleanup",
      imgPath: cleanupImg,
    },
    {
      id: "post-12",
      title: "AWS EC2 Automation with Ansible",
      subtitle:
        "Create, Configure, and Manage EC2 Instances with Ansible",
      date: "April 10, 2025",
      link: "/project/ansible-ec2-automation",
      imgPath: ansibleImg,
    },
    {
      id: "post-11",
      title: "GitHub to Jira Integration - Python Flask Automation",
      subtitle:
        "Bridging the gap between development and project management with a simple, automated solution.",
      date: "March 18, 2025",
      link: "/project/github-jira-automation",
      imgPath: gitJiraImg,
    },
    {
      id: "post-1",
      title: "Serverless Calculator - AWS Lambda & API Gateway",
      subtitle:
        "A comprehensive guide to building a serverless calculator application using various AWS services.",
      date: "January 04, 2025",
      link: "/project/serverless-calculator",
      imgPath: cleanupImg,
    },
    {
      id: "post-4",
      title: "NBA Game Notifications - AWS SNS & Lambda",
      subtitle:
        "My journey in creating a system that sends you game notifications directly to your email or phone.",
      date: "January 04, 2025",
      link: "/project/nba-notification-app",
      imgPath: nbaImg,
    },
    {
      id: "post-3",
      title: "Weather Dashboard - Python API Integration",
      subtitle:
        "My journey in creating a command-line weather application using Python.",
      date: "January 04, 2025",
      link: "/project/weather-dashboard",
      imgPath: weatherImg,
    },
    {
      id: "game",
      title: "AI-Powered Unbeatable Tic-Tac-Toe Game",
      subtitle:
        "This is a project is a X and O game designed to never be won which i build in less than 40 min of vibe coding?",
      date: "July 23, 2025",
      link: "/project/ai-coding-game",
      imgPath: gameImg,
    },
    {
      id: "post-13",
      title: "WSL Custom Directory Setup - Windows System Optimization",
      subtitle:
        "Save space on your C drive and manage your WSL installations more effectively.",
      date: "June 15, 2025",
      link: "/project/wsl-custom-directory",
      imgPath: ubuntuImg,
    },
    {
      id: "content-library",
      title: "E-commerce Content Library - React & Shopify Integration",
      subtitle:
        "I successfully implemented a content library website for my client, where they can showcase their work from YouTube and link to products and merchandise on their Shopify store.",
      date: "November 2024",
      link: "/project/content-library-ecommerce",
      imgPath: catalogImg,
    },
  ];

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My <strong className="purple">Project-Catalogue </strong>
        </h1>
        <p
          style={{
            color: "white",
            textAlign: "center",
            fontSize: "1.2em",
            fontStyle: "italic",
          }}
        >
          "Learning by doing transforms ideas into reality—action drives
          mastery."
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {blogPosts.map((post, index) => (
            <Col md={12} className="project-card" key={index}>
              <BlogCard
                imgPath={post.imgPath}
                title={post.title}
                subtitle={post.subtitle}
                date={post.date}
                link={post.link}
                author="Ron-tino"
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Blog;
