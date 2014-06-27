---
title: SignalR + Servciestack with F# hosted on Azure
metadescription: Using SignalR framework with F#. Also solve the issue of Dynamic with F#. That is running along side with web service framework Servicestack. 
layout: post
category: Technical,DotNet,OSS,Functional Programming, Functional Web, Web
published: public
---

This may be nastiest thing I have done with deployment after a long time. There is no problem with making it work. But deployment on azure is a serious issue. And **luckily** I completed that. Yes, there is a luck involved.  

<!--excerpt-->

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

If things still not work here is my [github repo](). Have a look at code.         