# variables.tf
variable "aws_region" {
  description = "The AWS region to deploy resources into."
  type        = string
  default     = "eu-north-1" # Set a default, but GitHub Actions will override via env
}

variable "instance_type" {
  description = "The EC2 instance type."
  type        = string
  default     = "t3.micro" # Free tier eligible
}

variable "ami_id" {
  description = "The AMI ID for the EC2 instance (e.g., Ubuntu, Amazon Linux 2)."
  type        = string
  
  default     = "ami-042b4708b1d05f512" # Canonical, Ubuntu, 24.04, amd64 noble image
}

variable "key_pair_name" {
  description = "The name for the EC2 Key Pair."
  type        = string
  default     = "my-ec2-keypair"
}

variable "environment" {
  description = "The environment tag for resources."
  type        = string
  default     = "development"
}