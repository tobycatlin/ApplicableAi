resource "aws_vpc_endpoint" "s3" {
  vpc_id       = aws_vpc.network.id
  service_name = "com.amazonaws.${var.region}.s3"
  tags         = local.tags
}
