terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.32.0"
    }
  }

  backend "s3" {
    bucket = "gd-awesome-golf-terraform-state"
    key    = "nk1/terraform.tfstate"
    region = "eu-west-2"
  }
}

data "aws_caller_identity" "current" {
  provider = aws.user
}

provider "aws" {
  alias  = "user"
  region = "eu-west-2"
}


provider "aws" {
  region = "eu-west-2"

  assume_role {
    role_arn     = "arn:aws:iam::282085490514:role/terraform-deployment"
    session_name = data.aws_caller_identity.current.user_id
  }
}


module "nakama" {
  source = "../../terraform"

  environment_name = "nk1"        # used to name resouces and also is the subdomain
  dns_subdomain_name= "nk1"
  dns_zone_name    = "awesome-golf.com" # this is the DNS zone to create the ACM certificate for and also for the DNS records
  region           = "eu-west-2"

  network_id = "1" # each environment has its own VPC, so if you need to peer them together in future, this number should be unique (1-254).

  database_instance_class = "db.t3.micro"
  database_db_name        = "nakamaadmin"
  database_username       = "nakamaadmin"
  database_password       = "DummyPassword!"

  nakama_image = "282085490514.dkr.ecr.eu-west-2.amazonaws.com/nakama:1.15.4"
  admin_image = "282085490514.dkr.ecr.eu-west-2.amazonaws.com/ags_admin-aws:1.15.4"
} 

