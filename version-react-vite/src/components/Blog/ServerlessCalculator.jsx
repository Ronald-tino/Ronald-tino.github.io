import React from "react";
import BlogPost from "./BlogPost.jsx";
import projectGoalImg from "../../Assets/project_goal1.jpg";
import amplifyImg from "../../Assets/amplify.png";
import lambdaDbImg from "../../Assets/lambda_dynamodb.png";
import apiGatewayImg from "../../Assets/apigateway.png";
import dbImg from "../../Assets/db.png";
import iamRoleImg from "../../Assets/iamrole.png";
import apiLambdaImg from "../../Assets/api-lambda.png";
import cleanupImg from "../../Assets/cleanup.png";

function ServerlessCalculator() {
  const content = (
    <div>
      <p>
        In this post, I’ll walk you through how to build a simple yet functional web application using five key AWS services: AWS Amplify, AWS Lambda, API Gateway, DynamoDB, and IAM (for permissions). This app takes two numbers, calculates the base to the power
        of the exponent, displays the result to the user, and stores the calculation in a DynamoDB table.
      </p>

      <h2 className="purple">Project Overview</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <img 
          src={projectGoalImg} 
          alt="Project Overview" 
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>
      
      <p>The application consists of the following components:</p>
      <ul>
        <li><strong>Web Page:</strong> A simple HTML page where users can enter two numbers and submit them for calculation.</li>
        <li><strong>Lambda Function:</strong> A Python function that performs the math calculation and interacts with the database.</li>
        <li><strong>API Gateway:</strong> An HTTP endpoint that triggers the Lambda function.</li>
        <li><strong>DynamoDB:</strong> A NoSQL database that stores calculation results.</li>
        <li><strong>IAM Roles:</strong> Permissions that allow Lambda to write to DynamoDB</li>
      </ul>

      <p>Let's dive into the step-by-step guide.</p>

      <h2 className="purple">Step-by-Step Guide</h2>

      <h2 className="purple">Step 1: Hosting the Web Page with AWS Amplify</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <img 
          src={amplifyImg} 
          alt="AWS Amplify" 
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>
      
      <ol>
        <li><strong>Create HTML File:</strong> Create a simple <code>index.html</code> file using a text editor (e.g., Notepad++, VS Code, etc.) This HTML file will have input fields for the base and exponent, along with a button to trigger the calculation. Use the provided <code>index-original.html</code> for a simple starting point.</li>
        <li><strong>Zip File:</strong> Zip the <code>index.html</code> file into a single zip file named <code>index.zip</code>.</li>
        <li><strong>Navigate to AWS Amplify:</strong> In the AWS console, go to Amplify.</li>
        <li><strong>Create a New App:</strong> Create a new application using the "Host web app" option without a Git provider.</li>
        <li><strong>Configure the App:</strong> Give the app a name (e.g., "Power of Math"). Use <code>dev</code> for the environment name and drag and drop the created <code>index.zip</code> file into the designated area, then save and deploy.</li>
        <li><strong>Access the Deployed Page:</strong> Once the deployment is complete, access the live URL provided by Amplify to view your hosted web page.</li>
      </ol>

      <h2 className="purple">Step 2: Creating the Lambda Function</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <img 
          src={lambdaDbImg} 
          alt="AWS Lambda and DynamoDB" 
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>
      
      <ol>
        <li><strong>Navigate to AWS Lambda:</strong> In the AWS console, go to Lambda.</li>
        <li><strong>Create New Function:</strong> Create a new Lambda function, choose "Author from scratch", give it a name (e.g., "powerOfMathFunction"), and select the desired runtime (e.g., Python 3.9).</li>
        <li><strong>Update Function Code:</strong> Replace the default Lambda code with the python code for <code>lambda-original</code>.</li>
        <li><strong>Save and Deploy:</strong> Save your code changes and click deploy.</li>
        <li><strong>Configure a Test Event:</strong> Click the dropdown next to the test button, and set up a new test event with the json file, you will provide base and exponent numbers to test your code.</li>
        <li><strong>Run the Test:</strong> Click "Test" to make sure the function performs calculations correctly.</li>
      </ol>

      <h2 className="purple">Step 3: Setting Up API Gateway</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <img 
          src={apiGatewayImg} 
          alt="AWS API Gateway" 
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>
      
      <ol>
        <li><strong>Navigate to API Gateway:</strong> In the AWS console, go to API Gateway.</li>
        <li><strong>Create New API:</strong> Create a new REST API. Give it a name, like "powerOfMathAPI".</li>
        <li><strong>Create a POST Method:</strong> Select your resource (i.e. the <code>/</code>), and on actions click to create a <code>POST</code> method.</li>
        <li><strong>Configure Lambda Integration:</strong> Configure the method integration type to be a Lambda function, choosing the function you created earlier (e.g., "powerOfMathFunction"). Save and give api gateway the appropriate access.</li>
        <li><strong>Enable CORS:</strong> From the action menu on your new <code>POST</code> method enable CORS.</li>
        <li><strong>Deploy API:</strong> From actions select "Deploy API" and create a new stage (e.g., <code>dev</code>). Note the provided "Invoke URL".</li>
        <li><strong>Test the API:</strong> From resources, choose your post method, and test your API using the test feature, and provide a json object containing base and exponent numbers.</li>
      </ol>

      <h2 className="purple">Step 4: Setting Up DynamoDB</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <img 
          src={dbImg} 
          alt="DynamoDB Setup" 
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>
      
      <ol>
        <li><strong>Navigate to DynamoDB:</strong> Go to DynamoDB in the AWS console.</li>
        <li><strong>Create Table:</strong> Create a new table, name it (e.g., <code>powerOfMathDatabase</code>), and define the partition key as <code>id</code>.</li>
        <li><strong>Copy the ARN:</strong> Get the table's Amazon Resource Name (ARN) from the "Additional info" section. Save this for later.</li>
      </ol>

      <h2 className="purple">Step 5: Configuring Lambda Permissions</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <img 
          src={iamRoleImg} 
          alt="IAM Configuration" 
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>
      
      <ol>
        <li><strong>Navigate to Lambda Function:</strong> Go to your Lambda function in the AWS Console and click on configuration and then permissions.</li>
        <li><strong>Open the IAM Role:</strong> Click on the role name.</li>
        <li><strong>Add Inline Policy:</strong> Add a new inline policy with the json code, make sure you update the policy with your dynamodb arn.</li>
        <li><strong>Name and Save the Policy:</strong> Give the policy a name and then create the policy.</li>
      </ol>

      <h2 className="purple">Step 6: Update the Lambda Function to Write to DynamoDB</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <img 
          src={lambdaDbImg} 
          alt="Lambda DynamoDB Integration" 
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>
      
      <ol>
        <li><strong>Update the Lambda Code:</strong> Paste the <code>lambda-final.py</code> code in your lambda code and update the table name.</li>
        <li><strong>Save and Deploy:</strong> Save changes and re-deploy your updated function.</li>
        <li><strong>Test the Lambda Function:</strong> Test the function again, and confirm that new results are being added to your dynamo db table.</li>
      </ol>

      <h2 className="purple">Step 7: Connect the Web Page to API Gateway</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <img 
          src={apiLambdaImg} 
          alt="API Integration" 
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>
      
      <ol>
        <li><strong>Update index.html File:</strong> Paste the code for the final <code>index.html</code> to your <code>index.html</code> file, this code will contain the form to get user input, and javascript code to connect the api gateway endpoint to your web application, you need to update the api gateway url within this code.</li>
        <li><strong>Create zip file:</strong> Create a zip file containing your new <code>index.html</code>.</li>
        <li><strong>Deploy to Amplify:</strong> redeploy your application using amplify, drag and drop the new zip file and amplify will redeploy.</li>
        <li><strong>Access the Web App:</strong> Access your application and enter a base and exponent, check that your result is being sent from Lambda and is being saved to your dynamodb table.</li>
      </ol>

      <h2 className="purple">Step 8: Clean Up Resources</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <img 
          src={cleanupImg} 
          alt="Cleanup Resources" 
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>
      
      <ol>
        <li><strong>Delete Amplify App:</strong> Delete your app in Amplify.</li>
        <li><strong>Delete DynamoDB Table:</strong> Delete your dynamodb table.</li>
        <li><strong>Delete Lambda Function:</strong> Delete your lambda function.</li>
        <li><strong>Delete API Gateway:</strong> Delete your api gateway api.</li>
      </ol>

      <h2 className="purple">Conclusion</h2>
      <p>
        Congratulations, you've built a complete serverless calculator application using a multitude of AWS services. This demonstration highlights how you can combine different components to build scalable applications on AWS.
      </p>
    </div>
  );

  return (
    <BlogPost
      title="Building a Serverless Calculator App on AWS: A Step-by-Step Guide"
      subtitle="A comprehensive guide to building a serverless calculator application using various AWS services."
      author="Ron-tino"
      date="January 04, 2025"
      content={content}
    />
  );
}

export default ServerlessCalculator;
