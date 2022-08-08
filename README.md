# Introduction

The goal of this project is to create a POC of the use of a headless CMS with a .NET Core client application, and showing that it is possible to use a simple and powerfull CMS in any .NET application.

# Technologies

- Blazor as Front-end, which is a modern WebAssembly layer with .NET Core
- Strapi as Back-end, which is open-source and a self-hosted Headless CMS, with PostreSQL database
- GitHub as source control (mono-repository)
- VSCode as default IDE
- Docker container
- Azure hosting

# Why Strapi?

- Open-source
- 46.7 starts on GitHub
- 239 releases
- Big customer names
- Looks powerful and simple to use
- Self-hosted, or not

# Target project

I want to be able to create a Docker image of my final app and be able to deploy in an [Azure Container App](https://azure.microsoft.com/en-us/services/container-apps/#overview).

# Step 1: Creating GitHub repository

I guess that will be the simplest step of my POC:
1. Go to GitHub account
2. New repository
3. Give name + mardown + VisualStudio .gitignore
4. Clone
5. Open in VSCode

Yeah!

During thios POC we will use a mono-repository with those two root directories:
- bs-front: Blazor app
- bs-back: Strapi app

Note : "bs" stand for "blazor-strapicms" which is just the name of our project.

# Step 2: Creating a Strapi Docker image

The first step I did was to check at Strapi documentation to get their Docker image. This is what is written as first paragraph:


> This Docker image is only for Strapi v3. For now, Strapi will not update the image for v4. However, to build an image compatible with Strapi v4, we recommend following [this guide](https://blog.dehlin.dev/docker-with-strapi-v4) (opens new window) by Simen Daehlin, Community Star at Strapi.

Arghhhh... bad start :(

Let's have a look at that guide from Simen Daehlin, created on Jan 10 2022. Simen created a high quality post explaining all the steps ans each detail on how to create this Docker image with Strapi v4. He is also using PostresSQL as the database and, cherry on the cake, published a "Self-sponsored Tool" that will create our final Docker image in our Strapi application code.

Before creating the Docker image we thus have to create a Strapi project.

So far so good.

# Step 3: Creating Strapi project

Strapi has some starters, for instance for creating with a Gatsby Front-end. Here we will be building our custom Front-end so we only need Strapi. [Per the docs](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/installation/cli.html#creating-a-strapi-project) the recommended way is using the CLI.

We will use Yarn instead of Npm, you can use the one you prefer.

To install Yarn: `npm install --global yarn`

Then:
```
# Creating Strapi project:
yarn create strapi-app bs-back
# > Select "Quickstart" as installation option

# Running Strapi
yarn develop
```

Your browser should open and redirect you to http://localhost:1337/admin/auth/register-admin. Look at the domain, "localhost", meaning we are running Strapi on local computer.

Let's play with the Strapi Back-end! At first it looks a little bit more complex than Netlify CMS:
- Media library: Add your assets here
- Content-type Builder: Define your entity types and relationships
- Content Manager : Add your content using your entity declarations

Nice! This looks qt glance much better and powerful than Netlify. But remember Step 2, we want to create a Strapi Docker image ;)

# Step 4: Finally creating the Strapi Docker image
