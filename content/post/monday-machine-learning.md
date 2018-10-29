---

title: "Monday Machine Learning"
slug : "monday-machine-learning"

date: 2018-10-29
categories:
- Technical
- Machine Learning
tags:
- OSS
- FSharp
- Functional
- Dotnetcore
- ML.Net
---

Few days back I did a poll that which new shiny library I should be trying. Here is result of that <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I am thinking of trying one of the <a href="https://twitter.com/hashtag/MachineLearning?src=hash&amp;ref_src=twsrc%5Etfw">#MachineLearning</a> - <a href="https://twitter.com/hashtag/DeepLearning?src=hash&amp;ref_src=twsrc%5Etfw">#DeepLearning</a> library. Which one I should be trying? It should be fun and if possible can be used with <a href="https://twitter.com/hashtag/fsharp?src=hash&amp;ref_src=twsrc%5Etfw">#fsharp</a> and / or <a href="https://twitter.com/hashtag/dotnet?src=hash&amp;ref_src=twsrc%5Etfw">#dotnet</a> core. <br>I ll share my experience in blog / video. <br>Please RT.</p>&mdash; Kunjan Dalal (@kunjee) <a href="https://twitter.com/kunjee/status/1052825074531618816?ref_src=twsrc%5Etfw">October 18, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

As per popular demand I should be trying [ML.Net](https://www.microsoft.com/net/apps/machinelearning-ai/ml-dotnet). It is recently open sourced library from Microsoft for Machine Learning. It was started with all the C# examples. But lately there have been many F# samples.

So, obviously my first choice is to do with F#.

First few good things about ML.Net

- Still in 0.6 version so a lot can improve (I like to try bleeding edge stuff)
- Quite a good things coming in, including [Infer.net](https://dotnet.github.io/infer/)
- Here are the lines from ML.Net blog `Over time, ML.NET will enable other ML scenarios like recommendation systems, anomaly detection, and other approaches, like deep learning, by leveraging popular deep learning libraries like TensorFlow, Caffe2, and CNTK, and general machine learning libraries like Accord.NET.`

I will be looking deep into the library as well. But for now there are too many questions then answers

- I couldn't find how internals of it works?
- How all the calculations part being done?
- Is there any options for GPU processing or it will leverage power of dependent library like TensorFlow or CNTK ?
- How it compares to Keras? As that is also doing similar things.

For now I have given a [PR](https://github.com/dotnet/machinelearning-samples/pull/79) to make F# things more F# like. Nothing major but little bit clean up to make code more functional. Hope that gets approved. And I will be digging more into library.

Will try to have new article on F# in Machine Learning or Machine Learning in general every Monday. So, till next Monday stay tuned.
