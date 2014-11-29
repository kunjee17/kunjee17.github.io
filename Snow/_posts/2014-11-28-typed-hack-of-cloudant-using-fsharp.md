---
title: Typed Hack of Cloudant using F#
metadescription: Write a small wrapper which convert untyped Cloudant data to typed F# data 
category: Technical,OSS,Web,Functional, Functional Web 
published: public
---

Sometimes things are not in your control. They just happens. Just like that. But all other times things are in your control only. And specifically when one wanted to do something mad. Recently I was helping my [MAD friends](http://4-to-6.com/#team) to create a mad newsletter site. (I am also part of it at least for now o_O ). Don't ask me why we are doing this?!? Everything is explain at the page of [subscription](https://tinyletter.com/beemad) and also on [beemad site](http://4-to-6.com/).

<!--excerpt-->

On a first thought this task can be done by any [CMS](http://en.wikipedia.org/wiki/Content_management_system) and there is no need for anything else. But how can I explain my heart which can't tolerate PHP around it.

![](/images/nonotthisagain.jpg)

And frankly speaking there is no requirement of complete, heavy, slow, sluggish CMS. And if we were having that; we may be not doing any madness but still finding plug-ins on web. I personally like the freedom of simple HTML page. You can unleash the imagination on that but not on CMS. 

So, I thought why not [F#](http://fsharp.org)? and I also know [NancyFX](http://nancyfx.org/) so that will be easy and fast. And really it was. And hosting on [Azure](http://azure.microsoft.com/en-us/) is even more fun. There were some pain points but it was all OK at the end. 

But now it times to save the data. Azure do offer quite few options for that; but again this heart never listen to me. I choose NOSQL. 

Here comes the dinosaur, manage your own VM. And I was like [nooooooooooooooooooooo](http://www.nooooooooooooooo.com/). I was knowing about [Cloudant](http://cloudant.com) from long back. Even before IBM bought it. It is indeed a wonderful service and also kinda free for small stuff. I thought this will be best fit for now. As we are just starting, taking our first baby steps in the world of web. We are MAD but still we are kids. 
![](/images/Babies.jpg)

And there is no need of scary relations ships with database. So, I decided to use this one. 

Now as one problem is solved other started. It is saving data that is in JSON format. That is untyped and F# is statically typed. I have tried few libraries developed in C# but was not happy. So, I thought it is just a HTTP request, why shouldn't I give it as shot to make one of my own helper module? It is may be some what dirty attempt but I got it working what I needed with less than 100 lines. Here is code snippets.


	#r "../packages/Http.fs.1.4.0/lib/net40/HttpClient.dll"
	#r "../packages/Newtonsoft.Json.6.0.6/lib/net45/Newtonsoft.Json.dll"
	
	open HttpClient
	open Newtonsoft.Json
	open Newtonsoft.Json.Linq
	
	[<CLIMutableAttribute>]
	type Row<'a> = 
	    { id : string
	      key : string
	      value : 'a }
	
	[<CLIMutableAttribute>]
	type ResultSet<'a> = 
	    { total_rows : int
	      offset : int
	      rows : Row<'a> [] }
	
	[<CLIMutableAttribute>]
	type PostResult = 
	    { ok : string
	      id : string
	      rev : string }
	
	[<CLIMutableAttribute>]
	type PostError = 
	    { error : string
	      reason : string }
	
	let cloudantUrl = @"<cloudanturl/databasename/>"
	let username = @"<username>"
	let password = @"<password>"
	
	let private cloudantGet url = 
	    let request = 
	        createRequest Get url
	        |> withBasicAuthentication username password
	        |> withHeader (ContentType "application/json")
	    request |> getResponseBody
	
	let private cloudantPost url data = 
	    let request = 
	        createRequest Post url
	        |> withBasicAuthentication username password
	        |> withBody data
	        |> withHeader (ContentType "application/json")
	    request |> getResponseBody
	
	let private checkDataForNewId (data : JObject) = 
	    let removeIdrev (data : JObject) = 
	        data.Remove("_id") |> ignore
	        data.Remove("_rev") |> ignore
	    if System.String.IsNullOrEmpty(data.["_id"].ToString()) || System.String.IsNullOrEmpty(data.["_rev"].ToString()) then 
	        removeIdrev data
	    data
	
	let PostJson<'a> data = 
	    let serializedObject = JObject.FromObject(data) |> checkDataForNewId
	    serializedObject.Add("$doctype", JToken.Parse("'" + data.GetType().Name + "'"))
	    cloudantPost cloudantUrl <| serializedObject.ToString()
	
	let GetJsonByType<'a> = 
	    let resultset = 
	        JsonConvert.DeserializeObject<ResultSet<'a>>
	            (cloudantGet (cloudantUrl + "/_design/Type/_view/" + typeof<'a>.Name))
	    query { 
	        for row in resultset.rows do
	            select row.value
	    }
	
	let GetJsonById<'a> Id = JsonConvert.DeserializeObject<'a>(cloudantGet (cloudantUrl + Id))
	
	[<CLIMutableAttribute>]
	type Person = 
	    { _id : string
	      _rev : string
	      FirstName : string
	      LastName : string }
	
	let newPerson = 
	    { _id = ""
	      _rev = ""
	      FirstName = "Boom"
	      LastName = "Baam" }
	
	let inline isNull (x:^a when ^a : not struct) =
	    obj.ReferenceEquals (x, Unchecked.defaultof<_>)
	
	let findPerson = 
	    query { 
	        for p in GetJsonByType<Person> do
	            where (p.FirstName = "Boom")
	            select p
	            headOrDefault
	            }
	isNull findPerson    
	GetJsonById<Person> ("3b389dc6b8ee0dcbf7f366faaa59cf42")

In above code below part is just for testing. And even with that code snippet is 98 lines. So, with blank line removed it is even short. 

Now, in cloudant I need to create views so its code is like 

	function(doc) {
	    if (doc.$doctype !== "Person") return;
	    var copydoc = JSON.parse(JSON.stringify(doc));
	    delete copydoc["$doctype"];
	    emit(doc._id,copydoc);
	}

I need `$doctype` while I am inserting or updating data only, not while reading. So, I am removing it. As I am already filtering based on type.

In above code two libraries are getting used one is [Http.fs](https://github.com/relentless/Http.fs) and the other is [JSON.net](http://james.newtonking.com/json) libraries. 

In library as you can see I am not doing anything special. I am inserting data with type information. If new data is there I am removing `_id` and `_rev` and for simplicity sake I had put `_id` and `_rev` in all the types I am using to interacting with Cloudant data store. 

So, now whenever I am reading I just need to give type and that will be fetched as collection of that typed records. And once collection came to memory now I have powerful F# to process data. In above code I am using `query` expression to do so. It becomes very easy and fun to use. And it is damn fast. At least for now.

Now, I don't know it if perfect or not. It kinda part functional and part Object Oriented as far as I know. Should I convert this to Type Provider or is it possible or not? I don't know. But one thing is sure I am achieving what I wanted with simplest possible code. 

**Dear F# community members** do provide your views on this. And also let me know if it will be use full to make it more mature and push it as nuget package. Or may be a type provider for Cloudant? 

> Highly inspired by [Daniel Mohl's](https://twitter.com/dmohl) old library [FSharpCouch](https://github.com/dmohl/FSharpCouch). Thank you... :)