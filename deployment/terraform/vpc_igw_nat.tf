# Internet Gateway
resource "aws_internet_gateway" "internet_gateway" {
  vpc_id = aws_vpc.network.id
  tags   = local.tags
}

# NAT 
resource "aws_eip" "nat_gateway_eip" {
  vpc  = true
  tags = local.tags
}

resource "aws_nat_gateway" "nat_gateway" {
  allocation_id = aws_eip.nat_gateway_eip.id
  subnet_id     = aws_subnet.public_a.id
  tags          = local.tags
}

