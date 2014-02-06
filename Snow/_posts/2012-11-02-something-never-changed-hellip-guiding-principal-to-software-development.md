---
title: Something Never Changed!!! Guiding Principles to Software Development
metadescription: Software development principles re-written with all the links and details.
category: Technical,DotNet,Opinion
layout: post
---
I am particularly a lazy guy. I don’t work hard, stay back and never show sad face to issue or bug. Obviously many don’t like me for this. But again “who cares?”. But one thing is sure for me, I always ready to learn new things and obviously always work for better code. At the end of day it is just a code, bugs will be there and me too , to solve the issue.

Here, I mentions new things, but in reality it is not possible all the time that I will get new things. Some time I will get old things to take care off. Or something that never changed. I was reading old articles from [Hanselman][1] , now a days he is putting more preference over high quality article. So, his articles are not coming daily basis. So, one day I was wondering towards the [hit series of articles][2] and I found “ [some guiding principles for software development][3] ”. And again as per suggestion again from [Hanselman][4] I [read later][5] it.


Now, I was working on something and just to get refreshed I was checking my [Instapaper][6] and found this one. I was reading it. First thing I noticed is that it was written in 2007; even before I was a certified software engineer. As, I normally don’t read historical article that much but I read this. And that surprised me!!! Nothing is changed at all. Principles are same even after 5 years of this articles. And when they written it was there only. And also one thing is not changed too, we are not following most of them… (saying from the personal experience). For a change now a days I tried to follow them…

<!--excerpt-->
So, I thought I should re-write this article in context of current technology. I am also going to put links of tools but this is my personal preference obviously in context of Dot Net only. I start learning [Ruby on Rails][7] but again I am not that good in that.

A original posts are from [Patrick Cauldwell][8] and [Scott Hanselman][3] . Be sure to visit the original work.


*   **Our “Guiding Principles”** 
*   Test Driven Development
*   TDD / BDD always give confidence for our own written code. Couple of frameworks available for that. For TDD [NUnit][9] and [XUnit][10] are there. And for two types of BDD [Specflow][11] and [NSpec][12] are there. 

*   Continues Integration
*   This includes testing for complete application and also UI automation using framework like [Selenium][13] (Visit [Amir Rajan][14] to check out wonderful video of UI automation) 
*   I prefer to checkout blog from [Amir Rajan][14] and podcast from [hanselminutes][15] to check this topic. 

*   **Unit Tests** 
*   Two kinds of tests
*   Unit test is what that test code written by **us,** so it is not dependent over external entities like SQL or Web Service etc 
*   Integration test, it dependent on SQL and Web Service like external entities and check our code in reference to over logic

*   Automation is equally possible for both type of test
*   Again I like to mention post by [Amir Rajan][14] which show how to do automation. 
*   As a thumb rule said by [Hanselman][4] whenever we need to repeat things or even have to do copy paste we should automate things. 
*   There are many tools available for Visual Studio to automate testing (you need to hack little bit for Express Edition)

*   All UI development should follow MVC/ MVP pattern for ease of testing
*   [MVC][16] is specifically design for better testing support 
*   Even if you are using Asp.Net Web Forms I strongly recommended [MVP][17] framework to implement to support more code coverage for testing 
*   Even for [Javascript][18] this is true as many client side frameworks are available like [Jasmine][19] and [Qunit][20] 

*   **Test Coverage** 
*   90% %2B should be the goal including UI logic written in JavaScript
*   Again many tools are available for code coverage so not listing here. NCover is there by Default in Visual Studio higher version

*   **Buy, Not Build** 
*   Take full advantage of the platform, even if only solves the 80% case (Most of the time we don’t know library functions available that leads to copy of code and rewriting functionalities )
*   Don’t write single line of code that you don’t have to (in software engineering one has to be lazy, if you are staying back working you’re a** of, then definitely you are not writing good code)
*   Take full advantage of .Net 4.0 / .Net 4.5 and also plan – test for Windows 8 (we are working for the future so, it must work on future/current releases of platforms )
*   Don’t invent new solution for solved problems (in case of Dot Net [nuget][21] is there, just checkout that your problem is solved by community members, if yes use them and if no solve and share with community… these OSS libraries increase productivity like anything) 

*   **Limit compile time dependencies on code you don’t own** 
*   Everything that is now owned by **us** should be behind interface and a factory method (I also like to mention a wonderful [article series][22] to understand concepts like interface) 

*   **Define your data contracts in C# (think ‘active records’)** 
*   All persistence storage should be abstracted using logical interfaces
*   Here we can use ORM like [Ormlite][23] , [Dapper][24] , [EF][25] and few others to achieve this 

*   **Fewer assemblies are better** 
*   There should be very good reason for creating a new assembly
*   The assembly is a smallest deployable unit, so it’s not only worth creating a new assembly if it means NOT shipping something else
*   Namespace != assembly name. Roll up many namespaces into one physical assembly if they all must be deployed together
*   As a thumb rule again said by [Hanselman][4] , domain driven and / or isolated design is only useful when we have a **VERY** good knowledge of domains else it just increase number of assemblies to manage 

*   **Only the public interface should be public** 
*   Only make classes and interface public if absolutely necessary
*   Testing can be done by using internal visible to attribute
*   Good use of internal can avoid public issue for classes and functions
*   If its public, need to provide support for life time
*   Also like to mentions a line from [Jon Skeet][26] , “Any software/application should be code as we are coding API” 

*   **Authentication** 
*   Authentication should be abstracted from the application.
*   We can use [WIF][27] , and token should be used to talk with other entities like Web Service 
*   4.5 version framework (Asp.Net Framework) provides many options for Authentication/ Authorization that can be used here.

*   **Tracing** 
*   Think long and hard about trace level
*   Use formatted resource strings everywhere for localization (Now a days localization is must for any commercial application, abstraction of that always help in long run)
*   For critical, error or warning , your audience is not a developer

*   **Error Handling** 
*   Error handling is not just putting try / catch everywhere or anywhere that I called error hiding
*   Method names are verbs
*   If anything breaks the contract, throw an exception

*   **The definition of “Done”(or how do I know when a task is ready for QA?)** 
*   Any significant design decisions have been discussed and approved by **team** (In agile team takes the decisions, so there is always a scope for saying **NO** to business guys for new functionalities to implement runtime) 
*   For each MyClass, there is a corresponding MyClassFixture in the corresponding test assembly, it also includes same for UI part using java script framework
*   MyClassFixture exercise all the functionality of MyClass nothing else, single responsibility is true ever for test classes
*   Code coverage of MyClass is =&gt;90% , excluding only lines you are confident are unreasonable to test
*   No compiler **warning** are generated by new code (warnings are equally important like error, you can ignore if you are doing POC or college project. In Visual Studio warnings are generated after completing code analysis. It should be on all the time and personally I prefer to set not to allow ‘run’ if warning is there) 
*   Before committing anything to source control, update to get all recent changes, and make sure all unit and integration tests pass
*   Compiling with warnings as errors will flush out any place you forgot documentation comments, which must be included for any new code

This is just a try to list our frameworks and new technology with this g/old guiding principals. Do let me know if anything is there to CRUD for this list.


This list in my **learn by heart** part. Basically these points force to do good software practice.

 [1]: http://www.hanselman.com
 [2]: http://www.hanselman.com/blog/GreatestHits.aspx
 [3]: http://www.hanselman.com/blog/SomeGuidingPrinciplesForSoftwareDevelopment.aspx
 [4]: http://www.hanselman.com/
 [5]: http://www.hanselman.com/blog/InstapaperDeliveredToYourKindleChangesHowYouConsumeWebContentPlusIFTTTBlogsAndMore.aspx
 [6]: http://www.instapaper.com
 [7]: http://rubyonrails.org/
 [8]: http://www.cauldwell.net/patrick/blog/ThisIBelieveTheDeveloperEdition.aspx
 [9]: http://www.nunit.org/
 [10]: http://xunit.codeplex.com/
 [11]: http://specflow.org
 [12]: http://nspec.org/
 [13]: http://seleniumhq.org/
 [14]: http://amirrajan.net/
 [15]: http://www.hanselminutes.com/339/continuous-delivery-with-jez-humble-and-martin-fowler
 [16]: http://asp.net/mvc
 [17]: http://webformsmvp.com/
 [18]: http://vanilla-js.com/
 [19]: http://pivotal.github.com/jasmine/
 [20]: http://qunitjs.com/
 [21]: http://nuget.org/
 [22]: http://simpleprogrammer.com/back-to-basics-series/
 [23]: https://github.com/ServiceStack/ServiceStack.OrmLite
 [24]: https://github.com/SamSaffron/dapper-dot-net
 [25]: http://msdn.microsoft.com/en-us/data/ef.aspx
 [26]: https://twitter.com/jonskeet
 [27]: http://msdn.microsoft.com/en-in/security/aa570351.aspx