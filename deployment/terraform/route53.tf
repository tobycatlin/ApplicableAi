
data "aws_route53_zone" "dns_zone" {
  name         = var.dns_zone_name
  private_zone = false
}

resource "aws_route53_record" "alb" {
  zone_id = data.aws_route53_zone.dns_zone.zone_id
  name    = "${var.dns_subdomain_name}.${var.dns_zone_name}"
  type    = "A"

  alias {
    name                   = aws_lb.lb.dns_name
    zone_id                = aws_lb.lb.zone_id
    evaluate_target_health = true
  }
}
