resource "aws_efs_file_system" "data" {
  encrypted = true
  tags      = local.tags
}

resource "aws_efs_file_system_policy" "data" {
  file_system_id = aws_efs_file_system.data.id
  policy = templatefile("${path.module}/templates/efs/filesystem_policy.json.tmpl", {
    efs_arn = aws_efs_file_system.data.arn
  })
}

resource "aws_efs_access_point" "data" {
  file_system_id = aws_efs_file_system.data.id

  root_directory {
    path = "/nakama-data"
    creation_info {
      owner_gid   = 65534
      owner_uid   = 65534
      permissions = 777
    }
  }

  tags = local.tags
}

resource "aws_efs_mount_target" "private_a" {
  file_system_id  = aws_efs_file_system.data.id
  subnet_id       = aws_subnet.private_a.id
  security_groups = [aws_security_group.efs.id]
}

resource "aws_efs_mount_target" "private_b" {
  file_system_id  = aws_efs_file_system.data.id
  subnet_id       = aws_subnet.private_b.id
  security_groups = [aws_security_group.efs.id]
}

resource "aws_security_group" "efs" {
  name   = "${var.environment_name}-efs"
  vpc_id = aws_vpc.network.id
  tags   = local.tags
}

resource "aws_security_group_rule" "efs_egress" {
  type      = "egress"
  protocol  = "-1"
  from_port = 0
  to_port   = 0
  cidr_blocks = [
    "0.0.0.0/0"
  ]
  security_group_id = aws_security_group.efs.id
}

resource "aws_security_group_rule" "efs_private_subnet_access" {
  type                     = "ingress"
  from_port                = 2049
  to_port                  = 2049
  protocol                 = "tcp"
  security_group_id        = aws_security_group.efs.id
  source_security_group_id = aws_security_group.ecs_service.id
}
