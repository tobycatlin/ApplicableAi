resource "aws_ecs_task_definition" "nakama" {
  family                   = "${var.environment_name}-nakama"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = aws_iam_role.ecs_execution.arn
  task_role_arn            = aws_iam_role.ecs_task.arn
  cpu                      = 4096
  memory                   = 8192

  container_definitions = jsonencode([
    {
      name      = "nakama"
      image     = var.nakama_image
      cpu       = 2048
      memory    = 4096
      essential = true
      # command   = [var.database_username, aws_db_instance.database.address, aws_s3_bucket.data.bucket]
      secrets = [
        {
          "name"      = "DB_PASSWORD",
          "valueFrom" = aws_ssm_parameter.database_password.arn
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.logs.name
          awslogs-region        = var.region
          awslogs-stream-prefix = "nakama"
        }
      }
      portMappings = [
        {
          containerPort = 7349
          hostPort      = 7349
        },
        {
          containerPort = 7350
          hostPort      = 7350
        },
        {
          containerPort = 7351
          hostPort      = 7351
        }
      ]
      healthCheck = {
        command     = ["CMD-SHELL", "curl -f http://localhost:7350/ || exit 1"]
        startPeriod = 60
        interval    = 60
        retries     = 5
        timeout     = 3
      }
      mountPoints = [
        {
          containerPath = "/nakama-data"
          sourceVolume  = "NakamaData"
          readOnly      = false
        }
      ]
    },
    {
      name      = "admin"
      image     = var.admin_image
      cpu       = 1024
      memory    = 2048
      essential = false
      # command   = [var.database_username, aws_db_instance.database.address, aws_s3_bucket.data.bucket]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.logs.name
          awslogs-region        = var.region
          awslogs-stream-prefix = "admin"
        }
      }
      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
        }
      ]
      healthCheck = {
        command     = ["CMD-SHELL", "curl -f http://localhost:3000/ || exit 1"]
        startPeriod = 60
        interval    = 60
        retries     = 5
        timeout     = 3
      }
    }
  ])

  volume {
    name = "NakamaData"

    efs_volume_configuration {
      file_system_id     = aws_efs_file_system.data.id
      transit_encryption = "ENABLED"
      authorization_config {
        access_point_id = aws_efs_access_point.data.id
        iam             = "ENABLED"
      }
    }
  }

  tags = local.tags

}
