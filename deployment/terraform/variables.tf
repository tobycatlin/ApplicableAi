variable "environment_name" {
  type = string
}

variable "region" {
  type = string
}

variable "network_id" {
  type    = string
  default = "1"
}

variable "database_instance_class" {
  type    = string
  default = "db.t3.micro"
}

variable "database_db_name" {
  type    = string
  default = "nakamaadmin"
}

variable "database_username" {
  type    = string
  default = "nakamaadmin"
}

variable "database_password" {
  type = string
}

variable "nakama_image" {
  type = string
}

variable "admin_image" {
  type = string
}

variable "dns_subdomain_name" {
  type    = string
}

variable "dns_zone_name" {
  type    = string
  default = "awesome-golf.com"
}
