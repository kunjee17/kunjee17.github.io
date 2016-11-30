---

title: "Entity Framework Upside Down"
keywords:
- Entity Framework

date: 2012-12-05
categories:
- Technical
tags:
- DotNet

---
If you have read my previous articles you must be knowing that I don’t like ORMs that much and also I am pretty lazy person. I don’t like to repeat stuff again and again. If I can find the solution than I will automate it or I just change from very root. Same thing is true with Entity Framework. It comes after LINQ to SQL as an improved ORM. And it proved to be lousy. But here is the catch if we are not using it with all its functionality it is lousy.

Now, it provides proper name at entity level and also inheritance like stuff. Its really a cool and neat feature about Entity Framework to abstract away the complexity of database with ‘_’ name. I never understand this type of names and I don’t know if ever I will be understanding this type of name. But if you are just updating from database and using it, than there is no use of EF at all. Or there is no need of EF. If I will become little bit harsh, then I can say **“WE ARE DOING IT WRONG”** .

And after EF evolved to further version it is providing more features, but still we are stick to the feature which is shown in [Channel9][1] . We must understand here that there is difference between demo and production. In demo we have pizza factory in production we never have at least in most of the cases. So, things are far different in production environment. If we are just deleting and adding entities then obviously again **“WE ARE DOING IT WRONG”** . If any one think who the hell I am to tell that ??? I am just nothing and no one, but I am open minded to ideas and new things. Just think how much more overhead you are having for pushing EF in production. It is there to help you out not to make things worst.
 
I tweeted about it and also got reply from Rob Conery of [Tekpub][2] . I insist to check that out. I must say EF is a tool if we are not careful it will surely hit our own ass very bad. Here is the [link][3] for tweet. So, I am not providing any right way as there are many and you will found out over google, but I am just saying to think twice before come to a conclusion or before porting demo to production environment.

 [1]: https://channel9.msdn.com/
 [2]: http://tekpub.com
 [3]: https://twitter.com/robconery/status/270700961109004288