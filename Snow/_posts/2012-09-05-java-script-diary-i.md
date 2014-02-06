---
title: JavaScript Diary I
metadescription: note about JavaScript 1
tags: Technical,Web,DotNet
layout: post
---
Long back I have wrote a article on [CoffeeScript][1] . If anyone see closely its all about writing proper Java Script in easy way. But in many cases its not possible that you got chance to write [CoffeeScript][1] . Or if you are learning some library like [KnockoutJS][2] or [BackboneJS][3] , also if you are using some framework like [AngularJS][4] . Than using [CoffeeScript][1] and also using this function to learn than it will be difficult to catch up together. If you are not powerful enough with one of either.

And as a base rule. Even you are using [CoffeeScript][1] , you are not escaping from [JavaScript][5] . It was there and it will be there for future for sure. So, It is worth learning it. If you have read previous article you must know that I am not that good with [JavaScript][5] . So, I started learning and also thought for note I should put that to a blog. Whatever I learn will document on my blog. So, that will helpful to others and specially for me.

Most of the guys must be knowing many things. But that’s fine, its again for personal reference.
<!--excerpt-->
[JavaScript][5] is very flexible language. And this allows you to write lovely code without worrying about many things. But again this makes issue many times. And every damn time I will end up messing with that flexibility issue. [ ![flexible][7]][7] 



And first thing starts with Global variable. In [JavaScript][5] everything is global by default. So, whenever you are writing any function just like that, they are globally accessible. This is an issue. Just like static variable in any other language. So, don’t write functions just like that. Out anywhere on page. Simple solution of this is self executable anonymous function. That will make everything private. And that’s good at some point at least better than putting everything global. Here everything is private and executed. Just check out the example. 

    (funciton{ 
      var dosomething = function (){ 
      //Here I am doing something 
      } 
    })(); 
    
Here do something is completely private. But sometime we need some thing in global. We need to access it from outside. Then there are two patterns for that. Module Pattern and Revealing Module Pattern. I personally prefer Revealing Module Patter. So, I am giving demo for that.

    var REVEALING; 
      REVEALING = ( function () { 
        var dosomething = function (){ 
          //Here I am doing something 
          } 
          var dosomethingmore = function (){ 
          // here I am accessing dosomething 
        function dosomething(); 
        } 
      return 
        {   
        dosomethingmore:dosomethingmore 
        //here only one function is exposed 
        //so it is the only function available outside this namespace 
        } 
    })(); 

Here one more thing comes in a picture. Namespace, which are not available by default in [JavaScript][5] .

As namespace is not there, we are missing classes too. As [JavaScript][5] is a functional language, it only has functions, also as available as Objects. So, if you like to make things like classes, internally they are functions only. And you also can create constructor based functions too.

    var Dosomething = ( 
      function (){ 
        function Dosomething(parametername)   
        this.parametername = parametername; 
    })(); 
    

So, now we have our lovely constructor with parameter. While calling this we can just do like this

`var dosomethingobject = new Dosomething( "namehere" );` 

And after that we can call whatever functions we like to call. It will use the parameter. This is also having same benefit as we are getting with parameterized constructor in structured language. So, this small things always helps to write more readable code.

One another things worth nothing here. It is that we can write anything anywhere in [JavaScript][5] does not mean that we should go for that. Even in [JavaScript][5] Single Responsibility Principal should be followed.

And also parameter name and function name should be self describing. Just because [JavaScript][5] is giving freedom we just use it like that.

There are many library and other corner cases that can be consider while development client side JavaScript application. But that will be in next time.


Till then happy coding…

 [1]: http://kunjan.in/archives/coffee-with-coffeescript
 [2]: http://knockoutjs.com/
 [3]: http://backbonejs.org/
 [4]: http://angularjs.org/
 [5]: http://vanilla-js.com/
 [7]: https://lh5.googleusercontent.com/-9S0vNlm41AY/URHJtukdwUI/AAAAAAAAArI/blHsaJPrt_c/s800/flexible_4.jpg