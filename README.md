# Introduction

The goal of this project is to create a POC of the use of a headless CMS with a .NET Core client application, and showing that it is possible (and a viable option!) to use a simple and powerful CMS in any .NET application.

# Technologies

- Blazor as Front-end, which is a modern WebAssembly layer with .NET Core
- Strapi as Back-end, which is open-source and a self-hosted Headless CMS, with a PostreSQL database
- GitHub as source control (mono-repository)
- VSCode as default IDE
- Docker container
- Azure hosting

# Why Strapi?

- Open-source
- 48.6k stars on GitHub (06/10/2022)
- 251 releases (06/10/2022)
- Big customer names
- Looks (!) powerful and simple to use
- Self-hosted... or not

# Target project

I want to be able to create a Docker image of the final app and be able to deploy it in an [Azure Container App](https://azure.microsoft.com/en-us/services/container-apps/#overview).

# Step 1: Creating GitHub repository

I guess that will be the simplest step of my POC:
1. Go to GitHub account
2. New repository
3. Give name + mardown + VisualStudio .gitignore
4. Clone
5. Open in VSCode

Yeah!

During this POC we will use a mono-repository with those two root directories:
- bs-front: Blazor app
- bs-back: Strapi app

Note : "bs" stands for the initials of "Blazor-Strapicms" which is just the name of our project.

# Step 2: Creating a Strapi Docker image

The first step I did was to check at the Strapi documentation to get their Docker image. This is what is written as the first paragraph:


> This Docker image is only for Strapi v3. For now, Strapi will not update the image for v4. However, to build an image compatible with Strapi v4, we recommend following [this guide](https://blog.dehlin.dev/docker-with-strapi-v4) (opens new window) by Simen Daehlin, Community Star at Strapi.

Arghhhh... what a shame, bad start :(

Let's have a look at that guide from Simen Daehlin, created on 10/01/2022. Simen created a high quality post explaining all the steps and every detail on how to create a brand new Docker image with Strapi v4. He is also using PostresSQL as the database and, cherry on the cake, published a "Self-sponsored Tool" that will create our final Docker image in our Strapi application code.

Before creating the Docker image we thus have to create a new Strapi project.

So far so good.

# Step 3: Creating Strapi project

## Project creation

Strapi has some starters, for instance for creating with a Gatsby Front-end. In this POC we will be building our custom Front-end so we only need a bare metal Strapi. [Per the docs](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/installation/cli.html#creating-a-strapi-project) the recommended way is using the CLI.

We will use Yarn instead of Npm, you can use the one you prefer.

To install Yarn: `npm install --global yarn`

Then:
```
# Creating Strapi project:
yarn create strapi-app bs-back
# > Use 'Quickstart' if you want default settings with a Sqlite database
# > Choose your installation type Custom (manual settings)
# > Choose your preferred language TypeScript
# > hoose your default database client postgres
# > Database name: bs-back
# > Host: 127.0.0.1
# > Port: 5432
# > Username: postgres
# > Password: demo
# > Enable SSL connection: No

# Open directory
cd bs-back

# Running Strapi
yarn develop
```

If you choose a PostreSQL database, unfortunately that doesn't work : `error: connect ECONNREFUSED 127.0.0.1:5432`

This is quite obvious, we first need to create a PostgeSQL database.

## Create a Docker PostreSQL database

[Docker Hub example](https://hub.docker.com/_/postgres) :

```
docker run -dp 5432:5432 --name bs-db -e POSTGRES_PASSWORD=demo -e POSTGRES_DB=bs-back  -d postgres
```

## Run Strapi once again

```
# Running Strapi
yarn develop
```

Your browser should open and redirect you to http://localhost:1337/admin/auth/register-admin, otherwise open it. Look at the domain, "localhost", meaning we are running Strapi on the local machine.

Let's play with the Strapi Back-end! At first it looks a little bit more complex than other solutions, like Netlify CMS:
- Media library: Add your assets here
- Content-type Builder: Define your entity types and relationships
- Content Manager : Add your content using your entity declarations

http://localhost:1337/ shows the state of the server (running).

Nice! This now looks much better and powerful than Netlify CMS. But remember Step 2, we want to create a Strapi Docker image ;)

# Step 4: Data

It's time to create a new schema and add some data to our CMS. To keep it simple we will create a blog (very common, yeah I know).

## Schema

blog
  -> banner
  -> nbPostsToDisplay
  -> featuredPost
  -> post[]
    -> title
    -> slug
    -> description
    -> banner
    -> date
    -> isVisible
    -> content
    -> category
    -> author[]
      -> firstname
      -> lastname
      -> bio
      -> email
    -> comment[]
      -> name
      -> text
      -> date
      -> answers[] -> comment[]

## Slugs

For the slug we will use [the Slugify plugin](https://market.strapi.io/plugins/strapi-plugin-slugify) to generate it.

```
# Install Slugify plugin
yarn add strapi-plugin-slugify
```

Then you have to create the ./config/plugins.ts if missing:

```
export default ({ env }) => ({
    // ...
    slugify: {
      enabled: true,
      config: {
        contentTypes: {
          post: {
            field: 'slug',
            references: 'title',
          },
        },
      },
    },
    // ...
  });
```

## Data

You can now add some data.

## API

By default Strapi uses REST endpoint, you can also [install a GraphQL plugin](https://docs.strapi.io/developer-docs/latest/plugins/graphql.html#usage).

All [generated endpoints](https://docs-v3.strapi.io/developer-docs/latest/developer-resources/content-api/content-api.html#endpoints) are similar depending on collection or single type, and you can use [parameters](https://docs-v3.strapi.io/developer-docs/latest/developer-resources/content-api/content-api.html#filters) in the URL (filters, sort, limit, start, publication state, locale). Pretty handy.

To get an API token for our future client app, go to Settings >> API Tokens >> Create new API Token.

Copy it for next chapter.

# Step 5 : Let's create this Blazor WASM app

Our app should be:
- Home page with carousel, featured post description, and a list of the description of last x posts
- Post page with post details, authors and comments. URL will be the slug
- Author page with list of posts

cd ..
dotnet new blazorwasm -o bs-front --no-https -f net6.0
cd bs-front
dotnet run

TODO...

# Step 6: Finally creating the Strapi Docker image and docker-compose

TODO...

# Step 7 : Time to host it on Azure Container App

TODO...

# Conclusion

TODO...

# Going further

- [ ] Multi environment schema/data/api
- [ ] Look at database schema
- [ ] Strapi with Gatsbi client
- [ ] Strapi with Next.js
- [ ] Strapi cloud pricing
- [ ] Azure Container Instance
- [ ] API security
- [ ] ...
