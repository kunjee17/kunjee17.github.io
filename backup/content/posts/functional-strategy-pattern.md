---

title: "Functional Strategy Pattern"

date: 2015-04-24
categories:
- Technical
tags:
- OSS
- Functional
- Design Pattern

---

Another pattern that is widely used in Object Oriented world. And as far as .Net world is concern it is may be most used pattern in wide range of .Net API. And it *heavily* used in *heavily* used LINQ API.


So, I guess giving a understanding of that is kinda waste of space. Have a look at C# code.

 

<iframe width="100%" height="475" src="https://dotnetfiddle.net/Widget/c4qcvo" frameborder="0"></iframe>

People familiar with LINQ and lovers of Lambda will definitely argue that this is can be replaced by delegates. And for the face I am arguing the same. But for now I have took this sample as a traditional practice. 

Now, have a look at the F# code doing the same. 

<iframe width="100%" height="475" src="https://dotnetfiddle.net/Widget/rhn63P" frameborder="0"></iframe>

Now, it is definitely not **one to one** replacement as I have did in last few posts. But here I have replaced class with function but we are achieving the same thing.

Now, what is strategy pattern. As name suggest it is used to provide strategy from the consumer end. It is like I am saying that I want coffee and also I am telling I want cappuccino. And as shown in sample for sorting I am passing sorting strategy also. For example case I haven't passed array else I have to pass array or list and also strategy or how to sort it. It is mainly used when consumer is having control on how to do execution but execution is done by someone else. 

Now, in case of C# and Java8 where lambda is available. So I have this functional behavior there also. But for the fact it is functional programming concept of passing functions around *(or some may argue it is object oriented concept in purest form)* and syntax wise it more suitable / human friendly in functional programming language. 

Here is C# example.

<iframe width="100%" height="475" src="https://dotnetfiddle.net/Widget/63PK93" frameborder="0"></iframe>

It is very much near to F# counter part. Only F# syntax is having less noise. 

> It something all togather when this pattern shown in context of Functional Programming. I am just composing functions. But it serves as Strategy Pattern of OOP so I have used that.