---
title: Reactive Services with Servicestack and F#
metadescription: Creating reactive services using F# actors and Servicestack
category: Technical,OSS,Functional,Functional Programming,Functional Web
published: public
---

Reactive word is not new nowadays. If you want your library to get limelight, use reactive word in the name any way possible and it will definitely get initial attention. Reactive word is appropriate for things that follows [reactive manifesto](http://www.reactivemanifesto.org/). That is true for now. And there are many variant of libraries on server and client to fulfil this.

Let's start from the start of web.

<!--excerpt-->

We were having old web were we used to do post event of page. At the time of posting whole page goes to server. And then *loading loading loading* of the page. But after the rise of [JQuery](https://jquery.com/) page refresh become the thing of past. AJAX was there even before JQuery but become widely used after that only. 
Now, that spinner which was there in browser tab bar / address bar came in center of page. 

> **Side Note**: If you want to make ajax request faster just use a spinner **gif** which spins faster. Tried and tested thing. With no code change performance issue will be resolved. 

With hardware getting better and if I be more specific more connected it is easy to store lots of data. And this makes things slower eventually. And user have to wait even for ajax request. So, what is next. With [HTML5](http://html5doctor.com/) allowing Web Sockets and Server Events things are becoming real-time as now pushing data from Server to client is possible. 

Server and Client is no more one-sided love story. Now, both can send message to each other. This new change allows build more reactive system. 

Let's take example. I request my friend to come with me to visit `X` place. I got answer `yes, will go.` So, my request is accepted but we haven't visited that place. Visit is still pending. After sometime we visited. So, result happen. I don't have to ask again and again. But that event pushed by that end.

Same goes for server. In post event client request for some data. But that data may or may not be available at that specific moment. So, Server can send `201 - Accepted` status to client. So, data is accepted and waiting for processed result. And whenever result it ready server push data to client. This way neither server is blocked nor client. 

> There is will be no need for spinner. Neither slow not fast. 

[SignalR](http://signalr.net/) is very well-known example of real-time processing. But I wanted to achieve this by API framework. And nothing can be better than [Servicestack](https://servicestack.net/). It is having Server Sent Event / Server Event support in all 4+ version. So, why not?

Let's jump into code. Code is in [F#](http://fsharp.org/). It is in F# for a reason and that you will know. Keep on reading. 

I am running a standalone Servicestack host but same code will working with Asp.net host also. 

`Programe.fs`

    module reactiveServicestack.main
    open ServiceStack
    open System
    open ServiceStack.Logging

    type AppHost() = 
        inherit AppHostHttpListenerBase ("Hello F# Service", typeof<HelloService>.Assembly)
        override this.Configure container = 
            this.Plugins.Add(new PostmanFeature()) |> ignore
            this.Plugins.Add(new CorsFeature()) |> ignore
            this.Plugins.Add(new ServerEventsFeature()) |> ignore
            let serverEventsFeature = this.GetPlugin<ServerEventsFeature>() 
            printfn "%s" serverEventsFeature.StreamPath
            ignore()


    [<EntryPoint>]
    let main args = 
        LogManager.LogFactory <- new ConsoleLogFactory()
        let env_port = Environment.GetEnvironmentVariable("PORT")
        let port = if env_port = null then "1234" else env_port
        let host = "http://localhost:8080/"
        printfn "listening on %s ..." host
        let appHost = new AppHost()
        appHost.Init() |> ignore
        appHost.Start host |> ignore
        while true do Console.ReadLine() |> ignore
        0 // return an integer exit code

Above code is very much classic Servicestack. Nothing fancy here. 

`HelloDto.fs`

    namespace reactiveServicestack
    open System
    open ServiceStack

    //I can't but CLI can mutate this one
    [<CLIMutable>]
    type HelloResponse = { Result:string }


    //There always be hello world, atleast something should be running
    [<Route("/hello")>]
    [<Route("/hello/{name}")>]
    type Hello() =
        interface IReturn<HelloResponse>
        member val Name = "" with get, set
        
Again, POCO members. Hello and HelloResponse. No magic here also. 

`AsyncProcessor.fs`

    #nowarn "40"
    namespace reactiveServicestack

    module SSE =
        open ServiceStack
        let private serverEvent = ServiceStackHost.Instance.Container.TryResolve<IServerEvents>()
        let NotifyAll (msg:'T) = serverEvent.NotifyAll(msg)

    
    
    module AsyncProcess =
        open System

        let rnd = new Random()
        let agent = 
            MailboxProcessor.Start(fun inbox -> 
                let rec messageLoop = 
                    async {
                        let! (msg:Hello) = inbox.Receive()
                        do! Async.Sleep(3000)
                        Console.WriteLine("Original " + msg.Name)
                        let reversed = msg.Name.ToCharArray() |> Array.rev |> fun x -> new String (x)
                        Console.WriteLine("Reversed " + reversed)
                        SSE.NotifyAll({HelloResponse.Result = reversed})
                        return! messageLoop
                    }
                messageLoop)
                
Here fun starts. I am creating Actor which takes Hello typed message and NotifyAll with HelloResponse after processing name string. 

Let's understand complicated parts. 

I have created SSE module because if I open Servicestack I was getting `asyncbuilder` compile error at async keyword. And I needed to open it to expose all the extension methods. So, I wrap things up in another module. 

*Don't* create seperate instance of any kind of ServerEvent implementation instead resolve it as above. Else things will surely not work. I was stuck at that problem for couple of days. 

Actor is very much traditional, I am reversing a string and as it is *very complex* process. My actor will take precisely **3** seconds to do it. And then I am notifying to all from actor itself. 

> In ideal case it should be Subscriber ID/s or Channel/s.

As, actor is async by nature it may complicate stuff to return things from agent loop. If you have used framework like [AKKA](http://getakka.net/) you must be knowing that `ASK` is performance heavy in compare to `TELL`. This way you can fire result from Actor itself. 

Now, you can easily guess what service will look like

`Hello.fs`
    namespace reactiveServicestack
    open ServiceStack
        open ServiceStack.Logging
        open System
        open System.Net


        type HelloService() =
            inherit Service()
            member val serverEvents:IServerEvents = null with get, set
            member this.Get (request:Hello) = 
                {Result = "Hello " + request.Name}
            member this.Post (request: Hello) =
                AsyncProcess.agent.Post(request)
                HttpStatusCode.Accepted
                
                
And final piece of puzzle **HTML** 
`default.html`
    <html>

    <head>
        <title>Reactive Servicestack</title>
        <link href="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.css" rel='stylesheet' type='text/css'>
    </head>

    <body>
        <div>Hello this is default page</div>
        <div>
            <label for="name">Enter Your name</label>
            <input type="text" id="name" value="" />
            <button id="reverse">Reverse</button>
            <ul>

            </ul>
        </div>
        <script src="//code.jquery.com/jquery-2.1.4.min.js"></script>
        <script src="/js/ss-utils.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.js"></script>
        <script type="text/javascript">
            $('#name').keypress(function (e) {
                var key = e.which;
                if(key == 13)  // the enter key code
                {
                    $('#reverse').click();
                    $('#name').val('');
                    return false;  
                }
            }); 
            $('#reverse').click(function(e) {
                e.preventDefault();
                var name = $('#name').val();

                if (name != '' || name != undefined) {
                    $.post('/hello', {
                            name: name
                        })
                        .done(function() {
                            toastr.success(name + ' is very much Accepted!')
                        });
                }
            });
            var addName = function(reversedName) {
                $('ul').append('<li>' + reversedName + '</li>');
            };
            var channel = 'home';
            var eventSource = new EventSource('/event-stream?channel=home&t=' + new Date().getTime());
            $(eventSource).handleServerEvents({
                handlers: {
                    HelloResponse: function(msg) {
                            console.log(msg);
                            addName(msg.Result);
                        }
                        //... Register custom handlers
                }
            });

        </script>
    </body>

    </html>

                
I am taking post request and returning `201-accepted` instead of `200-ok` from server. On client it will go in `success` callback only.  

This way we can easily decouple server and client. And this can be used for games, stock market, betting or other reactive systems. 

I am not going in detail of Actor or AKKA but as it natively available in F# so I used it. One of the reason beside being more fun while writing code. 

Please provide your input for this. I don't know this is right / wrong or can't say. But it is very much possible that using current technology even without enabling Web Sockets (*Most of the cloud provider supports web sockets*) one can create reactive web services.

> P.S. - With this there will be no need for spinner at all.