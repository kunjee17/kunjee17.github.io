---
title: "Plotly, F# and Response of India to Covid Crisis"
slug: "plotly-fsharp-and-response-of-india-to-Covid-crisis"

date: 2021-12-17
categories:
  - Technical
tags:
  - OSS
  - FSharp
  - FSharp.Data
  - Functional
  - Data Science
  - Dotnetcore
---

Recently I got the chance to work with the [Plotly](https://plotly.com/graphing-libraries/) team. I was helping them to set up the F# documentation pipeline. There was less of F# but more of hacking around Jupyter notebooks and their plugins.

But I like the Plotly library and its cross-platform approach. They are available for almost all languages. [Plotly Dash](https://dash.plotly.com/) is kind of another next-level beast again available for all the languages.

> Here obviously we are going to talk about only F#. This post is part of the [FsAdvent calendar of 2021](https://sergeytihon.com/2021/10/18/f-advent-calendar-2021/). Thanks [Sergey Tihon](https://twitter.com/sergey_tihon) for arranging this and giving me chance.

Plotly as the name suggested is mostly for Data scientists, so it is very notebook friendly. Combine with Dotnet interactive it is a force to be reckoned with.

In the CoVid era would be better than analyzing covid data. Here we will be looking at the simple use of Plotly library to check out India's response to the Covid Crisis.

Let's first set up the VS Code. If you are having the latest Dotnet installed then the only thing you need to do is create a notebook file. Just create `analysis.ipynb` file in any folder. And open it in VS Code.

It will ask how you like to run it, select Dotnet interactive and F# as language. Then you are good to go.

Here is the code to add the necessary libraries in the notebook.

```fsharp
#r "nuget: Plotly.NET,  2.0.0-preview.16"
#r "nuget: newtonsoft.json"
#r "nuget: Plotly.NET.Interactive,  2.0.0-preview.16"
#r "nuget: FSharp.Data"
#r "nuget: Deedle"

open Plotly.NET
open FSharp.Data
```

I will be using [FSharp.Data](http://fsprojects.github.io/FSharp.Data/) library to parse and process data using F# type provider for JSON and CSV.

```fsharp
[<Literal>]
let ApiUrl = "https://api.covid19tracker.in/data/csv/latest/case_time_series.csv"

type CoVidData = CsvProvider<ApiUrl>

let covidData = CoVidData.Load(ApiUrl)

let covidPlotData = covidData.Rows |> Seq.toArray |> Array.map(fun x -> (x.Date_YMD, x.``Daily Confirmed``.GetValueOrDefault(0))) |> Array.toSeq

Chart.Scatter(covidPlotData, StyleParam.Mode.Lines_Markers)
```

Here how it looks once cell is executed.

![](/images/covid_analysis/covidplotdata.png)

As you can see the three waves in CoVid cases. The second wave was the worst of all.

Now, let's see how vaccination is being done weekly basis.

```fsharp
[<Literal>]
let JSONPath = "./dashboard_export.json"

type VaccinationData = JsonProvider<JSONPath>

let vaccinationData = VaccinationData.Load(JSONPath)

let vaccinationPlotData = vaccinationData.WeeklyVaccination |> Array.map(fun x -> (x.Label, x.Total / 100))

Chart.Scatter(vaccinationPlotData, StyleParam.Mode.Lines_Markers)
```

You can find dashboard json file [here](/images/covid_analysis/dashboard_export.json) or take latest from [https://dashboard.cowin.gov.in/](https://dashboard.cowin.gov.in/).

Here how result looks like when cell is executed.

![](/images/covid_analysis/vaccinationplotdata.png)

There are too many questions of Vaccination, just like there are questions of the earth being flat. Let's answer the first question and leave the second one for next time.

Here I am filtering data from the date vaccination started and then grouping Covid Cases based on week, just to make both data equivalent. As the vaccination number was too high compared to Covid cases _I m dividing it by 100 just to make the graph more readable_.

```fsharp
let confirmedCasesAfterVaccinationStarted =
    covidData.Rows
            |> Seq.toArray
            |> Array.map(fun x ->  (x.Date_YMD, x.``Daily Confirmed``.GetValueOrDefault(0) ) )
            |> Array.filter(fun (x,_) -> x > new DateTime(2021,01,16))
let confirmedCasesByWeeks =
    vaccinationData.WeeklyVaccination
            |> Array.map(fun x -> (x.Label, x.Startdate.DateTime, x.Enddate.DateTime))
            |> Array.map(fun (label ,sd, ed) -> (label, confirmedCasesAfterVaccinationStarted
                                                    |> Array.filter(fun (y,_) -> (sd < y && y < ed))
                                                    |> Array.sumBy(fun (_,y) -> y)))

[
        Chart.Line(confirmedCasesByWeeks)
        |> Chart.withTraceName(Name="Confirm Cases by Week")
        |> Chart.withLineStyle(Width=2.0, Dash=StyleParam.DrawingStyle.Solid)

        Chart.Line(vaccinationPlotData)
        |> Chart.withTraceName(Name="Vaccination")
        |> Chart.withLineStyle(Width=2.0, Dash=StyleParam.DrawingStyle.Solid)
]
|> Chart.combine
|> Chart.withXAxisStyle("Week")
```

Here how it looks once cell is executed.

![](/images/covid_analysis/vaccination_covidcases.png)

As you can see in the graph, vaccination is keeping the covid number as down as much as possible. One can surely conclude that vaccine works and in the case of India, both vaccines are indigenous.

Do check out this wonderful library and if you haven't please take the jab. Happy Coding.
