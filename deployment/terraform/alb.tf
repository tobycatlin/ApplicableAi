
resource "aws_lb" "lb" {
  name               = "${var.environment_name}-nakama"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = [aws_subnet.public_a.id, aws_subnet.public_b.id]
  tags               = local.tags
}

resource "aws_security_group" "alb" {
  name   = "${var.environment_name}-alb"
  vpc_id = aws_vpc.network.id
  tags   = local.tags
}

resource "aws_security_group_rule" "alb_egress" {
  type      = "egress"
  protocol  = "-1"
  from_port = 0
  to_port   = 0
  cidr_blocks = [
    "0.0.0.0/0"
  ]
  security_group_id = aws_security_group.alb.id
}

resource "aws_security_group_rule" "alb_public80" {
  type              = "ingress"
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  security_group_id = aws_security_group.alb.id
  cidr_blocks = [
    "0.0.0.0/0"
  ]
}

resource "aws_security_group_rule" "alb_public443" {
  type              = "ingress"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  security_group_id = aws_security_group.alb.id
  cidr_blocks = [
    "0.0.0.0/0"
  ]
}

resource "aws_security_group_rule" "alb_grpc" {
  type              = "ingress"
  from_port         = 7349
  to_port           = 7349
  protocol          = "tcp"
  security_group_id = aws_security_group.alb.id
  cidr_blocks = [
    "0.0.0.0/0"
  ]
}

resource "aws_security_group_rule" "alb_api" {
  type              = "ingress"
  from_port         = 7350
  to_port           = 7350
  protocol          = "tcp"
  security_group_id = aws_security_group.alb.id
  cidr_blocks = [
    "0.0.0.0/0"
  ]
}

resource "aws_security_group_rule" "alb_console" {
  type              = "ingress"
  from_port         = 7351
  to_port           = 7351
  protocol          = "tcp"
  security_group_id = aws_security_group.alb.id
  cidr_blocks = [
    "0.0.0.0/0"
  ]
}

resource "aws_security_group_rule" "alb_admin" {
  type              = "ingress"
  from_port         = 3000
  to_port           = 3000
  protocol          = "tcp"
  security_group_id = aws_security_group.alb.id
  cidr_blocks = [
    "0.0.0.0/0"
  ]
}