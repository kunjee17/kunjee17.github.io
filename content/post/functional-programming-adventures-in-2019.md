---

title: "Functional Programming Adventures in 2019"
slug : "functional-programming-adventures-in-2019"

date: 2019-01-09
categories:
- Technical
tags:
- OSS
- FSharp
- Fable
- Functional
- Functional Web
- Dotnetcore
- Scala
- Rust
- Kotlin
- Swift
- Fabulous
---

## Happy New Year

I like to start with wishing all the readers *A Very Happy New Year...* I wish 2019 for you will be too much fun and less of issues.

Speaking of issues, will going to talk about Functional Programming. Because if you are coding with Functional Programming you normally get fewer errors. I love them for those reasons.

In this post also as the title suggests I will be going to talk about Functional Programming only. There will be no code though, but mostly in a meta sense.

## Fable


As we are talking about Functional Programming we have to talk about [Fable](https://fable.io/). My current favorite tech. It nicely converts F# to JavaScript. Also, have a wonderful ecosystem. I am lucky enough to be part of it, and also maintaining [awesome-fable](https://github.com/kunjee17/awesome-fable). I am using it in multiple projects since more than a year. It is very much battle ready for putting in a big or very big project. I will talk about projects later. But let us talk about a few other announcements.

### Green Print

If you take Blue and mix with Yellow what will you get? It is Green. Here is [Green Print](https://github.com/kunjee17/greenprint) project. It is a thin wrapper around [Blueprint Js](https://blueprintjs.com/). So, the blueprint can be used with Fable Elmish. Blueprint is UI library built for a desktop heavy web application. All the namespaces are in Fable fashion, `Fable.Blueprint.*`. It is still a work in progress though. I did port `core` and `icons` but others are still pending.

I love [Fulma](https://github.com/MangelMaxime/Fulma) so I did take that project and make Green Print from it. I am using a library in a project for work. I will be adding to it to open source project as well. It is kind of working. The thing here is, BluePrint is quite a big library so I can't test all elements with all features. Docs are also pending so there is a chance of few corner issues. But here I need community's help to make feature ready as fast as possible. Fine tune the API or working on docs. It is the same as Fulma but bit different. Check out Blueprint JS and see if that matters to you. I'll be happy if that can be useful to anyone.

## Fabulous

[Fabulous](https://fsprojects.github.io/Fabulous/) is a fabulous library for cross-platform mobile development. It is a wrapper around Xamarin.Forms with Elmish in it. I was so pumped up when it first launched, tried and made a couple of apps with it. Nothing fancy but was having fun around. There were a few things I was not happy about.

- The list is quite jumpy
- Not happy with the performance in android
- I felt there is too much wire up I need to do
- Live reload didn't work for multiple files in the project

> But

### FabScaffold

Recently I created application with Fabulous within a week. Polishing UI did take a week more. I will write more about it in separate write up once I launch a application. Coming very soon. For now I rip apart my application and created a scaffold from it.

Here is the project called [FabScaffold](https://github.com/kunjee17/FabScaffold). It is having almost everything to get you started. It also provides an architecture to grow your next business application. Go for it. I have solved all mentioned issues other than live-reload for multiple files in a project.

> Fabulous has same limitations what Xamarin.Forms have. Back end plugins gonna work as it should and for UI you might need a wrapper for few and few gonna work as it is. But it is too good without all that Xaml around.

## Machine Learning Monday

I have started *Machine Learning Monday* a few months back. But due to year ending can't continue. But will going to continue from next week. Coming Monday I will be reviewing [F# for Machine Learning Essentials](https://www.packtpub.com/big-data-and-business-intelligence/f-machine-learning). Got this book from Sudipta Mukherjee himself. It would be fun. So, stay tuned.

## Sad state of F# & Moving Forward

This is a little bit personal. Some might find it rant but please don't mind. I started my consulting gig [Fuzzy Cloud](https://fuzzycloud.in/) last year. There are a couple of people other than me. Sole motive behind starting my own gig was to do more work in F#. Be it consulting or training. It is such a sweet language and having a wonderful community around it. I did get a continues contract work a year before. But last year was not so good. Not only it is hard to find work in F#, but people also keep asking for other languages like Scala or Haskell. There is not enough buzz or work in F#. Even in a functional conference when people speak about Haskell, Scala, Elixir in the same breath they always skip F#. Even in twitter account *Functional Works* skips F# quite a couple of time. Even though I learn those languages, I am all in for F#.

> I should not fall in love of language (it is just a tool). But what one should do when language is so delightful.

I am still going to try a few more months if I get good work in F#. Else I need to keep it for my hobby projects, only. I will be working more towards Scala, Rust, and Kotlin. Haskell and Swift are also there but I m kind of undecided on those.

> I am available for F# related training and work if anyone interested or having a remote position open.


## Speaking

In 2019 I will try to speak at more conferences. As of now *F# exchange* is top of my mind. Please suggest good conference if you think they are good and don't mind fresh speakers.

## Languages
Because of my for history I never liked English that much. Also, never bothered about it. But I guess need to improve on that. Also, want to learn German as well. People says it is very close to Sanskrit. May be I can learn both. If you know how to get started with German better than Google search then please let me know.

> If someone is confused about history and English they can read about [Bengal Famine 1943](https://en.wikipedia.org/wiki/Bengal_famine_of_1943) a very recent incident.

I will also try to write more compared to the last couple of years. There are many things I like to share but never get enough time to write. With that, I am closing it. Happy New Year once again to everyone.
