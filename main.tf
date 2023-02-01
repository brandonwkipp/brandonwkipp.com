variable aws_access_key {}
variable aws_secret_key {}
variable hosted_zone_id_brandonwkipp_com {}
variable hosted_zone_id_brandonkipp_com {}
variable region {}

# Seed our AWS variables
provider "aws" {
  access_key = var.aws_access_key
  region     = var.region
  secret_key = var.aws_secret_key
}

# Seed from US-East-1 for use in ACM
provider "aws" {
  access_key = var.aws_access_key
  alias      = "us-east-1"
  region     = "us-east-1"
  secret_key = var.aws_secret_key
}

# Terraform Backend Config
terraform {
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "brandonwkipp"

    workspaces {
      name = "brandonwkipp-com"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.24"
    }
  }
}

module "brandonwkipp_com" {
  source = "github.com/brandonwkipp/terraform-aws-static-site"

  aws_access_key            = var.aws_access_key
  aws_secret_key            = var.aws_secret_key
  bucket_name               = "brandonwkipp.com"
  hosted_zone_id            = var.hosted_zone_id_brandonwkipp_com
  region                    = "us-west-2"
  subject_alternative_names = ["www.brandonwkipp.com"]

  redirects = {
    "brandonkipp.com" : var.hosted_zone_id_brandonkipp_com,
    "www.brandonkipp.com" : var.hosted_zone_id_brandonkipp_com,
  }
}
