# versions.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0" # Use a compatible version, e.g., "~> 5.0" or latest
    }
    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0" # Required for generating SSH key pair
    }
    local = {
      source  = "hashicorp/local"
      version = "~> 2.0" # Required for writing private key to a local file
    }
  }

  required_version = ">= 1.0.0" # Ensures Terraform CLI version is compatible
}

provider "aws" {
  region = var.aws_region # We defined aws_region as a variable
  # AWS credentials (access key, secret key) are typically picked up from
  # environment variables (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
  # which GitHub Actions will manage using the 'configure-aws-credentials' action.
}