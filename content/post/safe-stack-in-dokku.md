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

Every one knows about [SAFE STACK](https://safe-stack.github.io/), if you don't please do check it out. It is may be the only `cool` thing about current DotNet part; that also includes new and shiny dot net core as well.

If you go to documentations, there are couple of [deployment options](https://safe-stack.github.io/docs/template-docker/). It works like charm specifically with docker.

You deploy docker image to public / private docker registry or create a private azure registry and store it there. You can pull your image from registry and load it azure container service. Boom your application is up and running. Not that difficult. Only thing I found annoying is I need to go and deploy tags manually for now.

> Yes, I can keep a latest tag as well and start continues deployment but for no reason I didn't like `latest` tag. It just increase ambiguity for me.

But again for most cases it work. You can always use CI/CD solution for all this. It will surely make things more easier as things are getting built at someone else's machine. But that would be over kill for small application or experiments.

Let's go back few years with azure web sites. The one good thing about azure web sites was / is [kudu](https://azure.microsoft.com/en-in/resources/videos/what-is-kudu-with-david-ebbo/). Your git push will trigger build and deploy process. I was able to use [paket](https://fsprojects.github.io/Paket/) instead of nuget in build process. Quite versatile if you know what you are doing. But many times I end up spending time debugging more on azure then my application. Now, let's go even back, there was something called [Heroku](https://www.heroku.com/). It is still there but not using it anymore because of pricing changes. Heroku used to do similar thing as Kudu, you `git push heroku master` and it will build and run application. It also manages database, cache instance for you as well. Make things so much simple to getting started. I kind of always missed that even in Azure.

But no worries; [Dokku](http://dokku.viewdocs.io/dokku/) is there. You can start by deploying it to your favorite cloud provider, there are many options available. I will talk about Azure here. It is as simple as [clicking a button](https://github.com/azure/azure-quickstart-templates/tree/master/dokku-vm) literally. Be careful when press `Deploy to Azure` it by default select D series VM. It is good for production and may not fit your `free` plans so better change it to A or B series which are good for testing. I am running **A2_V2** VM for testing my applications. Give the names and set up ssh key which you already have in your machine. This way you can easily `ssh` to Dokku machine. It is always good to assign *domain* to your server. Make things easy to use and manage. Here is wonderful video by Rob Conery on how to set up Dokku

<iframe width="560" height="315" src="https://www.youtube.com/embed/O6p7g59Ccj8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Now back to Safe Stack.

If you read the documentation in Dokku, you will see that you will required build pack to run your application. But there is another way buried in those docs. If you have `Dockerfile` in your project and don't have build pack then it will pick up docker file to build. Dokku internally run the docker to manage and run different applications in isolated environment. So, instead of build pack saying what to do; I am just giving `Dockerfile` to do that.

When you generate Safe Stack with docker option, it will set you up with below docker file

```dockerfile
FROM microsoft/dotnet:2.1-aspnetcore-runtime-alpine
COPY /deploy /
WORKDIR /Server
ENTRYPOINT [ "dotnet", "Server.dll" ]
```

Very simple Docker file. Pull the aspnet core runtime and run the server application. But it might not be enough for Dokku as we need to build application on server.

Here is Dockerfile that would be required

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

It is doing little bit more things here. `vbfox/fable-build:stretch` is having mono, node and dot net core installed. So, you can start building application right away. Install npm dependency, install paket dependency, run a bundle command to build and bundle everything. After that do what we were initially doing; have a runtime and run the application. All this dokku will do for you and few other things by default. You can always customized everything, just add a specific file and Dokku will pick that up for you.

Means after you think your work is done, you can fire command `git push dokku master` where dokku is remote pointed to `dokku@mydokku.me:samplesafeapp`. Don't forget that *dokku* username before your server, else thing will fail. If you are getting permission issue then it must be ssh one. You just need to add your public ssh to dokku server and it will allow you to push your code. First build might take more time as it will download around 3.29 GB for you.

I can't say if this is the best option you have, but it surely good if you like to have a `git check in` friendly sever around. And Dokku do handle SSL, Scaling, No Downtime Update for you so it is quite production ready as well.

Give it a try, I am pretty sure you will like it.

> Need help for SAFE STACK, I m very much happy to help and also available for consulting. Drop a message, will be more than happy to have a word.
