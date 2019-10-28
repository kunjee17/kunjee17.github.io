---

title: "Shades of F#"
keywords:
-
slug: "shades-of-fsharp"
date: 2019-10-27
categories:
- Technical
tags:
- DotNet
- OSS
- Functional Programming
- Dotnetcore
- FSharp

---

I am writing after a long time for F#. And this would be a little bit controversial post. Take it with a pinch of salt.

Recently I got a call from `some` company who wants me to do some job in F#, for its client. The client took my interview and told that its client wants to do some work in F#. Things were going *smoothly* until the interviewer asked me that I should be writing F# code following standard and design patterns.

I just went to pause, as my brain trying to search Functional Programming Design Patterns. It gave me [Scott Wlaschin's](https://twitter.com/ScottWlaschin) famous answer. In functional programming every design pattern is function. But can't give that answer to the client's operator for sure. So, I gave the other best possible answer.

> You are asking about F# code like Python or F# code like Haskell?

The contract didn't get converted but this post does.

#### Let's start with first shade. F# like typed Python.

If you are old enough to know and write code with *Visual Studio 2012* then go back to that time, and try to remember good talks you have seen to learn F#.

Here are few of my favorites

- [ The Best Introduction to F# by Luca Bolognese](https://channel9.msdn.com/Blogs/pdc2008/TL11), people might point you to many different resources for getting started with F#. But this video is still the best one to get started. Trust me on that.
- ["How machine learning helps cancer research" by Amazing Dr.Evelina Gabasova](https://www.youtube.com/watch?v=vNiyDbcfJDE), one of the gifted speaker in F# and machine learning community. Not only she is a good speaker, but she is also a damn good person, guru, and wonderful friend.
- [Parallel and Asynchronous Programming with F# by Father of F# Don Syme](https://www.youtube.com/watch?v=uyW4WZgwxJE). If you still think Don Syme is human, then go watch this video. He is not, you can tell from the way he pulls this talk and way he codes.
- [Building a Better SQL Type Provider with Ross McKinlay](https://www.youtube.com/watch?v=PrmF 6a0iTXk). This guy bend language to practically a level where language has to tell, enough is enough man.
- [Game Programming in FSharp with Andrea Magnorsky](https://www.youtube.com/watch?v=oWfYnN0I73U). I call her and Ross *the Dragon Masters*. You think FP is slow, think again. Dragon Master Andrea gonna prove you wrong.
- [Xamarin Evolve 2014: Mobile App Development in F# - Rachael Reese, Firefly Logic](https://www.youtube.com/watch?v=H9uzJFM2Hl0) - Long before fabulous born, F# was working with Xamarin. If I remember correctly Rachael gave the first talk about it.

There are common things you can abstract away from it

- Functions (obviously)
- Forward Pipe (Best thing in language)
- Type Providers

There were no Result Type, Elevated world, not even Railways. Even I have to ask on Stack Overflow, just to do multiple validations on an entity.

The language was so simple and beautiful. Tooling was good enough, at least it works most of the time. Don't crash on my lap just because I have opened any big project. People are way more friendly then compare to now for sure. Good old days.

Python gets traction from the Data Science community because of its simplicity. It is too good to write algorithms, especially when you have definite input and output.

Here, F# just adds more power to this. You have types and type providers, you can write simple functions to process data, join them using forward pipes. It was too much fun then, I tend to convert every damn thing to forward pipe. Overdoing it sometimes but it was fun. This is the F# I loved the most. I still like this kind of programming, no specific types, few record types to define input and output and all the functions. Files and modules are always there to help in case of separation. So, nice and so Python-like.

Let's see some code. I am demoing famous world bank data example (from their docs only).

{{<gist kunjee17  48b191951311fd2fc828e7ca0e290c95>}}

So, what's wrong with this approach. Practically nothing, but real-world problems (especially in web, distributed system, mobile, etc) kind of need something more. It needs some more design and architecture to hold big applications together.

`But don't we already have design patterns for ages? Can't it be applied to F#.`

F# is functional first language running on .Net. And it does support object-oriented programming. Here comes second *shade* of F#.

#### F# as better C#.

If someone likes me coming from C#, this might be a natural transaction. Try to map whatever you learn in C# to F#. I also wrote a couple of articles long back explaining how you can use traditional object-oriented design patterns in F#.

Here is how a typical C# class looks like.

{{<gist kunjee17 d8904f48662ae93dcf28953522758d8c>}}

and here equivalent beautiful F# code

{{<gist kunjee17 a1b72ff0c04decc434186075ced8322c>}}

You can make a little bit terser without going more functional

{{<gist kunjee17 cf14b7f5db3b4e0b77f36f0454fab82e>}}

Look how beautiful F# code looks. I did write immutable C# code so I don't have to write `mutable` F# code.

Let's push F# code to the little more functional end. Here we have a small example from Railway Oriented Programming.

We are defining `kind of domain` with two different styles.

{{<gist kunjee17 10c6b6c6f58458639994cfa881b867a5>}}

let's do the same thing with class

{{<gist kunjee17 53f4bb25350cb9d6879be0ef699e5839>}}

Pick your choice, both give the almost same result on the consumer side.

But with this, we are moving more towards Haskell.  Languages like Haskell, Scala have something called HKT or Higher Kind Types backed into language.

F# as a language by design lacks features like HKT.

> For a long time I didn't know HKT means Higher Kind Types. And the even longer amount of time I took to understand it.

There is a discussion going on how useful it is? So, it depends on choice of elders but F# at the time of writing this blog doesn't have HKT.

It still doesn't hold anyone to push your F# code more towards Haskell.

#### Here is the final shade. F# more like Haskell.

If you like to skip all the IO and monad stuff, just pause this blog here and watch this [video](https://www.youtube.com/watch?v=bK-Tz-GLfOs) by Scott W.

You can gradually grow your system to push towards Haskell. A Little help to `LIFT` your code will surely be useful. Read Functional Programming for Fun and Profit's [Railway oriented programming](https://fsharpforfunandprofit.com/posts/recipe-part2/) post. Written by [Scott Wlaschin's](https://twitter.com/ScottWlaschin)

Or you can use a wonderful library like [F# plus](http://fsprojects.github.io/FSharpPlus/)

Let's check out the validation example, I have taken from docs of F# plus. So, you can build upon that.

{{<gist kunjee17 7c306d989a14b8ae665a8e577970890e>}}

This style of coding is very helpful when you are designing a big IO based system. This way you easily separate logic from execution.

> I did purposefully skip heavy functional concepts here. Concepts and patterns based on Algebra, Category Theory, Monads, etc. It's good and important to know them. But that is totally out the scope for this blog. So, maybe next time.

F# is a very flexible language, and one can bend it as one like.  Write down in comment what is your shade of F#?
