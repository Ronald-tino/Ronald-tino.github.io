import React from "react";
import BlogPost from "./BlogPost.jsx";
import cloudLogoImg from "../../Assets/logo-cloudd.png";
import certsImg from "../../Assets/certs.png";
import resumeImg from "../../Assets/resume.png";

function CloudResumeChallenge() {
  const content = (
    <div>
      <p>
        My journey into the world of cloud technologies has been one of continuous learning and adaptation. With a background in communication engineering focused on microwave and electromagnetic wave theory, I initially designed tangible solutions, and over time, I recognized the transformative power of cloud computing and the need to pivot my skillset toward this dynamic field.
      </p>

      <p>
        This journey isn't just about pivoting into the field, it's also about validation and showing competence. That's why when I found out about the Cloud Resume Challenge by Forrest Brazeal, I saw a perfect way to demonstrate my skills and accelerate my learning journey. This project was a hands-on experience with real world AWS services, and it's the site that you're reading now.
      </p>

      <h2 className="purple">About This Project</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <img
          src={cloudLogoImg}
          alt="AWS Amplify"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>
      
      <p>
        The Cloud Resume Challenge seemed like an exciting way to showcase and deepen my skills in cloud computing and serverless architectures. Building upon my AWS Certified Cloud Practitioner (CCP) certification, I embarked on this challenge to create a cloud-powered
        portfolio website that you see here. This project required me to get into the weeds with various AWS services, including S3 for hosting, CloudFront for HTTPS, DynamoDB for data storage, and AWS Lambda for serverless functions.
        Additionally, I utilized Terraform for Infrastructure as Code (IaC), which helped to ensure consistency and scalability in my setup.
      </p>

      <h2 className="purple">Steps to Completion</h2>
      <p>The project had a number of steps, but below are the major sections I had to complete before being able to present the final result.</p>
      <ul>
        <li>Certification</li>
        <li>HTML</li>
        <li>CSS</li>
        <li>Static Website</li>
        <li>HTTPS</li>
        <li>DNS</li>
        <li>Javascript</li>
        <li>Database</li>
        <li>API</li>
        <li>Python</li>
        <li>Tests</li>
        <li>Infrastructure as Code</li>
        <li>Source Control</li>
        <li>CI/CD (Back end)</li>
        <li>CI/CD (Front end)</li>
        <li>Blog Post</li>
      </ul>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <img
          src={certsImg}
          alt="AWS Amplify"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>

      <h2 className="purple">Detailed Steps</h2>
      
      <ol>
        <li>
          <strong>Laying the Foundation with AWS Certifications:</strong>
          <p>
            My journey began with earning the AWS Certified Cloud Practitioner (CCP) certification in January 2024. This certification provided a foundational understanding of cloud concepts and AWS services, which set the stage for my more complex projects, including the pursuit of the AWS Certified Solutions Architect – Associate (SAA) certification.
          </p>
        </li>
        <li>
          <strong>Crafting the HTML and CSS Resume:</strong>
          <p>
            Recognizing that the core of the challenge lay in cloud architecture, I focused on functionality over aesthetics when creating my resume. I found a template, made the necessary modifications to personalize it, and proceeded. Knowing that I could revisit this at a later stage gave me the time I needed to focus on the next steps of the challenge.
          </p>
        </li>
        <li>
          <strong>Deploying to Amazon S3:</strong>
          <p>
            Next, I deployed my resume website to Amazon S3. This crucial step enabled me to host a static website in the cloud and laid the groundwork for subsequent security and functionality enhancements.
          </p>
        </li>
        <li>
          <strong>Securing the Site with HTTPS, a Custom Domain, and Route 53:</strong>
          <p>
            To complete the security implementation, I purchased my domain name through Namecheap. To secure the site and also improve it's reliability, I set up a custom domain with a hosted zone in Route 53, and used AWS Certificate Manager (ACM) to provision the necessary SSL certificates for HTTPS.
          </p>
        </li>
        <li>
          <strong>Adding Dynamic Functionality with a JavaScript Visitor Counter:</strong>
          <p>
            To move beyond a static webpage, I incorporated a visitor counter using JavaScript, adding a dynamic element to the website. This involved implementing an API to handle communication with the database.
          </p>
        </li>
        <li>
          <strong>Leveraging DynamoDB for Data Storage:</strong>
          <p>
            For data storage, I utilized Amazon DynamoDB, which allowed me to create an API that interfaced with a Lambda function, written in Python, to update the visitor count seamlessly.
          </p>
        </li>
        <li>
          <strong>Redeploying with Terraform:</strong>
          <p>
            With the implementation done I used the terraform configurations I had created to deploy the backend to AWS, this also gave me a good oppurtunity to test the infrastructure as code as I had to create the services again.
          </p>
        </li>
        <li>
          <strong>Setting up a CI/CD Pipeline with GitHub Actions:</strong>
          <p>
            To fully automate the process, a CI/CD pipeline was set up using GitHub Actions, which streamlined testing and deployment of updates to my portfolio automatically. This streamlined development workflow makes updates to the application seamless. I used two workflow files, one for the back end and one for the front end, with instructions on where to deploy the changes.
          </p>
        </li>
      </ol>

      <h2 className="purple">Architecture Overview</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <img
          src={resumeImg}
          alt="AWS Amplify"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>

      <h2 className="purple">Final Thoughts</h2>
      <p>
        The Cloud Resume Challenge was a turning point in my cloud computing journey. It provided me with invaluable hands-on experience with various AWS services, a solid foundation in IaC, and a practical understanding of DevOps practices. I’m excited to use
        these newly gained skills and also apply them to my current Master’s program in CS with a concentration in enterprise and cloud computing.
      </p>

      <h2 className="purple">Find Me</h2>
      <ul>
        <li><a href="https://www.ron-tino.site/" target="_blank" rel="noopener noreferrer">Link to Cloud Portfolio</a></li>
        <li><a href="https://www.linkedin.com/in/ronald-tino-027a6122b" target="_blank" rel="noopener noreferrer">Find me on LinkedIn</a></li>
        <li><a href="https://github.com/Ronald-tino" target="_blank" rel="noopener noreferrer">GitHub Repository</a></li>
      </ul>
    </div>
  );

  return (
    <BlogPost
      title="Navigating the Cloud Resume Challenge: My Journey to a Cloud-Powered Portfolio"
      subtitle="My journey through the cloud resume challenge."
      author="Ron-tino"
      date="January 04, 2025"
      content={content}
    />
  );
}

export default CloudResumeChallenge;