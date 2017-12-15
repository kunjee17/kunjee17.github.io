---

title: "Indian Chaat with F#"
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

# Why Chaat? and What is Chaat?

Most of us - developers like two things more than anything; eating (,cooking for some) and coding. So, I like to talk about one of the favorite dishes; **Indian Chaat**. Yup, it is more about F# and also part of [fsAdvent calendar 2017](https://sergeytihon.com/2017/10/22/f-advent-calendar-in-english-2017/). So, why this specific dish??? To understand that you should try searching [French Onion Soup](https://www.google.com/search?tbm=isch&source=hp&biw=1920&bih=940&ei=gdMzWvjqBsrivgSrgYOQCg&q=french+onion+soup&oq=french+o&gs_l=img.3.0.0l10.1779.4421.0.5814.10.9.0.0.0.0.218.715.0j3j1.4.0....0...1ac.1.64.img..6.4.711....0.yR2qZd_wqn4) or [Pizzas](https://www.google.com/search?biw=1920&bih=940&tbm=isch&sa=1&ei=iNMzWqqhOKOQvQS4zqWoAQ&q=pizza&oq=pizz&gs_l=psy-ab.3.0.0i67k1l2j0j0i67k1l6j0.37294.38020.0.39124.4.4.0.0.0.0.200.585.0j2j1.3.0....0...1c.1.64.psy-ab..1.3.582....0.V2wR_A3l2D0) and then Search for [Indian Chaat](https://www.google.com/search?biw=1920&bih=940&tbm=isch&sa=1&ei=sdMzWrLMKYn9vgSBhpz4DA&q=Indian+Chaat&oq=Indian+Chaat&gs_l=psy-ab.3..0l10.3694.16984.0.17138.15.13.1.0.0.0.297.1972.0j4j5.9.0....0...1c.1.64.psy-ab..5.10.1991...0i67k1.0.IJpHl8f_YYA). Indian Chaat is completely different in every picture. Even it's bare bone parts are different. **Chaat** you can make it from what you want, way you want and still enjoy it. That is the heart of it. And currently that is possible with *dotnet core* . Be it on any OS, using any editor/IDE and still you make things work.

> So, what I will do here in this post. I will try to make Simple **Chat** (yup, kind of Chaat) application by picking up my *favourite* frameworks or libraries. And also give reasons for that. And in `Epilogue` I will try to provide all other options that can be replaced or mixed matched. So, you can try it by your self. It is more or less spin off of SAFE style application. You can find links of everything below.

# Current state of dotnet core

Dotnet core is **Unbiased** version of dotnet. Yeah, it kind of works on every OS. And specially with other editors. Also more openly developed. It may not be best but credit should be given. So, here I am using that. If you are sticking with *Dotnet*, be it big fat company or start up. If you are not making Desktop application, you should be moving to *core* for sure.

# Functional Programming with F\#

There are many Microsoft people may tell you don't worry about `F#` and should take care of requirements on hand first. I am saying the same thing, for the sake of *requirements* you should be using F#. *C#* may be good and supported by Microsoft wholeheartedly but as developer we should choose our things based on task at our hand. And from personal experience of around 10 Years in Software Industry. Few things are already proven for current time, Functional First / Functional language is already winner, no matter how many features may be added to OOP languages they are still not like prior language. OOP language never designed for that. They have their place but I am not sure about future. Be it ReasonML, ELM, Scala or F#. statically typed or not that will boil down to personal choice. Another thing is *Big projects* be it server or client with fast pace delivery is here to stay. Make a peace with it and choose it accordingly.

# Visual Studio *Code*

While making this project and also nowadays I am using VSCode more often. Whatever bad karma earned by Visual Studio, VSCode is leveling it. And leveling them quite well. VSCode with [ionide](http://ionide.io/) is quite killing it. It is not the beast like it's counter part but surely get things done and it is quite faster.

# ServiceStack

Servicestack is built with C#, and OOP framework. It was good old alternative of WCF, If WCF is still around? Then it became better version of WebAPI (WebAPI is more or less inspired by ServiceStack). Currently it has touched [V5](http://docs.servicestack.net/releases/v5.0.0). And it is quite mature and flexible. Also providing way many things out of box. When there was vacuum in F# specific web framework, [Servicestack](https://servicestack.net/) was kind of choice for F# people. And there is obvious reason for that. Not only it works with F# but looks way better with it. And vision of Servicestack was quite futuristic, it is one of the first to force developer to think in message while doing web development. And cut to **2017** every good development strategy talks about message driven development in client side. Take is react-redux, [Elm](http://elm-lang.org/) or [Fable-Elmish](https://fable-elmish.github.io/elmish/). [The Elm Architecture](https://guide.elm-lang.org/architecture/) is way to go for making big application on client side.

Take a example here.

Here are DTOs
```
    [<CLIMutableAttribute>]
    type Message = {
        Data : string
        Color : string
    }


    [<CLIMutableAttribute>]
    type OutPutMessages = {
        Data : Message []
    }

    [<CLIMutableAttribute>]
    [<Route("/Chat")>]
    type InputMessage = {
        UserId : int
        Created : DateTime
        Message : Message
    } with interface IReturn<OutPutMessages>

```

And here is Service

```
    type ServerEventsServices() =
        inherit Service()

        member __.Post(request : InputMessage) =
            chaatAgent.Post request
            {Data = storage.ToArray()} |> box

```

If you skip *little code base configuration* then this may be simplest way to understand communications. Everything is message. Just like that. Skip the *Agent* line for now.

# Fable

Fable is one of many *your favourite language* to *JavaScript* transpiler. Fable here is converting quite a mature functional language. I like to quote [ReasonML](https://reasonml.github.io/guide/what-and-why) page here that also suggesting Fable as one of the alternative if not ReasonML. It is easy to use like Elm with the same time it more flexible then it.

## Elmish

As I mentioned Elm architecture is way to mover forward if you are making big / fat business application. From personal experience I can say if you are or your team or team you know is using **Angularjs** specifically 1.0 to make big application. Tell them to change or just run away from there.

Elmish is thin wrapper around react to provide Elm like architecture without any redux complexity. Provide you message driven architecture to work with. Elmish architecture have three main parts. **Model -> View -> Update**


### Model

```
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
    | SuccessMessages of OutPutMessages
    | SSESuccessMessages of OutPutMessages
    | Failed of exn

```

Forget about *Model* for now. As it is just a represantation for view. More important here is *Msg*. If you can see *of InputMessage* and *of OutputMessages* both are directly from Server. And all three message including with *Failed* is there to communicate with Server. It is direct connection with Server's DTOs. Other msg is to handle user event from view. So, every communication is divided with specific message and handled in State/Update.

### View

```
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

Normally I skip the view part. As html is not that interesting. But this is different. It is not only statically typed HTML but also having [Bulma](https://bulma.io/) wrapped with staticially typed functions. Means if this compiles you don't have to worry about even CSS typos. Thanks to [Fulma](https://mangelmaxime.github.io/Fulma/). And that is how you write html-css with confidence.

### Update

```
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
            client.post (msg :> IReturn<OutPutMessages>)
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

A very simple update method. Now closely look at *PreparePost* message. That is where Fable ecosystem shined, I am mutating thing. As it is not that strict. And for the fact mutable is not bad but shared mutable is very bad. I am preparing post command here and the hand it over to other method. And from there it will go forward.

## ts2fable

In above *PreparePost* and *PostMessage* message; there are few things like *dtos* and *client* . That all comes thanks to ts2fable. A library used to convert typescript definition file to F# imports. It is quite magical and super awesome. Currently in beta but works most of the time for around 95% of code.

And here is code how you use it.

```
let [<Import("*","@servicestack\client")>] SSClient: SSClient.IExports = jsNative

let [<Import("*","./../Imports/IndianChaat.dtos")>] dtos: IExports = jsNative
```
Simple one line import and all library functions are available in your project.

Convert *index.d.ts* from *@servicestack\client* to create Import file. And then just pull it in your code. Client library is also provided by Servicestck. And it is having quite complete typed library for TypeScript. So, you use that just like that.

> What about *dtos*?

You can generate typescript dtos using *@servicestack\cli*. Then using `tsc -d` command created js and definitions. And then using ts2fable convert to import. Then pull it in your project. Seems little complicated but it is just few commands.

So, now you have typed client library with typed dtos for you. Here are the Dtos

```
type [<AllowNullLiteral>] OutPutMessages =
    abstract data: ResizeArray<Message> with get, set

type [<AllowNullLiteral>] OutPutMessagesStatic =
    [<Emit "new $0($1...)">] abstract Create: unit -> OutPutMessages

type [<AllowNullLiteral>] Message =
    abstract data: string with get, set
    abstract color: string with get, set

type [<AllowNullLiteral>] InputMessage =
    inherit IReturn<OutPutMessages>
    abstract userId: float with get, set
    abstract created: string with get, set
    abstract message: Message with get, set
    abstract createResponse: unit -> OutPutMessages
    abstract getTypeName: unit -> string

type [<AllowNullLiteral>] InputMessageStatic =
    [<Emit "new $0($1...)">] abstract Create: unit -> InputMessage
```

There is another way that you can directly share `dtos` from server file. That is benefit of using F# on client and server both side. But then I can't show great work done with ts2fable tool.

# AAA - Actor-Agent-Async

if we are talking about big application, then giving skip to *scale* word never gonna happen. And still most of the *Enterprise Application* move around *Design Patterns*. But I am pretty sure that for AAA size application you need AAA solution. You can use all or either of it. Power and Flexibility are also in same order as mentioned above. Actor is having referential transparency while agent don't. Due to this Actors are more suitable for Micro-service kind of architecture. Using actors you can off load your heavy process to another machine without any issue. Also, it easy to set up cluster with them. That is not possible with agents. I guess `Async` is pretty much known by everyone. Also all will agree that Async is quite necessary but at the same time difficult to implement correctly. (I am not considering Java in here. Syntax is so horrific.)

For a simplicity case I am using Agent here. Just taking middle ground.

```
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
Agents are async in nature. Always take one message from queue. So, you don't have to worry about `locks` or `mutability`. They run in isolation. So, no more stepping on anyone's foot. Basically in simple words
they are queue with processing brain. If you take the line `let sse = ServiceStack.ServiceStackHost.Instance.Container.TryResolve<ServiceStack.IServerEvents>()`, here I am messaging from server to client using [SSE-Server Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events). Mighty Servicestack provide support for it out of box.

And here is code on client side.

```
    let subscribe =
        let socketSubscription dispatch = 
            let eventSourceOptions = createEmpty<IEventSourceOptions>
            eventSourceOptions.handlers <- createObj [
                // "onConnect" ==> fun (sub : ServerEventConnect) -> printfn "onConnect: %A" sub.displayName
                // "onJoin" ==> fun (msg: ServerEventJoin) -> printfn "onJoin: %A" msg.displayName
                // "onLeave" ==> fun (msg: ServerEventLeave) -> printfn "onLeave: %A" msg.displayName
                // "onUpdate" ==> fun (msg : ServerEventUpdate) -> printfn "onUpdate %A" msg.displayName
                "onMessage" ==> fun (msg: ServerEventMessage) -> printfn "onMessage %A" msg.json
                "chat" ==> fun (msg : OutPutMessages) ->
                                msg |> (SSESuccessMessages >> dispatch)
            ] |> Some |> Some

            let channels = [|"home"; ""|]
            SSClient.ServerEventsClient.Create(baseUrl
            , new List<string>(channels)
            , eventSourceOptions
            ).start() |> ignore
        Cmd.ofSub socketSubscription
```

More power to Fable and their support for dynamic nature of JavaScript. If you can see it is more mixture of Static and Dynamic typing. While I am creating object using static type `IEventSourceOptions`, I am registering handler using Fable's dynamic support to crate `JS object` on the fly. And from here to again goes to `update` method using dispatch. from there application loop will take over.

# Business Business Business

There are three thing important for any Software `Business Business Business` . Be it architecture, UX or scale. All boils down to business and how you execute it. For me I like my compiler to do work for me. I don't want to write more code as less code means less errors. Also code should be kind of future friendly.

It is reason behind picking up language and frameworks. In above use case I am replying with message that is not updated. I m sending across old message. By doing this I am not blocking the user. Even not in async loop. And then I m changing message under the table when they arrived via SSE. This make UX way better as there will always be reply. 

Take any big application. For example of user rating of movie. Many users are giving their `star` ratings. And I am updating average stars based on that. So, here I am not blocking user and allowing them to continue. Here, either you can change things in client or wait for SSE to come with updated message. User never bother unless and until s/he knows that his input is taken care of.

Another thing is. JavaScript runs every where. OK that is Given. You can't escape from it. But that don't tied your hands to use it. You can use any damn thing that transpile to JavaScript. Elmish / Elm architecture push you to make big application using small isolated lego pieces. It will force you think in that direction. It may hurt in start but once your project reach considerable size then you will thank your previous self for this. And no `null` or `object not found` or `function is not an object` or `object object` error.

As you have seen fable is quite more flexible in nature, and here I can joined forces with Servicestack client with it. So, I don't even have to give specific url path to make request or decode json on this side. It just works. Without any issue.

All this is great but what next

# Docker

There are many containers out there. But I am choosing [docker here](https://www.docker.com/). I am not biased but as Docker is kind of front runner now a days. And it will make you future safe. Give or take 5-10 years. If you are just starting things out with your project and not sure about how good it will go. Run docker with [Dokku](http://dokku.viewdocs.io/dokku/), if you are scaling things up then can use any docker based hosting. And for every other use cases there is [kubernetes](https://kubernetes.io/) . Using docker is having one `side effect` that you are not locking your self into any vendor.

My favourite development time benefit is that you don't have to set up every environment. Once done is done. If you are still not using docker in *development* pipe line, while developing your application, you are making big mistake and you should start using it. Yes, for development purpose also. Don't forget to check in your docker file so every team member is testing / running application against same environment.

# Fake Paket

All this stuff will not be possible without twin F# heros. [Fake](https://fake.build/) and [Paket](https://fsprojects.github.io/Paket/). Everything above is good and shinny but without joining things together, it is not useful also more importantly fun. And fake and paket exactly doing that.

Paket is way better package manager than nuget ever will be. And Fake is build tool that can run anything and everything.

While developing this application, I had kept them running, that ran my test, server code in watch mode while fable in hot reload mode.

Above things are mostly inspired / copy-pasted things from [SAFE stack](https://safe-stack.github.io/). Obviously changing things as per my personal taste. And that make my development experience so great. Specially feedback loops is quite fast, that make coding more fun. No more F5, no more breaking point in JavaScript and trying to debug what the hell [object object] is?

Hope you like the post. Complete code you can find at my [github repo](https://github.com/kunjee17/indian-chaat). And don't forget to read below list for other alternatives.

# Epilogue

- F# - If you looking for alternative C# is good option but you should go for Q#.
- Server side frameworks - [Suave](https://suave.io/) - kind of default with SAFE, [Giraffe](https://github.com/giraffe-fsharp/Giraffe) if you like aspnetcore, [Freya](https://freya.io/) crazy fast option
- Honorable mention for Server Side Frameworks - [NancyFx](http://nancyfx.org/) - can't miss this sweet framework
- Fable alternatives - ReasonML, Elm, OCaml, Pure Script, Clojure Script
- Elmish alternatives - React - Redux, Elm, Vue - Redux
- Actor Frameworks - [Akka](https://akka.io/), [Proto-Actor](http://proto.actor/)
- Async Framework - [Hapoc](http://hopac.github.io/Hopac/Hopac.html)
- Fake & Paket alternatives - Nuget & Sln file if you are seriously not happy with your life


There are many people from F# community I like to thank for this post. Without them this will not be possible. But personally I like to thank [Steffen Forkmann](https://twitter.com/sforkmann) for crating Fake and Paket. Man if you are ever coming to India, **Chaat** on me.

<iframe src="https://giphy.com/embed/dIm3qgyzenCh2" width="480" height="235" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/dIm3qgyzenCh2">via GIPHY</a></p>
