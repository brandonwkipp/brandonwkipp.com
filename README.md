# brandonwkipp.com
This repository contains the code for my personal website. In the past I've used more complex frameworks and libraries (and `javascript`), but have decided to go back to raw `html` and `css` for the time being. Is that a ridiculous thing to do? Probably. I don't care.

## Infrastructure & Deployment Process
The website is hosted on AWS and maintained via `terraform` in the `main.tf` file. Everything is stored in `terraform` except `dns`; storing domain information in `terraform` is a bad idea. When changes are pushed, a Github Action syncs the entire repository to an S3 bucket and invalidates the previous cache in AWS CloudFront. The whole deployment process takes ~10s.
