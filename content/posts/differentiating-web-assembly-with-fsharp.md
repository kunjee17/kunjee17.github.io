---
title: "Differentiating Web Assembly with F#"
keywords:
-
slug: "differentiating-web-assembly-with-fsharp"
date: 2020-12-17
categories:
- Technical
tags:
- DotNet
- OSS
- Functional Programming
- Dotnetcore
- FSharp
- FSAdvent
- WebAssembly
- FSBolero

---

> This post is part of [F# Advent](https://sergeytihon.com/2020/10/22/f-advent-calendar-in-english-2020/) calender. Thanks [Sergey Tihon](https://twitter.com/sergey_tihon) for arranging this and giving me chance.

[JavaScript](https://www.javascript.com/) is a different kind of beast when it comes to a programming language. It is easy to learn but too hard to master. I still get nightmares of interview questions about JavaScript code. One needs to select the correct output for a given code snippet.

For all those reasons, I always go for languages transpile to JavaScript. Be it [CoffeeScript](https://coffeescript.org/), [TypeScript](https://www.typescriptlang.org/), [FunScript](https://github.com/ZachBray/FunScript), [Fable](https://fable.io/) etc. They all provide different types of features to deal with JavaScript issues.

As this article is part of [FSAdvent 2020](https://sergeytihon.com/2020/10/22/f-advent-calendar-in-english-2020/), we will talk about F# and its relationship with JavaScript or web programming in general. It is mostly about executing F# in your favorite browser (mostly all latest browser - IE obviously).

There have been multiple attempts to make F# work in browsers. [Web Sharper](https://websharper.com/) and Fun-Script were a few of the first attempts to run F# on web browsers.  Both are transpile to the JavaScript frameworks.

WebSharper is still around, under MIT license.  It supports C# and F# as programming languages. WebSharper also supports Full Stack C# / F# development.

Fun-Script is not actively maintained. But we have another choice called Fable, a logical successor of Fun-Script. Fable is also F# to JavaScript tool. You can do Full Stack development with Fable as well, with the support of some friends from the zoo. (Read [Giraffe](https://github.com/giraffe-fsharp/Giraffe) and Zebras here.)

The world is pretty much balanced. We have two good choices to write kind of error-free code in F# for front end development if I haven't missed any. I like to put a disclaimer here; that I am an active maintainer of the [awesome fable](https://github.com/kunjee17/awesome-fable) project.

There is one more choice, [FSBolero](https://fsbolero.io/). It is F# wrapper around [Blazor](https://blazor.net/). Blazor is a Web Assembly framework to run .Net in a web browser. If we go to FSBolero docs, everything is pretty much similar. We can write F# in a client, we can have Full Stack application in F# as well. We can run mix mode using SignalR. Let's not go into the details about that. MSFT people are already trying hard to market Blazor + SignalR.

So, the question arises, where one uses FSBolero? It has Elmish, so does Fable. It can run F# on a client, so does Fable. So, why bother?

FSBolero comes with loaded power of Web Assembly. If we are making a typical Elmish application with it then we might not be justifying all the power we get.  There is a whole unreal engine that works in the web browser with help of Web Assembly. No, I m not going to run anything unreal with it.

But we can surely try some Mathematics in the browser. Something that JavaScript can't do or can't do in a performant way. I am learning PyTorch in my free time. So, my first attempt was to run [Torch Sharp](https://github.com/xamarin/TorchSharp/) in FSBolero. But sadly I can't even run it on my machine, in full project. Thanks to something called native dependencies. I was a little disappointed, that even this time I have to write about my [failed attempt](/2018/12/tensorflow-fable-elmish-a-failed-try/). But but but there is one more little known framework there. Something called [DiffSharp](https://diffsharp.github.io/). DiffSharp is a tensor library with advanced support for differentiable programming.

Guess what, I did manage to make it work with FSBolero. Yes, differentiation working in a browser. Here is the [project](https://github.com/kunjee17/fsbolerodiff), if you like to give it a try. Below is a code snippet.

```fsharp
type Model = { currentTensor: Tensor }

let initModel = { currentTensor = Tensor.Zero }

type Message =
    | Zero
    | One
    | Scalar
    | Vector

let init arg =
    let t1 = Tensor.Zero
    { currentTensor = t1 }

let update message model =
    match message with
    | Zero ->
        { model with
              currentTensor = Tensor.Zero }
    | One ->
        { model with
              currentTensor = Tensor.One }
    | Scalar ->
        { model with
              currentTensor = dsharp.tensor 1.2 }
    | Vector ->
        { model with
              currentTensor = (dsharp.tensor [ 0.0; 0.3; 0.1 ]) }

// Define a scalar-to-scalar function
let f (x: Tensor) = sin (sqrt x)

// Get its derivative
let df = dsharp.diff f

// Now define a vector-to-scalar function
let g (x: Tensor) = exp (x.[0] * x.[1]) + x.[2]

// Now compute the gradient of g
let gg = dsharp.grad g

// Compute the hessian of g
let hg = dsharp.hessian g

let view (model: Model) dispatch =
    div [ attr.classes [ "container" ] ] [
        div [ attr.classes [ "columns" ] ] [
            div [ attr.classes [ "column" ] ] []
            div [ attr.classes [ "column" ] ] [
                text (sprintf "Current Tensor %A, and Shape of it %A" model.currentTensor model.currentTensor.shape)
            ]
            div [ attr.classes [ "column" ] ] []
        ]

        if (model.currentTensor.shape.Length = 0) then
            div [ attr.classes [ "columns" ] ] [
                div [ attr.classes [ "column" ] ] []
                div [ attr.classes [ "column" ] ] [
                    text (sprintf "sin (sqrt x) of scalar: %A" (f (model.currentTensor)))
                ]
                div [ attr.classes [ "column" ] ] []
            ]

            div [ attr.classes [ "columns" ] ] [
                div [ attr.classes [ "column" ] ] []
                div [ attr.classes [ "column" ] ] [
                    text (sprintf "diff of sin (sqrt x) scalar: %A" (df (model.currentTensor)))
                ]
                div [ attr.classes [ "column" ] ] []
            ]

        if (model.currentTensor.shape.Length = 1) then
            div [ attr.classes [ "columns" ] ] [
                div [ attr.classes [ "column" ] ] []
                div [ attr.classes [ "column" ] ] [
                    text (sprintf "exp (x.[0] * x.[1]) + x.[2] vector: %A" (g (model.currentTensor)))
                ]
                div [ attr.classes [ "column" ] ] []
            ]

            div [ attr.classes [ "columns" ] ] [
                div [ attr.classes [ "column" ] ] []
                div [ attr.classes [ "column" ] ] [
                    text (sprintf "gradient of exp (x.[0] * x.[1]) + x.[2] vector: %A" (gg (model.currentTensor)))
                ]
                div [ attr.classes [ "column" ] ] []
            ]

            div [ attr.classes [ "columns" ] ] [
                div [ attr.classes [ "column" ] ] []
                div [ attr.classes [ "column" ] ] [
                    text (sprintf "hessian of exp (x.[0] * x.[1]) + x.[2] vector: %A" (hg (model.currentTensor)))
                ]
                div [ attr.classes [ "column" ] ] []
            ]

        div [ attr.classes [ "columns" ] ] [
            div [ attr.classes [ "column" ] ] []
            div [ attr.classes [ "column" ] ] [
                div [ attr.classes [ "columns" ] ] [
                    div [ attr.classes [ "column" ] ] [
                        button [ attr.classes [ "button" ]
                                 on.click (fun _ -> Zero |> dispatch) ] [
                            text "Zero"
                        ]
                    ]
                    div [ attr.classes [ "column" ] ] [
                        button [ attr.classes [ "button" ]
                                 on.click (fun _ -> One |> dispatch) ] [
                            text "One"
                        ]
                    ]
                    div [ attr.classes [ "column" ] ] [
                        button [ attr.classes [ "button" ]
                                 on.click (fun _ -> Scalar |> dispatch) ] [
                            text "Scalar 1.2"
                        ]
                    ]

                    div [ attr.classes [ "column" ] ] [
                        button [ attr.classes [ "button" ]
                                 on.click (fun _ -> Vector |> dispatch) ] [
                            text "Vector [ 0.0; 0.3; 0.1 ]"
                        ]
                    ]
                ]
            ]
            div [ attr.classes [ "column" ] ] []
        ]
    ]
```

Nothing fancy in there. Just took the example of DiffSharp and put it out there with a little bit of Elmish on the top.

It might seems boring but possibilities are infinite. I really love to have TorchSharp working with FSBolero. So, one can train machine learning and Neural Network models on the client-side. Prediction can also happen on the client-side as well.

Why? The dumb answer is for [fun and profit](https://fsharpforfunandprofit.com/). (Hi, Sir Scott Wlaschin). But we are having a good amount of computing power on the client-side as well. We can push a good amount of calculations on that as well. Also, sometimes we can't save data on a server but if we still like to provide ML experience in client application then it will be possible with Web Assembly.

There is one downside of Web Assembly in general, that is the first time load of the application. But you can easily use mix mode or serve client application wrap in electron js so one doesn't have to download all the load.

There is surely less F# code here compared to my other articles. But I hope you don't mind a little bit more Mathematical fun instead.

> PS: Any Math expert like to push Web Assembly to its boundary, then do give PR with your Math example. Happy to have some crazy examples.
