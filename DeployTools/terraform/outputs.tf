output "resource_group_name" {
  value = azurerm_resource_group.rg.name
}

output "public_ip_address" {
  value = azurerm_linux_virtual_machine.my_terraform_vm.public_ip_address
}

output "ssh_public_key" {
  description = "The SSH public key generated for the VM access"
  # This is the crucial line: referencing the publicKey output of the azapi action
  value       = azapi_resource_action.ssh_public_key_gen.output.publicKey
}

output "generated_private_key" {
  description = "The SSH private key generated for the VM access"
  # This is the crucial line: referencing the privateKey output of the azapi action
  value       = azapi_resource_action.ssh_public_key_gen.output.privateKey
  sensitive   = true # Mark as sensitive so it's not printed in plain text in logs
}