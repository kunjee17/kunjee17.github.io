---
title: Servicestack F# template. Starting from the Start.
metadescription: It is all about getting started with service stack without any template. 
category: Technical,DotNet,OSS,Functional Programming
layout: post
---

I have already wrote a blog [post](/2014/02/servicestack-fsharp-template-circle-is-complete/) about how to get started with service stack if any one is using templates. It is pretty easy. Just install and run.

But as [Service Stack](http://servicestack.net/) is moved to V4 with some breaking changes. I had give details about updating it. But still it is little bit more complicated or confusing if I can say.

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/kunjee">@kunjee</a> Sure, otherwise a tutorial on getting SS v4 + F# together without templates would be better than starting from a broken v3 one.</p>&mdash; Demis Bellot (@demisbellot) <a href="https://twitter.com/demisbellot/statuses/433545493738582016">February 12, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Above is the conversation inspired me to write this blog. And also it will be fun to write back stories. 

So, if any one want to get started with SS without templates. They need to download template of [Nancy](http://visualstudiogallery.msdn.microsoft.com/b55b8aac-b11a-4a6a-8a77-2153f46f4e2f). Yes, the cousin sibling of SS and other best thing happen to web part of  .Net after .Net it self.

Create new project and select Empty ASP.Net option. And remove all other packages. 

> we are doing this just to save our self from using complicated project GUIDs. If any one wanted to go raw, s/he need to select library project in F# and set GUID so it will be web application.

Now install, SS from nuget. Preferably with Asp.Net host. Use this `Install-Package servicestack.Host.AspNet` . If any one prefer not search nuget.

Now, delete every file with .cs extension. **Yes**, we are doing it in [F#](http://fsharp.org).

Also, delete default.htm and *.js files. But keep the App_Start folder. We may need it.

It is almost done. Now, create AppHost.fs in App_start folder. Write a namespace you like and copy paste below code.

	type AppHost() = 
	    inherit AppHostBase("Hello F# Service", typeof<HelloService>.Assembly)
	    override this.Configure container = ignore()
	    static member start() = 
	        let apphost = new AppHost()
	        apphost.Init() |> ignore


Now, create HelloService.fs outside somewhere. and copy paste below code.


	[<CLIMutable>]
	    type HelloResponse = 
	        { Result : string }
	
	
	    [<Route("/hello")>]
	    [<Route("/hello/{name}")>]
	    type Hello() = 
	        interface IReturn<HelloResponse>
	        member val Name = "" with get, set
	
	
	    type HelloService() = 
	        inherit Service()
	        member this.Any(request : Hello) = { Result = "Hello " + request.Name }

Now, final settings. Add global.asax.fs file. And copy - paste below code.

	type Global() = 
	    inherit System.Web.HttpApplication()
	
	    member x.Application_Start (sender:Object, e:EventArgs) = 
	        App_Start.AppHost.start() 

We also need to add global.asax file too.

Add this line to it

	<%@ Application Inherits="ServicestackAspNetHost.Global" %>

Do check for namespace name. This my project's namespace. 

Now, you may get error that couple of system references are missing. Please add them. I got for System.data and also for System.xml.linq

> F# visual studio project is poor with compilation sequence. So, do keep open project file in your favorite text editor. If there is some error like "xyxy" is not defined. Most of the time it is compilation sequence.

If everything builds. It is out first victory. Run it. It should show, metadata page of SS.

It is done for people just wanted to create back end for their single page application or mobile application or thick client. 

For complete web story lets add razor engine to it. Fire `Install-Package ServiceStack.Razor` in package manager.

Add Default.cshtml file. Add some html text to test.

Now, here is complicated part. We can't add folder in F# projects. But as it is Asp.Net web project too, we can add Asp.Net project folder. Add one of the folder and rename it to *Views*.

Add two files. One is _Layout.cshtml and other is Hello.cshtml. Don't forget to set compile type content for all cshtml files. 

Here is content for _Layout.cshtml

	<!doctype html>
	<html lang="en-us">
	<head>
	    <title>@ViewBag.Title</title>
	    <style type="text/css">
	        body {
	            background: #E6E6E6;
	        }
	    </style>
	</head>
	<body>
	    @RenderBody()
	
	    <h6 style="font-size:12px; color: #999; position: fixed; bottom: -25px; right: 10px;">
	        @Env.ServerUserAgent
	    </h6>
	</body>
	</html>


And here is content for Hello.cshtml


	@using ServiceStackAspNetHost
	@inherits ViewPage<HelloResponse> 
	@{
	    Layout = "_Layout";
	    ViewBag.Title = "Hello Page";
	}
	
	<div>
	    Hello Page
	    <a href="/hello">Default Hello</a>
	    <a href="/hello/fsharp">Hello With get Request</a>
	
	
	    <br />
	    <br />
	    <p>Model binding with DTO Response</p>
	    <p>@Model.Result</p>
	
	</div>


Pretty much same as we do in C# projects. 

We are almost done. Now we need to tell AppHost to add razor plugin. Change code as below

	override this.Configure container =
	            this.Plugins.Add(new RazorFormat())
	            ignore()

Now, rebuild and run it. It will show default page on "/" location and Hello page on "/Hello" location. Even you can access metadata page too.

Not that tough I guess. A little bit more code then normal one but as in F# it will be same as normal code in C#. 

> I love SS that is true thing, but I love Nancy too. Will not lie on **Valentine's Day**. Just to clarify as I used Nancy template to work with SS. If I have to do some web application work Nancy is weapon of choice and for API like thing SS is always there. People who created both are damn smart and more importantly friendly one. In .Net where OSS and OSS community story is not that good, these people are making the difference. Obviously I can't forget to mention F# community, they are awesome.