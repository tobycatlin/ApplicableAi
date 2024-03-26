
resource "aws_iam_role" "ecs_execution" {
  name_prefix        = "${var.environment_name}-ecs-execution-"
  assume_role_policy = file("${path.module}/templates/ecs/assume_role_policy.json.tmpl")
  managed_policy_arns = [
    "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy",
    aws_iam_policy.ecs_execution.arn
  ]
  tags = local.tags
}

resource "aws_iam_policy" "ecs_execution" {
  policy = templatefile("${path.module}/templates/ecs/execution_role_policy.json.tmpl", {
    parameter_arn = aws_ssm_parameter.database_password.arn
  })
  tags = local.tags
}


resource "aws_iam_role" "ecs_task" {
  name_prefix         = "${var.environment_name}-ecs-task-"
  assume_role_policy  = file("${path.module}/templates/ecs/assume_role_policy.json.tmpl")
  managed_policy_arns = [aws_iam_policy.ecs_task.arn]
  tags                = local.tags
}

resource "aws_iam_policy" "ecs_task" {
  policy = templatefile("${path.module}/templates/ecs/task_role_policy.json.tmpl", {
    s3_bucket_arn = aws_s3_bucket.data.arn
  })
  tags = local.tags

}
