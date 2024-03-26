# Public Route Table
resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.network.id
  tags   = local.tags
}

# Public Route
resource "aws_route" "public_route_internet" {
  route_table_id         = aws_route_table.public_route_table.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.internet_gateway.id
}

# Route Table Association
resource "aws_route_table_association" "public_a" {
  subnet_id      = aws_subnet.public_a.id
  route_table_id = aws_route_table.public_route_table.id
}

resource "aws_route_table_association" "public_b" {
  subnet_id      = aws_subnet.public_b.id
  route_table_id = aws_route_table.public_route_table.id
}




# Private Route Table
resource "aws_route_table" "private_route_table" {
  vpc_id = aws_vpc.network.id
  tags   = local.tags
}

# Private Routes
resource "aws_route" "private_route_internet" {
  route_table_id         = aws_route_table.private_route_table.id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.nat_gateway.id
}

resource "aws_vpc_endpoint_route_table_association" "private_vpc_endpoint_assoc_s3" {
  route_table_id  = aws_route_table.private_route_table.id
  vpc_endpoint_id = aws_vpc_endpoint.s3.id
}

# Route Table Association
resource "aws_route_table_association" "private_a" {
  subnet_id      = aws_subnet.private_a.id
  route_table_id = aws_route_table.private_route_table.id
}

resource "aws_route_table_association" "private_b" {
  subnet_id      = aws_subnet.private_b.id
  route_table_id = aws_route_table.private_route_table.id
}



# database Route Tables
resource "aws_route_table" "database_route_table" {
  vpc_id = aws_vpc.network.id
  tags   = local.tags
}

# Route Table Association
resource "aws_route_table_association" "database_a" {
  subnet_id      = aws_subnet.database_a.id
  route_table_id = aws_route_table.database_route_table.id
}

resource "aws_route_table_association" "database_b" {
  subnet_id      = aws_subnet.database_b.id
  route_table_id = aws_route_table.database_route_table.id
}
