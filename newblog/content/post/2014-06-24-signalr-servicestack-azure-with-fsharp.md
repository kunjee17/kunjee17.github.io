---
title: ""
keywords:
- 

date: 
categories:
- 
tags:
- 

title: SignalR + Servciestack with F# hosted on Azure
metadescription: Using SignalR framework with F#. Also solve the issue of Dynamic with F#. That is running along side with web service framework Servicestack. 
layout: post
category: Technical,DotNet,OSS,Functional Programming, Functional Web, Web, Azure
published: public
---

This may be nastiest thing I have done with deployment after a long time. There is no problem with making it work. But deployment on azure is a serious issue. And **luckily** I completed that. Yes, there is a luck involved.  

 

If you read my previous [entry](/2014/03/signalr-nancy-azure-with-fsharp/) for running Nancy and SignalR together. Then most of the things are same only.

Use [Servicestack template](http://visualstudiogallery.msdn.microsoft.com/278caff1-917a-4ac1-a552-e5a2ce0f6e1f) to create project. Remove global.asax & global.asax.fs (*yes remove it!*). Install SignalR asp.net package from [nuget](www.nuget.org/packages/Microsoft.AspNet.SignalR/). And copy paste below code in AppCode.fs

	namespace ServicestackSignalRFSharp.App_Start
	    open ServiceStack
	    open ServiceStack.Common
	    open ServicestackSignalRFSharp
	    open ServiceStack.Razor
	    open System
	    open Owin
	
	
	    type AppHost() = 
	        inherit AppHostBase("Hello F# Service", 
	                                        typeof<HelloService>.Assembly)
	        override this.Configure container =
	            Diagnostics.Trace.TraceError("In servicestack configure");
	            this.Plugins.Add(new RazorFormat())
	            ignore()
	
	       
	        static member start() = 
	            let apphost = new AppHost()
	            Diagnostics.Trace.TraceError("In servicestack start");
	            apphost.Init() |> ignore
	
	    type Startup()=
	        member x.Configuration(app : Owin.IAppBuilder) = 
	            AppHost.start()
	            Diagnostics.Trace.TraceError("In signalr startup");
	            app.MapSignalR() |> ignore        
	
	
	    [<Microsoft.Owin.OwinStartup(typeof<Startup>)>]
	    do ()


*Don't forget to rename the namespace as per your project namespace.*

As per my Nancy article changed the index.cshtml to get signalR client running. Once done run it. It should work hello world of [Servicestack](http://servicestack.net) and Hello Chat from [SignalR](http://signalr.net). 

If things still not work here is my [github repo](https://github.com/kunjee17/ServicestackSignalRFSharp/). Have a look at code. And also it is deployed over [azure](http://servicestacksignalrfsharp.azurewebsites.net/).

###My Personal Experience###
One thing I like to clear it upfront. Even though I was able to run Servicestack and SignalR together but they are still running differently under the hood. Servicestack is hitting asp.net directly and signalR is hitting via [OWIN](http://owin.org/). 

I am also not making web service real time. It is just both can easily run together. Making them run together was easy task. But deploying on azure is a serious pain in a**. 

> Yes, azure is. It is so damn easy to deploy traditional imperative C# project as azure web site but functional F# project. It is like giving death by a thousand cuts. You solve one issue and another issue came. Just like *pipeline* operator. 

It is more like whatever F# is compensating by making development easy, deployment is making it even. 

That is the same with above code. global.asax.fs is working in local, I can even put a break point but it is not working on azure. I put a trace in every possible function and at last find out. (Special thanks to [Demis Bellot](https://twitter.com/demisbellot) for pointing out this possible issue.) 

Even though F# is picking up new height, and I personally contributed and will continue to contribute in templates. But if someone want to take full advantage of F# in web development ***today*** with cloud then s/he need to make one C# project and point F# to them. Just to get best of both worlds. 

> Yes, C# is still far better when it comes to csproj file. o_O

As usual working with functional language is always fun experience and now we have web service that we can scale with real time icing.

So, now. 

> Servicestack |> Razor |> SignalR |> Azure (with little hiccups) |> F# |> lots of love.