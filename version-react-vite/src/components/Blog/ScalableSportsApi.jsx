import React from "react";
import BlogPost from "./BlogPost.jsx";
import archiNblImg from "../../Assets/ARCHI-NBL.png";
import nflImg from "../../Assets/nfl-1.jpg";
import ecrImg from "../../Assets/ecr.png";
import ecsImg from "../../Assets/ecs.png";
import taskDefImg from "../../Assets/task-def.png";

function ScalableSportsApi() {
  const content = (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <img
          src={nflImg}
          alt="NFL game day"
          style={{ maxWidth: "100%", height: "auto", borderRadius: "10px" }}
        />
      </div>

      <p>
        Hey tech enthusiasts! I'm excited to share my journey in building a
        robust, scalable API for retrieving NFL game schedules using a
        combination of powerful AWS services. In this project, we'll dive into
        the practical application of containerization, API management, and
        serverless computing. This isn't just about theory; it's about building
        something real, and by the end, you'll have a functioning API.
      </p>

      <h2 className="purple">The Goal: A Scalable and Secure Sports API</h2>
      <p>
        Our mission is to create a custom endpoint that can deliver up-to-date
        NFL game schedules, formatted for easy consumption. This isn't just
        about fetching data; it's about creating a full-fledged API that is:
      </p>
      <ul>
        <li>
          <strong>Scalable:</strong> Handles increasing traffic without
          performance bottlenecks.
        </li>
        <li>
          <strong>Highly Available:</strong> Ensures uninterrupted access to the
          service.
        </li>
        <li>
          <strong>Secure:</strong> Provides access control.
        </li>
        <li>
          <strong>Organized:</strong> Provides clean and readable data to
          consumers.
        </li>
      </ul>

      <h2 className="purple">The Solution: AWS-Powered Architecture</h2>
      <p>To achieve this, we will implement the following solution:</p>
      <ul>
        <li>
          <strong>Containerization:</strong> We will package our Python Flask
          application into a Docker container.
        </li>
        <li>
          <strong>ECS on Fargate:</strong> Amazon ECS with Fargate will be our
          container orchestration tool, allowing us to run our containers
          serverlessly.
        </li>
        <li>
          <strong>Application Load Balancer (ALB):</strong> The ALB will
          distribute traffic between our container instances ensuring high
          availability.
        </li>
        <li>
          <strong>API Gateway:</strong> This will expose our API to the outside
          world with added security and management capabilities.
        </li>
        <li>
          <strong>SerpAPI:</strong> We will use this third-party API as our data
          source for NFL game schedules.
        </li>
      </ul>

      <h2 className="purple">Architectural Overview</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <img
          src={archiNblImg}
          alt="Scalable sports API architecture diagram"
          style={{ maxWidth: "100%", height: "auto", borderRadius: "10px" }}
        />
      </div>
      <p>
        The diagram above illustrates how we will be utilizing the different AWS
        services.
      </p>

      <h2 className="purple">Technology Stack</h2>
      <ul>
        <li>
          <strong>Cloud Provider:</strong> AWS
        </li>
        <li>
          <strong>Containerization:</strong> Docker
        </li>
        <li>
          <strong>Orchestration:</strong> Amazon ECS (Fargate)
        </li>
        <li>
          <strong>Load Balancing:</strong> Application Load Balancer (ALB)
        </li>
        <li>
          <strong>API Management:</strong> Amazon API Gateway
        </li>
        <li>
          <strong>Programming Language:</strong> Python
        </li>
        <li>
          <strong>Data Source:</strong> SerpAPI
        </li>
      </ul>

      <h2 className="purple">Code Deep Dive</h2>
      <p>The project is structured as follows:</p>
      <pre className="terminal-like">
        <code>{`sports-api-management/
├── app.py       # Flask application for querying sports data
├── Dockerfile   # Dockerfile to containerize the Flask app
├── requirements.txt  # Python dependencies
├── .gitignore
└── README.md    # Project documentation`}</code>
      </pre>
      <p>Here's what each file is responsible for:</p>
      <ul>
        <li>
          <strong>app.py</strong>: This Python file holds our Flask application.
          It defines a <code>/sports</code> endpoint that, when accessed,
          fetches data from SerpAPI, formats the data and returns a JSON
          response.
        </li>
        <li>
          <strong>Dockerfile</strong>: This file defines the steps to build the
          container image. This includes using a base Python image, installing
          dependencies, copying application files, and exposing port 8080.
        </li>
        <li>
          <strong>requirements.txt</strong>: Lists the project's Python
          dependencies, in this case, Flask and Requests.
        </li>
      </ul>

      <h2 className="purple">Hands-On Implementation</h2>
      <p>Follow these steps to build your sports API:</p>

      <h3>1. Clone the Repository</h3>
      <pre className="terminal-like">
        <code>{`git clone https://github.com/Ronald-tino
cd containerized-sports-api`}</code>
      </pre>
      <p>
        Repository:&nbsp;
        <a
          href="https://github.com/Ronald-tino"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/Ronald-tino
        </a>
      </p>

      <h3>2. Create an ECR Repository</h3>
      <pre className="terminal-like">
        <code>{`aws ecr create-repository --repository-name sports-api --region us-east-1`}</code>
      </pre>

      <h3>3. Build and Push the Docker Image</h3>
      <p>
        Make sure you are logged into AWS ECR using the login command provided
        by the AWS CLI after you created the ECR repository. You will have to
        change the account ID in the following command to your AWS account ID.
      </p>
      <pre className="terminal-like">
        <code>{`aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <YOUR_AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com

docker build --platform linux/amd64 -t sports-api .

docker tag sports-api:latest <YOUR_AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/sports-api:sports-api-latest
docker push <YOUR_AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/sports-api:sports-api-latest`}</code>
      </pre>
      <p>
        <strong>Note:</strong> Be sure to replace{" "}
        <code>&lt;YOUR_AWS_ACCOUNT_ID&gt;</code> with your actual AWS account
        ID.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <img
          src={ecrImg}
          alt="ECR repository setup"
          style={{ maxWidth: "100%", height: "auto", borderRadius: "10px" }}
        />
      </div>

      <h3>4. Set Up ECS Cluster with Fargate</h3>
      <ul>
        <li>Go to ECS Console → Clusters → Create Cluster.</li>
        <li>Name your cluster (e.g., sports-api-cluster).</li>
        <li>Choose Fargate as your infrastructure.</li>
        <li>Create the cluster.</li>
      </ul>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <img
          src={ecsImg}
          alt="ECS cluster configuration"
          style={{ maxWidth: "100%", height: "auto", borderRadius: "10px" }}
        />
      </div>

      <h3>5. Create ECS Task Definition</h3>
      <ul>
        <li>Go to Task Definitions → Create new task definition.</li>
        <li>Name it (e.g., sports-api-task).</li>
        <li>Select Fargate as your infrastructure.</li>
        <li>
          Add the container with:
          <ul>
            <li>Name: sports-api-container</li>
            <li>
              Image URI:{" "}
              <code>
                &lt;YOUR_AWS_ACCOUNT_ID&gt;.dkr.ecr.us-east-1.amazonaws.com/sports-api:sports-api-latest
              </code>
            </li>
            <li>Port mapping: 8080</li>
            <li>
              Environment variables: Key: SPORTS_API_KEY, Value:{" "}
              <code>&lt;YOUR_SPORTSDATA.IO_API_KEY&gt;</code>
            </li>
          </ul>
        </li>
        <li>Create the task definition.</li>
      </ul>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <img
          src={taskDefImg}
          alt="ECS task definition"
          style={{ maxWidth: "100%", height: "auto", borderRadius: "10px" }}
        />
      </div>

      <h3>6. Run the Service with an ALB</h3>
      <ul>
        <li>
          Go to Clusters → select your cluster → Services → Create.
        </li>
        <li>Capacity provider: Fargate.</li>
        <li>Select the task definition family you just created.</li>
        <li>Name your service (e.g., sports-api-service).</li>
        <li>Set desired tasks to 2.</li>
        <li>
          Create a new security group with an open rule for all TCP for demo
          purposes (not recommended for production).
        </li>
        <li>Select Application Load Balancer (ALB) for load balancing.</li>
        <li>Create a new ALB (e.g., sports-api-alb).</li>
        <li>Set target group health check path to /sports.</li>
        <li>Create the service.</li>
      </ul>

      <h3>7. Test the ALB</h3>
      <ul>
        <li>
          After the service deploys, note the DNS name of the ALB, e.g.
          <code>
            {" "}
            sports-api-alb-&lt;YOUR_AWS_ACCOUNT_ID&gt;.us-east-1.elb.amazonaws.com
          </code>
          .
        </li>
        <li>
          Confirm the API is accessible by adding <code>/sports</code> to the
          end of the ALB DNS in a browser, e.g.{" "}
          <code>
            http://sports-api-alb-&lt;YOUR_AWS_ACCOUNT_ID&gt;.us-east-1.elb.amazonaws.com/sports
          </code>
          .
        </li>
      </ul>

      <h3>8. Configure API Gateway</h3>
      <ul>
        <li>Go to API Gateway Console → Create API → REST API.</li>
        <li>Name the API (e.g., Sports API Gateway).</li>
        <li>Create resource /sports and a GET method.</li>
        <li>
          Choose HTTP proxy as integration type and enter the ALB DNS name
          including <code>/sports</code>, e.g.{" "}
          <code>
            http://sports-api-alb-&lt;YOUR_AWS_ACCOUNT_ID&gt;.us-east-1.elb.amazonaws.com/sports
          </code>
          .
        </li>
        <li>Deploy to a stage (e.g., prod).</li>
        <li>Note the endpoint URL.</li>
      </ul>

      <h3>9. Test Your API</h3>
      <pre className="terminal-like">
        <code>{`curl https://<api-gateway-id>.execute-api.us-east-1.amazonaws.com/prod/sports`}</code>
      </pre>

      <h2 className="purple">What We Learned</h2>
      <ul>
        <li>
          <strong>Hands-on containerization:</strong> How to package an
          application using Docker.
        </li>
        <li>
          <strong>Serverless deployment:</strong> How to use ECS with Fargate to
          run applications.
        </li>
        <li>
          <strong>Load balancing:</strong> How to use an ALB to distribute
          traffic and ensure high availability.
        </li>
        <li>
          <strong>API management:</strong> How to expose APIs securely using API
          Gateway.
        </li>
      </ul>

      <h2 className="purple">Future Enhancements</h2>
      <ul>
        <li>
          Add caching for frequent API requests using Amazon ElastiCache.
        </li>
        <li>Store user-specific queries with DynamoDB.</li>
        <li>
          Enhance API security with API keys or IAM-based authentication.
        </li>
        <li>Implement CI/CD for automated deployments.</li>
      </ul>

      <h2 className="purple">Conclusion</h2>
      <p>
        This project demonstrates a modern approach to building and managing
        APIs in the cloud, combining the power of containers, serverless
        computing, and robust API management. Feel free to use this project as a
        stepping stone for other complex applications and services. Share your
        feedback below if you have any questions or insights!
      </p>
    </div>
  );

  return (
    <BlogPost
      title="Building a Scalable Sports API"
      subtitle="Architecting a containerized backend for NFL schedules using ECS and Fargate."
      author="Ron-tino"
      date="January 29, 2025"
      content={content}
    />
  );
}

export default ScalableSportsApi;
