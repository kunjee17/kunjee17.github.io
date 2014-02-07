---
title: When Servicestack meet F# via Side Waffle
metadescription: Making a new Servicestack template with Side Waffle
category: Functional Programming, Functional Web, Technical, Web
layout: post
published: true
---

I have specific love for [Servicestack](http://servicestack.net/) and that is known thing. It is not because it is awesome or the ways it do web service things, no one else is doing. But because of my past with WCF. It is so rocky that I never want to go back.  And more over [Servicestack](http://servicestack.net/) doing hell lot of the things under the cover, and that is also without doing any damn thing into **XML**. 

> Hell, yes.. No XML... 

Ok, I can write on and on for [Servicestack](http://servicestack.net/) but for now it is not the topic. Topic is about [Shaving the Yak](http://www.hanselman.com/blog/YakShavingDefinedIllGetThatDoneAsSoonAsIShaveThisYak.aspx). There are many hatters of Visual Studio and its project file. I also don't mind sometimes joining the league. But for most of the cases it is doing many things, that we need to do otherwise.

And I am saying this because I have done this while creating templates for  [Servicestack](http://servicestack.net/). My first experience is damn flow less.

I created one sample application and [Daniel Mohl](http://blog.danielmohl.com/) did the mojo jojo part. And template is up and running. But after that he was little bit busy with day job so I got that task. And first challenge was to run [Servicestack](http://servicestack.net/) with F#. Console application is pretty easy as I have done it [earlier too](https://github.com/kunjee17/ServiceStackHeroku) and deployed it to [Heroku](http://servicestackheroku.herokuapp.com/). But with Asp.Net it was giving weird issue. After struggling for two weeks and asking community over twitter, I got answer from [stackoverflow](http://stackoverflow.com/questions/21213363/servicestack-razor-page-is-getting-added-to-content). Damn silly mistake. I copy pasted code from self host and that is spinning up two server. Once solved I was so happy. 

But next thing is waiting for me is to make is template. I was having no idea how to do that. Other than I was having link where to give pull request. At this point [Side Waffle](http://sidewaffle.com/) came to rescue. Just a 5 minutes video and you are done. 

Ok, I do got some hiccups, like I was unable to created project at first. But then I did *hacking* , lamest one. Did copy paste of other working project, removed their data and insert mine. And it was working.  Obviously this was not the best way but for now it is working. And I am the happy one for now. 

At last I have given my first pull request to ***F# Community*** project. Yes, Yes, Yes... It is time for celebration. This can not be possible without a wonderful helping community over github, twitter, stackoverflow. 

> But two things are certain from my experience that Yak Shaving is pain in a##, and [Side Waffle](http://sidewaffle.com/) is flow less in saving it. 

I will highly encourage people having .Net Open Source project, please do make template and provide the boiler plate code. It will be hell easy to get started in that way. And it will save time from doing initial set up to get up and started. 

> **Update:**  Currently I am putting together V4 templates at my [repo](https://github.com/kunjee17/ServiceStackFSharp).  And again facing issue to make Asp.Net version running. 

Right now I am waiting for my pull request to get accepted. Once done, do have a look. You will see that F# and Servicestack are made for each other. Both are strongly typed, believed in message driven design and async model of working. 

In current state where everyone is making API, this is most *viable* option for .Net people to have. 

> Template is currently having V3.71, it is still under MIT. 

Even if someone like to move to V4, that is also not that costly option for the worth Servicestack bringing to development. Once I ll get up and running V4, I will put the template of that too. 

> Community members, if there are any suggestion, comments please do provide. And obviously I am happy to take pull request for my template projects too. Different combinations of Servicestack option will be great. Also, if someone can check out issue that will be also great.

Thanks F#, Servicestack and specially Side Waffle. 