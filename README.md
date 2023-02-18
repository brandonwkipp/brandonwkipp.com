# brandonwkipp.com
This repository contains the code for my personal website. In the past I've used more complex frameworks and libraries (and `javascript`), but have decided to go back to raw `html` and `css` for the time being. Is that a ridiculous thing to do? Probably. But, it is difficult to deny how much better I feel working on my own website though.

## Infrastructure & Deploymen Process
I host the contents of my website on AWS. I maintain my infrastructure via `terraform` which you can see in the `main.tf` file. I store everything in `terraform` except `dns`; storing domain information in `terraform` is in my opinion, a bad idea. Anyways, When I push changes, a Github Action syncs the entire repository to an S3 bucket and invalidates the previous cache that exists in AWS CloudFront. The whole deployment process takes ~10s.
