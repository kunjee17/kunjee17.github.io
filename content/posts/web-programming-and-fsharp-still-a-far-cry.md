---

title: "Web programming and F# still a Far Cry?"
slug: "web-programming-and-fsharp-still-a-far-cry"

date: 2014-10-09
categories:
- Technical
tags:
- DotNet
- OSS
- Functional Programming
- Functional Web

---

F# is wonderful language. And luckily or unluckily I do Web Programming (now a  days mostly that). So, it is always a preference to use it, wherever possible. But even in 2014 end it is still pain in a**.

 

I did make templates for [Servicestack](https://visualstudiogallery.msdn.microsoft.com/278caff1-917a-4ac1-a552-e5a2ce0f6e1f) and I will continue to support that. But when it comes to real projects they go far beyond templates. 

I recently experimenting on something and obviously I am gonna use templates created by me. I created project and ran it. *Luckily* it ran without any issue. And then I fire nuget update. **Bang!!!** Nuget update reverted with the error of `object reference not found`. I tried to find solution but failed. Then I tried same thing with [Servicestack](https://visualstudiogallery.msdn.microsoft.com/5bd40817-0986-444d-a77d-482e43a48da7) official templates. It worked once and then failed again. 

I thought there is a issue with nuget or updated [tool chain of F#](http://blogs.msdn.com/b/fsharpteam/archive/2014/08/20/announcing-the-release-of-visual-f-tools-3-1-2.aspx). God only knows. So, I checked other ways of updating packages. 

I knew about [paket](http://fsprojects.github.io/Paket/). Either due to some bug or feature it just worked for start. Then I added [emberjs](http://emberjs.com/) via [nuget package](http://www.nuget.org/packages/EmberJS/). And got folder render error. Which is very *typical* to F# projects. I know how to solve it. I normally always keep F# project file open in different text editor for this kinda issues. So, I move few include line here and there to keep same folder in order and solve the issue. Then I added few more JS libs and paket install gives same issue again. 

![](/img/double_facepalm.jpg)

Now, all these issues were not enough that azure deployment is not completed without a little hack I have mentioned in my previous [blog](/2014/03/signalr-nancy-azure-with-fsharp/). For the face last update should solved this issue but it is not working. May be feature is not completed or may be it is just me.

And above complete exercise took more than 7 hours and I deleted and added project more than 5 times just to make it work. Just to make the damn ***Hello World*** work. That is it. Nothing more and nothing less. I was exactly feeling like ![](/img/rockypunched.jpeg).

After that I changed project structure again and put a C# project as front and F# as library project. Just to make nuget happy. And also the Azure happy. As I don't want to mess around project files and want to write some code. I guess that is more important then hacking around tool chain. 

I know F# is far ahead of its time. It is a next gen language. But it is also a old enough language to have proper visual studio support. It should be supported and loved as any other language on .Net framework. At least from the tool chain point of view. I can always have work around but writing code in pure project in single language is always a fun. 

> Please let me if I missed anything. Or making mistake on my side.

Things are improving fast and hopefully it will be at the same level where all language can find common ground. Hoping and waiting for [VNext](http://www.asp.net/vnext) support now.