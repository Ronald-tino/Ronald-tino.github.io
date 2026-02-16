import React, { useState, useEffect } from "react";
import Preloader from "./components/Pre.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import Blog from "./components/Blog/Blog.jsx";
import ServerlessCalculator from "./components/Blog/ServerlessCalculator.jsx";
import Resume from "./components/Resume/ResumeNew.jsx";
import Footer from "./components/Footer.jsx";

import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CloudResumeChallenge from "./components/Blog/CloudResumeChallenge.jsx";
import IntelligentVacuum from "./components/Blog/IntelligentVacuum.jsx";
import WslCustomDirectory from "./components/Blog/WslCustomDirectory.jsx";
import AiCodingGame from "./components/Blog/AiCodingGame.jsx";
import AnsibleEc2Automation from "./components/Blog/AnsibleEc2Automation.jsx";
import GithubJiraAutomation from "./components/Blog/GithubJiraAutomation.jsx";
import AwsEbsCleanup from "./components/Blog/AwsEbsCleanup.jsx";
import TerraformInfrastructure from "./components/Blog/TerraformInfrastructure.jsx";
import AwsRideSharingApp from "./components/Blog/AwsRideSharingApp.jsx";
import WeatherDashboard from "./components/Blog/WeatherDashboard.jsx";
import NbaNotificationApp from "./components/Blog/NbaNotificationApp.jsx";
import AwsSportsDataLake from "./components/Blog/AwsSportsDataLake.jsx";
import ScalableSportsApi from "./components/Blog/ScalableSportsApi.jsx";
import NcaaHighlightPipeline from "./components/Blog/NcaaHighlightPipeline.jsx";
import ContentLibrary from "./components/Blog/ContentLibrary.jsx";
function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Blog />} />
          <Route
            path="/project/serverless-calculator"
            element={<ServerlessCalculator />}
          />
          <Route
            path="/project/cloud-resume-challenge"
            element={<CloudResumeChallenge />}
          />
          <Route
            path="/project/intelligent-vacuum"
            element={<IntelligentVacuum />}
          />
          <Route
            path="/project/wsl-custom-directory"
            element={<WslCustomDirectory />}
          />
          <Route
            path="/project/ai-coding-game"
            element={<AiCodingGame />}
          />
          <Route
            path="/project/ansible-ec2-automation"
            element={<AnsibleEc2Automation />}
          />
          <Route
            path="/project/github-jira-automation"
            element={<GithubJiraAutomation />}
          />
          <Route
            path="/project/aws-ebs-cleanup"
            element={<AwsEbsCleanup />}
          />
          <Route
            path="/project/terraform-infrastructure"
            element={<TerraformInfrastructure />}
          />
          <Route
            path="/project/aws-ride-sharing-app"
            element={<AwsRideSharingApp />}
          />
          <Route
            path="/project/weather-dashboard"
            element={<WeatherDashboard />}
          />
          <Route
            path="/project/nba-notification-app"
            element={<NbaNotificationApp />}
          />
          <Route
            path="/project/aws-sports-data-lake"
            element={<AwsSportsDataLake />}
          />
          <Route
            path="/project/scalable-sports-api"
            element={<ScalableSportsApi />}
          />
          <Route
            path="/project/ncaa-highlight-pipeline"
            element={<NcaaHighlightPipeline />}
          />
          <Route
            path="/project/content-library-ecommerce"
            element={<ContentLibrary />}
          />
          {/* Backwards-compatible redirects from the old Blog routes */}
          <Route path="/blog" element={<Navigate to="/project" replace />} />
          <Route
            path="/blog/serverless-calculator"
            element={<Navigate to="/project/serverless-calculator" replace />}
          />
          <Route
            path="/blog/cloud-resume-challenge"
            element={<Navigate to="/project/cloud-resume-challenge" replace />}
          />
          <Route
            path="/blog/intelligent-vacuum"
            element={<Navigate to="/project/intelligent-vacuum" replace />}
          />
          <Route
            path="/blog/wsl-custom-directory"
            element={<Navigate to="/project/wsl-custom-directory" replace />}
          />
          <Route
            path="/blog/ai-coding-game"
            element={<Navigate to="/project/ai-coding-game" replace />}
          />
          <Route
            path="/blog/ansible-ec2-automation"
            element={<Navigate to="/project/ansible-ec2-automation" replace />}
          />
          <Route
            path="/blog/github-jira-automation"
            element={<Navigate to="/project/github-jira-automation" replace />}
          />
          <Route
            path="/blog/aws-ebs-cleanup"
            element={<Navigate to="/project/aws-ebs-cleanup" replace />}
          />
          <Route
            path="/blog/terraform-infrastructure"
            element={<Navigate to="/project/terraform-infrastructure" replace />}
          />
          <Route
            path="/blog/aws-ride-sharing-app"
            element={<Navigate to="/project/aws-ride-sharing-app" replace />}
          />
          <Route
            path="/blog/weather-dashboard"
            element={<Navigate to="/project/weather-dashboard" replace />}
          />
          <Route
            path="/blog/nba-notification-app"
            element={<Navigate to="/project/nba-notification-app" replace />}
          />
          <Route
            path="/blog/aws-sports-data-lake"
            element={<Navigate to="/project/aws-sports-data-lake" replace />}
          />
          <Route
            path="/blog/scalable-sports-api"
            element={<Navigate to="/project/scalable-sports-api" replace />}
          />
          <Route
            path="/blog/ncaa-highlight-pipeline"
            element={<Navigate to="/project/ncaa-highlight-pipeline" replace />}
          />
          <Route
            path="/blog/content-library-ecommerce"
            element={<Navigate to="/project/content-library-ecommerce" replace />}
          />
          <Route path="/resume" element={<Resume />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
