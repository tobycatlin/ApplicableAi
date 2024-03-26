resource "aws_lb_target_group" "admin" {
  name                 = "${var.environment_name}-alb-tg-admin"
  port                 = 3000
  protocol             = "HTTP"
  target_type          = "ip"
  vpc_id               = aws_vpc.network.id
  deregistration_delay = 60

  health_check {
    enabled           = true
    path              = "/api/healthcheck"
    port              = 3000
    interval          = 60
    timeout           = 10
    healthy_threshold = 2
  }

  tags = local.tags
}

resource "aws_lb_target_group" "console" {
  name                 = "${var.environment_name}-alb-tg-console"
  port                 = 7351
  protocol             = "HTTP"
  target_type          = "ip"
  vpc_id               = aws_vpc.network.id
  deregistration_delay = 60

  health_check {
    enabled           = true
    path              = "/"
    port              = 7351
    interval          = 60
    timeout           = 10
    healthy_threshold = 2
  }

  tags = local.tags
}

resource "aws_lb_target_group" "api" {
  name                 = "${var.environment_name}-alb-tg-api"
  port                 = 7350
  protocol             = "HTTP"
  target_type          = "ip"
  vpc_id               = aws_vpc.network.id
  deregistration_delay = 60

  health_check {
    enabled           = true
    path              = "/"
    port              = 7350
    interval          = 60
    timeout           = 10
    healthy_threshold = 2
  }

  tags = local.tags
}

resource "aws_lb_target_group" "grpc" {
  name                 = "${var.environment_name}-alb-tg-grpc"
  port                 = 7349
  protocol             = "HTTP"
  protocol_version     = "GRPC"
  target_type          = "ip"
  vpc_id               = aws_vpc.network.id
  deregistration_delay = 60

  health_check {
    enabled           = true
    path              = "/AWS.ALB/healthcheck"
    # matcher           = "0,12"
    port              = 7349
    interval          = 60
    timeout           = 10
    healthy_threshold = 2
  }

  tags = local.tags
}
