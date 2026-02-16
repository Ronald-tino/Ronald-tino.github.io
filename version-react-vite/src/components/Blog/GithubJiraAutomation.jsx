import React from "react";
import BlogPost from "./BlogPost.jsx";
import archiDiagramImg from "../../Assets/cloud.drawio (1).png";

function GithubJiraAutomation() {
  const content = (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <img 
          src={archiDiagramImg} 
          alt="AWS Lambda" 
          style={{ maxWidth: '750px', width: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>

      <p>
        In the fast-paced world of software development, efficiency is key. DevOps practices emphasize automation to streamline workflows, reduce manual effort, and improve collaboration. This post walks through a practical example of DevOps automation: integrating GitHub issues with Jira using a custom-built Python API, Flask, and webhooks. We'll see how a little bit of code can bridge the gap between development and project management, making life easier for everyone.
      </p>

      <h2 className="purple">The Problem: Manual Handoffs are Slow</h2>

      <p>
        Imagine a scenario: Developers are working on a project hosted on GitHub. Testers (or other developers) find bugs and create issues on GitHub. A developer reviews the issue and decides it needs to be tracked in Jira (a popular project management tool). Manually creating a Jira ticket for every valid GitHub issue is tedious, error-prone, and time-consuming. This manual handoff creates a bottleneck.
      </p>

      <h2 className="purple">The Solution: Automation to the Rescue!</h2>

      <p>
        Our goal is to build a system where a simple comment on a GitHub issue ("<code>/jira</code>", in our example, but you can customize this) automatically creates a corresponding Jira ticket. This eliminates the manual copying and pasting, ensures consistency, and keeps everyone on the same page.
      </p>

      <h2 className="purple">The Tools of the Trade</h2>

      <p>
        We'll use a combination of tools to achieve this:
      </p>
      <ul>
        <li><strong>GitHub:</strong> The code repository and issue tracker.</li>
        <li><strong>Jira:</strong> The project management tool where we'll create tickets.</li>
        <li><strong>Python:</strong> Our programming language of choice.</li>
        <li><strong>Flask:</strong> A lightweight Python web framework for building our API. Think of Flask as a toolkit for making web applications.</li>
        <li><strong>AWS EC2:</strong> A virtual server (an instance) in the cloud where we'll deploy our Python application. You can use your local machine, but a cloud server like EC2 is good practice.</li>
        <li><strong>Webhooks:</strong> The magic that connects GitHub to our Python application. A webhook is like a notification system: when something happens on GitHub (a comment is made), GitHub sends a message to our application.</li>
      </ul>

      <h2 className="purple">Part 1: The Jira Connection (Review)</h2>
      <p>
        <em>In a previous post/video, we covered the basics of interacting with the Jira API using Python. This forms the foundation of our automation.</em> If you haven't already, I recommend checking out that material to get familiar with the fundamentals of using the Jira API.
      </p>

      <h2 className="purple">Part 2: Building the API with Flask</h2>

      <p>
        The heart of our solution is a Python API that acts as the intermediary between GitHub and Jira. We'll use Flask to build this API. Flask makes it surprisingly easy to create web APIs in Python. It handles the low-level details of receiving requests and sending responses, so we can focus on the core logic.
      </p>

      <h2 className="purple">Why an API?</h2>

      <p>
        GitHub can't directly execute a Python script on your computer or a server. An API provides a standardized way for different applications to communicate. Think of it like this:
      </p>
      <ul>
        <li><strong>Without an API:</strong> It's like trying to give someone instructions by shouting across a crowded room. They might not hear you, and even if they do, they might not understand.</li>
        <li><strong>With an API:</strong> It's like having a phone call. You have a clear, defined way to communicate, and you can be sure the other person receives your message.</li>
      </ul>

      <h2 className="purple">Our Starting Point (Initial Flask Code)</h2>

      <p>
        Let's begin with a basic Flask application structure. This code provides the foundation, but we'll need to make several crucial improvements to make it a functional and robust solution.
      </p>

      <pre style={{ 
        backgroundColor: '#f0f0f0', 
        padding: '15px', 
        borderRadius: '5px', 
        overflowX: 'auto',
        fontSize: '14px',
        lineHeight: '1.5'
      }}>
        <code>{`from flask import Flask
import requests
from requests.auth import HTTPBasicAuth
import json

# Create a Flask application instance
app = Flask(__name__)

@app.route("/createJIRA", methods=['POST'])  # Only accept POST requests to /createJIRA
def createJIRA():
    # This code sample uses the 'requests' library:
    # http://docs.python-requests.org

    # Corrected URL -  MAKE SURE TO UPDATE THIS WITH YOUR INSTANCE
    url = "https://your-instance.atlassian.net/rest/api/3/issue"
    API_TOKEN = "YOUR_API_TOKEN"  #  Replace with your ACTUAL API token

    auth = HTTPBasicAuth("your-email@example.com", API_TOKEN) # Replace with your email

    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    payload = json.dumps({  # The Jira issue data
        "fields": {
            "description": {
                "content": [
                    {
                        "content": [
                            {
                                "text": "This the first ticket from the API",
                                "type": "text"
                            }
                        ],
                        "type": "paragraph"
                    }
                ],
                "type": "doc",
                "version": 1
            },
            "issuetype": {
                "id": "10003"  #  Replace with your desired issue type ID
            },
            "project": {
                "key": "AUT"  # Replace with your Jira project key!
            },
            "summary": "This is from Api automation",
        },
        "update": {}
    })

    response = requests.request(
        "POST",
        url,
        data=payload,
        headers=headers,
        auth=auth
    )

    return json.dumps(json.loads(response.text), sort_keys=True, indent=4, separators=(",", ": "))

app.run('0.0.0.0', port=5000)  # Start the Flask development server`}</code>
      </pre>

      <h2 className="purple">Essential Improvements: Making it Robust and Dynamic</h2>

      <p>
        While the above code provides a basic framework, it's missing several critical pieces. Here's what we need to add and why:
      </p>

      <ol>
        <li><strong>Getting Data from GitHub (<code>request</code>):</strong> The original code doesn't actually receive any data from GitHub! We need to use the `request` object from Flask to access the JSON payload sent by the GitHub webhook. This payload contains all the information about the issue and the comment that triggered the webhook. We'll add `from flask import request, jsonify` to our imports.</li>
        <li><strong>Dynamic Data, Not Hardcoding:</strong> We need to extract the relevant information (like the comment text, the GitHub issue URL, and the username of the commenter) from the GitHub payload. Hardcoding the Jira issue details makes the API useless for real-world scenarios.</li>
        <li><strong>Trigger Condition (<code>/jira</code>):</strong> We need to add a check to ensure that the Jira ticket is only created when a specific comment is made (e.g., "`/jira`"). Otherwise, every comment on every issue would create a new ticket!</li>
        <li><strong>Error Handling:</strong> What happens if the Jira API call fails? What if the GitHub payload is missing some data? We need to handle these cases gracefully.</li>
        <li><strong>Security - Environment Variables:</strong> Hardcoding your API token and Jira URL directly in the code is a major security risk. We'll use environment variables to store this sensitive information.</li>
      </ol>

      <p>
        Here's the improved Flask code, incorporating these crucial changes:
      </p>

      <pre style={{ 
        backgroundColor: '#f0f0f0', 
        padding: '15px', 
        borderRadius: '5px', 
        overflowX: 'auto',
        fontSize: '14px',
        lineHeight: '1.5'
      }}>
        <code>{`from flask import Flask, request, jsonify  # Import request and jsonify
import requests
from requests.auth import HTTPBasicAuth
import json
import os  # Import os for environment variables

app = Flask(__name__)

# --- Use Environment Variables ---
JIRA_URL = os.environ.get("JIRA_URL", "https://your-instance.atlassian.net")  # Default, but use env var
API_TOKEN = os.environ.get("JIRA_API_TOKEN")
JIRA_EMAIL = os.environ.get("JIRA_EMAIL")

@app.route("/createJIRA", methods=['POST'])
def createJIRA():
    # --- Get data from the request (GitHub webhook) ---
    data = request.get_json()  # Get the JSON payload

    # --- Extract relevant information (EXAMPLE - adjust as needed) ---
    try:
        comment_body = data['comment']['body']  # Get comment from payload
        issue_url = data['issue']['html_url']  # Get issue URL
        user = data['comment']['user']['login']   # Get user
    except KeyError as e:
        return jsonify({"error": f"Missing key in payload: {e}"}), 400  # Handle missing data

    # --- Trigger Condition ---
    if comment_body.strip().lower() != "/jira":  # Check for trigger comment
        return jsonify({"message": "Not a Jira creation request."}), 200

    # --- Prepare Jira Issue Data (DYNAMIC, not hardcoded) ---
    payload = json.dumps({
        "fields": {
            "description": {
                "content": [
                    {
                        "content": [
                            {
                                "text": f"Issue created from GitHub: {issue_url}\\nComment: {comment_body}\\nBy user: {user}",
                                "type": "text"
                            }
                        ],
                        "type": "paragraph"
                    }
                ],
                "type": "doc",
                "version": 1
            },
            "issuetype": {
                "id": "10003"  # Still potentially hardcoded - consider making this configurable
            },
            "project": {
                "key": "AUT"  # Still hardcoded - consider making this configurable
            },
            "summary": f"GitHub Issue: {issue_url.split('/')[-1]}", # Dynamic summary
        },
        "update": {}
    })

    # --- Make the API Request ---
    auth = HTTPBasicAuth(JIRA_EMAIL, API_TOKEN)
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    response = requests.post(
        f"{JIRA_URL}/rest/api/3/issue",  # Use f-string for URL
        data=payload,
        headers=headers,
        auth=auth
    )

    # --- Handle the Response (with error checking) ---
    if response.status_code == 201:  # 201 Created
        return jsonify({"message": "Jira issue created!", "key": response.json()["key"]}), 201
    else:
        return jsonify({"error": "Failed to create Jira issue", "status_code": response.status_code, "response": response.text}), response.status_code

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)  # debug=True for development`}</code>
      </pre>

      <h2 className="purple">Code Breakdown (Improved Version):</h2>

      <ul>
        <li><strong><code>from flask import request, jsonify</code>:</strong> We import <code>request</code> to access incoming data and <code>jsonify</code> to create JSON responses, making our API more robust.</li>
        <li><strong>Environment Variables:</strong> We use <code>os.environ.get()</code> to load sensitive information (Jira URL, API token, email) from environment variables. This is a critical security best practice. Never hardcode credentials!</li>
        <li><strong><code>data = request.get_json()</code>:</strong> This line is the key to receiving data from GitHub. The webhook sends a JSON payload, and this line extracts it.</li>
        <li><strong>Data Extraction and <code>try...except</code>:</strong> We extract the comment body, issue URL, and user from the <code>data</code> dictionary. The <code>try...except KeyError</code> block is essential for handling cases where the GitHub payload might be different from what we expect. This prevents the application from crashing.</li>
        <li><strong>Trigger Condition:</strong> The <code>if comment_body.strip().lower() != "/jira":</code> line checks if the comment contains our trigger phrase ("/jira"). If it doesn't, we return a 200 OK response (so GitHub knows the webhook was received), but we don't create a Jira ticket.</li>
        <li><strong>Dynamic Payload:</strong> The <code>payload</code> sent to Jira is now dynamic. We use f-strings (e.g., <code>f"Issue created from GitHub: {issue_url}"</code>) to insert the relevant information from the GitHub issue into the Jira ticket description.</li>
        <li><strong>Robust Error Handling:</strong> We check the <code>response.status_code</code> from the Jira API. If it's not 201 (Created), we return an error message, including the status code and the response text from Jira. This helps with debugging.</li>
        <li><strong>`response.json()`:</strong> We use the more reliable `response.json()` method to parse the JSON response from Jira.</li>
      </ul>

      <p>
        <strong>Important:</strong> You'll need to adapt the data extraction part (<code>data['comment']['body']</code>, etc.) to match the actual structure of the GitHub webhook payload. Use <code>print(json.dumps(data, indent=4))</code> (as shown in the commented-out line in the code) to inspect the payload and see the exact keys you need to access.
      </p>

      <h2 className="purple">Part 3: Deploying to EC2 (or your local machine)</h2>

      <ol>
        <li><strong>Create an EC2 Instance (if needed):</strong>
          <ul>
            <li>Launch an EC2 instance (e.g., a t2.micro running Ubuntu).</li>
            <li>Make sure the security group allows inbound traffic on port 5000 (for our Flask app).</li>
            <li>Connect to the instance via SSH.</li>
          </ul>
        </li>
        <li><strong>Install Dependencies:</strong>
          <pre style={{ 
            backgroundColor: '#333', 
            color: '#fff',
            padding: '15px', 
            borderRadius: '5px', 
            overflowX: 'auto',
            fontSize: '14px',
            lineHeight: '1.5',
            fontFamily: 'monospace'
          }}>
            <code>{`sudo apt update
sudo apt install python3 python3-pip -y
pip3 install flask requests`}</code>
          </pre>
        </li>
        <li><strong>Transfer the Code:</strong> Copy your Python file (e.g., `github_jira_integration.py`) to the EC2 instance. You can use `scp`, `rsync`, or even copy and paste the code into a new file using a text editor like `nano` or `vim`.
          <pre style={{ 
            backgroundColor: '#333', 
            color: '#fff',
            padding: '15px', 
            borderRadius: '5px', 
            overflowX: 'auto',
            fontSize: '14px',
            lineHeight: '1.5',
            fontFamily: 'monospace'
          }}>
            <code>{`scp -i /path/to/your/key.pem github_jira_integration.py ubuntu@your_ec2_public_ip:/home/ubuntu/`}</code>
          </pre>
          <ul>
            <li>Replace <code>/path/to/your/key.pem</code> with the actual path to your private key.</li>
            <li>Replace <code>your_ec2_public_ip</code> with the public IP address of your EC2 instance.</li>
          </ul>
        </li>
        <li><strong>Set Environment Variables:</strong>
          <pre style={{ 
            backgroundColor: '#333', 
            color: '#fff',
            padding: '15px', 
            borderRadius: '5px', 
            overflowX: 'auto',
            fontSize: '14px',
            lineHeight: '1.5',
            fontFamily: 'monospace'
          }}>
            <code>{`export JIRA_URL="https://your-instance.atlassian.net"
export API_TOKEN="YOUR_API_TOKEN"
export JIRA_EMAIL="your-email@example.com"`}</code>
          </pre>
          <ul>
            <li><strong>Important:</strong> Replace these with your actual values. For a more permanent solution, add these export commands to your ~/.bashrc or ~/.bash_profile file.</li>
          </ul>
        </li>
        <li><strong>Run the Application:</strong>
          <pre style={{ 
            backgroundColor: '#333', 
            color: '#fff',
            padding: '15px', 
            borderRadius: '5px', 
            overflowX: 'auto',
            fontSize: '14px',
            lineHeight: '1.5',
            fontFamily: 'monospace'
          }}>
            <code>{`python3 github_jira_integration.py`}</code>
          </pre>
        </li>
      </ol>

      <p>
        Your Flask application is now running and accessible on the EC2 instance's public IP address and port 5000.
      </p>

      <h2 className="purple">Part 4: Setting Up the GitHub Webhook</h2>

      <ol>
        <li>Go to your GitHub repository settings.</li>
        <li>Click on "Webhooks" in the sidebar.</li>
        <li>Click "Add webhook."</li>
        <li><strong>Payload URL:</strong> Enter the URL of your Flask API endpoint. This will be something like: <code>http://your_ec2_public_ip:5000/createJIRA</code> (Replace <code>your_ec2_public_ip</code> with your EC2 instance's public IP address or DNS name).</li>
        <li><strong>Content type:</strong> Select <code>application/json</code>.</li>
        <li><strong>Secret:</strong> (Optional, but recommended for security) You can set a secret token here. Your Flask application would then need to verify this token to ensure the request is genuinely from GitHub.</li>
        <li><strong>Which events would you like to trigger this webhook?</strong>
          <ul>
            <li>Choose "Let me select individual events."</li>
            <li>Select "Issue comments." This is crucial.</li>
          </ul>
        </li>
        <li><strong>Active:</strong> Make sure the webhook is active.</li>
        <li>Click "Add webhook."</li>
      </ol>

      <h2 className="purple">Part 5: Testing and Troubleshooting</h2>

      <ol>
        <li>Go to a GitHub issue in your repository.</li>
        <li>Add a comment containing <code>/jira</code> (or whatever trigger phrase you chose).</li>
        <li>Check your Jira project. A new issue should be created.</li>
        <li>Check your Flask application logs (on the EC2 instance or your local machine) for any error messages.</li>
      </ol>

      <h2 className="purple">Important Considerations and Improvements</h2>

      <ul>
        <li><strong>Security:</strong>
          <ul>
            <li><strong>HTTPS:</strong> Use HTTPS for your API endpoint. This requires setting up an SSL certificate (e.g., using Let's Encrypt).</li>
            <li><strong>Webhook Secret:</strong> Use a webhook secret to verify that requests are coming from GitHub.</li>
            <li><strong>Input Validation:</strong> Validate the data received from GitHub to prevent malicious input.</li>
          </ul>
        </li>
        <li><strong>Production Deployment:</strong> The Flask development server (<code>app.run()</code>) is not suitable for production. For a production deployment, you should use a production-ready WSGI server like Gunicorn or uWSGI, along with a web server like Nginx or Apache.</li>
        <li><strong>Asynchronous Processing:</strong> For long-running tasks (like creating Jira issues), consider using a task queue like Celery to avoid blocking the main API thread.</li>
        <li><strong>Logging:</strong> Implement proper logging to help with debugging and monitoring.</li>
      </ul>

      <h2 className="purple">Conclusion</h2>

      <p>
        By combining the power of Python, Flask, GitHub webhooks, and a touch of DevOps thinking, we've created a valuable automation that streamlines the workflow between developers and project managers. This project demonstrates how a relatively small amount of code can have a big impact on efficiency and collaboration. Remember to adapt the code and configurations to your specific needs, and always prioritize security and robust error handling. Happy automating!
      </p>
    </div>
  );

  return (
    <BlogPost
      title="DevOps Automation: From GitHub Issue to Jira Ticket with Python and Flask"
      subtitle="Bridging the gap between development and project management with a simple, automated solution."
      author="Ron-Tino"
      date="March 18, 2025"
      content={content}
    />
  );
}

export default GithubJiraAutomation;
