variable "access_key" {}
variable "access_secret" {}
variable "bucket_name" {}
variable "domain" {
  default = "brandonwkipp.com"
}
variable "region" {}

# Seed our AWS variables
provider "aws" {
  access_key = var.access_key
  region     = var.region
  secret_key = var.access_secret
}

# Seed from US-East-1 for use in ACM
provider "aws" {
  access_key = var.access_key
  alias      = "us-east-1"
  region     = "us-east-1"
  secret_key = var.access_secret
}

module "hosted-zone-primary" {
  source = "../website-modules/route53-hosted-zone"
  providers = {
    aws = aws
  }

  zone_name = var.bucket_name
}

module "hosted-zone-secondary" {
  source = "../website-modules/route53-hosted-zone"
  providers = {
    aws = aws
  }

  zone_name = "brandonkipp.com"
}

module "s3-bucket" {
  source = "../website-modules/s3-bucket"
  providers = {
    aws = aws
  }

  bucket_name = var.bucket_name
}

module "acm-cert-main" {
  source = "../website-modules/acm-cert"
  providers = {
    aws = aws.us-east-1
  }

  domain                    = var.bucket_name
  subject_alternative_names = ["www.${var.bucket_name}", "brandonkipp.com", "www.brandonkipp.com"]
  zones = {
    "brandonwkipp.com"     = module.hosted-zone-primary.hosted_zone_id,
    "www.brandonwkipp.com" = module.hosted-zone-primary.hosted_zone_id,
    "brandonkipp.com"      = module.hosted-zone-secondary.hosted_zone_id,
    "www.brandonkipp.com"  = module.hosted-zone-secondary.hosted_zone_id,
  }
}

module "cloudfront-distribution" {
  source = "../website-modules/cloudfront"
  providers = {
    aws = aws.us-east-1
  }

  aliases                = [var.domain, "www.${var.domain}", "brandonkipp.com", "www.brandonkipp.com"]
  bucket_name            = var.bucket_name
  certificate_arn        = module.acm-cert-main.arn
  certificate_validation = [module.acm-cert-main]
  website_endpoint       = module.s3-bucket.website_endpoint
}

module "route53-dns-brandonwkipp-com" {
  source = "../website-modules/route53-dns"
  providers = {
    aws = aws.us-east-1
  }

  cloudfront_domain_name    = module.cloudfront-distribution.domain_name
  cloudfront_hosted_zone_id = module.cloudfront-distribution.hosted_zone_id
  domain                    = var.domain
  hosted_zone_id            = module.hosted-zone-primary.hosted_zone_id
}

module "route53-dns-www-brandonwkipp-com" {
  source = "../website-modules/route53-dns"
  providers = {
    aws = aws.us-east-1
  }

  cloudfront_domain_name    = module.cloudfront-distribution.domain_name
  cloudfront_hosted_zone_id = module.cloudfront-distribution.hosted_zone_id
  domain                    = "www.${var.domain}"
  hosted_zone_id            = module.hosted-zone-primary.hosted_zone_id
}

module "route53-dns-brandonkipp-com" {
  source = "../website-modules/route53-dns"
  providers = {
    aws = aws.us-east-1
  }

  cloudfront_domain_name    = module.cloudfront-distribution.domain_name
  cloudfront_hosted_zone_id = module.cloudfront-distribution.hosted_zone_id
  domain                    = "brandonkipp.com"
  hosted_zone_id            = module.hosted-zone-secondary.hosted_zone_id
}

module "route53-dns-www-brandonkipp-com" {
  source = "../website-modules/route53-dns"
  providers = {
    aws = aws.us-east-1
  }

  cloudfront_domain_name    = module.cloudfront-distribution.domain_name
  cloudfront_hosted_zone_id = module.cloudfront-distribution.hosted_zone_id
  domain                    = "www.brandonkipp.com"
  hosted_zone_id            = module.hosted-zone-secondary.hosted_zone_id
}
