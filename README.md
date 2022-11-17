# brandonwkipp.com
This repository contains the code for my personal website. I used to use more complex frameworks and libraries (and `javascript`), but I've decided to go back to raw `html` and `css` for the time being. Is that a ridiculous thing to do? Probably. But, it is difficult to deny how much better I feel working on my own website though.

## Process
When I push changes, a Github Action syncs the entire repository to an AWS S3 bucket and invalidates the previous cache that exists in AWS CloudFront. The whole deployment process takes ~10s.
