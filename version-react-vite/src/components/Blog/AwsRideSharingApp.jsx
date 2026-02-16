import React from "react";
import BlogPost from "./BlogPost.jsx";
import projectGoalImg from "../../Assets/project_goal.png";
import githubImg from "../../Assets/github.png";
import amplifyImg from "../../Assets/amplify.png";
import cognitoImg from "../../Assets/cognito.png";
import lambdaDbImg from "../../Assets/lambda_dynamodb.png";
import apiGatewayImg from "../../Assets/apigateway.png";
import cleanupImg from "../../Assets/cleanup.png";

function AwsRideSharingApp() {
  const content = (
    <div>
      <p>
        Hello everyone! In this blog post, I'm going to walk you through building a complete web application from scratch using various AWS services. We'll be creating a ride-sharing app – a bit like Uber or Lyft, This is a fantastic project
        to gain experience with cloud technologies and understand how different services work together.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <a href="https://www.youtube.com/watch?v=qZmpNvGyPDo&t=34s" target="_blank" rel="noopener noreferrer">
          <img 
            src="https://img.youtube.com/vi/qZmpNvGyPDo/maxresdefault.jpg" 
            alt="YouTube Video Thumbnail" 
            style={{ width: '100%', maxWidth: '800px', borderRadius: '10px' }}
          />
        </a>
      </div>
      <p>CLICK the image above for a walk through as i show how you can easily set this up for yourself but i would encourage you to read and try it first before seeing the solution so that you can practice your Troubleshooting skills.</p>

      <h2 className="purple">Project Goal:</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px 0' }}>
        <img 
          src={projectGoalImg} 
          alt="Description" 
          style={{ maxWidth: '750px', width: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>

      <p> We'll build an app called "Wild Rides," where users can register, log in, and request a ride by clicking on a map. The application will then dispatch a ride (from a predefined fleet) and record the request.</p>

      <h2 className="purple">AWS Services We'll Be Using:</h2>
      <ul>
        <li> <b>GitHub:</b> For source code version control and storage.</li>
        <li> <b>AWS Amplify:</b> To host our web application and implement CI/CD.</li>
        <li> <b>Amazon Cognito:</b> For secure user authentication and management.</li>
        <li> <b>AWS Lambda:</b> To create a serverless function that handles ride requests.</li>
        <li><b>Amazon DynamoDB:</b> To store ride request and driver assignment data.</li>
        <li><b>AWS IAM:</b> To manage access permissions for our services.</li>
        <li><b>AWS API Gateway:</b> To create an API endpoint that invokes our Lambda function.</li>
        <li><b>AWS CloudWatch:</b> For function logging and monitoring.</li>
      </ul>
      <p>Let's get started!</p>

      <h2 className="purple">Step 1: Setting Up Your Code Repository (GitHub)</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', margin: '20px 0' }}>
        <img 
          src={githubImg} 
          alt="Description" 
          style={{ maxWidth: '750px', width: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>
      <ol>
        <li> <b>Grab the Code:</b> I've made the initial application code available in a public GitHub repository as a templat:https://github.com/Ronald-tino</li>
        <li><b>Create Your Repository:</b> Log into your GitHub account, and use the provided repository as a template to create your own repo. This gives you your personal space to modify and version your code.</li>
      </ol>
      <p><b>Why this is important:</b> Having a repository will ensure source control over our code, and provide a place to revert if we break something.</p>


      <h2 className="purple">Step 2: Hosting Your Website with AWS Amplify</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', margin: '20px 0' }}>
        <img 
          src={amplifyImg} 
          alt="Description" 
          style={{ maxWidth: '750px', width: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>
      <ol>
        <li><b>Connect GitHub to Amplify:</b> In the AWS Console, navigate to Amplify and choose to create a new app based on Git provider. You will log in with your GitHub account to grant Amplify access to your repository.</li>
        <li><b>Select Your Repository:</b> Choose the "Wild Rides" repository that you just created as your source code.</li>
        <li><b>Deploy:</b> Amplify will automatically start to build and deploy your application based on the configuration it detects in your repository.</li>
        <li><b>Test Your Deployment:</b> Once deployment is complete, visit the website's URL provided in Amplify to confirm that you have a working web site.</li>
        <li><b>Test Your CI/CD:</b> Make a small text change to a file, and commit it to your github repository. You will see that Amplify automatically starts to redeploy your updated application.</li>
      </ol>
      <p><b>Why this is important:</b> AWS Amplify makes it very easy to host your site and automatically deploy updates, so that we don't need to manually upload files or have to manage servers.</p>

      <h2 className="purple">Step 3: Setting Up User Authentication (Amazon Cognito)</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', margin: '20px 0' }}>
        <img 
          src={cognitoImg} 
          alt="Description" 
          style={{ maxWidth: '750px', width: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>
      <ol>
        <li><b>Create a User Pool:</b> In the AWS console, navigate to Cognito and create a user pool.</li>
        <li><b>Configure your User Pool:</b> Choose Username as the sign-in option, set password policies, disable MFA, enable email verification with Cognito (not SES).</li>
        <li><b>Note User Pool IDs:</b> After creating your pool, take note of the User Pool ID and the App Client ID. You'll need these values in the next step. Save them somewhere (notepad or a text file).</li>
        <li><b>Update Application Configuration:</b> Open up the `config.js` file from the github repository and paste in your User Pool ID and Client ID that you noted. Update the region in the `config.js` file as well. Commit your changes.</li>
        <li><b>Test Registration and Login:</b> Navigate to the site, where you can click on "Giddy Up" to register for a new account, or sign in to an existing one. Register using a valid email and a password. Check your email for the confirmation
            code and paste that into the form to confirm your registration. After successfully logging in, you should see an access token, which you should copy for later.</li>
      </ol>
      <p><b>Why this is important:</b> Cognito handles all the registration and login features, keeping our application secure.</p>

      <h2 className="purple">Step 4: Creating the Ride-Sharing Functionality (Lambda and DynamoDB)</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', margin: '20px 0' }}>
        <img 
          src={lambdaDbImg} 
          alt="Description" 
          style={{ maxWidth: '750px', width: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>
      <ol>
        <li> <b>Create the DynamoDB Table:</b> In the AWS console, navigate to DynamoDB and create a table called "rides" (or "rides2024") with a primary key called `rideID` of type string. Copy the ARN of the table, and save for later.</li>
        <li><b>Create the IAM Role:</b> Create an IAM role for Lambda, using AWS Lambda as the trusted entity. Include the `AWSLambdaBasicExecutionRole` policy. Then add an inline policy that gives permission to write an item to the DynamoDB
            table. Use the ARN you copied earlier, to specify a specific table.</li>
        <li><b>Create the Lambda Function:</b> Create a new Lambda function called "request ride" with a Node.js runtime. Make sure you configure the function to use the IAM role you created.</li>
        <li><b>Paste Lambda Code:</b> Copy the Lambda function code from the provided file in the GitHub repository and replace the sample code in the Lambda function with it. Make sure you update the code with the correct DynamoDB table name
            if you changed the default from "rides" to something else (like "rides2024"). Also make sure the runtime is nodejs20.x or newer.</li>
        <li><b>Test the Lambda Function:</b> In the Lambda console, create a new test event with the provided test JSON. Make sure that the Lambda test execution returns a status code of 201. You can also confirm that an entry was written
            to the DynamoDB table.</li>
      </ol>
      <p><b>Why this is important:</b> Lambda and DynamoDB work together to handle the backend logic and data storage, and ensures that we can run code without having to manage any servers.</p>

      <h2 className="purple">Step 5: Connecting Everything with API Gateway</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', margin: '20px 0' }}>
        <img 
          src={apiGatewayImg} 
          alt="AWS API Gateway" 
          style={{ maxWidth: '750px', width: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>
      <ol>
        <li><b>Create the API Gateway:</b> In the AWS Console, navigate to API Gateway and create a new REST API called "wild rides" or similar.</li>
        <li><b>Create a Cognito Authorizer:</b> In API Gateway, create a Cognito authorizer, and point it to the Cognito user pool you configured earlier. The token source should be "Authorization". Test the authorizer using the token from
            the previous step.</li>
        <li><b>Create a resource:</b> Create a resource called `/ride`.</li>
        <li><b>Configure the POST method:</b> Configure the `/ride` resource with a POST method to use the Lambda proxy integration type to connect with the "request ride" Lambda function that you created in the previous step.</li>
        <li><b>Set the Authorizer:</b> In the method request, you should set the authorizer to be the Cognito Authorizer you just set up.</li>
        <li><b>Deploy the API:</b> Deploy the API to the "Dev" stage and copy the invoke URL that is shown in the API console.</li>
        <li><b>Update Application Configuration:</b> Go back to the `config.js` file from the github repo and replace the placeholder invoke URL with the one from API Gateway. Commit your changes.</li>
        <li><b>Test End-to-End:</b> Load `slide.html` in the browser, and click on the map. You should receive the driver information in the browser. You can also confirm that a record was written to the DynamoDB table.</li>
      </ol>
      <p><b>Why this is important:</b> API Gateway exposes the Lambda function as a secure HTTP endpoint, making it accessible to our frontend application.</p>

      <h2 className="purple">Step 6: Cleaning Up</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', margin: '20px 0' }}>
        <img 
          src={cleanupImg} 
          alt="Cleaning Up AWS" 
          style={{ maxWidth: '750px', width: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>
      <ol>
        <li><b>Delete all the resources you created:</b> Follow the steps described in the video to delete all the resources that you created during this tutorial: Amplify app, Cognito user pool, Lambda function, IAM role, DynamoDB table,
            API Gateway API, GitHub repo, and Cloudwatch logs.</li>
        <li><b>Double check:</b> Revisit the services that you've touched to make sure you have deleted all the resources.</li>
      </ol>
      <p><b>Why this is important:</b> This step helps avoid any unnecessary charges from AWS after finishing the tutorial.</p>

      <h2 className="purple">Key Takeaways:</h2>
      <ul>
        <li>We've seen a full, real-world example of how different AWS services can work together.</li>
        <li>We've built a scalable, serverless web application.</li>
        <li>You have hands-on experience with many core AWS services.</li>
      </ul>

      <p>I hope this tutorial has been helpful! If you have any questions or feedback, don't hesitate to ask. Happy coding!</p>
    </div>
  );

  return (
    <BlogPost
      title="Building a Full-Stack Ride-Sharing App on AWS: A Step-by-Step Tutorial"
      subtitle="A comprehensive guide to building a ride-hailing application using various AWS services."
      author="Ron-tino"
      date="January 04, 2025"
      content={content}
    />
  );
}

export default AwsRideSharingApp;
