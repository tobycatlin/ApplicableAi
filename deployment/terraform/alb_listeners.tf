resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.lb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.api.arn
  }

  tags = local.tags
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.lb.arn
  port              = "443"
  protocol          = "HTTPS"
  certificate_arn   = aws_acm_certificate_validation.validation.certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.api.arn
  }

  tags = local.tags
}

resource "aws_lb_listener" "api" {
  load_balancer_arn = aws_lb.lb.arn
  port              = "7350"
  protocol          = "HTTPS"
  certificate_arn   = aws_acm_certificate_validation.validation.certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.api.arn
  }

  tags = local.tags
}

resource "aws_lb_listener" "grpc" {
  load_balancer_arn = aws_lb.lb.arn
  port              = "7349"
  protocol          = "HTTPS"
  certificate_arn   = aws_acm_certificate_validation.validation.certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.grpc.arn
  }

  tags = local.tags
}

resource "aws_lb_listener" "admin" {
  load_balancer_arn = aws_lb.lb.arn
  port              = "3000"
  protocol          = "HTTPS"
  certificate_arn   = aws_acm_certificate_validation.validation.certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.admin.arn
  }

  tags = local.tags
}

resource "aws_lb_listener_rule" "http" {
  listener_arn = aws_lb_listener.http.arn
  priority     = 1

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.console.arn
  }

  condition {
    path_pattern {
      values = ["/", "/favicon.ico", "/static/*", "/v2/console/*"]
    }
  }

  tags = local.tags

}


resource "aws_lb_listener_rule" "https" {
  listener_arn = aws_lb_listener.https.arn
  priority     = 1

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.console.arn
  }

  condition {
    path_pattern {
      values = ["/", "/favicon.ico", "/static/*", "/v2/console/*"]
    }
  }

  tags = local.tags

}
