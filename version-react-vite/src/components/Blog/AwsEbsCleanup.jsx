import React from "react";
import BlogPost from "./BlogPost.jsx";
import costSaveImg from "../../Assets/cost save1.png";
import costSaveImg2 from "../../Assets/cost save.png";
import createImg from "../../Assets/create.png";
import timeImg from "../../Assets/time.png";
import permissionImg from "../../Assets/PERMISSION.png";

function AwsEbsCleanup() {
  const content = (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <img 
          src={costSaveImg} 
          alt="AWS Lambda" 
          style={{ maxWidth: '750px', width: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>

      <h2 className="purple">💡 Introduction</h2>
      <p>
        Welcome to the world of DevOps! Cloud computing offers incredible flexibility and scalability, but it's easy to accumulate hidden costs if you're not careful. One common culprit? Unused EBS snapshots. These snapshots, created to back up your data, can quickly eat into your AWS budget if you forget to clean them up.
      </p>
      <p>
        In this post, I'll show you how to reclaim those lost dollars with a simple but effective solution: an automated, serverless function that hunts down and deletes orphaned EBS snapshots. We'll build a Python-based AWS Lambda function that automatically removes:
      </p>
      <ul>
        <li>Snapshots not associated with any EBS volume.</li>
        <li>Snapshots of volumes attached to stopped or terminated EC2 instances.</li>
      </ul>
      <p>
        This is a great way to reduce storage costs and maintain a cleaner AWS environment.
      </p>

      <h2 className="purple">💡 Why Serverless?</h2>
      <p>
        Before we dive into the code, let's talk about why we're using AWS Lambda, a serverless compute service:
      </p>
      <ul>
        <li><strong>Cost-Effective:</strong> You only pay for the compute time your function actually uses. For infrequent tasks like snapshot cleanup, this is much cheaper than running a dedicated server.</li>
        <li><strong>Scalable:</strong> Lambda automatically scales to handle the workload, so you don't have to worry about provisioning or managing servers.</li>
        <li><strong>Easy to Integrate:</strong> Lambda seamlessly integrates with other AWS services, such as CloudWatch Events for scheduled execution.</li>
      </ul>

      <h2 className="purple">💡 Prerequisites: What You'll Need</h2>
      <p>
        Before you get started, make sure you have the following:
      </p>
      <ol>
        <li><strong>AWS Account:</strong> Access to your AWS Management Console.</li>
        <li><strong>Basic Python Knowledge:</strong> A familiarity with Python syntax and concepts.</li>
        <li><strong>AWS CLI (Optional):</strong> The AWS Command Line Interface is useful for local testing, but not strictly required for this guide. You can install it via:</li>
      </ol>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <img 
          src={costSaveImg2} 
          alt="AWS Lambda" 
          style={{ maxWidth: '750px', width: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>

      <h2 className="purple">💡 Building the Lambda Function: Step-by-Step</h2>
      <p>
        Here's a breakdown of how to create and configure the Lambda function:
      </p>

      <ol>
        <li>
          <strong>Create a Lambda Function:</strong>
          <ul>
            <li>Go to the AWS Lambda console in the AWS Management Console.</li>
            <li>Click "Create function" and select "Author from scratch."</li>
            <li>Give your function a descriptive name (e.g., "ebs-snapshot-cleanup").</li>
            <li>Choose <code>Python 3.12</code> as the runtime.</li>
          </ul>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', marginTop: '15px' }}>
            <img 
              src={createImg} 
              alt="AWS Lambda" 
              style={{ maxWidth: '750px', width: '100%', height: 'auto', borderRadius: '10px' }}
            />
          </div>
        </li>

        <li>
          <strong>Write the Python Code:</strong>
          <ul>
            <li>Replace the default code in the Lambda function editor with the following Python script:</li>
          </ul>
          <pre style={{ 
            backgroundColor: '#f0f0f0', 
            padding: '15px', 
            borderRadius: '5px', 
            overflowX: 'auto',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            <code>{`import boto3

def lambda_handler(event, context):
    ec2 = boto3.client('ec2')

    # Get all EBS snapshots
    response = ec2.describe_snapshots(OwnerIds=['self'])

    # Get all active EC2 instance IDs
    instances_response = ec2.describe_instances(Filters=[{'Name': 'instance-state-name', 'Values': ['running']}])
    active_instance_ids = set()

    for reservation in instances_response['Reservations']:
        for instance in reservation['Instances']:
            active_instance_ids.add(instance['InstanceId'])

    # Iterate through each snapshot and delete if it's not attached to any volume or the volume is not attached to a running instance
    for snapshot in response['Snapshots']:
        snapshot_id = snapshot['SnapshotId']
        volume_id = snapshot.get('VolumeId')

        if not volume_id:
            # Delete the snapshot if it's not attached to any volume
            ec2.delete_snapshot(SnapshotId=snapshot_id)
            print(f"Deleted EBS snapshot {snapshot_id} as it was not attached to any volume.")
        else:
            # Check if the volume still exists
            try:
                volume_response = ec2.describe_volumes(VolumeIds=[volume_id])
                if not volume_response['Volumes'][0]['Attachments']:
                    ec2.delete_snapshot(SnapshotId=snapshot_id)
                    print(f"Deleted EBS snapshot {snapshot_id} as it was taken from a volume not attached to any running instance.")
            except ec2.exceptions.ClientError as e:
                if e.response['Error']['Code'] == 'InvalidVolume.NotFound':
                    # The volume associated with the snapshot is not found (it might have been deleted)
                    ec2.delete_snapshot(SnapshotId=snapshot_id)
                    print(f"Deleted EBS snapshot {snapshot_id} as its associated volume was not found.")`}</code>
          </pre>
        </li>

        <li>
          <strong>Increase the Timeout Value</strong><br />
          Lambda has a default Timeout that is not sufficient to use so we have to go to <em>Configuration</em> tab and increase the timeout to at least 10 seconds
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', marginTop: '15px' }}>
            <img 
              src={timeImg} 
              alt="Lambda Timeout" 
              style={{ maxWidth: '750px', width: '100%', height: 'auto', borderRadius: '10px' }}
            />
          </div>
        </li>

        <li>
          <strong>Add Permissions to Lambda</strong><br />
          We have to add additional permissions to the Lambda function so it can perform different operations. We'll follow the principle of least privilege by only adding required permissions
          <ul>
            <li>Go to the Configuration and select Permissions</li>
            <li>Click Add Permissions and create Inline Policy</li>
            <li>
              Configure the policy as follows:
              <ul>
                <li>Service: Select EC2.</li>
                <li>
                  Actions: Choose only the following permissions:
                  <ul>
                    <li>DescribeSnapshots</li>
                    <li>DescribeInstances</li>
                    <li>DescribeVolumes</li>
                    <li>DeleteSnapshots</li>
                  </ul>
                </li>
                <li>Resources: Set the permissions to apply to all resources for simplicity. If you need stricter control, specify the resource ARNs. Review and Assign the Policy:</li>
              </ul>
            </li>
          </ul>
          Click Next and review the policy details. Assign a name to the policy, e.g., ebs-permissions. Click Create Policy to apply it to the service role.
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', marginTop: '15px' }}>
            <img 
              src={permissionImg} 
              alt="Lambda Permissions" 
              style={{ maxWidth: '750px', width: '100%', height: 'auto', borderRadius: '10px' }}
            />
          </div>
        </li>

        <li>
          <strong>Configure Test event and use to test</strong><br />
          The lambda function test is successful if it runs and performs all operations
        </li>
      </ol>

      <h2 className="purple">💡 How the Code Works:</h2>
      <p>
        Let's break down the code snippet.
      </p>
      <ul>
        <li>The lambda_handler is the place we write the main script that we want to be executed when we envoke the function</li>
        <li><strong>Describing instances and volumes:</strong> The next operation is to collect volumes and instances <code>ec2 = boto3.client('ec2')</code> The code gets access to the EC2 <code>ec2.describe_volumes(VolumeIds=[volume_id])</code> Describes the associated volumes with specified volume ID.</li>
        <li><strong>Handling Errors</strong>: The last part of the code is a very important concept where we handle errors and the <code>try</code> and <code>except</code> parts of the code help us handle any issues with finding volumes. This is known as exception handling</li>
        <li><code>except ec2.exceptions.ClientError as e:</code> The is where exceptions are handled and the volumes that can not be found</li>
      </ul>

      <h2 className="purple">💡 Testing and Real-World Use Cases</h2>
      <p>
        Let's test the Lambda function and use real-world scenarios. Follow these steps to see how the function performs:
      </p>
      <p><strong>Here are 2 use case that can test Lambda</strong></p>
      <ul>
        <li>Snapshots that are not Attached to the Volume</li>
        <li>Snapshots of Deleted Instances</li>
      </ul>

      <h2 className="purple">💡 Conclusion: Save Money, Automate Your Cloud</h2>
      <p>
        Congratulations! You've built a serverless solution for automatically cleaning up orphaned EBS snapshots. This demonstrates the power of cloud services in resource management and offers hands-on experience in automating AWS tasks using Python.
      </p>
      <p>
        Feel free to customize this and create a CloudWatch rule to automatically run the Lambda function periodically. Thank you for following this post
      </p>
    </div>
  );

  return (
    <BlogPost
      title="Optimise AWS Costs: Automate Unused EBS Snapshot Cleanup with Lambda"
      subtitle="A Step-by-Step Guide to Building and Deploying a Cost-Saving Lambda Function for EBS Snapshot Management"
      author="Ron-tino"
      date="February 9, 2025"
      content={content}
    />
  );
}

export default AwsEbsCleanup;
