---
title: Typed Hack of Cloudant using F#
metadescription: Write a small wrapper which convert untyped Cloudant data to typed F# data 
category: Technical,OSS,Web,Functional, Functional Web 
published: private
---

Sometimes things are not out in your control. They just happens. Just like that. But all other times they are. And specifically when one wanted to do something mad. Recently I was helping my [MAD friends](http://4-to-6.com/#team) to create a mad newsletter site. Now, don't ask me why we are doing that?!? Everything explain at the page of [subscription](https://tinyletter.com/beemad) and also on [beemad site](http://4-to-6.com/).

<!--excerpt-->

On a first thought a task can be done by any [CMS](http://en.wikipedia.org/wiki/Content_management_system) and there is no exact need for anything else. But how can I explain my heart which can't tolerate PHP around it.
![](/images/nonotthisagain.jpg)

And frankly there is no requirement of complete, heavy, slow, sluggish CMS. And if we were having that we may be not doing any madness but still finding plug-ins on web. I personally like the freedom of simple HTML page. You can unleash the imagination on that but not on CMS. 

So, I thought why not [F#](http://fsharp.org)? and I also know [NancyFX](http://nancyfx.org/) so that will be easy and fast. And really it was. And hosting on [Azure](http://azure.microsoft.com/en-us/) is even more fun. There some pain points but it was all OK. 

But now it times to save the database. Azure do offer quite a nice options but again this heart never listen to me. I choose NOSQL. 

Here comes the dinosaur, manage your own VM. And I was like [nooooooooooooooooooooo](http://www.nooooooooooooooo.com/). I was knowing about [Cloudant](http://cloudant.com) from long back. Even before IBM bought it. It is indeed a wonderful service and also kinda free for small stuff. I thought this will be best fit for now. As we are just starting, taking our first baby steps in the world. We are like mad babies but still we are babies. 
![](/images/Babies.jpg)
And there is not need of scary relations ships with database. So, I decided to use this one. 
 
