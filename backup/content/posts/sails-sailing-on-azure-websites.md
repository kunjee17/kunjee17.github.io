---

title: "Sails sailing seamlessly on Azure Web Sites"

date: 2014-11-07 
categories:
- Technical
tags:
- OSS
- Web
- NodeJS

---

There are lots of [frameworks](http://nodeframework.com/) for web development in [Nodejs](http://nodejs.org/). Many of them are pretty cool. I pretty much like the [SailsJS](http://sailsjs.org/#/). And also have worked on that in recent past. 

Now, when it comes to hosting I love the [Azure](http://azure.microsoft.com/en-us/) for various reasons. It is specially awesome when it comes to web sites. You do some experiments and throw it towards azure and that is ready for world to check out. My many experiments with [F# and Web](/category/functional-web/) are already there. 

 

Recently I was talking with a friend about SailsJS and discussion kinda stuck at deployment part. As it is having kinda manual process involved. It is never a issue to fire a few commands but even why I should waste few key strokes when that can be done by Azure.

> Always a fan of continues integration and continues delivery mechanism 

I searched Google to find out if anyone has done this before. Results showing couple of examples; but all with spinning up VM on Azure and hosting a application. But I think that is to a overkill. 

I tried `sails new` and put a web.config file in root folder and try to published it with web matrix. And web site crashed. ***I still don't recall when things just run without crashing at first shot with me.***

I can see the streaming log (*console.log in nodejs case*) with `azure site log tail <sitename>` and found out that it is not getting node modules. That is weird as I was pushing npm_modules too. 

Then I tried with github repository. And that thing just worked. Without any issue and also directly in production mode. (*I seriously don't know how it switched to production mode. As for production mode I need to pass parameter --prod with app.js*)

> Note: Don't forget to change server.js to app.js in web.config. I guess it is kinda required. I am also skipping npm_modules with gitignore.

Right now first page is running without any issue. So, now it is time to sailing on azure web sites with sailsjs. 

Here is [demo](http://sailslift.azurewebsites.net/) and my [github repo](https://github.com/kunjee17/sailslift). Feel free to clone and give PR with some demo application. I seriously like to see how far it can go.

Let me know if any further details are required.