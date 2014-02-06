---
title: Massive Effect
metadescription: Introduction to wonderful single file ORM massive. It is for DotNet by Rob Conery. It is using dynamic of DotNet 4.0.
category: Technical,DotNet
layout: post
---
Hope you have read my earlier [post][1] about Micro [ORM][2] . Here I talk about another Micro ORM [Massive][3] . I don’t want to go with traditional approach. I write intro about [Rob Conery][4] and give some details about [Massive][3] . Few example here and there, some hyperlinks and that’s it. I will try to find answer of “why” instead of “how”. For how part we have more than enough example and also have [stackoverflow][5] to solve issues. Still I go through technical details at the end, but article will not be like tutorial for [Massive][3] .

Let’s start from the start. I was just wondering around the [asp.net][6] web site. And come across the tutorial of [store front][7] . There I found person with name [Rob Conery][4] . As usual I found his site and come to know that he recently left job. I was little upset, as I liked the way he explained. Then I came across his another video in speaking section, [Kill Your ORM][8] . This is the first time I come across something called Micro ORM. And this is the moment when I press the refresh button of my technical skill or thinking or approach what so ever you can say. I just open up my mind and options I am trying.
<!--excerpt-->
[Rob Conery][4] is like Tony Stark of Technical Arena. And every now and then he create some new element ( [OSS][9] ).

![](https://lh5.googleusercontent.com/-Eq-pGJZhHtU/URHJx47Y2dI/AAAAAAAAAsY/LO2BqVFZUTQ/s800/iron-man-32_2.jpg) ![](https://lh6.googleusercontent.com/-GIE2x98SNDE/URHJqwsNwNI/AAAAAAAAAqM/l7n__dsAo9o/s800/RobCon_Hanselman_2_2.jpg) The second one in white shirt is Rob Sir. He is not just in his Iron suit. And here are few elements created by him [Massive][3] , [Manatee][12] and [Sub Sonic][13] .



And there are few other heroes of mine specifically in technical arena. But about them will talk later. Still you can enjoy the image comparison.

![](https://lh5.googleusercontent.com/-xtkof-Bai6g/URHJqhgda7I/AAAAAAAAAqE/CqRSsiZ424k/s800/Qui_gon_jinn_from_movie_2.jpg) ![](https://lh3.googleusercontent.com/-jzEvsjhnylg/URHJuutPtOI/AAAAAAAAArY/wmXiv7qRjEg/s800/hanselman_4.png) 

And

![](https://lh4.googleusercontent.com/-2FeVrSh4Xas/URHJnpRUhnI/AAAAAAAAAo8/dvptH8qu1qY/s800/149117-batman-returns-dos-screenshot-main-computer-s_2.gif) ![](https://lh4.googleusercontent.com/-uTs5lIhQLgA/URHJz2abyDI/AAAAAAAAAs4/agORU4lbeoo/s800/phil_2.jpg)



**Images are of course not my proprietary, if anyone has problem with it. Please let me know will remove it.** 

Now, come back to [Massive][3] .

> Why???????

Isn’t it nice to have POCO objects and that will take care of all things. Obviously it is NICE. I don’t like Database at all. And that complex joins and yet another language to learn… Nope. I hate it. But just give the answer of one simple question.

> If I am using [ORM][2] , does it allow me to not to use SQL at all? 

No. I don’t think so. And I am not talking about hypothetical situation. I am talking about real life situation. Real project and real experience. Every now and then I have to double check my query with SQL query. This just double the work of mine. And it is useful to add value to my Resume only. Here I am not talking about performance at all. Everyone knows benchmark. I am talking about working. In a very distributed system, with DBA working round the clock.

> Is there a space for ORM?

No, I don’t think so. If I am alone and working on some small scale project than its fine. Just go with it. But with big scale project even today also DBAs are integral part of system. And trust me they don’t know .net or Java or not even care about it. I have use [IOC][18] , [Repository Pattern][19] , [Factory Pattern][20] or anything else they don’t even care. They just create that massy tables which no one going to understand in one shot. At least I never understand that one to one and one to many and n level down with tables relationship at one shot. I remember eventually but still at one shot no chance.

Many will argue that, ORM will decrease my work on application level. Yes may be. But thing is I am learning something to replace something. Like I am learning Entity Framework because I don’t like to work with SQL. I learn every in and out of Entity Framework, checking out screen cast, blogs, articles etc. And one day I have to debug query which is SQL. I feel this is just overhead. At least for now. At some point of time, may be there will be no need of Database or SQL. Everything will shift to Application level and at that point of time EF will be necessity or just part of language. But now it is not. And that is creating problems. And it is general statement for all [ORM][2] s. You are learning something new but old is still there you cant escape. Even [Massive][3] has some learning curve. But in case of Micro ORMs learning curve is some what simpler and smaller.

> If in any case Rob sir if you are reading this article can you please give the answer of these questions. I should devote more time to execute complex task or why ORM is not working to execute task? Either learn and add html tag or give more time to why html helper is not working?

Means there are more important things to do, other than solving error of framework which are designed to help us. I am not criticizing framework, I just love it and can’t leave with out it but if they are replacing core than good but if I have to use combination than I am not in favor of it. Like C# is developed over C++, but I never have to debug C# at C++ level. I hope you are getting my point. One more example of [knockoutjs][21] . It is java script library which is using “data-bind’ key word to bind with java script object or function. Now, I want to use it with html helper. I simply pass anonymous object in it and banged. Error arrived. I Google it, waste almost half an hour and find out I have to pass “data_bind” instead of “data-bind” specifically for helper method. If I am using pure html syntax than my half an hour is saved.

I am not opposing concept of [ORM][2] and also if I got chance will work to improve it to next level. But when I have to create application with time constraint I will avoid it. This is complete personal opinion. But I do have some reason to support my opinion.



> Now, How?

As promise this will be short and sweet. I personally go for [MVVM pattern][22] . Now, if I am developing application using Asp.Net MVC. I have controller, model and view. Now, in model section I separated with two section. ViewModel and Model. I do it by using two different files. You can chose any other approach. In model we have class which have one to one relationship with database and inherited from DynamicModel from [Massive][3] . And view model has class which can be used in views and same type of class we can have in java script. So, it can be used using [knockoutjs][21] . Here are some example of [Massive][3] . This is directly taken from site. If anyone want can skip it.

> This is another best part of Micro ORM. You don’t need tutorial at all. I am not good at SQL, [Massive][3] can execute any complex SQL using same syntax, [Massive][3] it self is quite simple. So, I don’t have anything special or complex or alien to write.

    public class Products:DynamicModel { //you don't have to specify the connection - Massive will use the first one it finds in your config 
  public Products(): base ( "northwind" , "products" , "productid" ) {
    } 
  } 
  var table = new Products(); //grab all the products 
  var products = table.All(); //just grab from category 4. This uses named parameters 
  var productsFour = table.All(columns: "ProductName as Name" , where : "WHERE categoryID=@0" ,args: 4); 
  var result = tbl.Query( "SELECT * FROM Categories" ); // my favorite function, no need to learn massive use this function :P 
    for Grid view like things, it also has paged query. 
  var result = tbl.Paged(where : "UnitPrice &gt; 20" , currentPage:2, pageSize: 20); // Insert and update are quite flexible in Massive, you should try with different options 
  var table = new Products(); 
  var poopy = new {ProductName = "Chicken Fingers" }; //update Product with ProductID = 12 to have a ProductName of "Chicken Fingers" 
  table.Update(poopy, 12); 
  var table = new Products(); //update Product with ProductID = 12 to have a ProductName of whatever was submitted via the form 
  table.Update(poopy, Request.Form); //pretend we have a class like Products but it's called Categories 
  var table = new Categories(); //do it up - the new ID will be returned from the query 
  var newID = table.Insert(new {CategoryName = "Buck Fify Stuff" , Description = "Things I like" }); 
    

So, Here is the reason why I prefer Micro ORM or NO ORM over ORM. I learned, I used and I am hurt so I avoid. But trust me [ORM][2] is so cool to mess with it but it should be done in free time for personal learning at least for now. Still there can be few more things to discuss, but I like to do that in comment section specially for this article.

Comments are always welcome!!!

 [1]: http://kunjan.in/archives/arrival-of-david-aka-micro-orm
 [2]: http://en.wikipedia.org/wiki/Object-Relational_Mapping
 [3]: https://github.com/robconery/massive
 [4]: http://wekeroad.com/
 [5]: http://stackoverflow.com/
 [6]: http://asp.net
 [7]: http://www.asp.net/mvc/videos/mvc-1/aspnet-mvc-storefront/aspnet-mvc-storefront-part-1-architectural-discussion-and-overview
 [8]: http://ndc2011.macsimum.no/mp4/Day2%20Thursday/Track1%201140-1240.mp4
 [9]: http://en.wikipedia.org/wiki/Open-source_software
 []: https://lh5.googleusercontent.com/-Eq-pGJZhHtU/URHJx47Y2dI/AAAAAAAAAsY/LO2BqVFZUTQ/s800/iron-man-32_2.jpg
 []: https://lh6.googleusercontent.com/-GIE2x98SNDE/URHJqwsNwNI/AAAAAAAAAqM/l7n__dsAo9o/s800/RobCon_Hanselman_2_2.jpg
 [12]: http://github.com/robconery/manatee
 [13]: http://github.com/robconery/subsonic
 []: https://lh5.googleusercontent.com/-xtkof-Bai6g/URHJqhgda7I/AAAAAAAAAqE/CqRSsiZ424k/s800/Qui_gon_jinn_from_movie_2.jpg
 []: https://lh3.googleusercontent.com/-jzEvsjhnylg/URHJuutPtOI/AAAAAAAAArY/wmXiv7qRjEg/s800/hanselman_4.png
 []: https://lh4.googleusercontent.com/-2FeVrSh4Xas/URHJnpRUhnI/AAAAAAAAAo8/dvptH8qu1qY/s800/149117-batman-returns-dos-screenshot-main-computer-s_2.gif
 []: https://lh4.googleusercontent.com/-uTs5lIhQLgA/URHJz2abyDI/AAAAAAAAAs4/agORU4lbeoo/s800/phil_2.jpg
 [18]: http://en.wikipedia.org/wiki/Inversion_of_control
 [19]: http://www.martinfowler.com/eaaCatalog/repository.html
 [20]: http://www.oodesign.com/factory-pattern.html
 [21]: http://knockoutjs.com/
 [22]: http://en.wikipedia.org/wiki/MVVM