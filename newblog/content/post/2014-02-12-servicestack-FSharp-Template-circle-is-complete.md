---

title: ""
keywords:
- 

date: 
categories:
- 
tags:
- 

title: Servicestack F# template Update. Circle is Complete.
metadescription: Description of Servicestack template with F#. Also, how to update from V3.71 to V4 in template
category: Technical,DotNet,OSS,Functional Programming
layout: post
---
Few day's back I wrote a [article](2014/02/when-servicestack-meet-fsharp-via-sidewaffle/) about how I created [side waffle](http://sidewaffle.com/) templates for [Servicestack](http://servicestack.net/). 

Yesterday, [Daniel Mohl](http://blog.danielmohl.com/), merged the pull request. Add the missing bits make it working and it is up on [visual studio gallery](http://visualstudiogallery.msdn.microsoft.com/278caff1-917a-4ac1-a552-e5a2ce0f6e1f). I seriously like to thank Daniel for this work and support even after his own hectic schedule of day job. And a wonderful members of [F#](http://fsharp.org) community. 
 
Here, I am sharing few details of the template, I have created. 

There are four templates available now. 

1. Servicestack with Asp.Net host
2. Servicestack with Asp.Net host and Razor Engine
3. Servicestack with Self host
4. Servicestack with Self host and Razor Engine

I was working on Asp.Net MVC with Servicestack but then work in still progress. As, most of the people who are using servicestack can go with above options as Razor view engine now available. 

> Just try out all options and pick which suits for specific need.

Now, all templates are using **3.71** version of SS. As, it is the last version under MIT license. Why I am using that?

<blockquote class="twitter-tweet" lang="en"><p>oh dear, adding task to remove servicestack from solution <a href="https://t.co/STpdEKQiJC">https://t.co/STpdEKQiJC</a></p>&mdash; Simon Cousins (@simontcousins) <a href="https://twitter.com/simontcousins/statuses/408182117579776000">December 4, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

People who are starting, or just like to stay with older version till the product kick off. They can continue with **3.71**.  And else it is a wonderful solution, that is worth [buying](https://servicestack.net/pricing). 

> Do take care while fire up command of update-package without thinking a bit. If there is a need of using old version **PLEASE** don't update it.

What if someone like to update from 3.71 to 4.X. There are couple of breaking changes there. Here are the steps to make it work. 

Download the template from the [Visual Studio gallery](http://visualstudiogallery.msdn.microsoft.com/278caff1-917a-4ac1-a552-e5a2ce0f6e1f) and install it. 

> Yes, it will also work with latest express version too. 

Create new project and choose any template. Select OK. It is done. Easy enough right? 

Press F5, and it will work with "Hello World" code. 

> Code may seems little dirty. It misses comments and also read me. It will be there in future updates. 

But current code is so less that it will be not that problematic to understand it. Obviously if you know [Servicestack](http://servicestack.net) or [F#](http://fsharp.org) a little bit. 

##Things needed to update the version

- Fire a update command from nuget
- There are chances that one need to fire it more than one time, check package.config that all versions are updated to same version
- Remove all the *.cs files and unwanted .htm, .js, .css files for now
- Now there will be some errors about namespace, remove unwanted namespace as code is merged to base namespace for many files
	- remove ServiceStack.ServiceInterface
	- remove ServiceStack.ServiceHost
	- remove ServiceStack.WebHost.Endpoints
- Rebuild it and run it. 
- If we get error about Razor pages, remove 1.0.0.0 version line from web config if there is 2.0.0.0 one is already there else change 1.0.0.0 to 2.0.0.0
- Rebuild and run it.
- Now if there is a error "Object reference not set to an instance of an object." then we are on right track. 
- In AppHost.fs file replace `apphost.Init()` with `apphost.Init() |> ignore` **This is breaking change for V4** please do not forget this.
- Now, we need out namespace so, remove "ServiceStackAspNetHost" with your desired project namespace in entire project including web.config file. 
- Remove any multiple entries of namespace from namespace section in web.cofig file. Do keep one
- Rebuild and run it.

It should work. If still you stuck any where? I am also putting all V4 projects too, over my [github repo](https://github.com/kunjee17/ServiceStackFSharp/tree/master/V4), have a look at it.

I have also started complete series called [Functional Web](category/functional-web/), where I will be putting everything I know to get started. Not only for SS but also for others.

So, as everyone is putting up API for their web application. Why we should stay behind?!?

Feedback and comments are always welcome.

