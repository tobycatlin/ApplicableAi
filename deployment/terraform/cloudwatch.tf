resource "aws_cloudwatch_log_group" "logs" {
  name = "${var.environment_name}-nakama"
  tags = local.tags
}
