---

title: "Functional Factory Pattern"

date: 2015-04-22
categories:
- Technical
tags:
- OSS
- Functional 
- Design Pattern

---

The fun part working or explaining functional pattern is word `functional` can be used in very `fun` way. Just like it is used in title here. 

Now, factory pattern may be the most used pattern in Object Oriented world. Here is code in `C#`.

 

<iframe width="100%" height="475" src="https://dotnetfiddle.net/Widget/omFgPe" frameborder="0"></iframe>  

Factory method is basically used to abstract away the object creation. I am not worried how object is created but I am worried about the behavior of the objects that are created. 
Now, lets have a look at `F#` equivalent

<iframe width="100%" height="475" src="https://dotnetfiddle.net/Widget/vt23Gc" frameborder="0"></iframe>

If you can see it is short and simple and providing same result.

Now, functional programming is not `one to one` map with Object Oriented programming. But we can always have similar a concept.

Factory Pattern simply hiding the object creation. And in F# we are having option type which is helping us to provide concrete definition of product. And that is the reason we can skip the concrete class and have product definition in type.

I have took examples for this post from [Dofactory](http://www.dofactory.com/) and [Tao Liu](http://fssnip.net/authors/Tao+Liu) s work. I have made few changes thought to make it as similar as possible. In future post I will try to go into greater detail about respective pattern and also check out patterns that can be absolute when you come to the world of functional programming. 

> F# people. Your comments and review are required. Will update the code as per the suggestions. Do provide them. I don't mind adding examples of other functional language if anyone is helping me out. 

