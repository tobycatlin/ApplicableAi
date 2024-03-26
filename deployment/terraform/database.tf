# resource "aws_db_subnet_group" "database" {
#   name       = var.environment_name
#   subnet_ids = [aws_subnet.database_a.id, aws_subnet.database_b.id]
#   tags       = local.tags
# }

# resource "aws_db_instance" "database" {
#   allocated_storage     = 10
#   max_allocated_storage = 100

#   final_snapshot_identifier = "${var.environment_name}-final-db"
#   # skip_final_snapshot       = true

#   storage_type      = "gp2"
#   storage_encrypted = true

#   backup_retention_period    = 7
#   backup_window              = "08:00-09:00"
#   maintenance_window         = "mon:10:00-mon:12:00"
#   auto_minor_version_upgrade = true

#   publicly_accessible = false

#   identifier     = var.environment_name
#   engine         = "postgres"
#   engine_version = "13.5"
#   instance_class = var.database_instance_class

#   db_name = var.database_db_name

#   username = var.database_username
#   password = var.database_password

#   db_subnet_group_name = aws_db_subnet_group.database.name

#   vpc_security_group_ids = [
#     aws_security_group.database.id
#   ]

#   tags = local.tags

# }


# resource "aws_security_group" "database" {
#   name   = "${var.environment_name}-db"
#   vpc_id = aws_vpc.network.id
#   tags   = local.tags
# }

# resource "aws_security_group_rule" "db_egress" {
#   type      = "egress"
#   protocol  = "-1"
#   from_port = 0
#   to_port   = 0
#   cidr_blocks = [
#     "0.0.0.0/0"
#   ]
#   security_group_id = aws_security_group.database.id
# }

# resource "aws_security_group_rule" "db_private_subnet_access" {
#   type                     = "ingress"
#   from_port                = 5432
#   to_port                  = 5432
#   protocol                 = "tcp"
#   security_group_id        = aws_security_group.database.id
#   source_security_group_id = aws_security_group.ecs_service.id
# }

