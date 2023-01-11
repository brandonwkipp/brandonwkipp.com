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

resource "aws_route53_zone" "brandonwkipp_com" {
  name = "brandonwkipp.com"
}

resource "aws_route53_zone" "brandonkipp_com" {
  name = "brandonkipp.com"
}

module "brandonwkipp_com" {
  source = "git@github.com:brandonwkipp/terraform-aws-static-site.git"

  aws_access_key            = var.aws_access_key
  aws_secret_key            = var.aws_secret_key
  bucket_name               = "brandonwkipp.com"
  hosted_zone_id            = aws_route53_zone.brandonwkipp_com.id
  region                    = "us-west-2"
  stage                     = "production"
  subject_alternative_names = ["www.brandonwkipp.com"]

  redirects = {
    "brandonkipp.com" : aws_route53_zone.brandonkipp_com.id,
    "www.brandonkipp.com" : aws_route53_zone.brandonkipp_com.id,
  }
}
