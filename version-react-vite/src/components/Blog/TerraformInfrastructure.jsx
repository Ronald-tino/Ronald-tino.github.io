import React from "react";
import BlogPost from "./BlogPost.jsx";
import terraformHeaderImg from "../../Assets/terrra.jpg";
import terraformMainImg from "../../Assets/weka-terraform-aws_og@2x-scaled.jpg";
import awsDiagramImg from "../../Assets/aws-2025-03-01-104336.png";

function TerraformInfrastructure() {
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
          src={terraformHeaderImg}
          alt="Terraform, Ansible, and AWS cloud infrastructure"
          style={{ maxWidth: "750px", width: "100%", borderRadius: "10px" }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <img
          src={terraformMainImg}
          alt="Terraform and AWS"
          style={{ maxWidth: "750px", width: "100%", borderRadius: "10px" }}
        />
      </div>

      <p>
        Welcome! If you're new to cloud computing, infrastructure as code, or automation, you're in the right place. In this guide, we'll walk through building a simple, yet powerful, cloud infrastructure on Amazon Web Services (AWS) using Terraform, Ansible,
        and a little bit of Bash scripting. Don't worry if you're not familiar with all these terms yet. We'll explain everything step-by-step, focusing on <i>why</i> we're doing each thing, so you can build a solid
        foundation for your cloud journey.
      </p>

      <p>
        Think of this project as your "Hello, World!" for the cloud. We'll be setting up:
      </p>

      <ul>
        <li>
          <b>An S3 bucket:</b> Your own cloud storage space to keep track of your "infrastructure code."
        </li>
        <li>
          <b>Two virtual servers (EC2 instances):</b> Think of these as your own computers in the cloud where you'll run your websites.
        </li>
        <li>
          <b>Automatic website setup:</b> We'll use automation to install the software needed to run a simple game on those servers.
        </li>
      </ul>

      <h2 className="purple">The Players: A Quick Introduction</h2>
      <p>Before we dive in, let's meet the technologies we'll be using:</p>
      <ul>
        <li>
          <b>AWS (Amazon Web Services):</b> The massive cloud platform where we'll build our infrastructure. It provides all the services we need, from storage to servers.
        </li>
        <li>
          <b>Terraform:</b> An "infrastructure as code" (IaC) tool. Instead of clicking around in the AWS console, we'll write code that <i>describes</i> what we want, and Terraform will make it happen. This is like having a blueprint for
          your cloud!
        </li>
        <li>
          <b>Ansible:</b> An automation tool that will configure our servers <i>after</i> they've been created by Terraform. Think of it as the construction crew that sets up everything inside the house after it's built.
        </li>
        <li>
          <b>Bash:</b> A scripting language we'll use to tie everything together. It's like a project manager that tells Terraform and Ansible when to do what.
        </li>
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
          src={awsDiagramImg}
          alt="AWS architecture diagram for Terraform and Ansible project"
          style={{ maxWidth: "750px", width: "100%", borderRadius: "10px" }}
        />
      </div>

      <h2 className="purple">Section 1: Laying the Groundwork: Setting up the S3 Bucket</h2>

      <p>
        First, we need to set up a special place on AWS to store Terraform's "state file." This file is like a map that tells Terraform what infrastructure it has already created. Storing it remotely in an S3 bucket (AWS's cloud storage service)
        is best practice for a few reasons:
      </p>
      <ul>
        <li>
          <b>Collaboration:</b> It allows multiple people to work on the same infrastructure.
        </li>
        <li>
          <b>Version Control:</b> It enables you to track changes to your infrastructure over time.
        </li>
        <li>
          <b>Security:</b> It provides a secure place to store your state file.
        </li>
      </ul>

      <p>
        <b>Here's how to set up the S3 bucket:</b>
      </p>
      <ol>
        <li>
          <b>Open Your Text Editor:</b> Choose your favorite text editor (like VS Code, Sublime Text, Notepad++, etc.).
        </li>
        <li>
          <b>Create a Directory:</b> Create a new folder called <code>bucket</code> to store the files related to the S3 bucket.
        </li>
        <li>
          <b>Create <code>main.tf</code>:</b> Inside the <code>bucket</code> folder, create a file named <code>main.tf</code>. This is where we'll write the Terraform code to create the S3 bucket.
        </li>
        <li>
          <b>Paste This Code:</b> Copy and paste the following code into <code>main.tf</code>:
        </li>
      </ol>

      <pre className="highlight-code">
        <code>{`terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.01"
    }
  }
  required_version = ">= 1.4.6"
}

module "s3_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"
  version = "3.14.0"
  bucket = "YOUR-UNIQUE-BUCKET-NAME" # REPLACE ME!
  acl    = "private"
  force_destroy = true

  control_object_ownership = true
  object_ownership         = "ObjectWriter"

  versioning = {
    enabled = true
  }
}`}</code>
      </pre>

      <p>
        <b>Important!</b> Change <code>"YOUR-UNIQUE-BUCKET-NAME"</code> to something that <i>you</i> choose. This name needs to be unique across <i>all</i> of AWS, so using your name or organization name is a good start. Also, bucket names
        must be lowercase and cannot contain spaces.
      </p>

      <p>
        <b>Let's break down what this code does:</b>
      </p>
      <ul>
        <li>
          <code>terraform {"{ ... }"}</code>: This section tells Terraform which providers (like AWS) and versions we need. It's like declaring the ingredients for our cloud recipe.
        </li>
        <li>
          <code>module "s3_bucket" {"{ ... }"}</code>: This is where we use a pre-built "module" to create the S3 bucket. Modules are like reusable components that simplify complex tasks. In this case, we're using a module from the Terraform
          Registry (a public library of modules).
        </li>
        <li>
          <code>source = "terraform-aws-modules/s3-bucket/aws"</code>: This tells Terraform where to find the S3 bucket module.
        </li>
        <li>
          <code>bucket = "YOUR-UNIQUE-BUCKET-NAME"</code>: This sets the name of the bucket. <i>You need to replace this with your own unique name!</i>
        </li>
        <li>
          <code>acl = "private"</code>: This sets the "access control list" (ACL) to <code>private</code>, meaning only you (or users you explicitly grant access to) can access the bucket. This is important for security.
        </li>
        <li>
          <code>force_destroy = true"</code>: This setting allows Terraform to delete the bucket even if it contains files. This is useful for cleaning up resources, but be careful!
        </li>
        <li>
          <code>versioning = {"{ enabled = true }"}</code>: This setting enables versioning on the S3 bucket, which means that every time a file is updated in the bucket, the previous version is saved. This is a good practice for data protection.
        </li>
      </ul>

      <ol start={5}>
        <li>
          <b>Open Your Terminal:</b> Navigate to the <code>bucket</code> directory in your terminal.
        </li>
        <li>
          <b>Initialize Terraform:</b> Run the command <code>terraform init</code>. This command initializes the Terraform working directory, downloads the necessary plugins, and prepares Terraform to create your infrastructure.
        </li>
        <li>
          <b>Apply the Configuration:</b> Run the command <code>terraform apply -auto-approve</code>. This command tells Terraform to create the S3 bucket according to the code in <code>main.tf</code>. The <code>-auto-approve</code> flag
          automatically approves the changes, so you don't have to type "yes."
        </li>
      </ol>

      <p>
        <b>Congratulations!</b> You've just created your first piece of cloud infrastructure! Head over to the AWS console, navigate to the S3 service, and you should see your new bucket.
      </p>

      <h2 className="purple">Section 2: Building the Foundation: EC2 Instances and IAM</h2>

      <p>
        Now that we have a place to store our Terraform state, let's build the actual infrastructure: two virtual servers (EC2 instances) and the necessary security rules and access permissions (IAM). We'll be creating several files within
        a new directory called <code>instances</code>.
      </p>

      <p>
        <b>Here's the plan:</b>
      </p>
      <ol>
        <li>
          <b>Create the <code>instances</code> Directory:</b> Create a new folder named <code>instances</code> in your project.
        </li>
        <li>
          <b>Create Several <code>.tf</code> Files:</b> Inside the <code>instances</code> directory, create the following files:
          <ul>
            <li>
              <code>providers.tf</code>: To configure the AWS provider.
            </li>
            <li>
              <code>variables.tf</code>: To define variables for instance type and SSH key.
            </li>
            <li>
              <code>sg.tf</code>: To define security groups (firewall rules) for the instances.
            </li>
            <li>
              <code>aws-instances.tf</code>: To define the EC2 instances themselves.
            </li>
            <li>
              <code>key_deployer.tf</code>: To set up the SSH keys.
            </li>
            <li>
              <code>outputs.tf</code>: To display useful information after the infrastructure is created.
            </li>
            <li>
              <code>version.tf</code>: To use the S3 bucket as backend.
            </li>
          </ul>
        </li>
        <li>
          <b>Fill in the Files:</b> Copy and paste the following code into each file.
        </li>
      </ol>

      <p>
        <b>1. <code>instances/providers.tf</code>:</b>
      </p>
      <pre className="highlight-code">
        <code>{`provider "aws" {
  region = "us-east-2" # Ohio
}

provider "aws" {
  alias  = "virginia"
  region = "us-east-1" # N. Virginia
}`}</code>
      </pre>

      <p>
        This tells Terraform which AWS regions to use. We're deploying one instance in Ohio (<code>us-east-2</code>) and another in Northern Virginia (<code>us-east-1</code>). The <code>alias</code> allows us to specify a different region
        for a specific resource.
      </p>

      <p>
        <b>2. <code>instances/variables.tf</code>:</b>
      </p>
      <pre className="highlight-code">
        <code>{`variable "instance_type" {
  description = "AWS EC2 Instance Type"
  default     = "t2.micro"
}

variable "ssh_key" {
  description = "SSH Key for Instances and Virtual Machines"
  default     = "ssh_key"
}`}</code>
      </pre>

      <p>
        These variables let us customize the instance type (the size of the virtual server) and the SSH key used to access it. The <code>default</code> values provide a starting point.
      </p>

      <p>
        <b>3. <code>instances/sg.tf</code>:</b>
      </p>
      <pre className="highlight-code">
        <code>{`locals {
  inbound_ports  = [22, 80, 443]
  outbound_ports = [22, 80, 443, 1433]
}

resource "aws_security_group" "sg_webserver_ohio" {
  name        = "webserver-sg-ohio"
  description = "Security Group Ports for Web Servers"

  dynamic "ingress" {
    for_each = local.inbound_ports
    content {
      from_port   = ingress.value
      to_port     = ingress.value
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }

  dynamic "egress" {
    for_each = local.outbound_ports
    content {
      from_port   = egress.value
      to_port     = egress.value
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }
}

resource "aws_security_group" "sg_webserver_virginia" {
  provider    = aws.virginia
  name        = "webserver-sg-virgina"
  description = "Security Group Ports for Web Servers"

  dynamic "ingress" {
    for_each = local.inbound_ports
    content {
      from_port   = ingress.value
      to_port     = ingress.value
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }

  dynamic "egress" {
    for_each = local.outbound_ports
    content {
      from_port   = egress.value
      to_port     = egress.value
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }
}`}</code>
      </pre>

      <p>This code creates "security groups," which act like virtual firewalls for our EC2 instances. It opens the following ports:</p>
      <ul>
        <li>
          <b>22 (SSH):</b> To allow us to connect to the instances remotely using SSH.
        </li>
        <li>
          <b>80 (HTTP):</b> To allow web traffic to reach our website.
        </li>
        <li>
          <b>443 (HTTPS):</b> To allow secure web traffic to reach our website.
        </li>
      </ul>

      <p>
        <b>Important:</b> The <code>cidr_blocks = ["0.0.0.0/0"]</code> line allows traffic from <i>anywhere</i> on the internet. For a production environment, you'd want to restrict this to specific IP addresses.
      </p>
      <p>You will need to create your own security groups.</p>

      <p>
        <b>4. <code>instances/aws-instances.tf</code>:</b>
      </p>
      <pre className="highlight-code">
        <code>{`resource "aws_instance" "web_server_1" {
  ami                    = "ami-097a2df4ac947655f"  # Ohio
  instance_type          = var.instance_type
  key_name               = var.ssh_key
  vpc_security_group_ids = [aws_security_group.sg_webserver_ohio.id]
  user_data              = file("../scripts/hulk.yaml")
  tags = {
    Name         = "Web-Server-1"
    time_created = formatdate("MM DD YYYY hh:mm ZZZ", timestamp())
    department   = "Techie-Nerds"
    ID           = "ID-\${random_id.instance_id_1.hex}"
  }
}

resource "aws_instance" "web_server_2" {
  provider               = aws.virginia
  ami                    = "ami-053b0d53c279acc90"  # N. Virginia
  instance_type          = var.instance_type
  key_name               = var.ssh_key
  vpc_security_group_ids = [aws_security_group.sg_webserver_virginia.id]
  user_data              = file("../scripts/hulk.yaml")
  tags = {
    Name         = "Web-Server-2"
    time_created = formatdate("MM DD YYYY hh:mm ZZZ", timestamp())
    department   = "Techie-Nerds"
    ID           = "ID-\${random_id.instance_id_2.hex}"
  }
}

resource "random_id" "instance_id_1" {
  byte_length = 16
}

resource "random_id" "instance_id_2" {
  byte_length = 16
}`}</code>
      </pre>

      <p>This is where we define the EC2 instances themselves!</p>
      <ul>
        <li>
          <code>ami</code>: This specifies the Amazon Machine Image (AMI), which is a template for the operating system and software installed on the instance. <i>It's critical to choose the correct AMI for your region.</i> The AMIs
          provided are for Ubuntu 22.04.
        </li>
        <li>
          <code>instance_type</code>: This sets the size and resources of the instance. <code>t2.micro</code> is a small, inexpensive instance suitable for testing.
        </li>
        <li>
          <code>key_name</code>: This specifies the SSH key to use for accessing the instance. We'll set this up in the next step.
        </li>
        <li>
          <code>vpc_security_group_ids</code>: This associates the instance with the security groups we created earlier, controlling network access.
        </li>
        <li>
          <code>user_data</code>: This is a script that runs when the instance is first launched. We'll use this to set up the user and install some basic software. We'll create a user account.
        </li>
        <li>
          <code>tags</code>: These are labels that can be added to the instance. This lets us identify and manage the instance.
        </li>
      </ul>

      <p>
        <b>5. <code>instances/key_deployer.tf</code>:</b>
      </p>
      <pre className="highlight-code">
        <code>{`resource "aws_key_pair" "deployer_ohio" {
  key_name   = "ssh_key"
  public_key = "REPLACE_WITH_YOUR_PUBLIC_KEY"
}

resource "aws_key_pair" "deployer_virginia" {
  provider = aws.virginia
  key_name   = "ssh_key"
  public_key = "REPLACE_WITH_YOUR_PUBLIC_KEY"
}`}</code>
      </pre>

      <p>This is where we tell AWS about our SSH key.</p>
      <ul>
        <li>
          <code>key_name</code>: This sets the name of the SSH key. We're using "ssh_key" here, but you can choose a different name.
        </li>
        <li>
          <code>public_key</code>: <i>This is where you need to paste the *public* key from your SSH key pair.</i>
        </li>
      </ul>

      <p>
        <b>Important: Generating Your Own SSH Key Pair</b>
      </p>
      <p>You should <b>NEVER</b> include your private keys in the code.</p>
      <ol>
        <li>Open your terminal (on Linux or macOS) or use a tool like PuTTYgen on Windows.</li>
        <li>Generate a new SSH key pair using the following command:</li>
      </ol>
      <pre className="highlight-code">
        <code>{`ssh-keygen -t rsa -b 2048 -f ./keys/ssh_key`}</code>
      </pre>
      <p>Press Enter to accept the default file location (./keys/ssh_key) and leave the passphrase empty.</p>
      <ol start={3}>
        <li>This will create two files in the keys directory: <code>ssh_key</code> (your <i>private</i> key) and <code>ssh_key.pub</code> (your <i>public</i> key).</li>
      </ol>

      <p>
        <b>6. <code>instances/outputs.tf</code>:</b>
      </p>
      <pre className="highlight-code">
        <code>{`output "public_dns_server_1" {
  description = "DNS name of the First EC2 instance"
  value       = aws_instance.web_server_1.public_dns
}

output "public_ip_server_1" {
  description = "Public IP address of the First EC2 instance"
  value       = aws_instance.web_server_1.public_ip
}

output "private_ip_server_1" {
  description = "Private IP address of the First EC2 instance"
  value       = aws_instance.web_server_1.private_ip
}

output "web_server_1_id" {
  description = "ID of the First EC2 instance"
  value       = aws_instance.web_server_1.tags.ID
}

output "public_dns_server_2" {
  description = "DNS name of the Second EC2 instance"
  value       = aws_instance.web_server_2.public_dns
}

output "public_ip_server_2" {
  description = "Public IP address of the Second EC2 instance"
  value       = aws_instance.web_server_2.public_ip
}

output "private_ip_server_2" {
  description = "Private IP address of the Second EC2 instance"
  value       = aws_instance.web_server_2.private_ip
}

output "web_server_2_id" {
  description = "ID of the Second EC2 instance"
  value       = aws_instance.web_server_2.tags.ID
}`}</code>
      </pre>

      <p>This code defines what information Terraform will display after it creates the infrastructure. We're outputting the public IP addresses of the instances so we can access them.</p>

      <p>
        <b>7. <code>instances/version.tf</code>:</b>
      </p>
      <pre className="highlight-code">
        <code>{`terraform {
  backend "s3" {
    bucket = "YOUR-UNIQUE-BUCKET-NAME" # Replace with your bucket name
    key    = "dir1/terraform.tfstate"
    region = "us-east-1" # The region where your bucket is.
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.01"
    }
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.0"
    }
  }

  required_version = ">= 1.4.6"
}`}</code>
      </pre>

      <p>
        <b>Important:</b> Replace <code>"YOUR-UNIQUE-BUCKET-NAME"</code> with the <b>same</b> unique S3 bucket name you chose earlier!
      </p>

      <p>The backend code connects the state to the S3 bucket we have already created.</p>

      <h2 className="purple">Section 3: Setting Up Initial Server Configuration with Cloud-init</h2>

      <p>Create a directory named <code>scripts</code> with the file <code>hulk.yaml</code>.</p>
      <p>The following users will be created:</p>
      <ul>
        <li>Default ubuntu user</li>
        <li>
          <code>hulk</code> user
        </li>
      </ul>

      <p>Create a file named <code>hulk.yaml</code> with the following code:</p>
      <pre className="highlight-code">
        <code>{`#cloud-config-mkdocs-system

groups:
  - ubuntu: [root,sys]
  - ansible-group

users:
  - default
  - name: hulk
    gecos: Dr. Banner
    shell: /bin/bash
    primary_group: ansible-group
    sudo: ALL=(ALL) NOPASSWD:ALL
    groups: users, admin
    lock_passwd: false
    ssh_authorized_keys:
    # Enter your key here:
    - REPLACE_WITH_YOUR_PUBLIC_KEY

runcmd:
  - touch /home/hulk/hello.txt
  - echo "HULK SMASH WHEN DONE!!" >> /home/hulk/hello.txt
  - mkdir asteroids
  - sudo apt update`}</code>
      </pre>

      <p>
        <b>Important:</b> Replace <code>"REPLACE_WITH_YOUR_PUBLIC_KEY"</code> with the <b>same</b> public key you used in <code>instances/key_deployer.tf</code>.
      </p>

      <p>This cloud-init script does the following:</p>
      <ul>
        <li>
          <code>user</code>: The new user account that will be created.
        </li>
        <li>
          <code>runcmd</code>: The <code>runcmd</code> sets up the necessary files and directory.
        </li>
      </ul>

      <p>We now copy everything inside the main terraform console</p>

      <h2 className="purple">Section 4: Tying Everything Together with the AutoMagic Script</h2>

      <p>Open create the AutoMagic bash script in the main directory</p>

      <pre className="highlight-code">
        <code>{`#!/bin/bash

## IMPORTANT! This lab is designed to run on a Linux system, or one with access to a Bash terminal.
## You will need Ansible installed on the local system for the lab to work properly.

start=$SECONDS

terraform -chdir=bucket init
terraform -chdir=bucket apply -auto-approve

printf "\\n\\033[7;31mWAITING 5 SECONDS FOR BUCKET TO INITIALIZE......\\033[0m\\n\\n"
sleep 5

printf "\\n\\033[7;31mS3 BUCKET CREATED!!!......\\033[0m\\n\\n"

terraform -chdir=instances init
terraform -chdir=instances apply -auto-approve

export ANSIBLE_CONFIG=ansible/ansible.cfg

: > ansible/inventory
echo "[nginx]" > ansible/inventory
echo $(terraform -chdir=instances output -raw public_ip_server_1) >> ansible/inventory
echo $(terraform -chdir=instances output -raw public_ip_server_2) >> ansible/inventory

sleep 3

echo
echo

printf "\\n\\033[7;31mWAITING 10 SECONDS FOR SYSTEMS TO INITIALIZE - PING CHECK......\\033[0m\\n\\n"
sleep 10

ansible all --private-key  ~/new_ssh_key -i ansible/inventory -u hulk -m ping

printf "\\n\\033[7;31mWAITING 10 SECONDS BEFORE RUNNING THE PLAYBOOK......\\033[0m\\n\\n"
sleep 10

ansible-playbook ansible/playbook.yml --private-key  ~/new_ssh_key -i ansible/inventory -u hulk

printf "\\n\\033[7;32mPROCESS COMPLETE! \\033[0m"
echo
printf "\nTime to complete = %s seconds" "$SECONDS"
echo

## END`}</code>
      </pre>

      <p>
        <b>Remember!</b> We need to edit this file so it correctly leads to the ssh keys that we have generated.
      </p>

      <p>5. Make the script executable <code>chmod +x automagic.sh</code></p>

      <h2 className="purple">Section 6: Run the infrastructure</h2>
      <ol>
        <li>Let the script rock!</li>
        <li>Open the Main Directory</li>
        <li>
          Enter the command: <code>./automagic.sh</code>
        </li>
      </ol>

      <p>Congratulations, we just set up our environment</p>

      <h2 className="purple">Section 7: CLEAN UP! - Auto Destroy Script!</h2>

      <p>Enter create <code>autodestroy.sh</code> file in the main project directory</p>

      <pre className="highlight-code">
        <code>{`#!/bin/bash

terraform -chdir=instances destroy -auto-approve
terraform -chdir=bucket destroy -auto-approve`}</code>
      </pre>

      <p>Now you should be good.</p>
      <p>
        You can now implement this, code is on my github:{" "}
        <a
          href="https://github.com/Ronald-tino"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/Ronald-tino
        </a>
      </p>
    </div>
  );

  return (
    <BlogPost
      title="Building Your First Cloud Infrastructure: A Beginner's Guide with Terraform, Ansible, and AWS"
      subtitle="A step-by-step walkthrough for deploying a simple cloud infrastructure, even if you're a complete beginner."
      author="Ron-Tino"
      date="February 08, 2025"
      content={content}
    />
  );
}

export default TerraformInfrastructure;

