---

title: "Opinionated Fable - Architecture & Performance"
slug : "opinionated-fable-architecture-and-performance"

date: 2018-03-27
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

There can't be better time for writing this blog. As Fable 2.0 is on the horizon it would be good to see what 1.0 already can do. And I can also wish few things to be added to 2.0.

I have chosen Fable after evaluating couple of options like TypeScript-React-Redux, Elm, Aurelia, Angular. One thing I was pretty much sure that I wanted static typing in my project. Because I did have first hand experience with big fat Angular application built using JavaScript.

In that project changing things, adding feature was just so damn painful. It is like if we press a key on keyboard, there is chance that we may broke the application. It was already in production for 3+ years when I joined the team, and still no one knows what is working and why it is working. It is damn painful to join brown filed project specifically written in javascript. On top of it top level management expects that we learn everything in minimum possible time, using **Chrome Debugger**.

![Seriously???](https://media.giphy.com/media/l3V0H7bYv5Ml5TOfu/giphy.gif)

I did it anyway, and also converted whole project to TypeScript. It helped me to understand the importance of good code and architecture even for Front End. Personally I feel that Front End Development needs more discipline than back end development. In back end code we can throw one more machine to save our poorly performing code, but for front end - chrome will just kill our machine for good if we write some crazy stuff.

Enough of JavaScript/ Front End bashing. Let's talk about Fable.

Here everything explained in context of big fat application. So, we might not need all at the start but always good to know it.

# Architecture

## Elmish in Single Page

When we start a new application with Elmish using template; It will create couple of pages for us in UI. In code all pages are divided in folder with three files `Type.fs`, `State.fs` and `View.fs` for that page.

It is very good design if we are starting our application. But soon enough we will be in middle of too many files to handle. And as namespace is available for us, we can easily separate them as per features. Here is simple example

```fsharp
namespace Home

module Types =

    type Model = string

    type Msg =
      | ChangeStr of string

module State =
    open Elmish
    open Types
    open Fable.Import.izitoast
    open Fable.Core.JsInterop

    let init () : Model * Cmd<Msg> =
      iziToast.info(jsOptions<IziToastSettings>(fun x -> x.message <- "Home Initializing...") ) |> ignore
      "", []

    let update msg model : Model * Cmd<Msg> =
      match msg with
      | ChangeStr str ->
          str, []

module View =
    open Fable.Core.JsInterop
    open Fable.Helpers.React
    open Fable.Helpers.React.Props
    open Types


    let root model dispatch =
      div[ ][
        p[ClassName "control" ][
          input[ ClassName "input";
                  Type "text";
                  Placeholder "Type your name here";
                  DefaultValue model;
                  AutoFocus true;
                  OnChange (fun ev -> !!ev.target?value |> ChangeStr |> dispatch ) ]
        ]
        br [ ]
        span[ ][ str (sprintf "Hello %s" model) ]
      ]

```

Here Home is page or component, and instead of having three different files for three different modules, we are having single file for three different modules.

> Now why bother doing this?

I have folder called *Pages*. Having all the different Page and components of the application in it. Even though I am using above style currently I am having **68 files and 32 folders** and counting. Now, if I was going with default then it would be **68 X 3 = 204** files to manage at minimum. Here I am not counting all helpers and extras we normally write in our application. All files are having three modules that is required for page or component; Type, State and View. Also, our code is that single file get clumsy sooner than expected. So, that is indication of breaking down the code and clean our stuff.

## Imports

My favorite thing from Fable Universe is [ts2fable](https://github.com/fable-compiler/ts2fable) . It generates F# code for `TypeScript Definition` file. Makes things way more easy to work with. And trust me, we will be using this tool very frequently. So, it would always be good idea to have import folder for all this. A top level folder that we normally don't touch other than updating library.

## Common Helpers

Another beneficial thing about using Fable is that we can share code between server and client. Obviously if both are written with [highest paying F# language](https://insights.stackoverflow.com/survey/2018#top-paying-technologies). It is very tempting to go full blown and exploit whatever we can. It might not effect the server side of code, but remember at the end of day JavaScript is running on client side. So, personal advice go one way from client to server instead of other way around. Write for client side and use it for server side. And do keep tap on the code we are using on client. Sometimes I just write code on server and use it on client. It works most of the time but can get cranky on client side. I'll talk about this in the later post.

# Performance

## Line of Code

There was time when billing amount was based on LOC. Even now I do find people time and again who just asked

> Q. You just wrote 4 lines of code, seems simple? why it took 4 hours to write?

> A. It is 4 lines of simple code that is the reason why it took 4 hours to write.

Same goes for JavaScript code, *literally*. Less code would be great in case of front end. People are trying way hard to generate less code. And as developers we should help other developers by writing better code. We should always try to generate as less code as possible to make our application better and faster.



## F# Types

F# types are best way to represent any model. And kind of defacto way while using Fable Elmish- Model.

Let's take a simple example

```fsharp
type InfoModel = {
        FirstName : string
        LastName : string
        DOB : string
        Gender : string
        IsValid : bool
    }
```

> PS: I'm using [Fable REPL](http://fable.io/repl/) for testing out the code. It is great way you can see what our F# code is doing. It will generate *hell* pretty JavaScript.

Let's see the generated JavaScript

```javascript
import { setType } from "fable-core/Symbol";
import _Symbol from "fable-core/Symbol";
import { compareRecords, equalsRecords } from "fable-core/Util";
export class InfoModel {
  constructor(firstName, lastName, dOB, gender, isValid) {
    this.FirstName = firstName;
    this.LastName = lastName;
    this.DOB = dOB;
    this.Gender = gender;
    this.IsValid = isValid;
  }

  [_Symbol.reflection]() {
    return {
      type: "Test.InfoModel",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        FirstName: "string",
        LastName: "string",
        DOB: "string",
        Gender: "string",
        IsValid: "boolean"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

}
setType("Test.InfoModel", InfoModel);
```

Seems lots of code for five lines. Ok, let it be like that. Let's add some more code in there.

```fsharp
type InfoModel = {
        FirstName : string
        LastName : string
        DOB : string
        Gender : string
        IsValid : bool
    } with
        static member Empty = {
            FirstName = "Don"
            LastName = "Syme"
            DOB = "unknown"
            Gender = "male"
            IsValid = true
        }
```

A typical F# way of writing Record Type or Model.

and here is JavaScript code

```javascript
import { setType } from "fable-core/Symbol";
import _Symbol from "fable-core/Symbol";
import { compareRecords, equalsRecords } from "fable-core/Util";
export class InfoModel {
  constructor(firstName, lastName, dOB, gender, isValid) {
    this.FirstName = firstName;
    this.LastName = lastName;
    this.DOB = dOB;
    this.Gender = gender;
    this.IsValid = isValid;
  }

  [_Symbol.reflection]() {
    return {
      type: "Test.InfoModel",
      interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
      properties: {
        FirstName: "string",
        LastName: "string",
        DOB: "string",
        Gender: "string",
        IsValid: "boolean"
      }
    };
  }

  Equals(other) {
    return equalsRecords(this, other);
  }

  CompareTo(other) {
    return compareRecords(this, other) | 0;
  }

  static get Empty() {
    return new InfoModel("Don", "Syme", "unknown", "male", true);
  }

}
setType("Test.InfoModel", InfoModel);
```

so, here are three imports (which gonna be part of last single minified javascript file), and pretty long JavaScript code. All the code is required to support everything F# Type has to offer. But now question is; *do we need all of them?* In this specific case when representing our page with model, we may not required things we normally required while using F# Type.

So, here we can use Fable's magic `[<Pojo>]` and see what it can do to our JavaScript code.

```fsharp
open FSharp.Core
open Fable.Core

[<Pojo>]
type InfoModel = {
        FirstName : string
        LastName : string
        DOB : string
        Gender : string
        IsValid : bool
    }
    module InfoModel =
        let Empty = {
            FirstName = "Don"
            LastName = "Syme"
            DOB = "unknown"
            Gender = "male"
            IsValid = true
        }

```

In above code, usage will not change. Even `InfoModel.Empty` will work as it is. How about JavaScript? Does it change?

```javascript
export const InfoModelModule = function (__exports) {
  const Empty = __exports.Empty = {
    FirstName: "Don",
    LastName: "Syme",
    DOB: "unknown",
    Gender: "male",
    IsValid: true
  };
  return __exports;
}({});
```

Less than the code we wrote using F#. And people says **F# is concise language**. Fable is doing awesome job generating concise JavaScript.

> Fable 2.0 Wish : I wish all type should be `Pojo` by default. And if someone like to use F# types then they can use it with help of attribute, something like `NoPojo`.

## Lenses and Spectacles

![cat with specs](https://media.giphy.com/media/oNs25TvxcwUGk/giphy.gif)

Above *InfoModel* is perfect to represent view. But what about validation. It is not holding any property to hold domain details. So, Let's write that and see the generated code.

```fsharp
open FSharp.Core
open Fable.Core

[<Pojo>]
type Validate = {
    IsValid : bool
    ErrMsg : string
}

    module Validate =
        let Success = {
            IsValid = true
            ErrMsg = ""
        }
        let Failure (msg : string) = {
            IsValid = false
            ErrMsg = msg
        }

        let InitialValidate = {
            IsValid = true
            ErrMsg = ""
        }

[<Pojo>]
type InfoModel = {
        FirstName : string
        LastName : string
        DOB : string
        Gender : string
        IsValid : bool
    }
    module InfoModel =
        let Empty = {
            FirstName = "Don"
            LastName = "Syme"
            DOB = "unknown"
            Gender = "male"
            IsValid = true
        }

[<Pojo>]
type InfoErrorModel = {
    FirstName : Validate
    LastName : Validate
    DOB : Validate
    Gender : Validate
}
    module InfoErrorModel =
        let Empty = {
            FirstName = Validate.InitialValidate
            LastName = Validate.InitialValidate
            DOB = Validate.InitialValidate
            Gender = Validate.InitialValidate
        }

[<Pojo>]
type Model = {
    InfoModel : InfoModel
    InfoErrorModel : InfoErrorModel
}
    module Model =
        let Empty = {
            InfoModel = InfoModel.Empty
            InfoErrorModel = InfoErrorModel.Empty
        }

```

As we can see it is very typical kind domain modelish code. Typical F# - DDD 101 thing. I will explain domain model in separate section but let's first see the generated JavaScript code.

```javascript
export const ValidateModule = function (__exports) {
  const Success = __exports.Success = {
    IsValid: true,
    ErrMsg: ""
  };

  const Failure = __exports.Failure = function (msg) {
    return {
      IsValid: false,
      ErrMsg: msg
    };
  };

  const InitialValidate = __exports.InitialValidate = {
    IsValid: true,
    ErrMsg: ""
  };
  return __exports;
}({});
export const InfoModelModule = function (__exports) {
  const Empty = __exports.Empty = {
    FirstName: "Don",
    LastName: "Syme",
    DOB: "unknown",
    Gender: "male",
    IsValid: true
  };
  return __exports;
}({});
export const InfoErrorModelModule = function (__exports) {
  const Empty_1 = __exports.Empty = {
    FirstName: ValidateModule.InitialValidate,
    LastName: ValidateModule.InitialValidate,
    DOB: ValidateModule.InitialValidate,
    Gender: ValidateModule.InitialValidate
  };
  return __exports;
}({});
export const ModelModule = function (__exports) {
  const Empty_2 = __exports.Empty = {
    InfoModel: InfoModelModule.Empty,
    InfoErrorModel: InfoErrorModelModule.Empty
  };
  return __exports;
}({});
```

Yes, it is less than F# code. It seems `Pojo` is working hard for us. And F# code is also seems to be correct. Simple enough to represent View and Complex enough to hold the validation output and message.

But as saying goes **The devil is in the detail**, even though model is quite simple it is tough to update it. It is immutable record type so we need to create new record every time we try to update. As validation properties are three level deep, there is not easy way to update it.

Luckily it is the old problem in functional programming world. So, we do have library like [aether](https://github.com/xyncro/aether) that provides support of something called *Lenses*. Lenses are used to update immutable record types. To do that we need to add few more methods to all the model modules and include a library full of supporting functions. Too much code need to be added just to update my error message. You can check aether examples for details.

I did used `aether` for around 15 days. And I did liked it. But instead of making things better it was making things more complex in context of UI (front end). At the end of the day I needed my model to represent my UI. So, I choose another route for the same.

```fsharp
open FSharp.Core
open Fable.Core

[<Pojo>]
type Validate = {
    IsValid : bool
    ErrMsg : string
}

    module Validate =
        let Success = {
            IsValid = true
            ErrMsg = ""
        }
        let Failure (msg : string) = {
            IsValid = false
            ErrMsg = msg
        }

        let InitialValidate = {
            IsValid = true
            ErrMsg = ""
        }

[<Pojo>]
type InfoModel = {
        FirstName : string
        FirstNameErr : Validate
        LastName : string
        LastNameErr : Validate
        DOB : string
        DOBErr : Validate
        Gender : string
        GenderErr : Validate
        IsValid : bool
    }
    module InfoModel =
        let Initial = {
            FirstName = "Don"
            FirstNameErr = Validate.InitialValidate
            LastName = "Syme"
            LastNameErr = Validate.InitialValidate
            DOB = "unknown"
            DOBErr = Validate.InitialValidate
            Gender = "male"
            GenderErr = Validate.InitialValidate
            IsValid = true
        }

[<Pojo>]
type Model = {
    InfoModel : InfoModel
}
    module Model =
        let Empty = {
            InfoModel = InfoModel.Initial
        }

```

I have just flatten the code here. It might be not appropriate from Functional Programming standard but it is easier to update and bind with View. Single level depth so no more craziness to update it.

Here is generated JavaScript code

```javascript
export const ValidateModule = function (__exports) {
  const Success = __exports.Success = {
    IsValid: true,
    ErrMsg: ""
  };

  const Failure = __exports.Failure = function (msg) {
    return {
      IsValid: false,
      ErrMsg: msg
    };
  };

  const InitialValidate = __exports.InitialValidate = {
    IsValid: true,
    ErrMsg: ""
  };
  return __exports;
}({});
export const InfoModelModule = function (__exports) {
  const Initial = __exports.Initial = {
    FirstName: "Don",
    FirstNameErr: ValidateModule.InitialValidate,
    LastName: "Syme",
    LastNameErr: ValidateModule.InitialValidate,
    DOB: "unknown",
    DOBErr: ValidateModule.InitialValidate,
    Gender: "male",
    GenderErr: ValidateModule.InitialValidate,
    IsValid: true
  };
  return __exports;
}({});
export const ModelModule = function (__exports) {
  const Empty = __exports.Empty = {
    InfoModel: InfoModelModule.Initial
  };
  return __exports;
}({});
```

Pretty small and sweet. Morel of the story is, we can and should avoid *Lenses* while writing our code Elmish way. There are more reasons hidden in below sections.

## Domain Domain Domain

![correct](https://media.giphy.com/media/pNpONEEg3pLIQ/giphy.gif)

Just like everyone in Functional Domain, I am big fan of Domain Driven Design and [Scott W](https://fsharpforfunandprofit.com/ddd/). It makes things more easier to represent. What is use of Fable if I can't use it in front end. Let's give it a try.


Simple string testing

```fsharp
type Name private(s : string) =
    member __.Name = s
    static member Create(s: string) =
        if (s <> "" || s <> null) then Ok s
        else Error "Invalid String"
```

converts to

```javascript
import { setType } from "fable-core/Symbol";
import _Symbol from "fable-core/Symbol";
import Result from "fable-core/Result";
export class Name {
  [_Symbol.reflection]() {
    return {
      type: "Test.Name",
      properties: {
        Name: "string"
      }
    };
  }

  constructor(s) {
    this.s = s;
  }

  get Name() {
    return this.s;
  }

  static Create(s) {
    if (s !== "" ? true : s != null) {
      return new Result(0, s);
    } else {
      return new Result(1, "Invalid String");
    }
  }

}
setType("Test.Name", Name);
```

Quite a long code. Let's try same thing another way

```fsharp
type Name = private | Name of string
    with
    member this.String = let (Name s) = this in s
    static member Create(s : string)=
        if (s <> "" || s <> null ) then Ok s
        else Error "Invalid string"
```

converts to

```javascript
import { setType } from "fable-core/Symbol";
import _Symbol from "fable-core/Symbol";
import { compareUnions, equals } from "fable-core/Util";
import Result from "fable-core/Result";

class Name {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Test.Name",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Name", "string"]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

  get String() {
    return this.data;
  }

  static Create(s) {
    if (s !== "" ? true : s != null) {
      return new Result(0, s);
    } else {
      return new Result(1, "Invalid string");
    }
  }

}

setType("Test.Name", Name);
```

even longer code... This is sad state...

> Let's go back to white board

**What is the use of Domain Modeling?** It is representation of a correct/validated data.

**What is single responsibility of Domain model?** Use `Create` function to create validated domain model from primitive values.

So, we validate model, if validated then we get domain model else we get bunch of errors.

Ok, now break it down the whole process

> In case of Server - Request. It is *DTO -> Domain -> Validated or Errors -> Response*

> In case of Client - Model. It is *Model -> Domain -> Validated or Errors -> Show it to user*

Almost same process. And if we don't look closer we will not find a difference. In case of *server* it is *one pass*. We get the big fat data and we will validate and give big fat data in return. If things are validated then `ID` will be there else validation error. Typical `CRUD` case.

Now, imagine same thing for big fat form we are filling on Internet. May be Banking or Insurance. I fill two dozen inputs and then I get error for more than dozen inputs. This does not work in context of UX/User Experience. In UX it should be multi pass or single pass for every property.

If there is an error in single input, user need to see error message right away, even for every stroke user entered error message may change and s/he should get the message right away. Now, that is not possible with typical DDD way. We might / should use some part of it but not in traditional way. There are few examples of validation library in Elm and F# they are trying to do typical DDD way. Looks good in sample where there are 2-4 input fields, but surely not work when there are 20-25 fields.

I know it might hurt the Domain Sharing approach we discussed earlier but I learnt the hard way while writing code for big ugly forms; It just don't work. Again, as I said we can and should use part of it. More on it in next section.

## London Rail

![train](https://media.giphy.com/media/WkXTjAYa7b34A/giphy.gif)

After reading above part, it is natural to have feeling that we should run away from Fable. Just because we can't use [ROP](https://fsharpforfunandprofit.com/rop/). Trust me I also thought that too. Even thought to falling back to some traditional javascript framework. No DDD, No ROP, like seriously? But we can use ROP without any issue.

Here is code directly copy - pasted from site with simple example

```fsharp
open FSharp.Core
open Fable.Core
open System

// convert a single value into a two-track result
let succeed x =
    Ok x

// convert a single value into a two-track result
let fail (x) =
    Error x

// apply either a success function or failure function
let either successFunc failureFunc twoTrackInput =
    match twoTrackInput with
    | Ok s -> successFunc s
    | Error f -> failureFunc f

// convert a switch function into a two-track function
let bind f =
    either f fail

// pipe a two-track value into a switch function
let (>>=) x f =
    bind f x

// compose two switches into another switch
let (>=>) s1 s2 =
    s1 >> bind s2

// convert a one-track function into a switch
let switch f =
    f >> succeed

// convert a one-track function into a two-track function
let map f =
    either (f >> succeed) fail

// convert a dead-end function into a one-track function
let tee f x =
    f x; x

// convert a one-track function into a switch with exception handling
let tryCatch f exnHandler x =
    try
        f x |> succeed
    with
    | ex -> exnHandler ex |> fail

// convert two one-track functions into a two-track function
let doubleMap successFunc failureFunc =
    either (successFunc >> succeed) (failureFunc >> fail)

// add two switches in parallel
let plus addSuccess addFailure switch1 switch2 x =
    match (switch1 x),(switch2 x) with
    | Ok s1, Ok s2 -> Ok (addSuccess s1 s2)
    | Error f1, Ok _  -> Error f1
    | Ok _ ,Error f2 -> Error f2
    | Error f1,Error f2 -> Error (addFailure f1 f2)

let collect errorFn xs =
    xs |> Seq.fold (fun res next ->
                        match res, next with
                        | Ok r, Ok i -> Ok (i::r)
                        | Ok _, Error m | Error m, Ok _ -> Error m
                        | Error m, Error n -> Error (errorFn m n)
    ) (Ok []) |> map List.rev

let validation1 (s:string) = if (String.IsNullOrEmpty(s)) then Error "String should not be empty" else Ok s

let validation2 (s:string) = if (s.Length > 50) then Error "Can't be more than 50" else Ok s

let combinedValidation = validation1 >> bind validation2
```

And here is Javascript code.

```javascript
import Result from "fable-core/Result";
import CurriedLambda from "fable-core/CurriedLambda";
import { reverse } from "fable-core/List";
import List from "fable-core/List";
import { fold } from "fable-core/Seq";
import { isNullOrEmpty } from "fable-core/String";
export function succeed(x) {
  return new Result(0, x);
}
export function fail(x) {
  return new Result(1, x);
}
export function either(successFunc, failureFunc, twoTrackInput) {
  if (twoTrackInput.tag === 1) {
    return failureFunc(twoTrackInput.data);
  } else {
    return successFunc(twoTrackInput.data);
  }
}
export function bind(f) {
  var failureFunc;
  return CurriedLambda((failureFunc = function (x) {
    return fail(x);
  }, function (twoTrackInput) {
    return either(f, failureFunc, twoTrackInput);
  }));
}
export function op_GreaterGreaterEquals(x, f) {
  return bind(f)(x);
}
export function op_GreaterEqualsGreater(s1, s2) {
  return CurriedLambda($var1 => bind(s2)(s1($var1)));
}

function _switch(f) {
  return CurriedLambda($var2 => function (x) {
    return succeed(x);
  }(f($var2)));
}

export { _switch as switch };
export function map(f) {
  var successFunc;
  var failureFunc;
  return CurriedLambda((successFunc = $var3 => function (x) {
    return succeed(x);
  }(f($var3)), failureFunc = function (x_1) {
    return fail(x_1);
  }, function (twoTrackInput) {
    return either(successFunc, failureFunc, twoTrackInput);
  }));
}
export function tee(f, x) {
  f(x);
  return x;
}
export function tryCatch(f, exnHandler, x) {
  try {
    return succeed(f(x));
  } catch (ex) {
    return fail(exnHandler(ex));
  }
}
export function doubleMap(successFunc, failureFunc) {
  var successFunc_1;
  var failureFunc_1;
  return CurriedLambda((successFunc_1 = $var4 => function (x) {
    return succeed(x);
  }(successFunc($var4)), failureFunc_1 = $var5 => function (x_1) {
    return fail(x_1);
  }(failureFunc($var5)), function (twoTrackInput) {
    return either(successFunc_1, failureFunc_1, twoTrackInput);
  }));
}
export function plus(addSuccess, addFailure, switch1, switch2, x) {
  const matchValue = [switch1(x), switch2(x)];

  if (matchValue[0].tag === 1) {
    if (matchValue[1].tag === 1) {
      return new Result(1, addFailure(matchValue[0].data, matchValue[1].data));
    } else {
      return new Result(1, matchValue[0].data);
    }
  } else if (matchValue[1].tag === 1) {
    return new Result(1, matchValue[1].data);
  } else {
    return new Result(0, addSuccess(matchValue[0].data, matchValue[1].data));
  }
}
export function collect(errorFn, xs) {
  return map(function (list) {
    return reverse(list);
  })(fold(function (res, next) {
    const matchValue = [res, next];
    const $var6 = matchValue[0].tag === 1 ? matchValue[1].tag === 1 ? [2, matchValue[0].data, matchValue[1].data] : [1, matchValue[0].data] : matchValue[1].tag === 1 ? [1, matchValue[1].data] : [0, matchValue[1].data, matchValue[0].data];

    switch ($var6[0]) {
      case 0:
        return new Result(0, new List($var6[1], $var6[2]));

      case 1:
        return new Result(1, $var6[1]);

      case 2:
        return new Result(1, errorFn($var6[1], $var6[2]));
    }
  }, new Result(0, new List()), xs));
}
export function validation1(s) {
  if (isNullOrEmpty(s)) {
    return new Result(1, "String should not be empty");
  } else {
    return new Result(0, s);
  }
}
export function validation2(s) {
  if (s.length > 50) {
    return new Result(1, "Can't be more than 50");
  } else {
    return new Result(0, s);
  }
}
export const combinedValidation = CurriedLambda($var7 => bind(function (s_1) {
  return validation2(s_1);
})(function (s) {
  return validation1(s);
}($var7)));
```

Little bit more cranky code, couple of imports compare to other examples but hey, **Rail** is not missed at least. This is the best thing Fable offers. We throw our  F# code and it works. But again be careful and be extra sure that what we like to throw towards JavaScript. I did port famous [Chessie](https://github.com/fsprojects/Chessie) to [Fable](https://github.com/kunjee17/Fable.Chessie). Used it for a while but then ended up removing it. Instead of cutting down a code after adding it, it is always easier to go slow and add whatever necessary.

## Slice and Dice

![slice and dice](https://media.giphy.com/media/wKXH7bkRB9Wpy/giphy.gif)

For a long time, performance tests of JavaScript framework was just a number for me. I never going to draw 1000 circles on screen. Or never gonna have machine who cares about that nano bench marks. Never a faced a situation for that.

> Until Elmish

If we start of from the default template, we will create model as composite model. Like below

```fsharp
[<Pojo>]
type Validate = {
    IsValid : bool
    ErrMsg : string
}

module Validate =
    let Success = {
        IsValid = true
        ErrMsg = ""
    }
    let Failure (msg : string) = {
        IsValid = false
        ErrMsg = msg
    }

    let InitialValidate = {
        IsValid = true
        ErrMsg = ""
    }

[<Pojo>]
type InfoModel = {
    FirstName : string
    FirstNameErr : Validate
    LastName : string
    LastNameErr : Validate
    DOB : string
    DOBErr : Validate
    Gender : string
    GenderErr : Validate
    IsValid : bool
}

[<Pojo>]
type ContactModel = {
    Mobile : string
    MobileErr : Validate
    Home : string
    HomeErr : Validate
    Office : string
    OfficeErr : Validate
    Email : string
    EmailErr : Validate
    Email2 : string
    Email2Err : Validate
    IsValid : bool
}

[<Pojo>]
type Model = {
    Info : InfoModel
    Contact : ContactModel
}
```

Here consider we have two pages `Info` and `Contact`. And then we have update method to update them. Pretty straight forward.

> Until we have around 20 pages or 50 components on same page

For the first time I felt what is slowness while typing in simple html input box. Things just dragged like we are typing in WPF application on Windows 98 machine.

Let's understand what is happening over here. Here model is holding information required for `Views`. Now, even though Info view is active it is having information about Contact also. This makes model quite big. Specifically if there are three or four level deep models. Deep model make things easy to understand but quite difficult to update. Deeper and Bigger the model is, slower the update of property is. Now, in ELM / Elmish architecture we rely on model extensively for what we can see on view. Even simple typing into input required us to update model. And then there is validation and other stuff going on.

It also present another weird problem. When we start the application, there is a need to initialize the models. So, for big application one need to set all models at the start. To do that we need to fire up too many request to server. For a sec; we consider that would be `OK` in the era of cloud but it can't resolve the issue of dependent types. If some property is dependent on other than we can't have them at the start and we can't initialize the model.

>No model, No view.

**What is the alternative to this fat model?**

Slim `Union Type` - Here is above code written differently

```fsharp
open FSharp.Core
open Fable.Core
open System

[<Pojo>]
type Validate = {
    IsValid : bool
    ErrMsg : string
}

module Validate =
    let Success = {
        IsValid = true
        ErrMsg = ""
    }
    let Failure (msg : string) = {
        IsValid = false
        ErrMsg = msg
    }

    let InitialValidate = {
        IsValid = true
        ErrMsg = ""
    }

[<Pojo>]
type InfoModel = {
    FirstName : string
    FirstNameErr : Validate
    LastName : string
    LastNameErr : Validate
    DOB : string
    DOBErr : Validate
    Gender : string
    GenderErr : Validate
    IsValid : bool
}

[<Pojo>]
type ContactModel = {
    Mobile : string
    MobileErr : Validate
    Home : string
    HomeErr : Validate
    Office : string
    OfficeErr : Validate
    Email : string
    EmailErr : Validate
    Email2 : string
    Email2Err : Validate
    IsValid : bool
}

type Page = Info = 0  | Contact = 1

type PageModel = Info of InfoModel | Contact of ContactModel

[<Pojo>]
type Model = {
    Page : Page
    PageModel : PageModel
}
```

It will hold only thing that is visible on Page. And for components one can always go old way or based on component's visibility they can choose second option.

> I did have case where I do have around 13 - 15 tabs on page. They all are part of same page, details about same thing divided in multiple tabs for better viewing. Every single tab is doing `CRUD` operation using big fat forms and modal pop up. I did start with first option as it is same page and so don't mind loading whole model at one shot. But things started to get very slow, so have to switch to second option. Here I don't required `Page` property as it is for capturing value from url. But converting model to Union type indeed helps to improve performance. So, only visible tab is having values in model, once we switch the tab, we are updating the model with another union type option.

Here, instead of simple `Union type` I have used `Enum Types` for page. It is again to cut down generated code. Pattern match gonna work even for `int` as well as `string`. So why burden our JavaScript with string when pattern match works on int. Even `[<stringenum>]` is good alternative in these type of scenarios.

Here is generated code for second option

```javascript
import { setType } from "fable-core/Symbol";
import _Symbol from "fable-core/Symbol";
import { compareUnions, equals, Any } from "fable-core/Util";
export const ValidateModule = function (__exports) {
  const Success = __exports.Success = {
    IsValid: true,
    ErrMsg: ""
  };

  const Failure = __exports.Failure = function (msg) {
    return {
      IsValid: false,
      ErrMsg: msg
    };
  };

  const InitialValidate = __exports.InitialValidate = {
    IsValid: true,
    ErrMsg: ""
  };
  return __exports;
}({});
export class PageModel {
  constructor(tag, data) {
    this.tag = tag | 0;
    this.data = data;
  }

  [_Symbol.reflection]() {
    return {
      type: "Test.PageModel",
      interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
      cases: [["Info", Any], ["Contact", Any]]
    };
  }

  Equals(other) {
    return this === other || this.tag === other.tag && equals(this.data, other.data);
  }

  CompareTo(other) {
    return compareUnions(this, other) | 0;
  }

}
setType("Test.PageModel", PageModel);
```

## Kiss of the JavaScript

![kiss of javascript](https://media.giphy.com/media/dMYVHzANYb9p6/giphy.gif)

Fable can use JavaScript code. JavaScript can do some crazy stuff. If we compose it then it becomes `Fable can do some crazy stuff.` Don't trust me then see by our  self.

```fsharp
open Fable.Import

[<Emit("new Date(parseInt($0.substr(6)))")>]
let JsDateString (x : string) : JS.Date = jsNative

JsDateString "/Date(1522149899822-0000)/"

```

converts to

```javascript
new Date(parseInt("/Date(1522149899822-0000)/".substr(6)));
```

Here `new Date(parseInt($0.substr(6)))` is dynamic typed javascript function to convert `/Date(1522149899822-0000)/` strings to date. Obviously I can try to do conversion using F#, I did tried for half day. But then thought why bother when solution is already there on Stack Overflow. I should just use it. To no surprise it work without any issue.

JavaScript do have many libraries, code snippets and stack overflow answers. I can't say that all are good approach but sometimes it don't hurt sneak outside.

> Again don't over use it. One glass of wine may be good for health but overdoes can hurt you.

Same case is true while trying new library. Here is snippet for Flatpickr library.

```fsharp
let flatpickr : Element -> obj option -> unit = importDefault "flatpickr"
```

It is used to call date picker on input. So, there is no need for static typing. So, I used it anyway.

For me rule of thumb is, try using it as JavaScript, if we like the library then we should search for TypeScript definition file and use TS2Fable to generate imports for us. That also in case of over using all the option of that library.

## CSS Tips and Tricks

![css](https://media.giphy.com/media/13XW2MJE0XCoM0/giphy.gif)

In above long article, I was always trying to avoid libraries or adding extra code. But in this specific section I will suggest exact opposite. If you are using wonderful library called [Bulma](https://bulma.io/) then you should definitely try using [Fulma](https://mangelmaxime.github.io/Fulma/). And if you are not using Bulma then take a hint from it and write wrapper for your favorite CSS framework.

> But do save our  self from lots and lots of DIVs and typos while writing css classes.

It is also showcasing how a library with documentation for frontend should be written. Code is heavily optimized (you can find my imprints here and there in some commits too) It is one good project you should look for inspiration.

## Shameless Plug

![sign me up](https://media.giphy.com/media/xUOrw5LIxb8S9X1LGg/giphy.gif)

After working with many big and small consulting companies; on various projects ranging from dotnet web to node js, single page application to cross platform mobile application. I decided to go solo. There were hiccups in start but I do survive for almost a year. Not only survive but started my own cloud consulting company [Fuzzy Cloud](https://fuzzycloud.in/).

So, I will be looking for new assignment from the month of April. If anyone is interested for work or training with me, please contact me. I know we are so small compare to other friends from Europe and USA but still we do share same love for F# and functional programming in general. Even if I skip my 10+ years of commercial experience in different domain and tech, I am still a student of [Evelina](http://evelinag.com/). Always ready for challenging assignments.

Love to have feedback about this article and will update if there is any addition or changes required.