import React from "react";
import BlogPost from "./BlogPost.jsx";
import ansibleImg from "../../Assets/2nJIuDzpq5f3Zib7gCC5aoOc9g.avif";

function AnsibleEc2Automation() {
  const content = (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <img 
          src={ansibleImg} 
          alt="AWS Lambda" 
          style={{ maxWidth: '750px', width: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>

      <h2 className="purple">Challenge</h2>
      <p>The challenge is to automate the provisioning and management of EC2 instances on AWS using Ansible.</p>

      <h3 className="purple">Tasks</h3>
      <ul>
        <li>Create three(3) EC2 instances on AWS using Ansible loops.
          <ul>
            <li>2 Instances with Ubuntu Distribution</li>
            <li>1 Instance with Centos Distribution</li>
          </ul>
        </li>
        <li>Set up passwordless authentication between Ansible control node and newly created instances.</li>
        <li>Automate the shutdown of Ubuntu Instances only using Ansible Conditionals.</li>
      </ul>

      <h2 className="purple">Introduction</h2>
      <p>
        In this tutorial, we'll walk through how to use Ansible to automate the creation and management of EC2 instances on AWS. We'll cover creating instances with different Linux distributions, setting up passwordless SSH authentication,
        and automating the shutdown of specific instances based on their OS family. Additionally, we'll use Ansible Vault to securely manage our AWS credentials.
      </p>

      <h2 className="purple">Prerequisites</h2>
      <ul>
        <li>AWS Account</li>
        <li>Ansible installed on your control node</li>
        <li>Basic understanding of AWS and Ansible concepts</li>
        <li>Python and <code>pip</code> installed</li>
        <li>AWS CLI installed and configured (optional, for some verification steps)</li>
      </ul>

      <h2 className="purple">1. Setting Up Ansible and AWS Environment</h2>

      <h3 className="purple">1.1. Install <code>boto3</code> and AWS Collection</h3>
      <p><code>boto3</code> is the AWS SDK for Python, and the <code>amazon.aws</code> collection provides Ansible modules for interacting with AWS services.</p>

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
        <code>{`pip install boto3
ansible-galaxy collection install amazon.aws --force`}</code>
      </pre>
      <p>The <code>--force</code> flag is used to ensure the collection is reinstalled, resolving any potential version issues.</p>

      <h3 className="purple">1.2. Create an IAM User and Generate Access Keys</h3>
      <p>Follow these steps to create an IAM user with programmatic access and generate access keys:</p>
      <ol>
        <li>In the AWS Management Console, navigate to IAM (Identity and Access Management).</li>
        <li>Create a new IAM user with programmatic access.</li>
        <li>Attach the <code>AmazonEC2FullAccess</code> policy to the user (or a more restrictive policy tailored to your needs). <strong>Important:</strong> For security reasons, it is important to create restrictive policies instead of <code>AmazonEC2FullAccess</code> for this project.
        </li>
        <li>Generate the access key ID and secret access key for the user.</li>
      </ol>

      <h3 className="purple">1.3. Setting Up Ansible Vault</h3>
      <p>Ansible Vault is used to encrypt sensitive data, such as AWS credentials, within your Ansible playbooks.</p>

      <h4 className="purple">Create a Vault Password File:</h4>
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
        <code>{`openssl rand -base64 2048 > vault.pass
chmod 600 vault.pass`}</code>
      </pre>
      <p>This command generates a random password and stores it in a file with restricted permissions.</p>

      <h4 className="purple">Create the Vault Encrypted File:</h4>
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
        <code>{`ansible-vault create group_vars/all/pass.yml --vault-password-file vault.pass`}</code>
      </pre>
      <p>This command creates an encrypted YAML file where you'll store your AWS credentials.</p>

      <pre style={{ 
        backgroundColor: '#f0f0f0', 
        padding: '15px', 
        borderRadius: '5px', 
        overflowX: 'auto',
        fontSize: '14px',
        lineHeight: '1.5'
      }}>
        <code>{`# group_vars/all/pass.yml
ec2_access_key: YOUR_ACCESS_KEY
ec2_secret_key: YOUR_SECRET_KEY`}</code>
      </pre>

      <h2 className="purple">2. Creating EC2 Instances with Ansible</h2>

      <h3 className="purple">2.1. Create the <code>ec2_create.yaml</code> Playbook:</h3>

      <pre style={{ 
        backgroundColor: '#f0f0f0', 
        padding: '15px', 
        borderRadius: '5px', 
        overflowX: 'auto',
        fontSize: '14px',
        lineHeight: '1.5'
      }}>
        <code>{`---
- hosts: localhost
  connection: local
  tasks:
    - name: start an instance with a public IP address
      amazon.aws.ec2_instance:
        name: "{{ item.name }}"
        key_name: "rons-ec2-key"
        instance_type: t2.micro
        security_group: default
        region: us-east-1
        aws_access_key: "{{ lookup('ansible.builtin.file', 'vault.pass') }}"
        aws_secret_key: "{{ lookup('ansible.builtin.file', 'vault.pass') }}"
        network:
          assign_public_ip: true
        image_id: "{{ item.image }}"
        tags:
          environment: "{{ item.image }}"
      loop:
        - {image: "ami-084568db4383264d4", name: "managed-node-1"}
        - {image: "ami-00a929b66ed6e0de6", name: "managed-node-3"}
        - {image: "ami-084568db4383264d4", name: "managed-node-2"}`}</code>
      </pre>

      <h4 className="purple"><code>hosts: localhost</code> and <code>connection: local</code></h4>
      <p>This specifies that the playbook will run on the Ansible control node itself. This is required because you want to use the AWS API, not SSH, to create the instances.</p>

      <h4 className="purple"><code>tasks:</code></h4>
      <p>Define the actions to be performed.</p>

      <h4 className="purple"><code>amazon.aws.ec2_instance</code></h4>
      <p>This is the module from the amazon.aws collection that lets ansible communicate with AWS</p>

      <h4 className="purple"><code>loop:</code></h4>
      <p>This feature allows for many AMI to be created in the same code</p>

      <h3 className="purple">2.2. Execute the Playbook:</h3>
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
        <code>{`ansible-playbook ec2_create.yaml --vault-password-file vault.pass`}</code>
      </pre>

      <h3 className="purple">2.3. Verify the Instances:</h3>
      <p>In the AWS Console, confirm that the three EC2 instances have been created with the specified names and AMIs. You can also use the AWS CLI:</p>
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
        <code>{`aws ec2 describe-instances --region us-east-1`}</code>
      </pre>

      <h2 className="purple">3. Setting Up Passwordless SSH Authentication</h2>
      <p>To enable Ansible to manage the newly created EC2 instances, you need to set up passwordless SSH authentication between the Ansible control node and the instances.</p>

      <h3 className="purple">Update <code>inventory.ini</code>:</h3>
      <p>Add the host information for each instance to your inventory file. Replace the IP addresses with the actual public IP addresses of your EC2 instances:</p>

      <pre style={{ 
        backgroundColor: '#f0f0f0', 
        padding: '15px', 
        borderRadius: '5px', 
        overflowX: 'auto',
        fontSize: '14px',
        lineHeight: '1.5'
      }}>
        <code>{`[all]
3.83.102.198
54.84.220.118
18.208.169.135

[redhat]
3.83.102.198

[ubuntu]
54.84.220.118
18.208.169.135`}</code>
      </pre>

      <h3 className="purple">Copy SSH Key to Instances:</h3>
      <p>Use <code>ssh-copy-id</code> to copy your SSH public key to each instance. You will need the private key associated with the key name provided in your instances to the security to test the connection. Remember to replace the IP addresses,
        key file, and usernames with the correct values.
      </p>

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
        <code>{`ssh-copy-id -i ~/.ssh/rons-ec2-key ubuntu@54.84.220.118`}</code>
      </pre>
      <p>Repeat this for all instances, adjusting the username for CentOS (usually <code>ec2-user</code>).</p>
      <p><em>This may work. Add new steps to create ssh keys from local machine and upload them to Ansible
              server so it can deploy to the created instances.</em></p>

      <h2 className="purple">4. Automating the Shutdown of Ubuntu Instances</h2>
      <p>Create a playbook to shut down the Ubuntu instances based on the OS family.</p>
      <h3 className="purple">4.1. Create <code>shutdown_ubuntu.yaml</code>:</h3>
      <pre style={{ 
        backgroundColor: '#f0f0f0', 
        padding: '15px', 
        borderRadius: '5px', 
        overflowX: 'auto',
        fontSize: '14px',
        lineHeight: '1.5'
      }}>
        <code>{`---
- name: Shutdown ubuntu instances only
  hosts: all
  become: true

  tasks:
    - name: Shutdown ubuntu instances only
      ansible.builtin.command: /sbin/shutdown -h now
      when: ansible_facts['os_family'] == "Debian"`}</code>
      </pre>
      <h3 className="purple">4.2. Run the Playbook:</h3>
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
        <code>{`ansible-playbook shutdown_ubuntu.yaml -k`}</code>
      </pre>
      <p>The <code>-k</code> part may be required if you cannot use the ansible vault. It depends. You should specify the location of the keys with <code>-extra var 'key_path=../../keys/aws_key.pem'</code> to have this work</p>

      <h2 className="purple">Congratulations!</h2>
      <p>You have successfully automated the creation and management of EC2 instances on AWS using Ansible! This detailed guide provides a solid foundation for automating your AWS infrastructure. Experiment with different AMIs, instance types,
        security groups, and tags to customize your setup. Also, be sure to refine your security practices to ensure your AWS environment is secure.
      </p>
    </div>
  );

  return (
    <BlogPost
      title="Automating AWS EC2 Instance Management with Ansible"
      subtitle="Create, Configure, and Manage EC2 Instances with Ansible"
      author="Ron-Tino"
      date="April 10, 2025"
      content={content}
    />
  );
}

export default AnsibleEc2Automation;
