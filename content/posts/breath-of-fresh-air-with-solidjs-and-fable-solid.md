---
title: "Breath of Fresh Air with Solid JS and Fable.Solid"
slug: "breath-of-fresh-air-with-solidjs-and-fable-solid"

date: 2022-12-17
categories:
  - Technical
tags:
  - OSS
  - FSharp
  - Fable
  - Functional
  - Functional Web
  - Elmish
  - Dotnetcore
---

### History 

I have spent the better part of my engineering career developing web applications. From frameworks like [JQuery](https://jquery.com/) to [AngularJS](https://angular.io/) to [KnockoutJS](https://knockoutjs.com/) to [React](https://reactjs.org/) everywhere. 

These were many aha moments of history. But after ReactJS launched there was no that kind of aha moment happened. [Elm](https://elm-lang.org/) was there, but it can't beat the reach or impact of ReactJS. 


One thing from Elm land adopted by all frameworks is [The Elm Architecture](https://guide.elm-lang.org/architecture/). It is a great way to develop Large Scale Applications. Instead of following different state management frameworks, rely on creating a specific style of architecture. It was something similar to the MVC style of developing backend applications. 

The world seems to be frozen in one place. Things are working there is no issues there. But as usual, developers tend to find bottlenecks sooner than later. These give rise to a couple of things. One is [Atomic State Management](https://recoiljs.org/) and the other is [fine-grained reactivity](https://dev.to/ryansolid/a-hands-on-introduction-to-fine-grained-reactivity-3ndf). 

Both came from the requirement of performance and developer experience. React is good and getting better but its internals doesn't allow go beyond one point. There comes [SolidJS](https://www.solidjs.com/). It has both fine-grained reactivity as well as atomic state management. It also has good things from ReactJS, like JSX and Component-based development. 

Let's talk about F# a bit. I don't have to write much in this blog, as you can read my journey in F# in my [articles](https://kunjan.in/tags#fsharp-list). [Fable](https://kunjan.in/tags#fable-list) kind of has had official ReactJS binding since inception. If you are looking for some next-gen options then F# also has official WebAssembly support using [FsBolero](https://fsbolero.io/) a wrapper around [Blazor](https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor).

### SAFE and SAFEr stack

F# community also came up with a stack to develop a full-stack application called the [SAFE stack](https://safe-stack.github.io/). Which set you up for Elm Architecture in F# with react as your rending engine. You can use various frameworks as server applications. My favorite flavor of the SAFE stack is the [SAFEr stack](https://github.com/Dzoukr/SAFEr.Template) with either Giraffe or Serverless options. I personally like [Giraffe](https://giraffe.wiki/), maybe I am just old school. But in any way, I like SAFEr better than the original SAFE any day.

### The Struggle

Fable + Elmish struggle when you are either developing large-scale applications or quite complicated applications from a UI point of view. You passed the `dispatch` everywhere to update your state. The state is always immutable it is a great thing to have but never forget JavaScript is `single-threaded` and updating the global state, in a very nested object is a costly affair. Think if you are filling up forms deep down in UI where you need to update the state for every keystroke you make, then it will update the `a.b.c.d.e.f` every time immutably and rerendering that leaf and all the parents of that leaf. Similar things happen for complex recursive UI. It works but there will be a hit on performance and also development experience. Rendering and passing dispatch everywhere is not that good of an experience as well. Here, even if you skip the ELM and stay true to react, then there is an issue of *prop drilling*. Third-party state management comes with a cost of maintaining F# bindings, and if we go for context then it will update the whole tree of UI when the state changes, so there is costing on performance.

> The above case will never arise for a simple application, but if a project is developed in F# then simple is out of the question in most cases. 

### The ~~Alfonso Garcia-Caro~~ Answer

When I was struggling with all this, I got a suggestion to look into SolidJS as Alfonso announced SolidJS binding. Alfonso does release a thing or two every year, it is hard to follow up with his every new release. But, when I look at it, it was an AHA moment for me. SolidJS person brings back the beauty of KnockoutJS from the past and mixed it in ReactJS syntax. SolidJS is an awesome library, that not only includes UI but also state management in it.  

SolidJS might take a whole other blog if I write about it and the difference between React and SolidJS. I will leave it to users to figure it out. But here I want to talk about [Fable.Solid](https://github.com/fable-compiler/Fable.Solid). 

It is part of Fable 4. So, currently in beta, alpha, and gamma style of version. It is becoming more and more API complete and as of now, it is not fully API-complete with SolidJS. But still, it works. Here is a code sample of it from the original repo. You can find out more examples in the [repo](https://github.com/fable-compiler/Fable.Solid) as well. 

```fsharp
open System
open Fable.Core
open Feliz.JSX.Solid

open type Components

  type Components with
    [<JSX.Component>]
      static member Counter() =
          let count, setCount = Solid.createSignal (0)
          let doubled () = count () * 2
          let quadrupled () = doubled () * 2

          Html.fragment
              [
                  Html.p $"{count ()} * 2 = {doubled ()}"
                  Html.p $"{doubled ()} * 2 = {quadrupled ()}"
                  Html.br []
                  Html.button
                      [
                          Attr.className "button"
                          Ev.onClick (fun _ -> count () + 1 |> setCount)
                          Html.children [ Html.text $"Click me!" ]
                      ]

                  Html.hr []
                  Components.DivideBy()

                  Html.hr []
                  Html.p "These components share state through context provided by the App parent"
                  Html.br []
                  Components.ColorInput()
                  Components.ColorInput()
              ]
```

Another thing that I liked even more than Fable.Solid is [Fable.JSX](https://github.com/fable-compiler/Feliz.JSX) coming for SolidJS and React both. It allows a developer to write HTML and JSX code inside F# code. Makes things way easier when designing applications. Now, we don't have to convert every possible design element to F# code instead use HTML syntax as it is. It just works. Check out how you can easily use [HeroIcons](https://heroicons.com/) inside your Fable solid application. 

```fsharp
[<JSX.Component>]
let Plus() =
   JSX.html """
<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  class="w-4 h-4 ml-3"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M12 4.5v15m7.5-7.5h-15"
  />
</svg>
 """

[<JSX.Component>]
let Funnel() =
   JSX.html """
<svg 
xmlns="http://www.w3.org/2000/svg" 
fill="none" 
viewBox="0 0 24 24" 
stroke-width="1.5" 
stroke="currentColor" 
class="w-4 h-4 mr-2"
>
  <path 
  stroke-linecap="round" 
  stroke-linejoin="round" 
  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" 
  />
</svg>
"""
```


If you haven't felt excited about this then just hold on for a second. Another best thing about Fable.JSX is a jsx import. Finally, it makes things easier to import any kind of JSX component in F#. Makes things easier for libraries like SolidJS which don't use virtual DOM to create components so it doesn't have any mechanism to create one. It just uses JSX syntax to create a real dom tree in HTML. See how easy it is when you are using the third part library you can write your code in TSX and import in F# with minimum effort. As you can see I am just exposing data to be passed and other configuration stays in TSX. So, it is staying near the reference code for that library. Make things easier to manage and read for future me as well as anyone joining the project in the future. 

```ts
import type { Component } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export const Test: Component = ({data} : {
  data : {
    make : string;
    model : string;
    price : number;
  } []
}) => {
  const columnDefs = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
  ];

  

  const defaultColDef = {
    flex: 1,
  };

  return (
    <div class="ag-theme-alpine" style={{height : '600px'}}>
      <AgGridSolid
        columnDefs={columnDefs}
        rowData={data}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

```

with 

```fsharp
type AgGridSolid =
  
  [<ImportMember("./AgGridSolid.tsx"); JSX.Component>]
  static member Test (data : {|make : string; model : string ; price : double |} []) : JSX.Element = jsNative
```

can be used like

```fsharp
  [<JSX.Component>]
  let AgGridView() =
    Html.div [
      Html.p "Ag Grid Should Come Here..."
      AgGridSolid.Test([|
        {|
          make = "Toyota"; model = "Celica" ; price = 35000. 
        |}
        {|
          make = "Ford"; model = "Modeo" ; price = 32000. 
        |}
        {|
          make = "Porsche"; model = "Boxter" ; price = 72000. 
        |}
      |])
    ]  
```

Let's dig deep into various examples of SolidJS

Here one is with Signal, which is similar to react useState. But the difference is that it will update on a piece of DOM when data is changed instead of rendering the whole DOM where useState is used.

```fsharp
[<JSX.Component>]
let Counter() =
    let count, setCount = Solid.createSignal(0)
    let doubled() = count() * 2
    let quadrupled() = doubled() * 2

    Html.fragment [
        Html.p $"{count()} * 2 = {doubled()}"
        Html.p $"{doubled()} * 2 = {quadrupled()}"
        Html.br []
        Html.h1 [
            Attr.className "text-3xl font-bold underline"
            Html.children [
                Html.text "Counter!!!"
            ]
        ]
        Html.button [
            Attr.className "button"
            Ev.onClick(fun _ -> count() + 1 |> setCount)
            Html.children [
                Html.text $"Click me!"
            ]
        ]
    ]
```

Now, take the same example with Store. The code looks almost the same. As per docs, one should use Signal when there is a need of updating whole data at once, like a number or string. But when there is a need for partial updation then use the store. Like arrays and objects should be stored in the store. It will update the entity with a partial update to that property. SolidJS will update UI reactively. Without virtual DOM this would be way more performant compared to react. 


```fsharp
type CounterStoreType = {
    Inner : int 
}

[<JSX.Component>]
let CounterStore() =
    let count, setCount = Solid.createStore<CounterStoreType>({
        Inner = 0
    })
    let doubled() = count.Value.Inner * 2
    let quadrupled() = doubled() * 2

    Html.fragment [
        Html.p $"{count.Value.Inner} * 2 = {doubled()}"
        Html.p $"{doubled()} * 2 = {quadrupled()}"
        Html.br []
        Html.h1 [
            Attr.className "text-3xl font-bold underline"
            Html.children [
                Html.text "Counter Store!!!"
            ]
        ]
        Html.br []
        Html.button [
            Attr.className "button"
            Ev.onClick(fun _ -> 
                setCount.Update {
                    Inner = count.Value.Inner + 1
                })
            Html.children [
                Html.text "Click me!"
            ]
        ]
    ]

```

Above example actually not justify store use but as you can see it is very similar to how we use Signal. 

What about state management when there is a need of sharing states between components? Now, parent-child is easy, pass using props just like react. But if you want to share state between siblings then you can easily do with context. Now, if you think Context will update the whole DOM tree, then my friend there is no virtual dom and fine-grained reactivity will update only what is required. So, just put things in Context and you will get a sharable Store or Signal. Yup, no passing dispatch in props and access to store all the child components of context. Api for context is also implemented in Fable.Solid. Check it out how it works. 

This birthday post is part of the [FsAdvent calendar 2022](https://sergeytihon.com/2022/10/28/f-advent-calendar-in-english-2022/). I am sorry that I am unable to write more nowadays as I am busy with F# work. But I should be writing more and giving talks nationally and internationally in 2023. I like to thank [phosphor.co](https://www.phosphor.co/) team for the continued support and especially [Alfonso Garcia-Caro](https://github.com/alfonsogarciacaro/) for his awesome work.

> Request the reader to suggest a new name for the stack for, Giraffe + Solid + Whatever Cloud or Database. Something Fresh for future as well old F# web users. 


