---

title: "Elmish Xamarin Forms from Fable point of View"
slug : "elmish-xamarin-forms-from-fable-point-of-view"

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
- Elmish
- Xamarin
---

Elm and Elmish patterns is kind of *new cool* in web world. Good people in F# put that [Elmish in Xamarin Forms](https://fsprojects.github.io/Elmish.XamarinForms/).

> Immutable UI for Xamarin forms.

That is quite bold in it self. We will look at Pros and Cons of it in this post and also try to look EXF from angle of other contemporary technologies for creating cross platform mobile application.

One thing I like to clarify before moving forward,

> objective of the application I have created is solely to match with *Fable - Elmish* application.

So, there is a chance that you might miss few Xamarin specific stuff. Those are not included knowingly. After working in Fable Elmish for more than an year, I just wanted to know how much of my **Elmish** knowledge I can bring to create mobile application without thinking of mobile part of it. Also, what kind of development experience I am getting from Platform in compare to Fable - Elmish.

## Application in Brief

You can find the application [Elmish Star Wars](https://github.com/kunjee17/ElmishStarWars) at github. I have created UI for [Star Wars API](https://swapi.co/). You have couple tabs, pull the data and then see the detail view. In details view you can click button and got the list as well. Pretty routine stuff, nothing fancy.

> You can always fetch code and run it. In most cases it will work.

Let's directly go to Pros and Cons of selecting EXF. And will let readers decide what they want to do. I will also put out gist at the end of post, please read on.

## Pros

### No XAML

Sorry to all *XAML* fans out there. But for most of the F# developers I know, XAML was and is kind of complicated issue. They always had love - hate relationship with XML based design tools. For me things would be little hard to reuse when there is XML based UI. EXF do solve that problem, by allowing to write view in F#. *In that  way view becomes one more F# function.* You one can do many things when you are having flexible and powerful functions at your disposable; even for views.

Take a look at below piece of code

```fsharp

module View =
    open Types
    open CommonViews

    let root (model:Model) dispatch =
        View.ScrollView(
                content = View.StackLayout (
                    padding = 20.0,
                    children = [
                        if model.Length > 0 then
                            yield View.Label(text = sprintf "no of films : %A" model.Length)
                            yield View.ListView(
                               items = [
                                   for i in model do
                                       yield View.Label i.Title
                                       ],
                                itemSelected=(fun idx -> dispatch (FilmSelectedItemChanged idx)),
                                horizontalOptions=LayoutOptions.CenterAndExpand)
                        else yield loadingView "Press to Load Films. And press again to load more Films"
                    ]
                )
            )

```

Now this piece of view I am using in Tab View in home page and also in separate view, where I need to show the list. I am not saying this might not be possible in XAML but it might not be that natural like it is here.

### View ReUse

As mentioned above; views in F# do make much more sense while creating a big application. I had a wonderful experience with *Fable - Elmish* and getting same thing with EXF to create native views is surely wonderful experience. It seems not a big deal while creating toy application but at the time of Enterprise application view reuse can reduce the code and possibility of errors. As a developer we always emphasize on code reuse but in most cases we forgot that our view is also piece of code that we can and we should reuse. Elmish style web app or even EXF app makes it easy to reuse view code.

In my application I have reused above code. Let's see how I did it.

```fsharp
 module View =
    open Types
    open CommonViews


    let root (model: Model) dispatch =
        View.TabbedPage(
                useSafeArea = true,
                children = [
                    yield
                        View.ContentPage(
                            title = "People",
                            content =
                                View.StackLayout(
                                    children = [
                                        PeopleList.View.root model.People (PeopleListMsg >> dispatch)
                                        View.Button(text = "Fetch People",command = (fun _ -> LoadPeople |> dispatch))
                                    ]
                                )
                            )
                    yield
                        View.ContentPage(
                            title = "Film",
                            content =
                                View.StackLayout(
                                    children = [
                                        FilmList.View.root model.Films (FilmListMsg >> dispatch)
                                        View.Button(text = "Fetch Films",command = (fun _ -> LoadFilms |> dispatch))
                                    ]
                                )
                            )
                            //code removed for readability purpose
```

And same code in another view

```fsharp
module View =
    open Types
    let root (model: Model) dispatch =
        View.ContentPage(
            title = "Films",
            content =
                View.StackLayout(
                    children = [
                        FilmList.View.root model.Films (FilmListMsg >> dispatch)
                    ]
                )
            ).HasNavigationBar(true).HasBackButton(true)
```

### Familiar Libraries

USP of using Xamarin or Xamarin Forms for most of the Dot Net developers is that they are in familiar terrain. They can use all C# libraries. Now, with dot net core support they also can use all dot net core libraries. Same is true for EXF. All Dot Net goodies are available. Well, most of them, be it C# or F#. There are some obvious hick ups; like `FSharp.Data` is still not working for me. I am sure it would be solved soon. Other than that most obvious things like `JSON.net` or `RestSharp` works like as it should with any dot net application.

```fsharp
module Helpers
    open RestSharp
    open Elmish.XamarinForms
    open Elmish.XamarinForms.DynamicViews
    open Newtonsoft.Json


    let getData (url:string)=
        async {
            do! Async.SwitchToThreadPool()
            let client = new RestClient(url)
            let req = RestRequest(Method.GET)
            return! Async.Catch (client.ExecuteTaskAsync (req) |> Async.AwaitTask)
        }

    let getCmd (res : Async<Choice<IRestResponse,exn>>) success failure =
       async {
           let! data = res
           match data with
           | Choice1Of2 r -> return success (JsonConvert.DeserializeObject<_> r.Content)
           | Choice2Of2 exn -> return failure exn
       } |> Cmd.ofAsyncMsg
```

As good as it can get. Async, RestClient and Json.net all together seamlessly integrated with EXF - Command.

### No react

Even if you skip the license issue, React can be painful for developer. People worked in web or Fable Elmish did have experienced it in a way or another (A reason they switch to Preact or similar libraries). But here you don't have react; still have same functionality. Trust me on this, it is good not to have react around your development process.

## Cons

### No react

I will start with same thing. There are times when I don't like react but it is a powerful library which do rendering task like champ. While developing with EXF I do feel sometimes that view is getting rendered again and again when it is not required. It was adding flicker to page. That definitely don't look good. *May be some crazy library can help in that case*.

### Hot Reload

If you are coming from web, this is kind of must and much needed thing while doing development. Hot Reload is provided by EXF, but first you need to do little bit of gymnastic to make it work and then it will again not work in case of multiple files. In Elmish architecure you are tend to have a lot of files for sure. So, not having Hot Reload do hurt from time to time.

### No URLs

This was a big bummer for me when I was starting with EXF. You might not feel need for same but if you are moving from web - elmish, URLs are the things I missed most. In web URLs are the hook for your views. Things always start with URLs. One the change of URL view changes, search based on ID or some cases do the web request based on URL as well. In EXF there are many options like hard code pattern match pages if you have fix navigation and if you are having dynamic navigation, you might required something to hold your pages and models so you can navigate back (if you like your back button).

Here is code I wrote for same

```fsharp
module State

open Global
open Types
open Elmish.XamarinForms
open Elmish.XamarinForms.DynamicViews

let init () =
    let (a, aCmd) = Application.State.init()
    {
        PageStack = [(ApplicationPage, ApplicationModel a)]
    }, Cmd.map ApplicationMsg aCmd


let removeFirst (items : 'a list) =
    match items with
    | [] -> []
    | [_] -> []
    | h::t -> t

let peopleListProc msg model res =
    match msg with
    | PeopleList.Types.Msg.SelectedPerson i ->
     let (a,aCmd) = Person.State.init(i)
     {model with PageStack = (PersonPage,PersonModel a) :: model.PageStack ; }, Cmd.map PersonMsg aCmd
    | _ -> res

let filmListProc msg model res =
    match msg with
    | FilmList.Types.Msg.SelectedFilm i ->
     let (a,aCmd) = Film.State.init(i)
     {model with PageStack = (FilmPage,FilmModel a) :: model.PageStack ; }, Cmd.map FilmMsg aCmd
    | _ -> res

let starshipListProc msg model res =
    match msg with
    | StarshipList.Types.Msg.SelectedStarship i ->
     let (a,aCmd) = Starship.State.init(i)
     {model with PageStack = (StarshipPage,StarshipModel a) :: model.PageStack ; }, Cmd.map StarshipMsg aCmd
    | _ -> res

let vehicleListProc msg model res =
    match msg with
    | VehicleList.Types.Msg.SelectedVehicle i ->
     let (a,aCmd) = Vehicle.State.init(i)
     {model with PageStack = (VehiclePage,VehicleModel a) :: model.PageStack ; }, Cmd.map VehicleMsg aCmd
    | _ -> res

let speciesListProc msg model res =
    match msg with
    | SpeciesList.Types.Msg.SelectedSpecies i ->
     let (a,aCmd) = Species.State.init(i)
     {model with PageStack = (SpeciesPage,SpeciesModel a) :: model.PageStack ; }, Cmd.map SpeciesMsg aCmd
    | _ -> res

let planetsListProc msg model res =
    match msg with
    | PlanetList.Types.Msg.SelectedPlanet i ->
     let (a,aCmd) = Planet.State.init(i)
     {model with PageStack = (PlanetPage,PlanetModel a) :: model.PageStack ; }, Cmd.map PlanetMsg aCmd
    | _ -> res

let update (msg : Msg) (model : Model) =
    let (_,pageModel) = model.PageStack.Head
    match msg, pageModel with
    | ApplicationMsg msg , ApplicationModel m ->
        let (a, aCmd) = Application.State.update msg m
        let i = (ApplicationPage, ApplicationModel a) :: removeFirst model.PageStack
        let (res, resCmd) = {model with PageStack = i}, Cmd.map ApplicationMsg aCmd

        match msg with
        | Application.Types.PeopleListMsg p -> peopleListProc p model (res, resCmd)
        | Application.Types.FilmListMsg p -> filmListProc p model (res, resCmd)
        | Application.Types.StarshipListMsg p -> starshipListProc p model (res, resCmd)
        | Application.Types.VehicleListMsg p -> vehicleListProc p model (res, resCmd)
        | Application.Types.SpeciesListMsg p -> speciesListProc p model (res, resCmd)
        | Application.Types.PlanetListMsg p -> planetsListProc p model (res, resCmd)
        | _ -> (res,resCmd)

    | PersonMsg msg, PersonModel m ->
        let (a, aCmd) = Person.State.update msg m
        let i = (PersonPage, PersonModel a) :: removeFirst model.PageStack
        let (res,resCmd) = {model with PageStack = i}, Cmd.map PersonMsg aCmd

        match msg with
        | Person.Types.Msg.ShowFilms links ->
            let (a,aCmd) = Films.State.init(links)
            {model with PageStack = (FilmsPage,FilmsModel a) :: model.PageStack ; }, Cmd.map FilmsMsg aCmd
        | Person.Types.Msg.ShowSpecies links ->
            let (a,aCmd) = SpeciesMore.State.init(links)
            {model with PageStack = (SpeciesMorePage,SpeciesMoreModel a) :: model.PageStack ; }, Cmd.map SpeciesMoreMsg aCmd
        | Person.Types.Msg.ShowStarships links ->
            let (a,aCmd) = Starships.State.init(links)
            {model with PageStack = (StarshipsPage,StarshipsModel a) :: model.PageStack ; }, Cmd.map StarshipsMsg aCmd
        | Person.Types.Msg.ShowVehicles links ->
            let (a,aCmd) = Vehicles.State.init(links)
            {model with PageStack = (VehiclesPage,VehiclesModel a) :: model.PageStack ; }, Cmd.map VehiclesMsg aCmd


    | FilmMsg msg , FilmModel m ->
        let (a, aCmd) = Film.State.update msg m
        let i = (FilmPage, FilmModel a) :: removeFirst model.PageStack
        {model with PageStack = i}, Cmd.map FilmMsg aCmd
    | StarshipMsg msg, StarshipModel m ->
        let (a, aCmd) = Starship.State.update msg m
        let i = (StarshipPage, StarshipModel a) :: removeFirst model.PageStack
        {model with PageStack = i}, Cmd.map StarshipMsg aCmd
    | VehicleMsg msg, VehicleModel m ->
        let (a, aCmd) = Vehicle.State.update msg m
        let i = (VehiclePage, VehicleModel a) :: removeFirst model.PageStack
        {model with PageStack = i}, Cmd.map VehicleMsg aCmd
    | SpeciesMsg msg, SpeciesModel m ->
        let (a, aCmd) = Species.State.update msg m
        let i = (SpeciesPage, SpeciesModel a) :: removeFirst model.PageStack
        {model with PageStack = i}, Cmd.map SpeciesMsg aCmd
    | PlanetMsg msg, PlanetModel m ->
        let (a, aCmd) = Planet.State.update msg m
        let i = (PlanetPage, PlanetModel a) :: removeFirst model.PageStack
        {model with PageStack = i}, Cmd.map PlanetMsg aCmd
    | FilmsMsg msg, FilmsModel m ->
        let (a, aCmd) = Films.State.update msg m
        let i = (FilmsPage, FilmsModel a) :: removeFirst model.PageStack
        let (res, resCmd) = {model with PageStack = i}, Cmd.map FilmsMsg aCmd

        match msg with
        | Films.Types.FilmListMsg p -> filmListProc p model (res, resCmd)
        | _ -> (res, resCmd)

    | SpeciesMoreMsg msg, SpeciesMoreModel m ->
        let (a, aCmd) = SpeciesMore.State.update msg m
        let i = (SpeciesMorePage, SpeciesMoreModel a) :: removeFirst model.PageStack
        let (res, resCmd) = {model with PageStack = i}, Cmd.map SpeciesMoreMsg aCmd

        match msg with
        | SpeciesMore.Types.SpeciesListMsg p -> speciesListProc p model (res, resCmd)
        | _ -> (res, resCmd)

    | VehiclesMsg msg, VehiclesModel m ->
        let (a, aCmd) = Vehicles.State.update msg m
        let i = (VehiclesPage, VehiclesModel a) :: removeFirst model.PageStack
        let (res, resCmd) = {model with PageStack = i}, Cmd.map VehiclesMsg aCmd

        match msg with
        | Vehicles.Types.VehicleListMsg p -> vehicleListProc p model (res, resCmd)
        | _ -> (res, resCmd)

    | StarshipsMsg msg, StarshipsModel m ->
        let (a, aCmd) = Starships.State.update msg m
        let i = (StarshipPage, StarshipsModel a) :: removeFirst model.PageStack
        let (res, resCmd) = {model with PageStack = i}, Cmd.map StarshipsMsg aCmd

        match msg with
        | Starships.Types.StarshipListMsg p -> starshipListProc p model (res, resCmd)
        | _ -> (res, resCmd)

    | PagePopped, _ -> {model with PageStack = removeFirst model.PageStack}, Cmd.none
    | _,_ -> failwithf "%A and %A is not valid msg model pair" msg model
```

Here is caveat, you might not like `| _,_ -> failwithf "%A and %A is not valid msg model pair" msg model` as it will break compiler's help. If you do have some missing pattern then it will not show because of wild card pattern match at the end.

But that is only thing I find out when I like to arrange multiple pages for Fable - Elmish application (ref: Safe - Book Store) and here also I tried the same thing. So, if there is any better way to do it for web and EXF, I am all ears for suggestions.


## Personal Take

EXF is good. Like seriously a good step in right direction. But I guess it can and should learn few tips and tricks from other platform like Flutter (way good reload and faster development cycle), Ionic (latest one) / Cordova (It is web and everything just works). I know that comparison is not possible but tooling can surely be improved. I don't know about Xamarin Forms but I surely can give another try to EXF for large application given improved tooling in near future.
