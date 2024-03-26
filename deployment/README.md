### Great Detail Terraform

This repository is home to the Terraform created based off the orignal Cloudformation template with some changes. 

The original can be found in the `/cloudformation` directory.


#### Terraform Prerequsites

The template `/cloudformation/terraform_prereq.cfn.yaml` creates an S3 bucket to store Terraform state files, along with an IAM role 
for Terraform to use to perform deployments. Currently this IAM role has the AdministratorAccess policy attached. 


#### Terraform Resources

The terraform module is all located in `/terraform`.

Resources are split into multiple files that are named as sensibly as possible to aid in debugging or improving the module in the future. 

The module incorporates all of the existing functionality of the original Cloudformation template, but also includes some improvments:

- The module creates a new VPC for each environment. All network workloads will live in the new VPC, so there is network-level isolation between environments
- The module creates an ACM Certificate for SSL scoped to the specific subdomain for the environment, and attaches it automatically to the load balancer listener
- The module also creates a DNS entry for the subdomain and points it at the Load Balancer


#### Creating a new environment

Within the `/environments` directory, each environment has its own subdirectory. The name of the directory does not matter much, but its best to keep it the same as the envrionment name for simplicity. 

To create a new environment, simply clone one of the existing environment directories, which should only house a single `main.tf` file.

Within `main.tf`, a few key parameters must be updated


```

backend "s3" {
    ...
    key = "<environment_name>/terraform.tfstate"
    ...
}

```
The key must be updated to be unique and this must be done BEFORE running terraform otherwise you risk mixing up state files.


```
module "nakama" {
    ...

    environment_name = "mm-rebura"       
    dns_zone_name    = "awesome-golf.com" 
    region           = "eu-west-2"

    network_id = "1"

    database_instance_class = "db.t3.micro"
    database_db_name        = "nakamaadmin"
    database_username       = "nakamaadmin"
    database_password       = "DummyPassword!"

    nakama_image = "709825985650.dkr.ecr.us-east-1.amazonaws.com/heroic-labs/nakama:3.10.0-m1"
    ...
}
```

`environment_name`: This is used to name resources, and also is used as the DNS subdomain
`dns_zone_name`: The name of the domain to attach the subdomain to. This is present as your AWS account had multiple Route53 Zones
`network_id`: The X in 10.X.0.0/16 used as the VPC root CIDR block. Each new envrionment comes with a VPC. If the intention is to keep the envrionments isolated from each other, this parameter can be ignored or ommitted. IF you intend to peer VPC's together, then these network ID's must be unique between envrionments. 
`nakama_image`: As the ECR registry is in another account, it made more sense to pass the entire image path to the module. 


Some variables which are passed to the module have defaults set to what I assumed to be a reasonable default, but these can be changed as required. Overrides are always possible within the module block. 

See the variables in `/terraform/variables.tf`


#### Running Terraform

I am assuming you are using the latest version of Terraform (>= v1.2.0). Old versions may have reduced functionality. 

Due to the Terraform being configured to assume the IAM role deployed in `/cloudformation/terraform_prereq.cfn.yaml`, you must be authenticated with the AWS account prior to running Terraform. 

Assuming you are authenticated, running `terraform init` from within a sub-directory of `/environments` should succeed. 

To plan, run `terraform plan -out plan`. While `terraform plan` is acceptable, using `-out plan` saves the plan output to a file, which terraform will strictly stick to when applying changes. 

To apply the plan, run `terraform apply plan`. A new envrionment should come online within about 10 minutes. The bulk of this time is normally waiting for the RDS instance to provision. 


#### Destoying an environment

Similar to running a plan/apply, navigate to the sub-directory of `/environments` of the environment to destroy and run `terraform plan -destroy` to confirm terraform plans to destroy all resources. 

If happy, run `terraform apply -destroy` and terraform should fully tear down the environment. Should there be dependency issues when destroying the environment, you may have to run the destroy command multiple times. 


