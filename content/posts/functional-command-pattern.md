---
title: "Functional Command Pattern"

date: 2015-04-25 
categories:
- Technical
tags:
- OSS
- Functional
- Design Pattern

---

Command pattern is a pattern which allows executor of the pattern to execute or playback the commands. In most of the application wherever Undo/Redo is implemented this pattern is used. 

Here is C# code. 

 

<iframe width="100%" height="475" src="https://dotnetfiddle.net/Widget/5wmvGN" frameborder="0"></iframe>

Now, in this code Command Pattern is not in its purest form. As, normally in command pattern we are saving state of outside object. Instead I just returned the result to mock out side object. 

Now have a look at similar F# code. That is doing kinda same thing. 

<iframe width="100%" height="475" src="https://dotnetfiddle.net/Widget/htQsqv" frameborder="0"></iframe>

Here, instead of class I am using functions with the command type. And definition of the command is given as type instead of interface. Now, this is fun with functional programming in general where functions are first class citizen. I can save commands and events like objects only. I don't have to wrap around some classes. This makes code more concise.

> Fan of [CQRS](http://martinfowler.com/bliki/CQRS.html) and [Event Sourcing](http://www.martinfowler.com/eaaDev/EventSourcing.html); listen up these both design concepts are standing on the shoulders of command pattern.