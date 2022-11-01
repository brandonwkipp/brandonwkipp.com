# brandonwkipp.com
This repository contains the code for my personal website. I used to use more complex frameworks and libraries (and JavaScript), but I've decided to go back to raw `html` and `css` for the time being. Is that a ridiculous thing to do? Probably. It's hard to deny how much lighter it feels to maintain the absolute bare minimum required for a website though.

## Process
When my changes are pushed, a Github Action syncs the entire repository to an AWS S3 bucket and invalidates the previous cache that exists in AWS CloudFront. The whole deployment process takes ~10s.
