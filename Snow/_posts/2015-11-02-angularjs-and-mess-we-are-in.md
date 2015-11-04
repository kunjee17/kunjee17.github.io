---
title: Angularjs and the Mess we are in
metadescription: Angular js created whole of mess and we can't actually get out of it. 
category: Technical,OSS,Web,Mobile Web
published: public
---
Who don't know [Angularjs](https://angularjs.org/)?!? Everyone worked is web, mobile, server, windows, mac, Linux, Google, Microsoft or anyway related to this knows about it. And its fun when people tell me

> You know about angularjs. Its pretty hot now a days. I'm planning to learn it. 

Oh man...

<!--excerpt-->

Ok I am no expert here in Angularjs. And I prefer not to be expert with any framework. Be it anything. But you know there is another [Angularjs](https://angular.io/) from another universe. If you are learning (like seriously) then go for this one. 

But be sure. There is a chance you will be inviting a hell of mess. I have been working with angular since last 3+ year. Either leading a team or part of team. And one thing I learn hard way. You need a discipline when you are working with JavaScript. But you need discipline of delta forces when you are working with angularjs. 

As metioned in site it is a superhero. And like every superhero it also should have responsiblitiy. But angular is abusing JavaScript every way possible. If something is possible that doesn't means we should be doing it. We have damn book called [JavaScript: Good Parts](http://shop.oreilly.com/product/9780596517748.do) all about it.

It called Good Parts means you just use Good Parts and leave bad one alone. But with angular it is like you are leaving in Bar and told not to touch Alcohol. On top of it you have [untapped](https://play.google.com/store/apps/details?id=com.untappdllc.app&hl=en) installed in your mobile.

Why this? Lets take things one by one

##Scope - Poor man's global##
We should not use global. That is proven truth. No, doubt in it. But what about **We love *global* so much.**

We got scope then. JSLint can't catch it and we still have it. Now, angular lover may argue that we should not use it. But how can you prevent it from using it. It all comes to putting as rule in project wiki or training. But there is no way to prevent it. At least I don't know one. 

##Magical- Directives##
Whenever you start abusing Angularjs people comes up with `But we have Directives?!?` that magically solves everything. The problem with that it is hiding too much. Its good if things works out but when it breaks. Oh man. *You seriously wish that never happen.*

If you still like Directives try implement two directive on one. It will be too much fun. And pure magic if one directive is created by you and other is created by third third-party. 

##Three musketeers - Service, Factory and Provider##
I don't know how many times I have searched google with `Service vs Factor vs Provider` . Nowadays you don't even have to put angularjs on top of that. If you write above message you will have angularjs answer only. It way too complicated for simple module with helper functions. Aren't we all happy with few base global in age of JQuery that passed in as parameter in modular functions. And now we have DI(Proudly called as Dependancy Injection). 

##Wired - DI##
It is good thing. A good thing invented from the object-oriented concept. And then it is used almost every where. whether it is needed or not. For the case of Angular it is good we can have module without worrying about modules. Directly available in function. But then what about other libraries we need to created wrapper around it to make angular way. And then have plenty of gulp or grunt plumbing tools so you can save your ass when things minified and combined.

##Grass is always green on other side##
I don't say angular beast we never wanted. But you need to use it carefully. I have seen more than enough projects, new and legacy using angular in all wrong way. It make tough to debug or extend. Every time you got feeling that lets dump it all and make it again. We don't need to learn another framework just learn `JavaScript - Good Parts`. And things are all good. But instead most of resources are wasted on teaching Angularjs. With a hope that **Super Hero** framework will solve every issue we have. 

> It is not going to be. It was never going to be. It will never going to be.

We are the one who gonna solve our issue. Pick your framework wisely and try not to hope so much from it. 

## My Personal Pick##
If I want to go so hard on my self and don't want any error in my **to be** big project. I will choose [elm](http://elm-lang.org). It's not framework but a hell of a language with crazy html support. 

If people are coming from JavaScript land to join me then I ll go for [react](https://facebook.github.io/react/)

If there is a need quick two-way binding on a single page then [knockout](http://knockoutjs.com/) is a good thing.

If I want to go fast for small project. And I am the only one working on it at least for now. Or may be some single person working on it. I will go with Angularjs. I don't mind. It is quick and easy. 

Big project. [Ember](http://emberjs.com/) is there. But few times I feel it is unnecessary complexity. Two way binding and not much of angular mess [Aurelia](http://aurelia.io/).

Above all opinion is derived from my personal experience and not influenced by any one. And it is my own.