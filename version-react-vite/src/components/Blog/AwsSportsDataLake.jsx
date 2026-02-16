import React from "react";
import BlogPost from "./BlogPost.jsx";
import nbaAnalyticsImg from "../../Assets/nba-analytics.png";

// Provide harmless defaults so any accidental runtime references from embedded
// example code snippets do not throw ReferenceErrors in the browser.
const glue_database_name = "";
const nba_api_key = "";

function AwsSportsDataLake() {
  // #region agent log
  fetch(
    "http://127.0.0.1:7242/ingest/630c5e67-d737-4cc2-86ed-e688dbd200fd",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        runId: "post-fix",
        hypothesisId: "H1",
        location: "AwsSportsDataLake.jsx:5",
        message: "AwsSportsDataLake render start",
        data: {},
        timestamp: Date.now(),
      }),
    }
  ).catch(() => {});
  // #endregion

  React.useEffect(() => {
    // #region agent log
    fetch(
      "http://127.0.0.1:7242/ingest/630c5e67-d737-4cc2-86ed-e688dbd200fd",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          runId: "post-fix",
          hypothesisId: "H1",
          location: "AwsSportsDataLake.jsx:12",
          message: "AwsSportsDataLake mounted successfully",
          data: {},
          timestamp: Date.now(),
        }),
      }
    ).catch(() => {});
    // #endregion
  }, []);

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
          src={nbaAnalyticsImg}
          alt="AWS Amplify"
          style={{ maxWidth: "100%", height: "auto", borderRadius: "10px" }}
        />
      </div>

      <p>
        In this blog post, we'll walk through building a data lake on AWS to
        analyze NBA player data. We'll be using Amazon S3 for storage, AWS Glue
        for data cataloging, and AWS Athena for querying. The unique part?
        Instead of using the AWS CLI in Cloud Shell, we'll leverage VS Code’s
        AWS integration for a more streamlined development experience. This
        project is perfect for anyone looking to get hands-on with AWS data
        services, learn more about data lake architecture, and work directly
        with real data. Let's get started!
      </p>

      <h2 className="purple">Project Overview</h2>

      <p>Our data lake will follow this workflow:</p>
      <ul>
        <li>
          <strong>Data Storage (S3):</strong> Raw NBA player data in JSON format
          will be stored in an S3 bucket.
        </li>
        <li>
          <strong>Data Cataloging (Glue):</strong> AWS Glue will crawl the S3
          bucket to infer the schema and create a metadata catalog, making it
          queryable.
        </li>
        <li>
          <strong>Data Querying (Athena):</strong> AWS Athena will query the
          data in S3 using the metadata catalog defined by Glue, allowing us to
          explore the data with SQL.
        </li>
      </ul>

      <h2 className="purple">Detailed Step-by-Step Guide</h2>

      <h3 className="purple">
        Step 1: Setting Up Your Development Environment with VS Code and AWS
      </h3>

      <p>Before we dive in, make sure you have:</p>

      <ul>
        <li>
          <strong>VS Code:</strong> Download and install VS Code if you haven't
          already.
        </li>
        <li>
          <strong>AWS Toolkit for VS Code:</strong> Install the AWS Toolkit
          extension in VS Code.
        </li>
        <li>
          <strong>AWS Credentials:</strong> Configure your AWS credentials
          within the AWS Toolkit. This allows VS Code to interact with your AWS
          account securely.
        </li>
        <li>
          <strong>Python 3.x:</strong> Python 3.x installed in your development
          environment, and VS code set up to use the relevant python
          environment.
        </li>
        <li>
          <strong>AWS Account:</strong> An active AWS account.
        </li>
      </ul>

      <h3 className="purple">Step 2: Create Python Project Structure</h3>
      <ul>
        <li>
          Create a new directory for your project and name it something
          relevant, like <code>nba-data-lake</code>.
        </li>
        <li>
          Inside that directory, create a new directory named <code>src</code>.
          This is where you will store your python scripts.
        </li>
        <li>
          Create a new file called <code>setup_nba_datalake.py</code> inside the{" "}
          <code>src</code> folder. This will house the script to create our S3
          bucket, set up Glue, and configure Athena.
        </li>
      </ul>

      <h3 className="purple">
        Step 3: The Python Script (<code>setup_nba_datalake.py</code>)
      </h3>

      <p>
        Here’s the Python code. Copy this into your{" "}
        <code>setup_nba_datalake.py</code> file:
      </p>
      <pre className="highlight-code">
        <code>{`import os
import json
import boto3
import requests
import time
from dotenv import load_dotenv
load_dotenv()

# AWS Configurations (Environment variables)
region = os.getenv("AWS_REGION")
bucket_name = os.getenv("AWS_S3_BUCKET_NAME")
glue_database_name = os.getenv("AWS_GLUE_DATABASE_NAME")
athena_output_location = os.getenv("AWS_ATHENA_OUTPUT_LOCATION")
nba_api_key = os.getenv("NBA_API_KEY")


# Create AWS clients
s3_client = boto3.client('s3', region_name=region)
glue_client = boto3.client('glue', region_name=region)
athena_client = boto3.client('athena', region_name=region)


# Function to create S3 bucket
def create_s3_bucket():
    try:
        s3_client.head_bucket(Bucket=bucket_name)
        print(f"Bucket {bucket_name} exists.")
    except:
        print(f"Creating bucket {bucket_name}")
        try:
            if region == "us-east-1":
                s3_client.create_bucket(Bucket=bucket_name)
            else:
                s3_client.create_bucket(Bucket=bucket_name, CreateBucketConfiguration={'LocationConstraint': region})

            print(f"Successfully created bucket {bucket_name}")
        except Exception as e:
            print(f"Error creating bucket: {e}")

# Function to create Glue database
def create_glue_database():
    try:
        glue_client.get_database(Name=glue_database_name)
        print(f"Glue database {glue_database_name} exists.")
    except:
        print(f"Creating glue database {glue_database_name}.")
        try:
            glue_client.create_database(
                DatabaseInput={
                'Name': glue_database_name,
                'Description': 'Glue database for NBA data lake'
                }
            )
            print(f"Successfully created glue database {glue_database_name}")
        except Exception as e:
            print(f"Error creating glue database: {e}")


# Function to fetch data from the API
def fetch_nba_data():
    api_url = f"https://api.sportsdata.io/v3/nba/scores/json/Players?key={nba_api_key}"
    try:
      response = requests.get(api_url)
      response.raise_for_status()
      return response.json()
    except requests.exceptions.RequestException as e:
      print(f"Error fetching NBA data from API: {e}")
      return None


# Function to upload data to S3
def upload_data_to_s3(data):
    try:
        s3_client.put_object(
            Bucket=bucket_name,
            Key="raw-data/nba_players.json",
            Body=json.dumps(data),
            ContentType='application/json'
        )
        print("Successfully uploaded NBA player data to S3.")
    except Exception as e:
        print(f"Error uploading data to S3: {e}")

# Function to create glue table
def create_glue_table():
    try:
        glue_client.get_table(DatabaseName=glue_database_name, Name="nba_players")
        print("Glue table nba_players already exists")
    except:
            try:
                    glue_client.create_table(
                         DatabaseName=glue_database_name,
                           TableInput={
                             'Name': 'nba_players',
                             'Description': 'NBA player data table',
                             'StorageDescriptor': {
                               'Columns': [
                                 {'Name': 'PlayerID', 'Type': 'int'},
                                 {'Name': 'FirstName', 'Type': 'string'},
                                 {'Name': 'LastName', 'Type': 'string'},
                                 {'Name': 'Position', 'Type': 'string'},
                                 {'Name': 'Team', 'Type': 'string'},
                                 {'Name': 'BirthCity', 'Type': 'string'},
                                 {'Name': 'BirthState', 'Type': 'string'},
                                 {'Name': 'College', 'Type': 'string'},
                                 {'Name': 'Jersey', 'Type': 'string'}
                               ],
                               'Location': f's3://{bucket_name}/raw-data/',
                                'InputFormat': 'org.apache.hadoop.mapred.TextInputFormat',
                                'OutputFormat': 'org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat',
                                'SerdeInfo': {
                                 'Name': 'jsonSerDe',
                                 'SerializationLibrary': 'org.openx.data.jsonserde.JsonSerDe',
                                    'Parameters': {
                                        'paths': 'PlayerID,FirstName,LastName,Position,Team,BirthCity,BirthState,College,Jersey'
                                        }
                                 }
                             },
                             'TableType': 'EXTERNAL_TABLE'
                         }
                )
                    print("Successfully created glue table nba_players")
            except Exception as e:
                    print(f"Error creating glue table: {e}")
# Function to configure Athena
def configure_athena():
    try:
        athena_client.get_query_execution(QueryExecutionId='test-query-id')
    except:
        try:
            print("Setting up Athena output location if it does not exist")
            athena_client.create_named_query(
            Name='TestQuery',
            Database=glue_database_name,
            QueryString=f"SELECT * FROM nba_players limit 10;",
            Description='Test query for nba_players table',
            ResultConfiguration={'OutputLocation': athena_output_location}
            )
            print("Successfully configured athena")
        except Exception as e:
            print(f"Error creating Athena location: {e}")

def main():
    create_s3_bucket()
    time.sleep(5)
    nba_data = fetch_nba_data()
    if nba_data:
      upload_data_to_s3(nba_data)
      create_glue_database()
      create_glue_table()
      configure_athena()
    else:
      print("Failed to fetch NBA data")


if __name__ == "__main__":
    main()`}</code>
      </pre>

      <h3 className="purple">
        Step 4: Setting Up Environment Variables (<code>.env</code> file):
      </h3>

      <ul>
        <li>
          Create a file named <code>.env</code> in the root of your project{" "}
          (<code>nba-data-lake</code>).
        </li>
        <li>
          Add the following environment variables, replacing the placeholders
          with your actual values:
        </li>
      </ul>
      <pre className="terminal-like">
        <code>{`AWS_REGION=your-aws-region   # e.g., us-east-1
AWS_S3_BUCKET_NAME=your-unique-bucket-name  # Must be unique globally
AWS_GLUE_DATABASE_NAME=your-glue-database-name # A name for your glue database
AWS_ATHENA_OUTPUT_LOCATION=s3://your-unique-bucket-name/athena-output  # Output location for Athena query results, including athena-output folder
NBA_API_KEY=your-sportsdata-io-api-key`}</code>
      </pre>
      <ul>
        <li>
          Replace the placeholders with values unique to your environment,
          remember to create a unique bucket name for s3, and you must create a
          unique athena output folder. Also, obtain your API key from the
          sportsdata.io web page.
        </li>
      </ul>

      <h3 className="purple">Step 5: Running the Script:</h3>

      <ul>
        <li>
          Open the <code>setup_nba_datalake.py</code> file in VS Code.
        </li>
        <li>
          Ensure that the correct Python environment is selected within VS
          code, by selecting the python environment.
        </li>
        <li>
          Run the script from your terminal:{" "}
          <code>python src/setup_nba_datalake.py</code>.
        </li>
      </ul>

      <h3 className="purple">Step 6: Verify the Resources</h3>
      <ul>
        <li>
          <strong>S3:</strong> Go to the AWS console and navigate to the S3
          service, check to see if the bucket was created and if the json file
          is inside the raw data folder.
        </li>
        <li>
          <strong>Glue:</strong> Go to the AWS console and navigate to the Glue
          service, check to see if the database and the table was created.
        </li>
        <li>
          <strong>Athena:</strong> Go to the AWS console and navigate to the
          Athena service and run a <code>select * from table</code> query to see
          if all of the data is available for query.
        </li>
      </ul>

      <h3 className="purple">Step 7: Clean Up Resources</h3>
      <p>If you wish to delete the resources created use the following script:</p>

      <pre className="highlight-code">
        <code>{`import boto3
import os
import time
from dotenv import load_dotenv
load_dotenv()

# AWS Configurations
region = os.getenv("AWS_REGION")
bucket_name = os.getenv("AWS_S3_BUCKET_NAME")
glue_database_name = os.getenv("AWS_GLUE_DATABASE_NAME")

# Create AWS clients
s3_client = boto3.client('s3', region_name=region)
glue_client = boto3.client('glue', region_name=region)
athena_client = boto3.client('athena', region_name=region)


# Function to delete S3 bucket and its contents
def delete_s3_bucket():
    try:
        print(f"Deleting all objects in the bucket {bucket_name}")
        response = s3_client.list_objects_v2(Bucket=bucket_name)
        if 'Contents' in response:
            for obj in response['Contents']:
                s3_client.delete_object(Bucket=bucket_name, Key=obj['Key'])
                print(f"Deleted object {obj['Key']} in bucket {bucket_name}")
        print(f"Deleting the bucket {bucket_name}")
        s3_client.delete_bucket(Bucket=bucket_name)
        print(f"Successfully deleted bucket {bucket_name}")
    except Exception as e:
        print(f"Error deleting S3 bucket: {e}")
# Function to delete glue table
def delete_glue_table():
    try:
        print(f"Deleting the table nba_players in {glue_database_name}")
        glue_client.delete_table(DatabaseName=glue_database_name, Name='nba_players')
        print(f"Successfully deleted table nba_players in {glue_database_name}")
    except Exception as e:
        print(f"Error deleting glue table: {e}")
# Function to delete Glue database
def delete_glue_database():
    try:
         print(f"Deleting the database {glue_database_name}")
         glue_client.delete_database(Name=glue_database_name)
         print(f"Successfully deleted database {glue_database_name}")
    except Exception as e:
         print(f"Error deleting glue database {e}")
# Function to delete Athena output location
def delete_athena_output():
    try:
        print("Deleting Athena query results")
        response = s3_client.list_objects_v2(Bucket=bucket_name, Prefix="athena-output/")
        if 'Contents' in response:
            for obj in response['Contents']:
                s3_client.delete_object(Bucket=bucket_name, Key=obj['Key'])
                print(f"Deleted athena output object {obj['Key']} in bucket {bucket_name}")
            print("Succesfully deleted the athena output folder")
        else:
           print("No athena output folder found")
    except Exception as e:
          print(f"Error deleting athena output : {e}")
def main():
    delete_glue_table()
    time.sleep(5)
    delete_glue_database()
    delete_athena_output()
    time.sleep(5)
    delete_s3_bucket()

if __name__ == "__main__":
    main()`}</code>
      </pre>
      <ul>
        <li>
          Create a new file in the src folder and name it{" "}
          <code>delete_resources.py</code>.
        </li>
        <li>
          Copy the above python code into that file and run it.
        </li>
      </ul>

      <h3 className="purple">Differences from the Original Tutorial</h3>
      <ul>
        <li>
          <strong>VS Code instead of Cloud Shell:</strong> You ran the python
          script in VS Code rather than the AWS Cloud Shell. This provides a
          local development environment with all of your dependencies
          pre-installed. This is different from the cloud shell environment
          which does not retain its environment state from session to session.
        </li>
        <li>
          <strong>Environment Variables:</strong> Instead of hardcoding AWS
          configurations and API keys in the code, this uses environment
          variables. Environment variables increase the security of your
          programs, and keep your API keys secure and out of your publicly
          available code.
        </li>
        <li>
          <strong>Local Execution:</strong> The project code is run from your
          local machine instead of a cloud instance.
        </li>
        <li>
          <strong>Resource Deletion</strong>: You created a separate resource
          deletion script, rather than having a combined script.
        </li>
      </ul>

      <h2 className="purple">Python Code Explanation</h2>

      <p>
        Okay, let's break down this Python script line by line, explaining its
        purpose, the AWS services it uses, and the overall data flow.
      </p>

      <pre className="highlight-code">
        <code>{`import boto3
import json
import time
import requests
from dotenv import load_dotenv
import os`}</code>
      </pre>
      <ul>
        <li>
          <code>import boto3</code>: Imports the AWS SDK for Python, allowing
          interaction with AWS services.
        </li>
        <li>
          <code>import json</code>: Imports the json library for working with
          JSON data.
        </li>
        <li>
          <code>import time</code>: Imports the time library for adding pauses
          (like <code>time.sleep</code>).
        </li>
        <li>
          <code>import requests</code>: Imports the requests library for making
          HTTP calls to APIs.
        </li>
        <li>
          <code>from dotenv import load_dotenv</code>: Imports the{" "}
          <code>load_dotenv</code> function to load environment variables from a{" "}
          <code>.env</code> file.
        </li>
        <li>
          <code>import os</code>: Imports the <code>os</code> library for
          interacting with the operating system (including environment
          variables).
        </li>
      </ul>

      <pre className="highlight-code">
        <code>{`# Load environment variables from .env file
load_dotenv()`}</code>
      </pre>
      <ul>
        <li>
          <code>load_dotenv()</code>: Loads environment variables from a{" "}
          <code>.env</code> file into the script's environment. This is used to
          store sensitive information such as the API keys
        </li>
      </ul>

      <pre className="highlight-code">
        <code>{`# AWS configurations
region = os.getenv("AWS_REGION")
bucket_name = os.getenv("AWS_S3_BUCKET_NAME")
glue_database_name = os.getenv("AWS_GLUE_DATABASE_NAME")
athena_output_location = os.getenv("AWS_ATHENA_OUTPUT_LOCATION")
nba_api_key = os.getenv("NBA_API_KEY")`}</code>
      </pre>
      <ul>
        <li>
          <code>region = os.getenv("AWS_REGION")</code>: Sets the default AWS
          region from environment variables.
        </li>
        <li>
          <code>bucket_name = os.getenv("AWS_S3_BUCKET_NAME")</code>: Sets a
          unique S3 bucket name from environment variables.
        </li>
        <li>
          <code>glue_database_name = os.getenv("AWS_GLUE_DATABASE_NAME")</code>:
          Sets a default AWS Glue database name from environment variables.
        </li>
        <li>
          <code>
            athena_output_location = os.getenv("AWS_ATHENA_OUTPUT_LOCATION")
          </code>
          : Creates the S3 path for Athena query results from environment
          variables.
        </li>
        <li>
          <code>nba_api_key = os.getenv("NBA_API_KEY")</code>: Retrieves the{" "}
          <code>NBA_API_KEY</code> from environment variables.
        </li>
      </ul>

      <pre className="highlight-code">
        <code>{`# Create AWS clients
s3_client = boto3.client("s3", region_name=region)
glue_client = boto3.client("glue", region_name=region)
athena_client = boto3.client("athena", region_name=region)`}</code>
      </pre>
      <ul>
        <li>
          <code>s3_client = boto3.client("s3", region_name=region)</code>:
          Creates an S3 client object to interact with AWS S3.
        </li>
        <li>
          <code>glue_client = boto3.client("glue", region_name=region)</code>:
          Creates a Glue client object to interact with AWS Glue.
        </li>
        <li>
          <code>athena_client = boto3.client("athena", region_name=region)</code>
          : Creates an Athena client object to interact with AWS Athena.
        </li>
      </ul>

      <pre className="highlight-code">
        <code>{`def create_s3_bucket():
    """Create an S3 bucket for storing sports data."""
    try:
        if region == "us-east-1":
            s3_client.create_bucket(Bucket=bucket_name)
        else:
            s3_client.create_bucket(
                Bucket=bucket_name,
                CreateBucketConfiguration={"LocationConstraint": region},
            )
        print(f"S3 bucket '{bucket_name}' created successfully.")
    except Exception as e:
        print(f"Error creating S3 bucket: {e}")`}</code>
      </pre>
      <ul>
        <li>
          <code>def create_s3_bucket()</code>: Defines a function to create an
          S3 bucket.
        </li>
        <li>
          <code>try</code>: Starts a try block to handle any errors that occur
          during S3 bucket creation.
        </li>
        <li>
          <code>if region == "us-east-1"</code>: Checks if the region is{" "}
          <code>us-east-1</code> to avoid specifying the region during creation.
          <ul>
            <li>
              <code>s3_client.create_bucket(Bucket=bucket_name)</code>: Creates
              an S3 bucket in <code>us-east-1</code>.
            </li>
          </ul>
        </li>
        <li>
          <code>else</code>: if the region is not <code>us-east-1</code>,
          specify the location during creation.
          <ul>
            <li>
              <code>
                {
                  's3_client.create_bucket(Bucket=bucket_name, CreateBucketConfiguration={"LocationConstraint": region})'
                }
              </code>
              : Creates an S3 bucket with the specified location constraint (for
              other AWS regions).
            </li>
          </ul>
        </li>
        <li>
          <code>
            {"print(f\"S3 bucket '{bucket_name}' created successfully.\")"}
          </code>
          : Prints a success message if the bucket is created.
        </li>
        <li>
          <code>except Exception as e</code>: Catches any exceptions during
          bucket creation.
        </li>
        <li>
          <code>{'print(f"Error creating S3 bucket: {e}")'}</code>: Prints an
          error message if bucket creation fails.
        </li>
      </ul>

      <pre className="highlight-code">
        <code>{`def create_glue_database():
    """Create a Glue database for the data lake."""
    try:
        glue_client.create_database(
            DatabaseInput={
                "Name": glue_database_name,
                "Description": "Glue database for NBA data lake.",
            }
        )
        print(f"Glue database '{glue_database_name}' created successfully.")
    except Exception as e:
        print(f"Error creating Glue database: {e}")`}</code>
      </pre>
      <ul>
        <li>
          <code>def create_glue_database()</code>: Defines a function to create
          an AWS Glue database.
        </li>
        <li>
          <code>try</code>: Starts a try block to catch errors during database
          creation.
        </li>
        <li>
          <code>glue_client.create_database(...)</code>: Creates an AWS Glue
          database with the given configurations (name and description).
        </li>
        <li>
          <code>
            print(f"Glue database '{glue_database_name}' created
            successfully.")
          </code>
          : Prints a success message if the database is created.
        </li>
        <li>
          <code>except Exception as e</code>: Catches any exceptions that may
          occur.
        </li>
        <li>
          <code>{'print(f"Error creating Glue database: {e}")'}</code>: Prints
          an error message if the database creation fails.
        </li>
      </ul>

      <pre className="highlight-code">
        <code>{`def fetch_nba_data():
    """Fetch NBA player data from sportsdata.io."""
    try:
        headers = {"Ocp-Apim-Subscription-Key": nba_api_key}
        response = requests.get(f"https://api.sportsdata.io/v3/nba/scores/json/Players?key={nba_api_key}", headers=headers)
        response.raise_for_status()  # Raise an error for bad status codes
        print("Fetched NBA data successfully.")
        return response.json()  # Return JSON response
    except Exception as e:
        print(f"Error fetching NBA data: {e}")
        return []`}</code>
      </pre>
      <ul>
        <li>
          <code>def fetch_nba_data()</code>: Defines a function to fetch NBA
          player data.
        </li>
        <li>
          <code>try</code>: Starts a try block to handle API call errors.
        </li>
        <li>
          <code>headers = {"{"} "Ocp-Apim-Subscription-Key": nba_api_key {"}"}
          </code>
          : Sets the API key in the HTTP header.
        </li>
        <li>
          <code>
            response = requests.get(f"https://api.sportsdata.io/v3/nba/scores/json/Players?key={nba_api_key}",
            headers=headers)
          </code>
          : Makes an HTTP GET request to the Sportsdata.io API endpoint.
        </li>
        <li>
          <code>response.raise_for_status()</code>: Raises an HTTPError for bad
          responses (4xx or 5xx status codes).
        </li>
        <li>
          <code>print("Fetched NBA data successfully.")</code>: Prints a success
          message.
        </li>
        <li>
          <code>return response.json()</code>: Returns the JSON response.
        </li>
        <li>
          <code>except Exception as e</code>: Catches any exceptions during API
          call.
        </li>
        <li>
          <code>{'print(f"Error fetching NBA data: {e}")'}</code>: Prints an
          error if the API call fails.
        </li>
        <li>
          <code>return []</code>: returns an empty list if the API call fails.
        </li>
      </ul>

      <pre className="highlight-code">
        <code>{`def upload_data_to_s3(data):
    """Upload NBA data to the S3 bucket."""
    try:
        s3_client.put_object(
            Bucket=bucket_name,
            Key="raw-data/nba_players.json",
            Body=json.dumps(data),
            ContentType='application/json'
        )
        print("Successfully uploaded NBA player data to S3.")
    except Exception as e:
        print(f"Error uploading data to S3: {e}")`}</code>
      </pre>
      <ul>
        <li>
          <code>def upload_data_to_s3(data)</code>: Defines a function to upload
          data to S3.
        </li>
        <li>
          <code>try</code>: Starts a try block for error handling.
        </li>
        <li>
          <code>s3_client.put_object(...)</code>: Uploads the JSON data to the
          S3 bucket.
        </li>
        <li>
          <code>print("Successfully uploaded NBA player data to S3.")</code>:
          Prints a success message indicating the file location.
        </li>
        <li>
          <code>except Exception as e</code>: Catches exceptions during S3
          upload.
        </li>
        <li>
          <code>{'print(f"Error uploading data to S3: {e}")'}</code>: Prints an
          error message if upload fails.
        </li>
      </ul>

      <pre className="highlight-code">
        <code>{`def configure_athena():
    """Set up Athena output location."""
    try:
        athena_client.start_query_execution(
            QueryString="CREATE DATABASE IF NOT EXISTS nba_analytics",
            QueryExecutionContext={"Database": glue_database_name},
            ResultConfiguration={"OutputLocation": athena_output_location},
        )
        print("Athena output location configured successfully.")
    except Exception as e:
        print(f"Error configuring Athena: {e}")`}</code>
      </pre>
      <ul>
        <li>
          <code>def configure_athena()</code>: Defines a function to setup
          Athena configuration.
        </li>
        <li>
          <code>try</code>: Starts a try block for handling any exceptions.
        </li>
        <li>
          <code>athena_client.start_query_execution(...)</code>: Configures
          Athena by creating the specified database and output location.
        </li>
        <li>
          <code>print("Athena output location configured successfully.")</code>:
          Prints a success message.
        </li>
        <li>
          <code>except Exception as e</code>: Catches exceptions during Athena
          configuration.
        </li>
        <li>
          <code>{'print(f"Error configuring Athena: {e}")'}</code>: Prints an
          error message.
        </li>
      </ul>

      <pre className="highlight-code">
        <code>{`# Main workflow
def main():
    print("Setting up data lake for NBA sports analytics...")
    create_s3_bucket()
    time.sleep(5)  # Ensure bucket creation propagates
    create_glue_database()
    nba_data = fetch_nba_data()
    if nba_data:  # Only proceed if data was fetched successfully
        upload_data_to_s3(nba_data)
    create_glue_table()
    configure_athena()
    print("Data lake setup complete.")`}</code>
      </pre>
      <ul>
        <li>
          <code>def main()</code>: Defines the main function of the program to
          manage the workflow.
        </li>
        <li>
          <code>
            print("Setting up data lake for NBA sports analytics...")
          </code>
          : Prints the start message.
        </li>
        <li>
          <code>create_s3_bucket()</code>: Calls the function to create the S3
          bucket.
        </li>
        <li>
          <code>time.sleep(5)</code>: Adds a 5 second delay to allow the S3
          bucket creation to take effect.
        </li>
        <li>
          <code>create_glue_database()</code>: Calls the function to create a
          Glue database.
        </li>
        <li>
          <code>nba_data = fetch_nba_data()</code>: Calls the function to fetch
          NBA data.
        </li>
        <li>
          <code>if nba_data</code>: Checks if data is present before proceeding.
          <ul>
            <li>
              <code>upload_data_to_s3(nba_data)</code>: Calls the function to
              upload the NBA data to the S3 bucket, if the data was successfully
              fetched.
            </li>
          </ul>
        </li>
        <li>
          <code>create_glue_table()</code>: Calls the function to create a Glue
          table.
        </li>
        <li>
          <code>configure_athena()</code>: Calls the function to configure
          Athena.
        </li>
        <li>
          <code>print("Data lake setup complete.")</code>: Prints the completion
          message.
        </li>
      </ul>

      <pre className="highlight-code">
        <code>{`if __name__ == "__main__":
    main()`}</code>
      </pre>
      <ul>
        <li>
          <code>if __name__ == "__main__":</code>: Makes sure that the main
          function is only called when this script is executed directly.
        </li>
        <li>
          <code>main()</code>: Calls the main function to run the main workflow
          when this script is directly executed.
        </li>
      </ul>

      <h3 className="purple">Data Flow</h3>
      <ul>
        <li>
          <strong>Environment Setup:</strong> The script starts by loading
          environment variables.
        </li>
        <li>
          <strong>AWS Setup:</strong> It creates connections to AWS S3, AWS
          Glue, and AWS Athena services.
        </li>
        <li>
          <strong>S3 Bucket Creation:</strong> Creates an S3 bucket for data
          storage.
        </li>
        <li>
          <strong>Glue Database Creation:</strong> Creates a Glue database to
          organize data.
        </li>
        <li>
          <strong>Data Fetching:</strong> Retrieves NBA player data using the
          Sportsdata.io API, using an API key.
        </li>
        <li>
          <strong>Data Upload:</strong> Uploads the JSON data into the specified
          S3 bucket.
        </li>
        <li>
          <strong>Glue Table Creation:</strong> Creates a table in the AWS Glue
          database referencing the S3 data.
        </li>
        <li>
          <strong>Athena Setup:</strong> Configures Athena for querying data in
          S3.
        </li>
        <li>
          <strong>Completion:</strong> Prints a message to indicate that the
          data lake is set up successfully.
        </li>
      </ul>

      <h3 className="purple">Key AWS Services</h3>
      <ul>
        <li>
          <strong>Amazon S3 (Simple Storage Service):</strong> Used as the
          storage layer for raw NBA data and for Athena query results.
        </li>
        <li>
          <strong>AWS Glue:</strong> Used as the metadata layer to create
          databases and tables over the raw data in S3.
        </li>
        <li>
          <strong>Amazon Athena:</strong> Used to query the data stored in S3
          and described by Glue tables.
        </li>
      </ul>

      <h3 className="purple">Data Flow</h3>
      <ul>
        <li>Raw data is pulled from the Sportsdata.io API as JSON.</li>
        <li>The JSON data is saved to the specified S3 bucket.</li>
        <li>AWS Glue creates an external table definition using the raw S3 data.</li>
        <li>
          AWS Athena is then setup so that it can query and use the table that
          was created in Glue.
        </li>
      </ul>

      <p>
        This detailed explanation should provide a good understanding of the
        script, the AWS services it uses, and the flow of data throughout the
        application.
      </p>
    </div>
  );

  return (
    <BlogPost
      title="Building a Sports Data Lake on AWS with S3, Glue, and Athena (VS Code Edition)"
      subtitle="My journey in creating a data lake to analyze NBA player data, while utilizing VS Code's AWS integration"
      author="Ron-tino"
      date="January 04, 2025"
      content={content}
    />
  );
}

export default AwsSportsDataLake;
