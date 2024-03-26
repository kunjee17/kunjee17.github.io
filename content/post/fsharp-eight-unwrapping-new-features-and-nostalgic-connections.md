---
title: "F# 8: Unwrapping New Features and Nostalgic Connections"
slug: "fsharp-eight-unwrapping-new-features-and-nostalgic-connections"
toc : true
date: 2023-12-17
categories:
  - Technical
tags:
  - OSS
  - FSharp
  - Fable
  - Functional
  - Functional Web
  - Dotnetcore
---

Ah, F#—the language that keeps surprising us! The recent release of F# 8 brings a bag full of goodies that not only enhance the language but also make us chuckle at the memories. It's like the F# team is constantly pulling rabbits out of their hats.

You can dive into the extensive list of changes in the [official announcement blog post](https://devblogs.microsoft.com/dotnet/announcing-fsharp-8/), but let's take a stroll down memory lane and see how some of these updates echo with libraries from the past.




## The "Fun" Removal

One of the notable changes is the removal of the need to write fun in default cases. It not only improves readability but also, alas, takes away the popular joke among F# enthusiasts that F# is "fun" to use—a small price to pay for clarity.

#### Before
```fsharp
type Person = {Name : string; Age : int}
let people = [ {Name = "Joe"; Age = 20} ; {Name = "Will"; Age = 30} ; {Name = "Joe"; Age = 51}]

let beforeThisFeature =
    people
    |> List.distinctBy (fun x -> x.Name)
    |> List.groupBy (fun x -> x.Age)
    |> List.map (fun (x,y) -> y)
    |> List.map (fun x -> x.Head.Name)
    |> List.sortBy (fun x -> x.ToString())

```

#### After

```fsharp
type Person = {Name : string; Age : int}
let people = [ {Name = "Joe"; Age = 20} ; {Name = "Will"; Age = 30} ; {Name = "Joe"; Age = 51}]

let possibleNow =
    people
    |> List.distinctBy _.Name
    |> List.groupBy _.Age
    |> List.map snd
    |> List.map _.Head.Name
    |> List.sortBy _.ToString()

```

It's not just F# that's playing with "fun"—check out FSharp.Core.Fluent. Sure, the library might be taking a nap, but when it was awake, it was doing similar things with dots!

```fsharp
open FSharp.Core.Fluent

let xs = [ 1 .. 10 ]

xs.map(fun x -> x + 1).filter(fun x -> x > 4).sort()

xs.map(fun x -> x + 1)
  .filter(fun x -> x > 4)
  .sort()
```

No more `pipes` but hey, `dots` are in!


## Nested Records

Nested record updates used to be a workout, but not anymore. F# 8 comes to the rescue with a concise syntax.

#### Before

```fsharp
type SteeringWheel = { Type: string }
type CarInterior = { Steering: SteeringWheel; Seats: int }
type Car = { Interior: CarInterior; ExteriorColor: string option }

let beforeThisFeature x =
    { x with Interior = { x.Interior with
                            Steering = {x.Interior.Steering with Type = "yoke"}
                            Seats = 5
                        }
    }

```

#### After

```fsharp
let withTheFeature x = { x with Interior.Steering.Type = "yoke"; Interior.Seats = 5 }
```

What was there before? Ah, the legendary `Lens` from the timeless `fsharpplus` library. It's the hero that handled nested records way before it was cool.

```fsharp
open System
open FSharpPlus
// In order to use the Lens module of F#+ we import the following:
open FSharpPlus.Lens

// From Mauricio Scheffer: https://gist.github.com/mausch/4260932
type Person =
    { Name: string
      DateOfBirth: DateTime }

module Person =
    let inline _name f p =
        f p.Name <&> fun x -> { p with Name = x }

type Page =
    { Contents: string }

module Page =
    let inline _contents f p =
        f p.Contents <&> fun x -> {p with Contents = x}

type Book =
    { Title: string
      Author: Person
      Pages: Page list }

module Book =
    let inline _author f b =
        f b.Author <&> fun a -> { b with Author = a }

    let inline _authorName b = _author << Person._name <| b

    let inline _pages f b =
        f b.Pages <&> fun p -> { b with Pages = p }

    let inline _pageNumber i b =
        _pages << List._item i << _Some <| b

let rayuela =
    { Book.Title = "Rayuela"
      Author = { Person.Name = "Julio Cortázar"
                 DateOfBirth = DateTime(1914, 8, 26) }
      Pages = [
        { Contents = "Once upon a time" }
        { Contents = "The End"} ] }

// read book author name:
let authorName1 = view Book._authorName rayuela
//  you can also write the read operation as:
let authorName2 = rayuela ^. Book._authorName

// write value through a lens
let book1 = setl Book._authorName "William Shakespear" rayuela
// update value
let book2 = over Book._authorName String.toUpper rayuela

```

The symbols in `fsharpplus` were lifesavers, handling nested records like a boss.


## Wrapping It Up

These updates in F# 8 aren't just features; they're nostalgic nods to libraries that paved the way. Kudos to the F# team and the brilliant minds behind these libraries from the past.

This birthday post is part of the [FsAdvent calendar 2023](https://sergeytihon.com/2023/10/28/f-advent-calendar-in-english-2023/). F# turns another year older with me, and it only gets better.