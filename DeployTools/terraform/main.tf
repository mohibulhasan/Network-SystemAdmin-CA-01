# main.tf

# ----------------------------------------------------
# AWS VPC and Subnet (Basic setup, adapt as needed)
# A VPC is the virtual network in AWS.
# ----------------------------------------------------
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "${var.environment}-vpc"
  }
}

resource "aws_subnet" "public" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "${var.aws_region}a" # Use first AZ in the region
  map_public_ip_on_launch = true # Automatically assign public IP to instances in this subnet

  tags = {
    Name = "${var.environment}-public-subnet"
  }
}

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "${var.environment}-igw"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }
  tags = {
    Name = "${var.environment}-public-rt"
  }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}


# ----------------------------------------------------
# AWS Security Group (Virtual Firewall)
# Allows SSH (port 22) and HTTP (port 80) access.
# ----------------------------------------------------
resource "aws_security_group" "web_server_sg" {
  name        = "${var.environment}-web-server-sg"
  description = "Allow SSH and HTTP inbound traffic"
  vpc_id      = aws_vpc.main.id # Associate with the VPC

  # Inbound rule for SSH
  ingress {
    description = "SSH from anywhere"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Be more restrictive in production if possible
  }

  # Inbound rule for HTTP
  ingress {
    description = "HTTP from anywhere"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Be more restrictive in production if possible
  }

  # All outbound traffic allowed by default
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1" # All protocols
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.environment}-web-server-sg"
    Environment = var.environment
  }
}

# ----------------------------------------------------
# SSH Key Pair for EC2
# Generates a new SSH key pair and stores the public key in AWS.
# The private key needs to be captured and stored in GitHub Secrets.
# ----------------------------------------------------
resource "tls_private_key" "ssh_key_generated" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

# Data source to reference the existing EC2 Key Pair
data "aws_key_pair" "existing_ec2_key" {
  key_name = "my-ec2-keypair" # <--- This MUST match the exact name of existing key pair
}
#======= had issue with AWS existing key pair=====================
# resource "aws_key_pair" "ec2_key" {
#   key_name   = var.key_pair_name
#   public_key = tls_private_key.ssh_key_generated.public_key_openssh

#   tags = {
#     Name = "${var.environment}-ec2-key"
#   }
# }

# IMPORTANT: This block writes the private key to a local file.
# YOU MUST ENSURE THIS FILE IS NOT COMMITTED TO GIT!
# It's primarily for initial setup or local testing.
# For CI/CD, you will capture its output and put it directly into GitHub Secrets.
resource "local_file" "ssh_private_key_pem" {
  content  = tls_private_key.ssh_key_generated.private_key_pem
  filename = "${var.key_pair_name}.pem"
  file_permission = "0400" # Read-only for owner
}

# ----------------------------------------------------
# AWS EC2 Instance (Virtual Machine)
# ----------------------------------------------------
resource "aws_instance" "web_server" {
  ami                         = var.ami_id
  instance_type               = var.instance_type
  key_name                    = data.aws_key_pair.existing_ec2_key.key_name
  # Use the existing key pair from AWS for above.
  # If you want to use the generated key, uncomment the line below and comment the above line.
  #key_name                    = aws_key_pair.ec2_key.key_name
  vpc_security_group_ids      = [aws_security_group.web_server_sg.id]
  subnet_id                   = aws_subnet.public.id
  associate_public_ip_address = true # Important for direct public access

  tags = {
    Name        = "${var.environment}-web-server"
    Environment = var.environment
  }

  # Optional: User data script to run on first boot (e.g., for basic Docker setup)
  # For more complex setup, rely on Ansible after provisioning.
  user_data = <<-EOF
              #!/bin/bash
              sudo yum update -y # For Amazon Linux, use apt update -y for Ubuntu
              sudo amazon-linux-extras install docker -y # For Amazon Linux
              # sudo apt-get update -y && sudo apt-get install -y docker.io # For Ubuntu
              sudo service docker start
              sudo usermod -a -G docker ec2-user # For Amazon Linux, or 'ubuntu' for Ubuntu
              echo "Docker installed and user added to docker group."
              EOF
}


terraform {
  backend "s3" {
    bucket         = "network-admin-ci-cd-bucket-1"  # <--- The actual S3 bucket name created in AWS management console
    key            = "app-deployment/terraform.tfstate" 
    region         = "eu-north-1"                       
    encrypt        = true                               
  }
}