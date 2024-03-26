resource "aws_s3_bucket" "data" {
  bucket        = "gd-${var.environment_name}-nakama-data"
  force_destroy = true
  tags          = local.tags
}

resource "aws_s3_bucket_public_access_block" "data" {
  bucket                  = aws_s3_bucket.data.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
