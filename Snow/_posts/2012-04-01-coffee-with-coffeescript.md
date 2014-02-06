---
title: Coffee with CoffeeScript
metadescription: A brief introduction of CoffeeScript language. A wonderful wrapper around JavaScript.
category: Technical,Web
layout: post
---

I am in Bangalore, and first thing I found here classically well is [coffee][1]. Obviously I will not going to talk about coffee here. But about [CoffeeScript][2] which is as good as [coffee][1] . I come to know about [CoffeeScript][2] from the [article][3] written by [Scott Hanselman][4] . And I become addicted to it. I am not much a web guy. I like coding but mostly on server end. And Visual Studio is always there to save me. But when it comes to Java Script, I just crash land any time. I always try to go back to server as soon as possible. Obviously [JQuery][5] is there to bail me out. But still it is only for DOM, but for other things, you have to be expert. Now, here expert means whose written [Java Script][6] pass the [JSLint][7] with minimum errors. Simple functions and doing some addition is not a big deal but making a library for web application is do a big deal. At least for me. I am so rigid about my code quality and [Java Script][6] is a damn flexible scripting language which easy become a sloppy for me. I always try to follow architecture define by [Java Script Good Parts][8] . But at the end following some rules in [C Sharp][9] is easy than follow in [Java Script][6]. But God is with me. I found a friend who is damn powerful in [Java Script][6] .

She is princess of [Java Script][6] . She write JS like any thing. And standards are not violated at all. I don’t know how someone can write code like that. She is like [Cynthia Rothrock][10] of Web. ![](https://lh4.googleusercontent.com/-Dw-LumABw0Q/URHJoqyQPlI/AAAAAAAAApY/hnY4qIE8wAE/s800/CR_2.jpg) 

Yeah, she is like her only. Just like photo. A girl you don’t want to mess with.

> *I am not that another person in picture. It just a FYI.* 

Like [Cynthia Rothrock][10] she is also a black belt but in [Java Script][6] . Always kicking around in web arena. Whenever I stuck somewhere she comes laugh at me and solve the problem. And what I am in compare to her, like kid shown here. 

![](https://lh6.googleusercontent.com/-TwrCb_2KLk0/URHJyRifiTI/AAAAAAAAAsk/V7mr0dHwQ3o/s800/kids-gi_thumb.jpg)


A white belt kid. Now what I can do to match the standards with her. Technically I can’t. As she is black belt and I am just a kid. But I am a smart kid. I drink some [coffee][10] and write [CoffeeScript][2] . Yeah, you have black belt and I have [coffee][10] . Now, I come to point. There is always a need of writing good code, weather it is compiled language or a scripting language.

And good code has two main quality as per me. One is its readability and another is extendibility. If I am writing code, other should read it and also able to extend it. Now, if you are writing [Java Script][6] like her, others don’t find any problem to read or extend it but else that will be a problem specifically with scripting languages. It prone to get dirty soon.

Here, [CoffeeScript][2] has major advantage. First thing its readability, and second thing it is just a [Java Script][6] . Here, I am going to use few example from [CoffeeScript][2] site only. So, if you like to try it out, site have try [CoffeeScript][2] option, I encouraged you to do that.

To try [coffeeScript][2] on local machine there are few options to go with. Today most of the IDE supports add on for [CoffeeScript][2] . But I prefer the [Node][13] way. Just install it and start firing commands. You can check out home site for [CoffeeScript][2] to starts with. I am now starting with example.


First thing I love about CoffeeScript is call back function. It wrapper your code around [Java Script][6] callback function by default. Here is Hello World example of it. I first go with Java Script

    (function () { 
      alert( "this is coffee Script" ); 
    }).call( this );
     
This is pretty small things. But I forget many times. This will call anonymous function to self so it will not mess with other libraries around. And what I wrote in [CoffeeScript][2] file. Just one line 

    alert "this is coffee Script" 
    
That’s it. That all I wanted to do. No more function and all that, no more brackets; nothing. Just like any other [DSL][14] , just write what I like to do. It is pretty basic example but even from start, it is showing the power of [CoffeeScript][2] .

Another thing I like is working with arrays. After having list and collection in new languages, working with array is little bit difficult sometime. My friend mention above wrote complete library to get functionality like List in [Java Script][6] . But it is fun to write array in [CoffeeScript][2] .

Normally we do things in [Java Script][6] like shown here 

    (function() {
      var food, foods, _i, _len;
    
      foods = ['broccoli', 'spinach', 'chocolate'];
    
      for (_i = 0, _len = foods.length; _i < _len; _i++) {
      food = foods[_i];
      if (food !== 'chocolate') {
          eat(food);
      }
      }
    
    }).call(this); 

But in [CoffeeScript][2]  

    foods = ['broccoli', 'spinach', 'chocolate']
    eat food for food in foods when food isnt 'chocolate'

Its just pure fun. Here there are few things I like to mentions specifically. First thing I have already mentioned is how to do array thing in fun way. Other thing if you have noticed is a loop with “_” variables. [CoffeeScript][2] takes care of everything starting from scoping of variable by it self. If you need to mentions at top or take care that it will not go out of scope. That will be taken care, even simple thing like loop is written in way it should be written.

Another example for looping

In [Java Script][6] it is like 

    (function() {
      var countdown, num;
    
      countdown = (function() {
      var _i, _results;
      _results = [];
      for (num = _i = 10; _i >= 1; num = --_i) {
          _results.push(num);
      }
      return _results;
      })();
    
    }).call(this);
 
And in [CoffeeScript][2] it is like a one line, giving For Each loop feeling in [Java Script][6] . 

countdown = (num for num in [10..1])

So, Here there is one another benefit. If I am insisting for [CoffeeScript][2] , it is not against the [Java Script][6] but in favor of learning it. One will know the right way of writing [Java Script][6] . As per site of [CoffeeScript][2] , [Java Script][6] generated by it passed the [JSLint][7] without a single error. So, it is good to learn [Java Script][6] using [CoffeeScript][2] .

Now, if any one is fan of [Ruby][15] , it supports [Ruby][15] like syntax in few cases. Obviously web club will like this. You can pass inline variable with “#” and it will work. Let me show you the example.

This time I will go with [CoffeeScript][2] first 

    yearsOld = max: 10, ida: 9, tim: 11
    
    ages = for child, age of yearsOld
      "#{child} is #{age}"

And here is [Java Script][6] for it 

    (function() {
      var age, ages, child, yearsOld;
    
        yearsOld = {
        max: 10,
        ida: 9,
        tim: 11
        };
    
        ages = (function() {
        var _results;
        _results = [];
        for (child in yearsOld) {
            age = yearsOld[child];
            _results.push("" + child + " is " + age);
        }
    return _results;
      })();
    
    }).call(this);

 
See it take pretty good care of every damn thing. I just fall in love of this. Pushing everything over the top and returning result, changing things with appropriate variables. Every damn thing. Isn’t it good ???

There are few more things for conditional operators and looping. But I like to move on to little bit complex example. If I want to create library like [JQuery][5] , few more things must be there. Now, [Java Script][6] doesn’t have private , public things or classes by default. In [Java Script][6] functions are the classes it self. And there is a trick to do private public thing in [Java Script][6] . Most of [Java Script][6] programmer must have known this. But this thing is fairly easy in [CoffeeScript][2] . It has its own class syntax and there you go. Code like any other higher level language. Just check it out.

CoffeeScript Code

    class Animal
      constructor: (@name) ->
    
      move: (meters) ->
      alert @name + " moved #{meters}m."
    
  class Snake extends Animal
      move: ->
      alert "Slithering..."
    super 5
    
    class Horse extends Animal
      move: ->
      alert "Galloping..."
      super 45
    
    sam = new Snake "Sammy the Python"
    tom = new Horse "Tommy the Palomino"
    
    sam.move()
    tom.move()
 
And here is Java Script code ( 

    (function() {
      var Animal, Horse, Snake, sam, tom,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
    
      Animal = (function() {
    
      function Animal(name) {
        this.name = name;
      }
    
      Animal.prototype.move = function(meters) {
        return alert(this.name + (" moved " + meters + "m."));
      };
    
      return Animal;
    
      })();
    
      Snake = (function(_super) {
    
    __extends(Snake, _super);
    
    function Snake() {
      return Snake.__super__.constructor.apply(this, arguments);
    }
    
    Snake.prototype.move = function() {
      alert("Slithering...");
      return Snake.__super__.move.call(this, 5);
    };
    
    return Snake;
    
      })(Animal);
    
      Horse = (function(_super) {
    
    __extends(Horse, _super);
    
    function Horse() {
      return Horse.__super__.constructor.apply(this, arguments);
    }
    
    Horse.prototype.move = function() {
      alert("Galloping...");
      return Horse.__super__.move.call(this, 45);
    };
    
    return Horse;
    
      })(Animal);
    
      sam = new Snake("Sammy the Python");
    
      tom = new Horse("Tommy the Palomino");
    
      sam.move();
    
      tom.move();
    
    }).call(this);
    
 
Isn’t it cool ?? I guess it is. Making library becomes so easy with this kind of syntax. Obviously for the person like me who is from another language background.

Let us see some more complex example. Of function binding. It is easy to bind function. No, extra code at all. 

    Account = (customer, cart) ->
      @customer = customer
      @cart = cart
    
      $('.shopping_cart').bind 'click', (event) =>
      @customer.purchase @cart

And it will generate appropriate Java Script

    (function() {
      var Account;
    
      Account = function(customer, cart) {
      var _this = this;
      this.customer = customer;
      this.cart = cart;
      return $('.shopping_cart').bind('click', function(event) {
        return _this.customer.purchase(_this.cart);
      });
      };
    
    }).call(this);
    

See. It is fun. If you are thinking that what if you are [JQuery][5] fan like me. Again I like to repeat word from [CoffeeScript][2] only

>It's just JavaScript

You can use any library with [CoffeeScript][2] . Let’s check out one of the example of it.

A [CoffeeScript][2] code 

    show_message = (msg) -> 
      $('#message').hide().text(msg).fadeIn(2222, -> $('#message').append('!'))
    
    $ -> 
      show_message "world"
      $('#message').click -> show_message "you"
 
And here we go with [JQuery][5] code 

    (function() {
      var show_message;
    
        show_message = function(msg) {
        return $('#message').hide().text(msg).fadeIn(2222, function() {
        return $('#message').append('!');
      });
      };
    
      $(function() {
      show_message("world");
      return $('#message').click(function() {
        return show_message("you");
      });
      });
    
    }).call(this);
    

It becomes more powerful when it joins hands with [JQuery][5] or other libraries.

Now, for whom this is ??? This is for person like me. Or even black belt like my friend. It just fun to write [Java Script][6] . I don’t insist to use it but I surely insist to give it a try. It is worth investing time in it. Again if you are die hard [Java Script][6] developer, I don’t think you need this. But again there is no loss in learning new thing. I am just enjoying [CoffeeScript][2] like anything.


![](https://lh6.googleusercontent.com/-x7ptaCkB7bA/URHJvRJbFMI/AAAAAAAAArw/dvsN8HvY0I4/s800/iStock_000005133061XSmall_2.jpg) 

So, here there are clearly two options for most of the developers including me. Either I can have coffee with [Java Script][6] , doing over time and solving errors. Or I can use [CoffeeScript][2] and have fun time with my (Black belt) friend. I prefer later one. And trust me this is one the most fun writing article just like [CoffeeScript][2] .


Taste a coffee and have fun. Coding is seriously enjoyable with friends like her and technology like [CoffeeScript][2] . Special thanks to Jeremy Ashkenas for giving [CoffeeScript][2] .

Enjoy Coffee!!!



 [1]: https://en.wikipedia.org/wiki/Coffee
 [2]: http://coffeescript.org/
 [3]: http://www.hanselman.com/blog/CoffeeScriptSassAndLESSSupportForVisualStudioAndASPNETWithTheMindscapeWebWorkbench.aspx
 [4]: http://www.hanselman.com
 [5]: http://jquery.com/
 [6]: http://www.w3schools.com/js/default.asp
 [7]: http://www.jslint.com/
 [8]: http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742?tag=duckduckgo-d-20
 [9]: https://en.wikipedia.org/wiki/C_Sharp_(programming_language)
 [10]: http://www.cynthiarothrock.org/

 [13]: http://nodejs.org/
 [14]: https://en.wikipedia.org/wiki/Domain_specific_language
 [15]: http://www.ruby-lang.org/en/
