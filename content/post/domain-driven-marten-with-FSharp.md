---

title: "Domain Driven Marten with F#"
slug : "domain-driven-marten-with-FSharp"

date: 2017-10-07
categories:
- Technical
tags:
- OSS
- Database
- NoSQL
- Functional
- FSharp
draft: true
---

Dto-Domain-DB

```fsharp
    type UserDTO = {
        Id : int
        FirstName : string
        LastName : string
    }

    type User = {
        Id : int
        FirstName : string
        LastName : string
    }

    type UserDB = {
        Id : int
        FirstName : string
        LastName : string
        Created : DateTime
    }

```

Simple user

```fsharp
    type User = {
        Id : int
        FirstName : string
        LastName : string
    }
```

Complicated user

```fsharp
    type User = {
        Id : int
        FirstName : string
        LastName : string
    } and Address = {
        City : string
        State : string
        Country : string
        PinCode : string
    } and Contact = {
        Email : string
        PhoneNo : string
        Address : Address
        Contact : Contact
    }
```


Domain User with Chessie

```fsharp
open System
open Chessie.ErrorHandling

let validateNull (s:string) =
    if String.IsNullOrEmpty s || String.IsNullOrWhiteSpace s then fail "Input is empty"
        else ok s

type StringNonEmpty private (str : string) =
    member __.StringNonEmpty = str
    static member Create s =
        trial{
            let! r = validateNull s
            return StringNonEmpty r
        }

type Contact = {
    Email : string
    PhoneNo : string
}
type  Address = {
    City : string
    State : string
    Country : string
    PinCode : string
}
type User = {
    Id : int
    FirstName : StringNonEmpty
    LastName : StringNonEmpty
    // Address : Address option
    Contact : Contact
}  

```

Default settings 
```
type Contact = {
    Email : string
    PhoneNo : string
}
type  Address = {
    City : string
    State : string
    Country : string
    PinCode : string
}
type User = {
    Id : int
    FirstName : StringNonEmpty
    LastName : StringNonEmpty
    // Address : Address option
    Contact : Contact
}  
```

Adding new properties 
```
type Contact = {
    Email : string
    PhoneNo : string
}
type  Address = {
    City : string
    State : string
    Country : string
    PinCode : string
}
type User = {
    Id : int
    FirstName : StringNonEmpty
    LastName : StringNonEmpty
    // Address : Address option
    Contact : Contact
}  
```
Marten

Storing and retriving

Using Marten fsharp

Easy to go fast

Cons

Conclusions