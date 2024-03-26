resource "aws_iam_policy" "ssm" {
  policy = templatefile("${path.module}/templates/ssm/iam_policy.json.tmpl", {
    parameter_arn = aws_ssm_parameter.database_password.arn
  })
  tags = local.tags
}
