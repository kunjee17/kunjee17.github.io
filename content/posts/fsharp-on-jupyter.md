---

title: "F# on Jupyter"
keywords:
- jupyter
slug: "fsharp-on-jupyter"
date: 2019-12-17
categories:
- Technical
tags:
- DotNet
- OSS
- Functional Programming
- Dotnetcore
- FSharp
- FSAdvent
---

> This blog is part of FSAdvent F# calendar 2019.

[Jupyter](https://jupyter.org/) has been around for ages. The data scientist's one of the favorite tools. Kind of best thing to write words, equations and result in the best possible manner. F# is and was a poster child for DotNet to do Data Science. I never liked the poster child part but still, it is what it is. I 'll come to that little later on.

F# was also not far behind. My first accounter of Jupyter like thing for F# is "try F#". Old silver light version. And then Data Scientists in the community haven't stayed behind. They create super awesome [iFSharp](https://github.com/fsprojects/IfSharp) binding for Jupyter.

Recently things move forward and dot net core stared Jupyter officially. For C# and F# both.

I wanted to try, so I was going through [Scott Hanselman's blog](https://www.hanselman.com/blog/AnnouncingNETJupyterNotebooks.aspx), for set up and details. There was a simple C# example and then there F# example with *CHARTS* . I was like please don't do this. F# is good for Data Science but it is also good for General Purpose language. And every time people show an example of F# with Data Science, I feel like they are typecasting the language. I feel like we are telling [Jim Carrey](https://en.wikipedia.org/wiki/Jim_Carrey) to do only comedy when he shines like anything in [Eternal Sunshine of the Spotless Mind](https://en.wikipedia.org/wiki/Eternal_Sunshine_of_the_Spotless_Mind).

I think with Jupyter support we can do way more things than Data Science. Let's first go through the setup part.

You can follow the setup details written up in Scott Hanselman's blog or here are simple steps for installations from that blog.

- Install [Anaconda](https://www.anaconda.com/) for simpler Python version management
- Open Anaconda terminal. Or check out if `conda` is working if it is in the path.
- Install global dotnet try. `dotnet tool install --global dotnet-try`
- If already installed then try to update it by reinstalling it
- Check if jupyter in working. `jupyter kernelspec list`
- Install .Net kernel. `dotnet try jupyter install`
- Check the kernel list again. `jupyter kernelspec list`

Now, the real fun starts. Go to this [repo](https://github.com/kunjee17/DesigningWithTypesOnJupyter) and clone it.

Go to the folder and run either `jupyter notebook` or `jupyter lab`. I personally like the later one.

Here I partially converted a very famous series [The Designing with Types](https://fsharpforfunandprofit.com/series/designing-with-types.html) from [Scott Wlaschin](https://twitter.com/ScottWlaschin) to Jupyter. It is like a live blog. And fun things if you go to github and click one of the files it will execute things for you on github as well.

It might not be perfect as blogs are not written with Jupyter in mind but still, it is way better to learn new concepts. Reading and trying out things there and then make things more fun and easy to grasp.

> Scott was nice enough to permit me to use his one of the series.

If you like how it looks, you can always give PR for the remaining series and also update the example with more Jupyter friendly code.

It is my take on a new tool. We should use this to learn F# as General Purpose language not only as a Data Science language.

There is a whole Python book converted to read with Jupyter, I guess we can also have one, can't we?
