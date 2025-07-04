# outputs.tf

output "vm_public_ip" {
  description = "The public IP address of the EC2 instance."
  value       = aws_instance.web_server.public_ip
}

output "vm_public_dns" {
  description = "The public DNS name of the EC2 instance."
  value       = aws_instance.web_server.public_dns
}

output "ssh_private_key_pem" {
  description = "The private key in PEM format for SSH access to EC2. Store this securely in GitHub Secrets!"
  value       = tls_private_key.ssh_key_generated.private_key_pem
  sensitive   = true # Mark as sensitive to prevent showing in plain text in logs
}

output "instance_id" {
  description = "The ID of the EC2 instance."
  value       = aws_instance.web_server.id
}