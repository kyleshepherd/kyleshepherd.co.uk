---
name: "White Cube"
slug: white-cube
image: ../../assets/projects/whitecube.png
techTags: ["React", "Node.js", "AWS", "Terraform", "Sequelize", "TailwindCSS", "GraphQL"]
order: 7
---

SOON_ were brought in to help White Cube prepare their bespoke inventory web-app for release to their internal team, after they were let down by another agency. The application was created to take their inventory system away from a Microsoft Access database that required a VPN to access and port it into a web-app.

The majority of my work on the inventory project involved adding functionality and fixing bugs in their React.js frontend and Node.js-powered GraphQL backend. That meant picking up a sizeable codebase written by various outsourcers, so we had to get up to speed quickly and refactor parts of it to make the rest of the work manageable.

I also led the development of a set of image tools: an AWS Lambda function that resized and converted images uploaded through the frontend, and an authenticated endpoint on ECS that let the client embed images from their private S3 bucket into other platforms. It was my first proper go at AWS, and I used Terraform and Docker to deploy both.
