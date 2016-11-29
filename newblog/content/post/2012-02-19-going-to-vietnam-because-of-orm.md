---

title: "Going to Vietnam Because of ORM"
keywords:
- ORM
- Vietnam

date: 2012-02-19
categories:
- Technical
tags:
- DotNet

---
In my previous [post][1] I have talk about [ORM][2] . But believe if you don’t use thing wisely you are going to fall like anything. In this article I am not going to write any code but still it is a pure technical article. I will talk about enterprise application and how quickly love for [ORM][2] will drag you to the black hole.

Around two years back, at the time when .Net 3.5 arrived, I was reading a chapter from a book. It is from [Oreilly][3] in that author states that your DBA’s job is in danger we have LINQ to SQL a easy way to do the task. And trust me I just like this statement. I am not DB guy, and don’t like much to mess with database. But as I learn more, I understand the importance of Database guys and database. And personally I found person like [Chintak Chappia][4] who is not only good with database but also as friend, philosopher and guide. I definitely don’t want to piss him off by my simple LINQ queries which eventually generates complex SQL queries. Don’t trust me here is the [example][5] .

Now, take a hypothetical example very big application. Now, this application has around 1000+ tables and 35+ modules to handle. Ya, very big application it is. And first and foremost mistake done by programmer is to add edmx file for all database. (Here I am taking example of EF only, but this is true for all other ORMs too. )
 
It may seems lame but it is true. A single file which has all the details of database and relationship. And first effect of this is that file’s designer view will crash. Now, every now and then you have to open XML file and edit it, manually. And single change in database will cause 2 to 3 hours to get effect in that file. And every time you invoke that file in program it will take that much load to compile and run.

There are few work around to this. Use multiple edmx file. May be one file per module. Pros is that you have mighty designer of edmx file and it is light weighted. Cons is database guy have to manage more than one edmx file. But I don’t think that will be a big problem as it saves much of the time.

Other common mistake is using default option. Big [ORM][2] s comes with multiple options. Entity Framework and [NHibernate][6] are two of big and classic ORMs. They have plenty of option to load and save data. Like [NHibernate][6] has save all type option. This allows you to save data as specific point of time. This will increase performance as you don’t have to go now and then to database.

Ohk, if I am taking care of number of tables per edmx file and also takes care for saving and loading option my life will be saved. Answer is Yes and No.

Yes, if your application is single user oriented application. Like some application like news site. Where few person are adding data and many are reading data. Now, with due course of time data start coming from cache, and it will use caching mechanism of your application. Because of this application runs like charm. In this type of application you can use [ORM][2] , this will increase the productivity without hurting you much.

No, now if you are making next [Facebook][7] or my favorite site [Stackoverflow][8] . Where there are tons who are reading data and tons who are adding data. There you will face problem with [ORM][2] .

Why???

Answer lies just front of you. Computer is basically a duffer machine. It do what exactly you tell it to do. It don’t know where and when it should change the behavior. Now, any [ORM][2] generate SQL query based on some logic. And trust me this queries are weird like anything. If you add few joins to entity, it will add few more joins to query and that makes query more complex not only to debug but also for database server to process. And this will effect performance of database server as well as your application.

And the best thing is whatever time you have saved by using ORM, you will have to give more than double of time to just fine tuning it and also to find while you queries burning the database sever. If you have a dedicated database engineer than he definitely going to kill for burning its server.


So, I can say this is like nuclear missile which everyone should use it wisely. One mistake CAN make big hole in your application. I am fan of [ORM][2] as a concept and as tool I like to use. But, I am so rigid when it comes to performance of application or code developed by me. I don’t like to compromise with performance and scalability of my code and may be that’s why most of the time [ORM][2] stays in some of the demo application I developed just to experiment other things other than [ORM][2] and my resume. I know Entity Framework, [NHibernate][6] , a little bit of [Sub Sonic][9] and few others but I don’t like to use it.

>I CAN but I avoid!!!

 [1]: http://kunjan.in/archives/map-lsquo-your-self-rsquo-using-orm
 [2]: http://en.wikipedia.org/wiki/Object-Relational_Mapping
 [3]: http://oreilly.com/
 [4]: http://beyondrelational.com/blogs/chintak/
 [5]: http://datachomp.com/archives/getting-started-with-massive-in-mvc3/
 [6]: http://nhforge.org/Default.aspx
 [7]: http://www.facebook.com/
 [8]: http://stackoverflow.com/
 [9]: http://subsonicproject.com/