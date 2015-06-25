---
title: Functional Singleton Pattern
metadescription: Design pattern rethink in functional way. Singleton design pattern.
category: Technical,OSS,Functional,Functional Design Pattern
published: public
---

This is my favorite pattern. First pattern I learn. And till date I don't know where to use it. **So, I use everywhere. :P** 

I have mainly used for database connection object and then all JavaScript frameworks are exposing Singleton object only. I can say it is quite useful in case of web.

<!--excerpt-->

Fun part about this pattern is that most of the people including me always use this pattern to show off that we know patterns and we follow it in practice but in most cases that practice starts and stops with Singleton Pattern. 

Let's understand the pattern, as name suggested this pattern is propagating singularity. Object of specific class will be created once and only once but No more. Object creation is totally hidden away from consumer and with static method object will be handed over to consumer. If there is a instance presence it will be handed over else new instance will be created and it will be given to consumer.

Let's check out the C# code

<iframe width="100%" height="475" src="https://dotnetfiddle.net/Widget/ou8ReI" frameborder="0"></iframe>

See, simple and easy. 

And now here is F# code. Even simpler and easier 

<iframe width="100%" height="475" src="https://dotnetfiddle.net/Widget/EAcx3W" frameborder="0"></iframe>

> Look ma no `null`. As F# is not allowing null by default in the system there is no need to check it. 

Instead make constructor private to stop creating object of type and provide same instance of type again and again. 

Now, in current scenarios where garbage collector are so powerful and we are having quite a good amount of hardware to process. Singleton is not used while writing domain/business code. But still it is widely used on API side to expose specific functionality. 

I am still to find relevance in case of functional programming. In functional programming `type` is different then `class`. In normal cases they don't have behaviors attached with it. So, it reducing the need of this pattern. 
