resource "aws_ecs_cluster" "cluster" {
  name = "${var.environment_name}-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = local.tags
}

resource "aws_ecs_cluster_capacity_providers" "cluster" {
  cluster_name       = aws_ecs_cluster.cluster.name
  capacity_providers = ["FARGATE"]
}
