resource "aws_vpc" "network" {
  cidr_block           = "10.${var.network_id}.0.0/16"
  enable_dns_hostnames = true # This is required to use EFS mounts
  tags                 = local.tags
}
