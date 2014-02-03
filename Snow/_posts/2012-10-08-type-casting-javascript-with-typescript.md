---
title: Type Casting JavaScript with Typescript
metadescription: A little introduction of Typescript.
category: Technical,DotNet,Web
layout: post
---
Whenever something came from [Microsoft][1] or [Microsoft][1] employee there is always a buzz… And I still don’t understand why person’s company policies do with person’s attitude or approach of a person. Same happens when [typescript][2] came. It was just a day old and Open Source People starts bashing it like anything. Comparing with [CoffeeScript][3] , [Dart][4] . Guys, it is also open source and [Microsoft][1] in any case not forcing anything. As of now. If you like use it if you don’t just don’t use it. 

In any case it is just a [javascript][5] . There is very positive buzz when [CoffeeScript][3] came. But for [typescript][2] was not that fortunate.

It is normal. Even I thought just another things come from [Microsoft][1] that is similar to [CoffeeScript][3] . But I was wrong it is far different than [CoffeeScript][3] . I am in long time relationship with typed language like C-*, JAVA and recently fall in love with Ruby like language. So, I kinda like both. I don’t have problem with any. Whenever I am learning [Ruby on Rails][6] I like to code with [CoffeeScript][3] and even I started using with my day to day work in .Net. But there is no symmetry in that. I am missing that. And typescript came to solve that issue. Obviously some people claim that they don’t need good tool but still I wonder how can a person make enterprise level language using notepad.

> Check out comments section over this blog :  

[Typescript][2] is just provide type to [javascript][5] . And with that it provides tooling support to writing client side code. Nothing else. Even it is not trying to bring good parts of [javascript][5] to you. Like [CoffeeScript][3] . Not forcing anything and also not doing any magic behind. So, you can say it is very near to metal, pure [javascript][5] . And I like and also dislike this thing. I like this because it allows me copy paste and I have it because it also allows bad parts of [javascript][5] to production code. I personally like [CoffeeScript][3] for a reason that it doesn’t allows any bad parts but restrict / force you to write good parts only. Again this is personal view and like. I am not that good with [javascript][5] so I prefer writing code in [CoffeeScript][3] which take care of every other things and emit a beautiful [javascript][5] . 

But a person who is good with [javascript][5] or believed to be good with [javascript][5] . [Typescript][2] is for them. It is wonderful thing which provides complete freedom of [javascript][5] with types to help you out.   
So, lets check out what the hell [typescript][2] is.

I have special relationship with this. Because this is the first language I have read language specification. Huff its nasty. At first shot I haven’t got a single thing. But than when I am in the state of understanding that its just wow. I just loved it. I should have read language specification with Pro Books. I personally insist to visit site and check out [typescript][2] , a wonderful introduction video is there. And lots of samples are also available too. Also, there is [specification][7] available. It is nice, must read book.

If you are lazy genius than you should continue reading. I will try to cover as much possible of [typescript][2] .

Basically you can just bounce [javascript][5] into [typescript][2] just like that. It will work because of dynamic data type “any”. But just like dynamic keyword of C# it will not provide intellesense support. But I think its fine it you using some [JQuery][7] plug in just to do some UI effect or something like that.

Type script has **module** keyword to define namespace. In that module you can bounce classes, functions, interface or var. If any of that which is not exported or public in case of functions than that is private to that module. And module is public/global variable. So, everything within that is exported using module pattern. Here is sample directly taken from [typescript][2] site. 
  
  module Sayings { 
    export class Greeter { 
      greeting: string ; 
      constructor (message: string ) { 
        this .greeting = message; 
      } 
      greet() { 
      return "Hello, " + this .greeting; } 
      } 
    } 
    var greeter = new Sayings.Greeter( "world" ); 
    var button = document.createElement( 'button' ) 
    button.innerText = "Say Hello"; 
    button.onclick = function () { 
      alert(greeter.greet()) 
    } 
    document.body.appendChild(button) 

That will generate java script as shown below.

  var Sayings; 
  ( function (Sayings) { 
    var Greeter = ( function () { 
      function Greeter(message) { 
        this .greeting = message; 
        } 
        Greeter.prototype.greet = function () { 
        return "Hello, " + this .greeting; }; 
        return Greeter; })(); 
        Sayings.Greeter = Greeter; })
        (Sayings || (Sayings = {})); 
        var greeter = new Sayings.Greeter( "world" ); 
        var button = document.createElement( 'button' ); 
        button.innerText = "Say Hello" ; 
        button.onclick = function () { 
          alert(greeter.greet()); }; 
        document.body.appendChild(button); 


Lovely I guess. So, this is basic [typescript][2] , its nothing but a [javascript][5] with class. So, I don’t copy paste more example here, but talk about few things I like about type script. And you can always visit a site to check out. If you have read my [coffeescript][3] article, it was longgggggg… but in that there is lot to cover. If I started writing that much about [typescript][2] it will be [javascript][5] class only.

So, here is a small list of things I like about [typescript][2] 

*   It provide support for number,string, array and dynamic function
*   Easy to integrate with external java script library
*   one can create or export declaration file to provide intellisense support
*   module, classes, private/public functions are just super awesome as it feels like typed language
*   interface support is there, just another add in to dynamic language to make programming like anything
*   [JQuery][8] , JQueryUI, Win8 files are available in samples, I guess best way to learn [JQuery][8] , just fire a command, and be sure that you will not get spelling mistakes 
*   AMD and Module pattern is default in build so, there classes are ready use with framework like [RequireJS][9] . //I seriously want this with CoffeeScript 
*   Miserable “this” keyword is getting handled nicely
*   Very less change in your written functions and generated [javascript][5] functions. //At some point I don’t like this as it allows bad parts in your functions 

Obviously I don’t like few things about [typescript][2] too.

*   It is allowing bad code, even like comparison operator is not getting corrected like other counterparts.
*   Easy to go wrong as it provides free will to put step out side the boundary as it not force you for that
*   It is not sweet like [coffeescript][3]

Comments and corrections are always welcome. But I strongly recommended not to bash company or new born language. I am not working in Microsoft but we are leaving in free world and [Typescript][2] is open source under apache license.

 [1]: https://www.microsoft.com
 [2]: http://www.typescriptlang.org
 [3]: http://kunjan.in/archives/coffee-with-coffeescript
 [4]: http://www.dartlang.org/
 [5]: http://vanilla-js.com/
 [6]: http://rubyonrails.org/
 [7]: http://go.microsoft.com/fwlink/?LinkId=267238
 [8]: http://jquery.com/
 [9]: http://www.requirejs.org/