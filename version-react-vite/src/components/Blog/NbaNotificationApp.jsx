import React from "react";
import BlogPost from "./BlogPost.jsx";
import nbaImg from "../../Assets/nba.jpg";
import gameDImg from "../../Assets/game-d.png";

function NbaNotificationApp() {
  const content = (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <img
          src={nbaImg}
          alt="NBA Game Notifications"
          style={{ maxWidth: "100%", height: "auto", borderRadius: "10px" }}
        />
      </div>

      <p>
        In this blog post, we'll walk you through creating a system that sends
        you game notifications directly to your email or phone. We'll be using
        an event-driven architecture on AWS, leveraging services like Lambda,
        SNS, and EventBridge. This project is perfect for those who want to
        learn how to use serverless technologies, interact with external APIs,
        and automate tasks in the cloud.
      </p>

      <h2 className="purple">Project Overview</h2>

      <p>Here's a breakdown of the system we’ll be building:</p>
      <ul>
        <li>
          Data Source: We'll be using a free API from Sportsdata.io to fetch NBA
          game data (scores, times, etc.).
        </li>
        <li>
          Code Execution: AWS Lambda will host the Python code that retrieves
          data from the API, processes it, and prepares it for notification.
        </li>
        <li>
          Notification System: We'll utilize AWS Simple Notification Service
          (SNS) to deliver messages to our chosen endpoints (email/SMS).
        </li>
        <li>
          Scheduling: AWS EventBridge will schedule the execution of our Lambda
          function at specified intervals.
        </li>
      </ul>
      <p>
        This project is event-driven, meaning that the schedule event will
        automatically trigger the workflow.
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
          src={gameDImg}
          alt="Event-Driven Architecture"
          style={{
            maxWidth: "750px",
            width: "100%",
            height: "auto",
            borderRadius: "10px",
          }}
        />
      </div>

      <h2 className="purple">Detailed Step-by-Step Guide</h2>

      <h3 className="purple">1. Setting up SNS Topic and Subscriptions:</h3>
      <ul>
        <li>
          <strong>Navigate to SNS:</strong> Go to the AWS Management Console and
          search for &quot;SNS.&quot; Select &quot;Simple Notification
          Service.&quot;
        </li>
        <li>
          <strong>Create a Topic:</strong> In the left-hand menu, go to
          &quot;Topics&quot; and click &quot;Create Topic.&quot;
          <ul>
            <li>Choose &quot;Standard&quot; type.</li>
            <li>Give your topic a name (e.g., &quot;GD-topic&quot; for Game Day).</li>
            <li>Leave the rest as default and click &quot;Create Topic.&quot;</li>
          </ul>
        </li>
        <li>
          <strong>Subscribe to the Topic:</strong>
          <ul>
            <li>Select the created topic.</li>
            <li>Click &quot;Create Subscription.&quot;</li>
            <li>Choose &quot;Email&quot; as the protocol and enter your email address.</li>
            <li>Click &quot;Create Subscription.&quot;</li>
            <li>
              Check your email inbox for a subscription confirmation email and
              confirm your subscription.
            </li>
            <li>
              Refresh the subscription page in the AWS Console to see the
              confirmation status.
            </li>
          </ul>
        </li>
      </ul>

      <h3 className="purple">2. Creating IAM Policies and Roles:</h3>
      <ul>
        <li>
          <strong>Navigate to IAM:</strong> Open a new tab and search for
          &quot;IAM&quot; (Identity and Access Management).
        </li>
        <li>
          <strong>Create a Policy for SNS Access:</strong>
          <ul>
            <li>
              Go to &quot;Policies&quot; on the left-hand menu and click
              &quot;Create Policy.&quot;
            </li>
            <li>Choose &quot;JSON&quot; tab.</li>
            <li>
              Copy the JSON policy from the provided Github repo{" "}
              <code>policies/GD-sns-policy.json</code> and paste it into the
              editor.
            </li>
            <li>
              Update the <code>Resource</code> value in the JSON policy with the
              ARN (Amazon Resource Name) of your SNS topic from Step 1 (make
              sure to put it in between the double quotes). This allows access
              to your specific topic.
            </li>
            <li>
              Click &quot;Next&quot;, give the policy a name (e.g.,
              &quot;GD-SNS-policy&quot;), and click &quot;Create Policy.&quot;
            </li>
          </ul>
        </li>
        <li>
          <strong>Create a Role for Lambda:</strong>
          <ul>
            <li>
              Go to &quot;Roles&quot; on the left-hand menu and click
              &quot;Create Role.&quot;
            </li>
            <li>
              Choose &quot;AWS Service&quot; and select &quot;Lambda&quot; as
              the service.
            </li>
            <li>Click &quot;Next.&quot;</li>
            <li>
              Attach two policies to this role. Search for and select the
              following:
              <ul>
                <li>The <code>GD-SNS-policy</code> you just created.</li>
                <li>
                  <code>AWSLambdaBasicExecutionRole</code> (this is an AWS
                  managed policy that allows Lambda to send logs to CloudWatch).
                </li>
              </ul>
            </li>
            <li>
              Click &quot;Next&quot;, give the role a name (e.g.,
              &quot;GD-Lambda-role&quot;), and click &quot;Create Role.&quot;
            </li>
          </ul>
        </li>
      </ul>

      <h3 className="purple">3. Creating the Lambda Function:</h3>
      <ul>
        <li>
          <strong>Navigate to Lambda:</strong> Go back to the AWS Management
          Console and search for &quot;Lambda.&quot; Select &quot;Lambda.&quot;
        </li>
        <li>
          <strong>Create a Function:</strong>
          <ul>
            <li>Click &quot;Create Function.&quot;</li>
            <li>Select &quot;Author from scratch.&quot;</li>
            <li>Give your function a name (e.g., &quot;GD-notifications&quot;).</li>
            <li>Choose &quot;Python 3.x&quot; as the runtime.</li>
            <li>
              Under &quot;Permissions,&quot; choose &quot;Use an existing
              role&quot; and select the &quot;GD-Lambda-role&quot; you just
              created.
            </li>
            <li>Click &quot;Create Function.&quot;</li>
          </ul>
        </li>
        <li>
          <strong>Paste the Python Code:</strong>
          <ul>
            <li>
              Copy the code from the provided Github repo{" "}
              <code>source/GD-notifications/lambda_function.py</code> and paste
              it into the code editor in the Lambda console.
            </li>
            <li>Click &quot;Deploy.&quot;</li>
          </ul>
        </li>
        <li>
          <strong>Set Environment Variables:</strong>
          <ul>
            <li>Go to &quot;Configuration&quot; tab and select &quot;Environment Variables.&quot;</li>
            <li>Click &quot;Edit.&quot;</li>
            <li>
              Add two environment variables:
              <ul>
                <li>
                  <strong>Key:</strong> <code>NBA_API_KEY</code>,{" "}
                  <strong>Value:</strong> Your API key from Sportsdata.io
                  (blurred out in the video).
                </li>
                <li>
                  <strong>Key:</strong> <code>SNS_TOPIC_ARN</code>,{" "}
                  <strong>Value:</strong> The ARN of your SNS topic from step 1.
                </li>
              </ul>
            </li>
            <li>Click &quot;Save.&quot;</li>
          </ul>
        </li>
      </ul>

      <h3 className="purple">4. Understanding the Python Code:</h3>
      <p>Here's a breakdown of what the Python code does:</p>
      <ul>
        <li>
          It starts with imports for various libraries like OS (for environment
          variables), JSON, urlib (for making HTTP requests), boto3 (for
          interacting with AWS services like SNS), and date.
        </li>
        <li>
          It gets environment variables for the API key and SNS topic ARN.
        </li>
        <li>It Initializes an SNS client using boto3.</li>
        <li>
          The code adjusts for central time by getting the current UTC time and
          converting it to central. This ensures that the game data is fetched
          for the current day in central time.
        </li>
        <li>
          Constructs API URL by adding in today's date and the API key from
          environment variables. This is how the script specifies which days
          games to fetch data for.
        </li>
        <li>It uses the URL lib library to make the request to the API.</li>
        <li>
          The JSON response is formatted and then a{" "}
          <code>format_game_data</code> function is called, which generates a
          readable message for each game.
        </li>
        <li>
          The <code>format_game_data</code> function that loops through the
          games to extract specific information like away team, home team,
          scores, and status. It then formats the data into a readable string
          for publishing to SNS, and includes quarter scores if they exist.
        </li>
        <li>
          Finally, the formatted message is published to the SNS topic along
          with the subject &quot;NBA game scores.&quot;
        </li>
      </ul>

      <h3 className="purple">5. Testing the Lambda Function:</h3>
      <ul>
        <li>
          In the Lambda console, select &quot;Test&quot; tab and create a new
          test event by clicking &quot;Create new event&quot;.
        </li>
        <li>Leave the default settings and save the test event.</li>
        <li>Click &quot;Test.&quot;</li>
        <li>Check your email to see if you received the game notifications.</li>
      </ul>

      <h3 className="purple">
        6. Scheduling the Lambda Function with EventBridge:
      </h3>
      <ul>
        <li>
          <strong>Navigate to EventBridge:</strong> Go back to the AWS
          Management Console and search for &quot;EventBridge&quot;. Select the
          service.
        </li>
        <li>
          <strong>Create a Rule:</strong>
          <ul>
            <li>Click &quot;Create Rule&quot;.</li>
            <li>Give the rule a name (e.g., &quot;GD-rule&quot;).</li>
            <li>Select &quot;Schedule&quot; as the rule type.</li>
            <li>Select &quot;Reoccurring Schedule&quot; under schedule type.</li>
            <li>Select &quot;Cron-based schedule.&quot;</li>
            <li>
              Copy the cron expression from the video or use the following:
              <pre className="terminal-like">
                <code>0 9-23/2,0-2/2 * * ? *</code>
              </pre>
              This will trigger the Lambda function to run every 2 hours from 9
              AM to 11PM and then from 12AM to 2AM.
            </li>
            <li>Click &quot;Next&quot;.</li>
            <li>Select &quot;AWS Lambda&quot; as the target type.</li>
            <li>Choose your Lambda function (&quot;GD-notifications&quot;).</li>
            <li>
              Click &quot;Next&quot; Leave the defaults and click next and
              &quot;Create Schedule&quot;.
            </li>
          </ul>
        </li>
      </ul>

      <h2 className="purple">Conclusion</h2>
      <p>
        Congratulations! You've built a fully automated NBA game notification
        system using AWS. You can now receive game updates on your email without
        lifting a finger. This project gives a great insight into event-driven
        architectures, working with external APIs, and using serverless
        services. Experiment with different cron schedules, explore other data
        points from the Sportsdata.io API, and extend this project to fit your
        specific interests!
      </p>

      <h2 className="purple">Python Code</h2>
      <pre className="highlight-code">
        <code>{`import os
import json
import urllib.request
import boto3
from datetime import datetime, timedelta, timezone

def format_game_data(game):
    status = game.get("Status", "Unknown")
    away_team = game.get("AwayTeam", "Unknown")
    home_team = game.get("HomeTeam", "Unknown")
    final_score = f"{game.get('AwayTeamScore', 'N/A')}-{game.get('HomeTeamScore', 'N/A')}"
    start_time = game.get("DateTime", "Unknown")
    channel = game.get("Channel", "Unknown")
    
    # Format quarters
    quarters = game.get("Quarters", [])
    quarter_scores = ', '.join([f"Q{q['Number']}: {q.get('AwayScore', 'N/A')}-{q.get('HomeScore', 'N/A')}" for q in quarters])
    
    if status == "Final":
        return (
            f"Game Status: {status}\n"
            f"{away_team} vs {home_team}\n"
            f"Final Score: {final_score}\n"
            f"Start Time: {start_time}\n"
            f"Channel: {channel}\n"
            f"Quarter Scores: {quarter_scores}\n"
        )
    elif status == "InProgress":
        last_play = game.get("LastPlay", "N/A")
        return (
            f"Game Status: {status}\n"
            f"{away_team} vs {home_team}\n"
            f"Current Score: {final_score}\n"
            f"Last Play: {last_play}\n"
            f"Channel: {channel}\n"
        )
    elif status == "Scheduled":
        return (
            f"Game Status: {status}\n"
            f"{away_team} vs {home_team}\n"
            f"Start Time: {start_time}\n"
            f"Channel: {channel}\n"
        )
    else:
        return (
            f"Game Status: {status}\n"
            f"{away_team} vs {home_team}\n"
            f"Details are unavailable at the moment.\n"
        )

def lambda_handler(event, context):
    # Get environment variables
    api_key = os.getenv("NBA_API_KEY")
    sns_topic_arn = os.getenv("SNS_TOPIC_ARN")
    sns_client = boto3.client("sns")
    
    # Adjust for Central Time (UTC-6)
    utc_now = datetime.now(timezone.utc)
    central_time = utc_now - timedelta(hours=6)  # Central Time is UTC-6
    today_date = central_time.strftime("%Y-%m-%d")
    
    print(f"Fetching games for date: {today_date}")
    
    # Fetch data from the API
    api_url = f"https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/{today_date}?key={api_key}"
    print(today_date)
     
    try:
        with urllib.request.urlopen(api_url) as response:
            data = json.loads(response.read().decode())
            print(json.dumps(data, indent=4))  # Debugging: log the raw data
    except Exception as e:
        print(f"Error fetching data from API: {e}")
        return {"statusCode": 500, "body": "Error fetching data"}
    
    # Include all games (final, in-progress, and scheduled)
    messages = [format_game_data(game) for game in data]
    final_message = "\n---\n".join(messages) if messages else "No games available for today."
    
    # Publish to SNS
    try:
        sns_client.publish(
            TopicArn=sns_topic_arn,
            Message=final_message,
            Subject="NBA Game Updates"
        )
        print("Message published to SNS successfully.")
    except Exception as e:
        print(f"Error publishing to SNS: {e}")
        return {"statusCode": 500, "body": "Error publishing to SNS"}
    
    return {"statusCode": 200, "body": "Data processed and sent to SNS"}`}</code>
      </pre>
    </div>
  );

  return (
    <BlogPost
      title="Building an NBA Game Notification App with AWS"
      subtitle="An event-driven notification system using Lambda, SNS, and EventBridge."
      author="Ron-tino"
      date="January 04, 2025"
      content={content}
    />
  );
}

export default NbaNotificationApp;
