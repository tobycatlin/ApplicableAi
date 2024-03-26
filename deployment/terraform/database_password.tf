resource "aws_ssm_parameter" "database_password" {
  name  = "${var.environment_name}-db-password"
  type  = "String"
  value = var.database_password
  tags  = local.tags
}
