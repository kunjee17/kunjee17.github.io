---

title: "Opinionated Fable2 - Architecture & Performance"
slug : "opinionated-fable2-architecture-and-performance"

date: 2018-08-06
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

Nothing can be more beautiful if you wish come. And It seems [Fable2](http://fable.io/blog/Introducing-2-0-beta.html) did made my wish true in most of the cases. Let's revisit my old [blog](/2018/03/opinionated-fable-architecture-and-performance/) and check what is got improved and changed. So, goal of this blog is it should be same as old blog, but it should be smaller. Because of new and shiny Fable2. 

> Fable 2 is currently in beta but as per blog it is very much working. So, let's begin

![2](https://media.giphy.com/media/3o6wrrzLj2DxNRzvQk/giphy.gif)

# Performance

## Line of Code

Fable 2 is having great improvement in code generation. Now, generated code is having better tree shaking story and also less reflection. Let's have a look at old and new code...

## F# Types

Let's start with simple F# types. What is there in Fable and What is not with Fable 2

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

> PS: I'm using [Fable REPL](http://fable.io/repl/) and [Fable 2 REPL](http://fable.io/repl2/) for testing out the code. It is great way you can see what our F# code is doing. It will generate *hell* pretty JavaScript.

Let's see the generated JavaScript for Fable

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

And here is for Fable 2

```javascript
import { declare, Record } from "fable-core/Types";
export const InfoModel = declare(function InfoModel(arg1, arg2, arg3, arg4, arg5) {
  this.FirstName = arg1;
  this.LastName = arg2;
  this.DOB = arg3;
  this.Gender = arg4;
  this.IsValid = arg5;
}, Record);

```

Now that is **Crazy** improvement.


Let's add some more code in there.

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

and here is JavaScript code for Fable

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

And here is code for Fable 2

```javascript
import { declare, Record } from "fable-core/Types";
export const InfoModel = declare(function InfoModel(arg1, arg2, arg3, arg4, arg5) {
  this.FirstName = arg1;
  this.LastName = arg2;
  this.DOB = arg3;
  this.Gender = arg4;
  this.IsValid = arg5;
}, Record);
export function InfoModel$$$get_Empty() {
  return new InfoModel("Don", "Syme", "unknown", "male", true);
}
```

![love](https://media.giphy.com/media/l4pTdcifPZLpDjL1e/giphy.gif)


In Fable we need to use something called `[<Pojo>]` attribute in code. It is removed in Fable 2. No more dancing around module and type.

In Fable `[<Pojo>]` is used like this and generate below JavaScript. That is default in Fable 2. A request I put in old blog and very much granted in latest Fable 2

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

Let's see how Fable 2 will improve the F# and JavaScript code.

```fsharp
type Validate = {
    IsValid : bool
    ErrMsg : string
}
  with 
    static member Success = {
        IsValid = true
        ErrMsg = ""
    }
    static member Failure (msg : string) = {
        IsValid = false
        ErrMsg = msg
    }

    static member InitialValidate = {
        IsValid = true
        ErrMsg = ""
    }

type InfoModel = {
        FirstName : string
        LastName : string
        DOB : string
        Gender : string
        IsValid : bool
    }
    with static member Empty = {
            FirstName = "Don"
            LastName = "Syme"
            DOB = "unknown"
            Gender = "male"
            IsValid = true
        }

type InfoErrorModel = {
    FirstName : Validate
    LastName : Validate
    DOB : Validate
    Gender : Validate
}
    with static member Empty = {
            FirstName = Validate.InitialValidate
            LastName = Validate.InitialValidate
            DOB = Validate.InitialValidate
            Gender = Validate.InitialValidate
        }

type Model = {
    InfoModel : InfoModel
    InfoErrorModel : InfoErrorModel
}
    with static member Empty = {
            InfoModel = InfoModel.Empty
            InfoErrorModel = InfoErrorModel.Empty
        }
```

and generated javascript is 

```javascript
import { declare, Record } from "fable-core/Types";
export const Validate = declare(function Validate(arg1, arg2) {
  this.IsValid = arg1;
  this.ErrMsg = arg2;
}, Record);
export function Validate$$$get_Success() {
  return new Validate(true, "");
}
export function Validate$$$Failure$$Z721C83C5(msg) {
  return new Validate(false, msg);
}
export function Validate$$$get_InitialValidate() {
  return new Validate(true, "");
}
export const InfoModel = declare(function InfoModel(arg1, arg2, arg3, arg4, arg5) {
  this.FirstName = arg1;
  this.LastName = arg2;
  this.DOB = arg3;
  this.Gender = arg4;
  this.IsValid = arg5;
}, Record);
export function InfoModel$$$get_Empty() {
  return new InfoModel("Don", "Syme", "unknown", "male", true);
}
export const InfoErrorModel = declare(function InfoErrorModel(arg1, arg2, arg3, arg4) {
  this.FirstName = arg1;
  this.LastName = arg2;
  this.DOB = arg3;
  this.Gender = arg4;
}, Record);
export function InfoErrorModel$$$get_Empty() {
  return new InfoErrorModel(Validate$$$get_InitialValidate(), Validate$$$get_InitialValidate(), Validate$$$get_InitialValidate(), Validate$$$get_InitialValidate());
}
export const Model = declare(function Model(arg1, arg2) {
  this.InfoModel = arg1;
  this.InfoErrorModel = arg2;
}, Record);
export function Model$$$get_Empty() {
  return new Model(InfoModel$$$get_Empty(), InfoErrorModel$$$get_Empty());
}
```

Generated javascript is little less readable but code is more concise. Until it is everything is in English, I am ok with that. 

> I still hold the opinion of avoiding `aether` here. If you need that then there is a need to revisit what you are doing. Specifically for Elmish part. Else lences are very much ok in most of the `server` side code. But still use it with caution.

## Domain Domain Domain

Just like everyone in Functional Domain, I am big fan of Domain Driven Design and [Scott W](https://fsharpforfunandprofit.com/ddd/). It makes things more easier to represent. What is use of Fable if I can't use it in front end. And Fable did generate way too much javascript code. Let's see how Fable 2 do in this case. 


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

In case of Fable 2

```javascript
import { Result } from "fable-core/Option";
import { declare } from "fable-core/Types";
export const Name = declare(function Name(s$$1) {
  const $this$$1 = this;
  $this$$1.s = s$$1;
});

function Name$$$$002Ector$$Z721C83C5(s$$1) {
  return this != null ? Name.call(this, s$$1) : new Name(s$$1);
}

export function Name$$get_Name(__) {
  return __.s;
}
export function Name$$$Create$$Z721C83C5(s) {
  if (s !== "" ? true : s !== null) {
    return new Result(0, "Ok", s);
  } else {
    return new Result(1, "Error", "Invalid String");
  }
}
```

![No words](https://media.giphy.com/media/DyvyiFFXF1Yli/giphy.gif)

Let's try it another way

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

And in case of Fable 2

```javascript
import { Result } from "fable-core/Option";
import { declare, Union } from "fable-core/Types";
export const Name = declare(function Name(tag, name, ...fields) {
  Union.call(this, tag, name, ...fields);
}, Union);
export function Name$$get_String(this$) {
  const s$$1 = this$.fields[0];
  return s$$1;
}
export function Name$$$Create$$Z721C83C5(s) {
  if (s !== "" ? true : s !== null) {
    return new Result(0, "Ok", s);
  } else {
    return new Result(1, "Error", "Invalid string");
  }
}
```

![claps](https://media.giphy.com/media/xT77XWum9yH7zNkFW0/giphy.gif)

> There is a detailed explanation in my old blog that how DDD is different in case of server and client. That holds true even now so you can always check that out.

## London Rail

How [ROP](https://fsharpforfunandprofit.com/rop/) gonna stand in case of Fable 2. Does that got improved also? 

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

and here is Fable 2 code

```javascript
import { reverse } from "fable-core/List";
import { Result } from "fable-core/Option";
import { fold } from "fable-core/Seq";
import { isNullOrEmpty } from "fable-core/String";
import { L } from "fable-core/Types";
export function succeed(x$$13) {
  return new Result(0, "Ok", x$$13);
}
export function fail(x$$12) {
  return new Result(1, "Error", x$$12);
}
export function either(successFunc$$3, failureFunc$$4, twoTrackInput$$3) {
  if (twoTrackInput$$3.tag === 1) {
    const f$$6 = twoTrackInput$$3.fields[0];
    return failureFunc$$4(f$$6);
  } else {
    const s$$4 = twoTrackInput$$3.fields[0];
    return successFunc$$3(s$$4);
  }
}
export function bind(f$$5) {
  return function (twoTrackInput$$2) {
    return either(f$$5, fail, twoTrackInput$$2);
  };
}
export function op_GreaterGreaterEquals(x$$10, f$$4) {
  return bind(f$$4)(x$$10);
}
export function op_GreaterEqualsGreater(s1$$1, s2$$1) {
  return function ($arg$$6) {
    return bind(s2$$1)(s1$$1($arg$$6));
  };
}
export function switch$(f$$3) {
  return function ($arg$$5) {
    return succeed(f$$3($arg$$5));
  };
}
export function map(f$$2) {
  return function (twoTrackInput$$1) {
    return either(function successFunc$$2($arg$$4) {
      return succeed(f$$2($arg$$4));
    }, fail, twoTrackInput$$1);
  };
}
export function tee(f$$1, x$$6) {
  f$$1(x$$6);
  return x$$6;
}
export function tryCatch(f, exnHandler, x$$3) {
  try {
    return succeed(f(x$$3));
  } catch (ex) {
    return fail(exnHandler(ex));
  }
}
export function doubleMap(successFunc, failureFunc) {
  return function (twoTrackInput) {
    return either(function successFunc$$1($arg$$3) {
      return succeed(successFunc($arg$$3));
    }, function failureFunc$$1($arg$$2) {
      return fail(failureFunc($arg$$2));
    }, twoTrackInput);
  };
}
export function plus(addSuccess, addFailure, switch1, switch2, x) {
  const matchValue$$1 = [switch1(x), switch2(x)];

  if (matchValue$$1[0].tag === 1) {
    if (matchValue$$1[1].tag === 1) {
      return new Result(1, "Error", addFailure(matchValue$$1[0].fields[0], matchValue$$1[1].fields[0]));
    } else {
      return new Result(1, "Error", matchValue$$1[0].fields[0]);
    }
  } else if (matchValue$$1[1].tag === 1) {
    return new Result(1, "Error", matchValue$$1[1].fields[0]);
  } else {
    return new Result(0, "Ok", addSuccess(matchValue$$1[0].fields[0], matchValue$$1[1].fields[0]));
  }
}
export function collect(errorFn, xs) {
  return map(reverse)(fold(function folder(res, next) {
    const matchValue = [res, next];
    var $target$$9, i, r, m, m$$1, n;

    if (matchValue[0].tag === 1) {
      if (matchValue[1].tag === 1) {
        $target$$9 = 2;
        m$$1 = matchValue[0].fields[0];
        n = matchValue[1].fields[0];
      } else {
        $target$$9 = 1;
        m = matchValue[0].fields[0];
      }
    } else if (matchValue[1].tag === 1) {
      $target$$9 = 1;
      m = matchValue[1].fields[0];
    } else {
      $target$$9 = 0;
      i = matchValue[1].fields[0];
      r = matchValue[0].fields[0];
    }

    switch ($target$$9) {
      case 0:
        {
          return new Result(0, "Ok", L(i, r));
          break;
        }

      case 1:
        {
          return new Result(1, "Error", m);
          break;
        }

      case 2:
        {
          return new Result(1, "Error", errorFn(m$$1, n));
          break;
        }
    }
  }, new Result(0, "Ok", L()), xs));
}
export function validation1(s$$3) {
  if (isNullOrEmpty(s$$3)) {
    return new Result(1, "Error", "String should not be empty");
  } else {
    return new Result(0, "Ok", s$$3);
  }
}
export function validation2(s$$2) {
  if (s$$2.length > 50) {
    return new Result(1, "Error", "Can't be more than 50");
  } else {
    return new Result(0, "Ok", s$$2);
  }
}
export function combinedValidation($arg$$1) {
  return bind(validation2)(validation1($arg$$1));
}
```


*Similar code*. I guess that is the reason having simple pure functions is always good thing for application. So, not much of an visible improvement in this part.

## Slice and Dice

Fable 2 is no good without Elmish. Let's give it a shot to Elmish example.

This is Fable code.

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

In Fable 2 it would be written like this 

```fsharp
type Validate = {
    IsValid : bool
    ErrMsg : string
} with

    static member Success = {
        IsValid = true
        ErrMsg = ""
    }
    static member Failure (msg : string) = {
        IsValid = false
        ErrMsg = msg
    }

    static member InitialValidate = {
        IsValid = true
        ErrMsg = ""
    }

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

Slim `Union Type` - Here is above code written differently using Fable

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

Let's check Fable 2 option

```fsharp
open FSharp.Core
open Fable.Core
open System

type Validate = {
    IsValid : bool
    ErrMsg : string
}with
    static member Success = {
        IsValid = true
        ErrMsg = ""
    }
    static member Failure (msg : string) = {
        IsValid = false
        ErrMsg = msg
    }

    static member InitialValidate = {
        IsValid = true
        ErrMsg = ""
    }

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

type Page = Info | Contact

type PageModel = Info of InfoModel | Contact of ContactModel

type Model = {
    Page : Page
    PageModel : PageModel
}
```

and here is generated javascript 

```javascript
import { Union, declare, Record } from "fable-core/Types";
export const Validate = declare(function Validate(arg1, arg2) {
  this.IsValid = arg1;
  this.ErrMsg = arg2;
}, Record);
export function Validate$$$get_Success() {
  return new Validate(true, "");
}
export function Validate$$$Failure$$Z721C83C5(msg) {
  return new Validate(false, msg);
}
export function Validate$$$get_InitialValidate() {
  return new Validate(true, "");
}
export const InfoModel = declare(function InfoModel(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
  this.FirstName = arg1;
  this.FirstNameErr = arg2;
  this.LastName = arg3;
  this.LastNameErr = arg4;
  this.DOB = arg5;
  this.DOBErr = arg6;
  this.Gender = arg7;
  this.GenderErr = arg8;
  this.IsValid = arg9;
}, Record);
export const ContactModel = declare(function ContactModel(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
  this.Mobile = arg1;
  this.MobileErr = arg2;
  this.Home = arg3;
  this.HomeErr = arg4;
  this.Office = arg5;
  this.OfficeErr = arg6;
  this.Email = arg7;
  this.EmailErr = arg8;
  this.Email2 = arg9;
  this.Email2Err = arg10;
  this.IsValid = arg11;
}, Record);
export const Page = declare(function Page(tag, name, ...fields) {
  Union.call(this, tag, name, ...fields);
}, Union);
export const PageModel = declare(function PageModel(tag, name, ...fields) {
  Union.call(this, tag, name, ...fields);
}, Union);
export const Model = declare(function Model(arg1, arg2) {
  this.Page = arg1;
  this.PageModel = arg2;
}, Record);
```

Here is you can see, I don't have to define Union as Enum just to get optimized JavaScript. 

You want to save few more lines

Try this 

```fsharp
type [<StringEnum>]Page = Info | Contact
```

It will be removed generated code. As it will directly compare string when and if required.


## Old Habits Die Hard

JS interop is working as it was working earlier. And so do the my personal favorite Fulma. 

## Shameless Plug

![sign me up](https://media.giphy.com/media/xUOrw5LIxb8S9X1LGg/giphy.gif)

After working with many big and small consulting companies; on various projects ranging from dotnet web to node js, single page application to cross platform mobile application. I decided to go solo. There were hiccups in start but I do survive for almost a year. Not only survive but started my own consulting company [Fuzzy Cloud](https://fuzzycloud.in/).

So, I am looking for new assignment. If anyone is interested for work or do training with me, please contact me. I know we are so small compare to other friends from Europe and USA but still we do share same love for F# and functional programming in general. And I am always ready for challenging assignments.

Love to have feedback about this article and will update if there is any addition or changes required.