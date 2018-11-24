---

title: "Safe Stack in Dokku"
slug : "safe-stack-in-dokku"

date: 2018-11-02
categories:
- Technical
- DevOps
tags:
- OSS
- FSharp
- Functional
- Dotnetcore
- Docker
- Dokku
---

Everyone knows about the [SAFE Stack](https://safe-stack.github.io/), if you don't please do check it out - it's a great way to do full-stack web development in F#, and may be the "coolest" thing about .net these days.

If you go to the documentations, there are couple of [deployment options](https://safe-stack.github.io/docs/template-docker/). It works like a charm especially with docker.

You can deploy the output docker image to a public / private docker registry, or create a private Azure registry and store it there. You can pull your image from registry and load it into azure container service. **Boom!**, your application is up and running. Not that difficult. The only thing I found annoying is that I need to deploy tags manually (for now?).

> Yes, I can keep a latest tag as well and start continuous deployment, but for no reason I didn't like `latest` tag; this just increases ambiguity for me.

But, for most cases it works. You can always use CI/CD solution for all this. It will surely make things more easier as things are getting built on someone else's machine. But that would be over-kill for small applications/experiments.

Let's go back few years and discuss traditional Azure Websites. One good thing about azure web sites was / is [kudu](https://azure.microsoft.com/en-in/resources/videos/what-is-kudu-with-david-ebbo/). Your git push will trigger build and deploy process. I was able to use [Paket](https://fsprojects.github.io/Paket/) (an alternative to and wrapper around NuGet) instead of NuGet in my build processes. Quite versatile if you know what you are doing! But, many times I end up spending time debugging more Azure issues than issues in my application. 

Even further back, there was (and still is) another "easy deployment" solution called [Heroku](https://www.heroku.com/). Similar to working with Kudu, you would `git push heroku master`, and it would build and run the application. Additionally, Heroku manages a linked database and satsifies some caching needs for you! This felt much simpler to me than working with Azuer trying to resolve these things. Heroku is still around, but due to pricing changes, I prefer other solutions...

But no worries; [Dokku](http://dokku.viewdocs.io/dokku/) is here! You can start by deploying it to your favorite cloud provider, there are many options available. I will talk about Azure here. It is as simple as [clicking a button](https://github.com/azure/azure-quickstart-templates/tree/master/dokku-vm) literally. Be careful when press `Deploy to Azure` it by default select D series VM. It is good for production and may not fit your `free` plans so better change it to A or B series which are good for testing. I am running **A2_V2** VM for testing my applications. Give the names and set up ssh key which you already have in your machine. This way you can easily `ssh` to Dokku machine. It is always good to assign *domain* to your server. Make things easy to use and manage. Here is wonderful video by Rob Conery on how to set up Dokku

<iframe width="560" height="315" src="https://www.youtube.com/embed/O6p7g59Ccj8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Now, back to the SAFE Stack.

If you read the documentation in Dokku, you will see that you will required build pack to run your application. But, there is another way buried in those docs. If you have a `dockerfile` in your project and don't have build pack, then it will utilize the `dockerfile` rather than the default option. Internally, Dokku runs the docker to manage and run different applications in isolated environments. So, instead of build pack saying what to do; I am just giving `dockerfile` to do that.

When you generate a SAFE Stack application (with the `dotnet` template) with docker option, it will set you up with below docker file

```dockerfile
FROM microsoft/dotnet:2.1-aspnetcore-runtime-alpine
COPY /deploy /
WORKDIR /Server
ENTRYPOINT [ "dotnet", "Server.dll" ]
```

A very simple Docker file - pull the aspnet core runtime and run the server application. 
But, it might not be enough for Dokku as we need to build application on server.

Here is a `dockerfile` that better fits Dokku's needs:

```dockerfile
FROM vbfox/fable-build:stretch AS builder

WORKDIR /build

RUN dotnet tool install fake-cli -g
ENV PATH="${PATH}:/root/.dotnet/tools"

# Package lock files are copied independently and their respective package
# manager are executed after.
#
# This is voluntary as docker will cache images and only re-create them if
# the already-copied files have changed, by doing that as long as no package
# is installed or updated we keep the cached container and don't need to
# re-download.

# Initialize node_modules
COPY package.json yarn.lock ./
RUN yarn install

# Initialize paket packages
COPY paket.dependencies paket.lock ./
COPY .paket .paket
RUN mono .paket/paket.exe restore

# Copy everything else and run the build
COPY . ./
RUN rm -rf deploy
RUN fake run build.fsx --target Bundle



FROM microsoft/dotnet:2.1-aspnetcore-runtime-alpine
# here I am not putting everything in root instead directory app created
WORKDIR /app
COPY --from=builder /build/deploy ./
# here I have to map it to server directory
WORKDIR /app/Server
EXPOSE 8085
ENTRYPOINT [ "dotnet", "Server.dll" ]
```
ref: [Continuous Deployment of SAFE apps on linux server](http://jindraivanek.gitlab.io/blog/2018-10-22-FAKE-continuous-deployment/)

It is doing a few more things here... `vbfox/fable-build:stretch` installs mono, node, and .net core. So, you can start building application right away. 

Install npm dependencies, install paket dependencies, run a bundle command to build and bundle everything. After that, we do what we were initially doing: have a runtime and run the application. You can always customize everything; just add a specific file and Dokku will pick that up for you.

So, after your work is done, you can fire command `git push dokku master` where Dokku is a [remote repository](https://help.github.com/articles/about-remote-repositories/) pointed to `dokku@mydokku.me:samplesafeapp`. Don't forget that *dokku* username before your server, else thing will fail. If you happy to get permission issues, it's likely to deal with SSh permissions... you just need to add your public SSH key to the Dokku server and the permissions issue should resolve. Your first build might take a bit of time, as it will download around 3.29 GB for you. :)

I can't say if this is the best option you have, but it surely good if you like to have a `git check in`-friendly sever around. And Dokku does handle SSL, scaling, and no-downtime updates, which makes it a production-ready platform.

Give it a try, I am pretty sure you will like it.

> Need help working with the SAFE Stack? I m very much happy to help, and am also available for consulting. Drop a message, and I'll be more than happy to have a word.
