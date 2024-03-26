

# PUBLIC (IGW) Subnet A
resource "aws_subnet" "public_a" {
  vpc_id            = aws_vpc.network.id
  cidr_block        = "10.${var.network_id}.0.0/21"
  availability_zone = "${var.region}a"
  tags = merge(local.tags, {
    Name = "${var.environment_name}-public-a"
  })

}

# PUBLIC (IGW) Subnet B
resource "aws_subnet" "public_b" {
  vpc_id            = aws_vpc.network.id
  cidr_block        = "10.${var.network_id}.8.0/21"
  availability_zone = "${var.region}b"
  tags = merge(local.tags, {
    Name = "${var.environment_name}-public-b"
  })
}

# PRIVATE(NAT) Subnet A
resource "aws_subnet" "private_a" {
  vpc_id            = aws_vpc.network.id
  cidr_block        = "10.${var.network_id}.16.0/21"
  availability_zone = "${var.region}a"
  tags = merge(local.tags, {
    Name = "${var.environment_name}-private-a"
  })
}

# PRIVATE(NAT) Subnet B
resource "aws_subnet" "private_b" {
  vpc_id            = aws_vpc.network.id
  cidr_block        = "10.${var.network_id}.24.0/21"
  availability_zone = "${var.region}b"
  tags = merge(local.tags, {
    Name = "${var.environment_name}-private-b"
  })
}

# Database Subnet A
resource "aws_subnet" "database_a" {
  vpc_id            = aws_vpc.network.id
  cidr_block        = "10.${var.network_id}.32.0/21"
  availability_zone = "${var.region}a"
  tags = merge(local.tags, {
    Name = "${var.environment_name}-database-a"
  })
}

# Database Subnet B
resource "aws_subnet" "database_b" {
  vpc_id            = aws_vpc.network.id
  cidr_block        = "10.${var.network_id}.40.0/21"
  availability_zone = "${var.region}b"
  tags = merge(local.tags, {
    Name = "${var.environment_name}-database-b"
  })
}
