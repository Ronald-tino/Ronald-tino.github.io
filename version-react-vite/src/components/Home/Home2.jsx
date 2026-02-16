import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiOutlineGlobal,
} from "react-icons/ai";
import { FaLinkedinIn, FaYoutube } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I transitioned from traditional IT to cloud computing and fell in
              love with building scalable, secure cloud solutions! 🚀
              <br />
              <br />I am proficient in cloud technologies like
              <i>
                <b className="purple"> AWS, Python, and Terraform. </b>
              </i>
              <br />
              <br />
              My field of Interest's are designing &nbsp;
              <i>
                <b className="purple">
                  Cloud-Native Solutions and DevOps Automation{" "}
                </b>{" "}
                and also in areas related to{" "}
                <b className="purple">Infrastructure as Code.</b>
              </i>
              <br />
              <br />
              Whenever possible, I leverage my passion for automation using
              <b className="purple"> Terraform, Ansible</b> and
              <i>
                <b className="purple">
                  {" "}
                  Modern Cloud Platforms and CI/CD Tools
                </b>
              </i>
              &nbsp; like
              <i>
                <b className="purple"> AWS, Docker, and Kubernetes</b>
              </i>
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/Ronald-tino"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://x.com/Nightwalka11"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/ronald-tino-027a6122b"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.youtube.com/@Ron_can_cloud"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaYoutube />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.ron-tino.site/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiOutlineGlobal />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
