---
title: "The Coming of Age of Angular"
date: 2019-06-03T12:46:49+05:30
categories:
- Technical
tags:
- OSS
- Web
- Mobile Web
- Ionic
- SPA

keywords:
- Angular
- Angularjs

thumbnailImage: images/angular.png
---

I have learned [AngularJS](https://angularjs.org/) since it's inception. As far as I have learn from the best. Paid for [Tekpub](https://www.pluralsight.com/newsroom/press-releases/pluralsight-acquires-tekpub--third-acquisition-in-3-months-) subscription to learn Angular and other things. Have worked extensively to horn my angular skills.

Not only that, I was **Team / Tech Lead** for cross platform mobile development, working on large to very large projects in Angular and Ionic.

> Trust me, I also know the pain of migrating AngularJS to Angular2 (alpha) version.

I did moved to Elm or Elm style application since then. Also lead the group to bring [React](https://reactjs.org/) to the company I was working in. But Angular did *Come of Age* since then.

Recent released [Angular 8](https://blog.angular.io/version-8-of-angular-smaller-bundles-cli-apis-and-alignment-with-the-ecosystem-af0261112a27) did bring quite a good goodies to Angular. Be it things like *Differential Loading by Default, Dynamic Imports, Schematics, Web Workers* etc. I am so happy with what is happening with *Ivy/Bazel*.

I am amazed what Angular team is doing. I will discuss few of them here, and also point out my opinion on it.

## {NG}Modules

It is the starting point of any angular application. You at least need one module if not more. Below is the code, you can see how NG-Modules looks like. You need to add Components, Services or anything else you like add into modules.

{{<gist kunjee17 1400ecf366c199a3a253004fe549b295>}}

Modules brings wonderful facility to your project. It allows to declare what needed in that module. So, you don't load everything, but only load things that is required. Also, module can have multiple modules, so you can have logical separation also in terms of modules.

> Pro Tip: I normally like to follow rules that, every page is different module, having multiple components. This allows lazy loading to kick in and make things little bit more better in case performance.

## {NG}Component
It is single piece of UI having their own logic, UI and style. So, practically you have `component.ts`, `component.html` and `component.css` pages. Developer divide page into multiple pieces as components and then join them to make a page, which it self a component. Long gone the days of AnuglarJS where you can't break page that easily. I personally love this part of breaking components.

I start with Single big fat component, which represent page and then chopping things as and when it is required. Here is simple code for component.

##### Component.ts

{{<gist kunjee17 b99f389df55337f36605f549a97e7ec5>}}

##### Component.html

{{<gist kunjee17 ed5879a97a5bc593ecb8e8e24d9afb82>}}

##### Component.css

{{<gist kunjee17 697315bb721ea911608b70b783fb1d7a>}}

As mentioned earlier, I do like React / Elm. So, new I do love new way of writing angular application using components.

## {NG}Services

## {NG}Pipe

## {NG}Guard

## {NG}Directive
