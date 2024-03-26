resource "aws_ecs_service" "nakama" {
  name            = "${var.environment_name}-nakama"
  cluster         = aws_ecs_cluster.cluster.id
  task_definition = aws_ecs_task_definition.nakama.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  load_balancer {
    target_group_arn = aws_lb_target_group.api.arn
    container_name   = "nakama"
    container_port   = 7350
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.console.arn
    container_name   = "nakama"
    container_port   = 7351
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.grpc.arn
    container_name   = "nakama"
    container_port   = 7349
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.admin.arn
    container_name   = "admin"
    container_port   = 3000
  }

  network_configuration {
    subnets          = [aws_subnet.private_a.id, aws_subnet.private_b.id]
    security_groups  = [aws_security_group.ecs_service.id]
    assign_public_ip = true
  }

  tags = local.tags

}

resource "aws_security_group" "ecs_service" {
  name   = "${var.environment_name}-ecs-service"
  vpc_id = aws_vpc.network.id
  tags   = local.tags
}

resource "aws_security_group_rule" "ecs_egress" {
  type      = "egress"
  protocol  = "-1"
  from_port = 0
  to_port   = 0
  cidr_blocks = [
    "0.0.0.0/0"
  ]
  security_group_id = aws_security_group.ecs_service.id
}

resource "aws_security_group_rule" "ecs_alb_access" {
  type                     = "ingress"
  from_port                = 7349
  to_port                  = 7351
  protocol                 = "tcp"
  security_group_id        = aws_security_group.ecs_service.id
  source_security_group_id = aws_security_group.alb.id
}

resource "aws_security_group_rule" "ecs_alb_admin" {
  type                     = "ingress"
  from_port                = 3000
  to_port                  = 3000
  protocol                 = "tcp"
  security_group_id        = aws_security_group.ecs_service.id
  source_security_group_id = aws_security_group.alb.id
}

resource "aws_security_group_rule" "ecs_self_access" {
  type                     = "ingress"
  from_port                = 0
  to_port                  = 0
  protocol                 = "-1"
  security_group_id        = aws_security_group.ecs_service.id
  source_security_group_id = aws_security_group.ecs_service.id
}
