---

title: "Reactive Chat application using ServiceStack and Fable in F#"
slug : "indian-chaat-with-FSharp"

date: 2017-12-17
categories:
- Technical
tags:
- OSS
- Servicestack
- Actors
- Docker
- DevOps
- FSharp
- Functional
- Functional Web
- Dotnetcore
---

> Here is my Birthday blog post, as a part of [FSAdvent - 2017](https://sergeytihon.com/2017/10/22/f-advent-calendar-in-english-2017/). Just like previous two years, I hope you will enjoy this one too. Comments and corrections are very much welcomed.

# Why Chaat? and What is Chaat?

If anyone wanted to show `real time` application, then `Chat` is kind of `to-do list` of that type of applications. Now **Functional Chat** is a very limited title and can't show all the things I wanted to show. So, I have selected [Chaat](https://www.google.com/search?biw=1920&bih=940&tbm=isch&sa=1&ei=sdMzWrLMKYn9vgSBhpz4DA&q=Indian+Chaat&oq=Indian+Chaat&gs_l=psy-ab.3..0l10.3694.16984.0.17138.15.13.1.0.0.0.297.1972.0j4j5.9.0....0...1c.1.64.psy-ab..5.10.1991...0i67k1.0.IJpHl8f_YYA) word a spin of version of `Chat` word.

Here also I am showing a little diverted version of [SAFE](https://safe-stack.github.io/). So, title is kind of more suitable.

One thing is very unique to Indian Chaat that there is no uniqueness in it. You change the city, order same thing and you will get a different version of it, and that is the heart of it.

Currently that is possible with *dotnet core* . Be it on any OS, using any editor/IDE, using any Framework and still things work.

> So, what I will do here in this post. I will try to make Simple **Chat** application by picking up my *favorite* frameworks or libraries. And also give reasons for that. In `Epilogue` I will try to provide all other options that can be replaced or mixed matched. So, you can try it to make your version.

# Current state of dotnet core

Dotnet core is an **unbiased** version of dotnet. Currently it is having version `2.*.*` . It kind of works on every OS. And especially with other editors. Also more openly developed. It may not be best, but credit should be given. So, here I am using that. If you are sticking with *Dotnet*, be it a big fat company or start up. And *if you are not making Desktop application*, then you should be moving to *core* for sure.

# Functional Programming with F\#

There are many Microsoft people may tell you, don't worry about `F#` and should take care of requirements on hand first. I am saying the same thing, for the sake of *requirements* you should be using F#. *C#* may be good and supported by Microsoft wholeheartedly, but as developers we should choose our things based on the task at our hand. And from personal experience of around 10 Years in Software Industry. Few things are already proven for current time, Functional First / Functional language is already a winner, no matter how many [functional features will be added to OOP languages](http://tomasp.net/blog/csharp-async-gotchas.aspx/) they are still not like functional language. OOP language never designed for that. They have done what they are designed for but I am not sure what place they have in future. Be it ReasonML, ELM, Scala or F#. Statically typed or not, but all will be functional for sure. Another thing is *Big projects*, be it a server or a client with combined with fast pace delivery; is base problem for almost every company. Make a peace with it and choose it accordingly.

# Visual Studio *Code*

While making this project I have used VSCode. Whatever bad `karma` earned by Visual Studio, VSCode is leveling it. And leveling them quite well. VSCode with [ionide](http://ionide.io/) is quite killing it. It is not the beast like its counterpart, but surely get things done and it is quite faster.

# ServiceStack

[Servicestack](https://servicestack.net/) is built with C#, and OOP framework. It was/is good old alternative of WCF, If WCF is still around? Then it became better version of WebAPI (WebAPI is more or less inspired by ServiceStack). Currently it is already [V5](http://docs.servicestack.net/releases/v5.0.0). And it is quite mature and flexible. Also providing way many things out of box. When there was a vacuum in F# specific web framework, [Servicestack](https://servicestack.net/) was kind of choice of F# people. And there are obvious reasons for that. Not only it works with F# but looks way better with it. And vision of Servicestack was quite futuristic, it is one of the first to force developer to think in message while doing web development. And cut to **2017** every good development strategy talks about message driven development in client side. Take is react-redux, [Elm](http://elm-lang.org/) or [Fable-Elmish](https://fable-elmish.github.io/elmish/). [The Elm Architecture](https://guide.elm-lang.org/architecture/) is the way to go for making big application on client side.

Take an example here.

Here are DTOs
```fsharp
    [<CLIMutableAttribute>]
    type Message = {
        Data : string
        Color : string
    }


    [<CLIMutableAttribute>]
    type OutputMessages = {
        Data : Message []
    }

    [<CLIMutableAttribute>]
    [<Route("/Chat")>]
    type InputMessage = {
        UserId : int
        Created : DateTime
        Message : Message
    } with interface IReturn<OutputMessages>

```

And here is Service

```fsharp
    type ServerEventsServices() =
        inherit Service()

        member __.Post(request : InputMessage) =
            chaatAgent.Post request
            {Data = storage.ToArray()} |> box

```

If you skip *little code for configuration,* then this may be the simplest way to understand any web service. Everything is a message. Just like that. Skip the *Agent* line for now.

# Fable

[Fable](http://fable.io/) is one of many *your favorite language* to *JavaScript* transpiler. Fable here is converting quite a mature functional language F#. I like to quote [ReasonML](https://reasonml.github.io/guide/what-and-why) page here that also suggesting Fable as one of the alternative if not ReasonML. It is easy to use like Elm with the same time it more flexible then it. I know flexibility comes with cost, but I find it better than banging head for rigid framework. It is best of both worlds.

## Elmish

As I mentioned Elm architecture is a way to move forward if you are making big / fat business application. From personal experience I can say if you are or your team or team you know is using **Angularjs** specifically 1.0 to make big application. Tell them to change or just run away from there.

Elmish is a thin wrapper around react to provide Elm like architecture without any redux complexity. It will provide you message driven architecture to work with.

Here is comparison between Redux and Elm in a single tweet.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Elm(ish) vs. Redux Workflow 🙄🤫🤔 <a href="https://t.co/naAkxQLFaB">pic.twitter.com/naAkxQLFaB</a></p>&mdash; MikeBild (@mikebild) <a href="https://twitter.com/mikebild/status/888042176738971649?ref_src=twsrc%5Etfw">July 20, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


Elmish architecture has three main parts. **Model -> View -> Update**


#### Model

```fsharp
    type [<StringEnum>]SpanCls = Red | Blue | Green | Yellow

    type Model =  {
        LocalStr : string
        ServerMessages : Message []
        SpanCls : SpanCls
    }

    type Msg =
    | ChangeStr of string
    | ChangeColor of SpanCls
    | PreparePost
    | PostMessage of InputMessage
    | SuccessMessages of OutputMessages
    | SSESuccessMessages of OutputMessages
    | Failed of exn

```

Forget about the *Model* part now. As it is just a representation for view. More important here is *Msg*. If you can see *of InputMessage* and *of OutputMessages* both are directed from Server. And all three messages, including with *Failed* are there to communicate with the Server. It is in direct connection with Server's DTOs. Other msg is to handle user event from view. So, every communication is divided with specific messages and handled in State/Update.

#### View

```fsharp
    let root model dispatch =
        div [] [
            Content.content [] [
            ul [] [
                for m in model.ServerMessages do
                yield
                    li[][
                    span [ClassName m.color][str m.data]
                    ]
            ]
            ]

            br []
            br []
            p [ClassName (model.SpanCls.ToString())] [str (sprintf "local message %s" model.LocalStr)]


            Control.control_div [] [
            Radio.radio [CustomClass "red"] [
                Radio.input [
                Radio.Input.name "color"
                Radio.Input.props [
                    Checked (model.SpanCls = Red)
                    OnChange (fun _ -> Red |> ChangeColor |> dispatch)
                    ]
                ]
                str "Red"
            ]
            Radio.radio [CustomClass "green"] [
                Radio.input [
                Radio.Input.name "color"
                Radio.Input.props [
                    Checked (model.SpanCls = Green)
                    OnChange (fun _ -> Green |> ChangeColor |> dispatch)
                    ]
                ]
                str "Green"
            ]
            Radio.radio [CustomClass "yellow"] [
                Radio.input [
                Radio.Input.name "color"
                Radio.Input.props [
                    Checked (model.SpanCls = Yellow)
                    OnChange (fun _ -> Yellow |> ChangeColor |> dispatch)
                    ]
                ]
                str "Yellow"
            ]
            Radio.radio [CustomClass "blue"] [
                Radio.input [
                    Radio.Input.name "color"
                    Radio.Input.props [
                    Checked (model.SpanCls = Blue)
                    OnChange (fun _ -> Blue |> ChangeColor |> dispatch)
                    ]
                ]
                str "Blue"
            ]
            ]

            Control.control_div [] [
            Input.input [
                Input.typeIsText
                Input.placeholder "AddSomething"
                Input.value model.LocalStr
                Input.props [
                OnChange (fun ev -> !!ev.target?value |> ChangeStr |> dispatch)
                ]
            ]
            ]
            Button.button_btn [
            Button.onClick (fun _ -> PreparePost |> dispatch)
            ] [str "Post"]
        ]
```

Normally I skip the view part. As html is not that interesting. But this is different. It is not only statically typed HTML, but also having [Bulma](https://bulma.io/) wrapped with staticially typed functions. Means if this compiles you don't have to worry about even CSS typos. Thanks to [Fulma](https://mangelmaxime.github.io/Fulma/). And that is how you write html-css with confidence.

#### Update

```fsharp
    let update msg model =
        match msg with
        | ChangeStr s ->
            {model with LocalStr = s}, Cmd.none
        | ChangeColor s ->
            {model with SpanCls = s}, Cmd.none
        | PreparePost ->
            let inputMessage = dtos.InputMessage.Create()
            let message = dtos.Message.Create()
            message.color <- model.SpanCls.ToString()
            message.data <- model.LocalStr
            inputMessage.created <- DateTime.Now.ToString()
            inputMessage.userId <- 0.
            inputMessage.message <- message
            let postCmd = Cmd.ofMsg (PostMessage inputMessage)
            model,postCmd
        | PostMessage pm ->
            let msgPost (msg : InputMessage) =
            client.post (msg :> IReturn<OutputMessages>)
            let helloCmd (msg: InputMessage) =
            Cmd.ofPromise msgPost msg SuccessMessages Failed
            let msgCmd = helloCmd pm
            model, msgCmd
        | SuccessMessages o ->
            {model with ServerMessages = o.data.ToArray(); LocalStr = ""}, Cmd.none
        | SSESuccessMessages o ->
            {model with ServerMessages = o.data.ToArray()}, Cmd.none
        | Failed exn ->
            model, Cmd.none
```

A very simple update method. Now closely look at *PreparePost* message. That is where Fable ecosystem shined, I am mutating thing. As it is not that strict. And for the fact `mutable is not that bad,` but `shared mutable is very bad`. I am preparing post command here and the hand it over to another method. And from there it will go forward.

## ts2fable

In above *PreparePost* and *PostMessage* message; there are few things like *dtos* and *client* . That all comes thanks to ts2fable. A library used to convert `typescript` definition file to F# imports. It is quite magical and super awesome. Currently in beta but works most of the time for around 95% of the code.

And here is code how you use it.

```
let [<Import("*","@servicestack\client")>] SSClient: SSClient.IExports = jsNative

let [<Import("*","./../Imports/IndianChaat.dtos")>] dtos: IExports = jsNative
```
Simple one line import and all library functions are available in your project.

Convert *index.d.ts* from *@servicestack\client* to create `Servicestck Import` file. And then just pull it in your code. Client library is also provided by Servicestck - (another good thing about framework). And it is having quite complete typed library for TypeScript. So, you use that just like that with Fable.

> What about *dtos*?

You can generate typescript dtos using *@servicestack\cli*'s command `ts-ref <url> <filname - optional>`. Then using `tsc -d` command create js and definition files. And then using ts2fable convert to import file. Then pull it in your project. Seems little complicated but it is just few commands.

So, now you have typed client library with typed dtos for you. Here are the Dtos

```fsharp
type [<AllowNullLiteral>] OutputMessages =
    abstract data: ResizeArray<Message> with get, set

type [<AllowNullLiteral>] OutputMessagesStatic =
    [<Emit "new $0($1...)">] abstract Create: unit -> OutputMessages

type [<AllowNullLiteral>] Message =
    abstract data: string with get, set
    abstract color: string with get, set

type [<AllowNullLiteral>] InputMessage =
    inherit IReturn<OutputMessages>
    abstract userId: float with get, set
    abstract created: string with get, set
    abstract message: Message with get, set
    abstract createResponse: unit -> OutputMessages
    abstract getTypeName: unit -> string

type [<AllowNullLiteral>] InputMessageStatic =
    [<Emit "new $0($1...)">] abstract Create: unit -> InputMessage
```

> There is another way that you can directly share `dtos` from server file. That is the benefit of using F# on client and server both sides. **Isomorphic F# all the way.** But then I can't show great work done with **ts2fable** tool.

# AAA - Actor-Agent-Async

If we are talking about big application, then giving skip to *scale* word will not happen. And still most of the *Enterprise Application* moves around *Design Patterns*. But I am pretty sure that for the `AAA` size application you need `AAA` solution. You can use all or either of it. Power and Flexibility are also in the same order as mentioned in the title. Means Actors are more powerful and flexible while Async is least. Actor is having referential transparency while agent don't. Due to this Actors are more suitable for Micro-service kind of architecture. Using actors you can offload your heavy process to another machine without any issue. Also, it's easy to set up cluster with them. That is not possible with agents. I guess `Async` is pretty much known by everyone. Also, `Async` is widely used and should be used whenever you are accessing I/O stuff. All will agree that Async is quite necessary, but at the same time difficult to implement correctly. (I am not considering Java in here. The syntax is so horrific.)

For a simplicity case I am using Agent here. Just taking a middle ground here.

```fsharp
    type Utility() =
        static let rand = Random()

        static member RandomSleep() =
            let ms = rand.Next(1,1000)
            Thread.Sleep ms


    let storage = new List<Message>()

    let blastAgent = Agent<List<Message>>.Start(fun inbox ->
        let rec messageLoop() = async {
            let! msg = inbox.Receive()
            Utility.RandomSleep()
            let sse = ServiceStack.ServiceStackHost.Instance.Container.TryResolve<ServiceStack.IServerEvents>()
            let blastObject = {Data = (msg.ToArray())}
            sse.NotifyChannel("home","cmd.chat", blastObject)
            return! messageLoop()
        }
        messageLoop()
    )

    let chaatAgent = Agent<InputMessage>.Start(fun inbox ->
        let rec messageLoop() = async {
            let! msg = inbox.Receive()
            Utility.RandomSleep()
            storage.Add(msg.Message)
            blastAgent.Post storage
            return! messageLoop()
        }
        messageLoop()
    )
```
Agents are async in nature. Always take one message from the queue. So, you don't have to worry about `locks` or `mutability`. They run in isolation. So, no more stepping on anyone's foot. Basically, in simple words they are queue with processing brain. If you take the line `let sse = ServiceStack.ServiceStackHost.Instance.Container.TryResolve<ServiceStack.IServerEvents>()`, here I am messaging from server to client using [SSE-Server Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events). Mighty Servicestack provide support for it out of box.

And here is code on client side.

```fsharp
    let subscribe =
        let socketSubscription dispatch =
            let eventSourceOptions = createEmpty<IEventSourceOptions>
            eventSourceOptions.handlers <- createObj [
                // "onConnect" ==> fun (sub : ServerEventConnect) -> printfn "onConnect: %A" sub.displayName
                // "onJoin" ==> fun (msg: ServerEventJoin) -> printfn "onJoin: %A" msg.displayName
                // "onLeave" ==> fun (msg: ServerEventLeave) -> printfn "onLeave: %A" msg.displayName
                // "onUpdate" ==> fun (msg : ServerEventUpdate) -> printfn "onUpdate %A" msg.displayName
                "onMessage" ==> fun (msg: ServerEventMessage) -> printfn "onMessage %A" msg.json
                "chat" ==> fun (msg : OutputMessages) ->
                                msg |> (SSESuccessMessages >> dispatch)
            ] |> Some |> Some

            let channels = [|"home"; ""|]
            SSClient.ServerEventsClient.Create(baseUrl
            , new List<string>(channels)
            , eventSourceOptions
            ).start() |> ignore
        Cmd.ofSub socketSubscription
```

More power to Fable and their support for the dynamic nature of JavaScript. If you can see above code is a mixture of Static and Dynamic typing. While I am creating object using static type `IEventSourceOptions`, I am registering handler using Fable's dynamic support to crate `JS object` on the fly. And from here to again goes to `update` method using dispatch, from there application loop will take over.

Here is a wonderful [article explaining CRDTs](http://bartoszsypytkowski.com/the-state-of-a-state-based-crdts/) that is using AKKA. In my personal opinion Micro-Service should be more logical and process separation instead of *team* separation. If [you are not Google](https://blog.bradfieldcs.com/you-are-not-google-84912cf44afb) then you can't and should not match them step by step.

# Business Business Business

There are three things important for any Software `Business Business Business` . Be it architecture, UX or scale. All boils down to business. For me, I like my compiler to do work for me. I don't want to write more code as more code means more errors. Also code should be kind of future friendly.

It is the reason behind picking up language and frameworks. In above use case I am replying with a message that is not updated. I am sending across old message. By doing this I am not blocking the user for the reply. Even not in async loop. And then I am changing message under the table when they arrived via SSE. This makes UX way better as there will always be reply for user.

Take any big application like youtube / rotten tomatoes. They are giving rating for video or movie. Many users are giving their `star` ratings. And I am updating average stars based on that. So, here I am not blocking user and allowing them to continue. Here, either you can change things in client or wait for SSE to come with updated message. User never bother unless and until s/he knows that his input is taken care of.

Another thing is. JavaScript runs everywhere. OK, that is Given. You can't escape from it. But that don't tie your hands to use it. You can use any damn thing that transpile to JavaScript. Elmish / Elm architecture push you to make big application using small isolated lego pieces. It will force you to think in that direction. It may hurt in start, but once your project reaches a considerable size, then you will thank your previous self for this. And no `null` or `object not found` or `function is not an object` or `object object` error.

As you have seen fable is quite more flexible in nature, and here I can joined forces with Servicestack client with it. So, I don't even have to give specific url path to make request or decode json on this side. It just works. Without any issue.

All this is great, now what next?

# Docker

There are many containers out there. But I am choosing [docker here](https://www.docker.com/). I am not biased but as Docker is a kind of front runner now a days. And it will make you future safe(hopefully). Give or take 5-10 years. If you are just starting things out with your project and not sure about how good it will go. Run docker with [Dokku](http://dokku.viewdocs.io/dokku/), if you are scaling things up then can use any docker based hosting. And for every other use cases there is [kubernetes](https://kubernetes.io/) . Using docker is having one `side effect` that you are not locking your self into any vendor.

My favorite *development time benefit* is that you don't have to set up every environment. Once done is done. If you are still not using docker in the *development* pipeline, while developing your application, you are making a big mistake and you should start using it. Yes, for development purpose also. Don't forget to check in your docker file so every team member is testing / running application against the same environment.

# Fake Paket

All this stuff will not be possible without twin F# heroes. [Fake](https://fake.build/) and [Paket](https://fsprojects.github.io/Paket/). Everything above is good and shiny but without joining them together, it is not useful also more importantly not fun. Fake and paket exactly doing the same.

Paket is way better package manager than nuget ever will be. And Fake is build tool that can run anything and everything literally.

While developing this application, I had kept them running, that ran my test, server code in watch mode while fable in hot reload mode.

> Above things are mostly inspired / copy-pasted things from [SAFE stack](https://safe-stack.github.io/). Obviously changing things as per my personal taste. And that makes my development experience so pleasant. Specially feedback loop is quite fast, that make coding more fun. No more F5, no more breaking point in JavaScript and trying to debug what the hell [object object] is?

This is my one and only 2017 post. Hope you enjoyed it. Happy to have feedback either here or just tweet it to me.
Complete code for this you can find at my [github repo](https://github.com/kunjee17/indian-chaat).

> Don't forget to read below list for other alternatives. If I missed anything then let me know I ll update it.

# Epilogue

- F# - If you looking for alternative C# is good option but you should go for Q#.
- Server side frameworks - [Suave](https://suave.io/) - kind of default with SAFE, [Giraffe](https://github.com/giraffe-fsharp/Giraffe) if you like aspnetcore, [Freya](https://freya.io/) crazy fast option
- Honorable mention for Server Side Frameworks - [NancyFx](http://nancyfx.org/) - can't miss this sweet framework
- Fable alternatives - ReasonML, Elm, OCaml, Pure Script, Clojure Script
- Elmish alternatives - React - Redux, Elm, Vue - Redux
- Actor Frameworks - [Akka](https://akka.io/), [Proto-Actor](http://proto.actor/)
- Async Framework - [Hapoc](http://hopac.github.io/Hopac/Hopac.html)
- Fake & Paket alternatives - Nuget & Sln file if you are seriously not happy with your life
- [Awesome Fable](https://github.com/kunjee17/awesome-fable)

There are many people from F# community I like to thank for this post. Without them this will not be possible. But personally I like to thank [Steffen Forkmann](https://twitter.com/sforkmann) for Fake and Paket. Man if you are ever coming to India, **Chaat** on me.

<iframe src="https://giphy.com/embed/dIm3qgyzenCh2" width="480" height="235" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/dIm3qgyzenCh2">via GIPHY</a></p>
