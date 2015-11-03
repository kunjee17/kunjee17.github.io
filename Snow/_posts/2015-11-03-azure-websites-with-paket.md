---
title: Azure web sites with Paket
metadescription: Minimum requirement to run paket on Azure websites.
category: Technical,OSS,Functional,Functional Programming
published: public
---

Whoever worked with Microsoft Shop knows about [nuget](https://www.nuget.org/). It is package manager for anything and everything related to .Net. And it is getting better and better with versions coming in. But again it is nowhere near maturity needed to work with projects having many small projects. Things get cranky soon. 

<!--excerpt-->



Now, there is better option as per my opinion called [Paket](https://fsprojects.github.io/Paket/). Very easy to get started. And so damn reliable. Couple of more command to learn but I guess it is ok. It most of the mess of nuget. And best thing no XML. 

Now, I normally throw anything and everything to Azure websites. Just do experiments and its free. Mostly I put project in [Github](https://github.com/) and pull in Azure. Easiest way to test something or anything which need network. 

Now, you can have Paket also instead of nuget with minimum changes. There are detailed [article](http://www.hanselman.com/blog/RunningSuaveioAndFWithFAKEInAzureWebAppsWithGitAndTheDeployButton.aspx) you can found written by [Scott Hanselman](http://www.hanselman.com). 

But for you existing or new web project what can be minimum requirement. 

You need to create `.deployment` in root of your project. It will tell Azure build system to not to go with defaults. (I guess build system is called Kudu.)

In that file copy paste below code


    [config]
    command = build.cmd


Two lines to tell use `build.cmd` to build project. 

Now, we obviously need `build.cmd` file in root. 

And here is code


    @ECHO OFF
    setlocal

    echo ====== Restoring packages... ======

    if not exist .paket\paket.exe (
      .paket\paket.bootstrapper.exe
    )

    .paket\paket.exe restore

    if not %ERRORLEVEL% == 0 (
      echo ====== Failed to restore packages. ======
      exit 1
    )

    echo ====== Building... ======

    msbuild /p:Configuration=Release

    if not %ERRORLEVEL% == 0 (
    echo ====== Build failed. ======
      exit 1
    )

    if not "%DEPLOYMENT_TARGET%" == "" (
      echo ====== Deploying... ======
      xcopy /y /e <project name> "%DEPLOYMENT_TARGET%"
    )

Code is very much self explanatory. 

First pull latest paket.exe, then restore package. msbuild is there only so use it. And age-old xcopy to copy built files to deployment target. 

> Bang! Its done. You can check things out in with log tail or console on azure portal.

If you want to go little bit advanced and want kinda build system then you can always try for [FAKE](http://fsharp.github.io/FAKE/). But if you are in great hurry and don't want waste time with nuget issues go for Paket. 

**Happy Packaging!!!**
