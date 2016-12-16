---

title: "Epic Adventure using F#"
keywords:
-
slug: "epic-adventure-using-fsharp"
date: 2016-12-17
categories:
- Technical
tags:
- Functional Programming
- Natural Language Processing
- Data Science
draft : true
---

This article is part of FSAdvent 2016 calendar.

This my second post of 2016. Yup not much of writing this year.
Sorry for that. It would be little longish post. So, grab your favorite coffee / tea.

One coincidencess here that both post will have base of Epic Mahabharata.
If anyone interested in poem do check out my another post.


## Epic Mahabharata ##
Everyone heard of it but normally people never got chance to read it. Or know more about it.
It is "longest *poem* ever written" in human history. It has around 1.8 million words in total. It is roughly 10 times
the length of Lliad and Odyseey combined.

So, what is there in it? We can say everything. Love stories to stories about war. Philosophy to miletary knowledge.
Taxisum, Low, rule of land to details about astrology. Theory karma which was part of Gita is part of Mahabharata.
Yog (Yoga) explained in Mahabharata. A tale where God not solve problems for you but guide you to solve your own problems.
A story where even God accept curse with due respect given by a mother. A story where story teller him self not
only narrate the story but also integral part of it. A tale stays same but means different to every reader. A story
spiral of different small stories consisting further different stories.

I can go on and on but let's come to F#.

## Natural Language Processing ##

Understanding the language, words and sentiments always fun. It not only
tells about history but also reflect culture. So, I took this as part of
Mentorship program (more details at the end). And this article born from
fun homework I got it recently.

I don't know the complexity level of it. It totally depends on reader. But
it indeed too much fun.

## Let the fun Began ##

First thing to find out source in English. To make is more machine friendly.

[Project Gutenberg](https://www.gutenberg.org) is good place to find some license free text.

Download the text file.
Read it using File IO and let's how many terms hey have?
```
code
```

That's quite a lot terms for small piece of code. Now, we are one step behind to become data scientist.

Let's find the unique terms and frequency of it.
```
code
```
see another few lines and we are done.

We know how much all this book is having...

So, we will be doing sentiment analysis of this books and put it them against each other.

## sentiment analysis ##

### What is this? ###
It is to understand where book is tilted sentiment wise. <furter details>

### Coding bits ###
Before we do this. I did some manual work to divide text files into books. Just little copy paste and I also removed extra text.

So, it will make more sense while comparing.

As everything else in F# here we also start with type and start putting things in it. Let's call it Book type. Because why not.
```
type Book {

}
```

Now, for a second keep it aside. We need more details or here data to find out sentiments. So, we will be using two
data sets.

Data set details.

Traditional way to pull data out of CSV file is `for -> for -> for` loops. But we are in F# so we will be using
Type Provider.

Let's pull data out of CSV and keep it in types.

```
code
```

Here is the thing about this data. Emotion column is also specifying the emotion, not always but they are there.
So, we need them too.

So, let's filter it out and pull them out too.


Here comes another case of `anticipation`. In emotion it is used as `anticip`, if we add another database it can be `anticipation`.
Instead of adding more cases to match for same result. It is time to encapsulate them using Active Patterns.

As we are having more cases, we gonna use partial Active Patterns and join them in match.

```
complete code
```

Great. Now stage is set to convert books made of terms to books made of numbers

```
code
```

Same can be done for postiive & negative sample.

```
```

So, we are having all the data in memory. In our case in FSI / REPL

Time to write JSON code.

We will be using FShaplu.json here. You can here about parent project here.

Now, once JSON is ready we can easily use to show in graph.

> Here I did cheating and wrote some dirty JavaScript. A good practise would be to write code in Fable.

You can find all graphs here. ->


## Reading the Graphs ##

First thing first. Code is written by human and executed by dumb machines. So, there would be little manual tasks.
I did read / watch different versions of mahabharata. So, I do make some calculated guess to check data coming out. My brother
is even more into mythology and history so he is always there to correct my numbers. But who never heard about book
can check wiki pedia for details.

For few we will do it togather here.

(analysis of selected books)
(what is wrong with graph (great and fire example))

## What's Next ##
Will see if more I can understand epic and quantify it in numbers. And also will surely try to extract library to do analysis.

## Thanks ##
Rachel - For doing current Mentorship project.
> Mentorship program - Nothing can create magic what blood and flesh can create.
Andrea - For last time. (Got chance to rolled in for this time only but still)
Mana - Not only allowing me but encouraging me to take part in this.
Tirth - My phone a friend for any Machine Learning related queries
Devdutt - My current favorite mythologist. Jaya book, My Gita

## Note to my Mentor ##

I am lucky to have Evelina as my mentor - guru. I am one hell of kid when it comes to learning and asking questions. I ask
anything and everything. And she always reply with don't worry it's simple and then explain complicated numbers. After a school
time (it's serious long time) I am enjoying weekly lessons and homework.

## References ##


Understanding language. -> e sabjo ni su visat je hraday ni aar par na jai sake.
Data Science
Cultural history
Longest book of mankind -> Including everything
Explanations with terms and uniqueterms ->
sentiment analysis
as word and as per book
Word graph. - what is wrong with graph (great and fire example)
Future road map -

Thanks note - Rach, Andrea, Mana, Tirth, Devdutt

Note to Evelina -

References - books about mahabharata, tv series
