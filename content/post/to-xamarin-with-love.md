---

title: "To Xamarin with Love"

date: 2014-10-10
categories:
- Technical
tags:
- DotNet
- OSS
- Functional Programming
- Mobile

title: To Xamarin with Love
metadescription: A lame comparison between Xamarin tools and Native Android Tools  
layout: post
category: Technical,DotNet,OSS,Functional Programming, Mobile
published: public
---

[Xamarin Evolve](https://evolve.xamarin.com/) just concluded. And there no best time to write this post. And for the fact I am not writing anything new or even anything related to announcements that happened there. I am writing this because recently I got chance to work with android using Java. And experience was not at all good. And reason is not so surprisingly Java.

 

I am will not explain anything instead I just copy paste three code snippets. All are doing same thing but they are all in different languages. Now, for the people who think that language doesn't make any difference; this post is for them. Here I am not including any frameworks like Reactive UI or Xamarin.Forms. If I include them then this competition will be one sided. (Xamarin Sided)

***Code Snippet in Java***
	
	public class MainActivity extends Activity {
	
		int count = 0;
		@Override
		protected void onCreate(Bundle savedInstanceState) {
			super.onCreate(savedInstanceState);
			setContentView(R.layout.activity_main);
			setEvents();
		}
	
		private void setEvents() {
			final Button mybutton = (Button) this.findViewById(R.id.myButton);
			mybutton.setOnClickListener(new OnClickListener() {
				
				@Override
				public void onClick(View v) {
					// TODO Auto-generated method stub
					mybutton.setText(String.valueOf(count));
				}
			});
			
			final TextView seekbarView = (TextView) this.findViewById(R.id.seekbarTextView);
			SeekBar seekbar = (SeekBar) this.findViewById(R.id.seekBar1);
			seekbar.setOnSeekBarChangeListener(new OnSeekBarChangeListener() {
				int progresssed = 0;
				@Override
				public void onStopTrackingTouch(SeekBar seekBar) {
					// TODO Auto-generated method stub
					seekbarView.setText(String.valueOf(progresssed));
				}
				
				@Override
				public void onStartTrackingTouch(SeekBar seekBar) {
					// TODO Auto-generated method stub
					
				}
				
				@Override
				public void onProgressChanged(SeekBar seekBar, int progress,
						boolean fromUser) {
					// TODO Auto-generated method stub
					progresssed = progress;
				}
			});
			
			CheckBox checkbox = (CheckBox) this.findViewById(R.id.checkBox1);
			checkbox.setOnCheckedChangeListener(new OnCheckedChangeListener() {
				
				@Override
				public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
					// TODO Auto-generated method stub
					Log.i("info","Checkbox is " + String.valueOf(isChecked));
				}
			});
		}
	
		
		
	}

***Code Snippet in C#***

	[Activity (Label = "XamarinBlog", MainLauncher = true, Icon = "@drawable/icon")]
		public class MainActivity : Activity
		{
			int count = 1;
	
			protected override void OnCreate (Bundle bundle)
			{
				base.OnCreate (bundle);
	
				// Set our view from the "main" layout resource
				SetContentView (Resource.Layout.Main);
				var button = this.FindViewById<Button> (Resource.Id.myButton);
				button.Click += (sender, e) => {
					button.Text = String.Format("{0} clicks",count);
					count++;
				};
	
				var seekbarTextView = this.FindViewById<TextView> (Resource.Id.seekbarTextView);
				var seekbar = this.FindViewById<SeekBar> (Resource.Id.seekBar1);
				seekbar.ProgressChanged += (sender, e) => {
					seekbarTextView.Text = String.Format("The value of seekbar is {0}", e.Progress);
				};
	
				var checkbox = this.FindViewById<CheckBox> (Resource.Id.checkBox1);
	
				checkbox.CheckedChange += (sender, e) => {
					Console.WriteLine("Checked changed!");
				};
			}
		}

***Code Snippet in F#***

	[<Activity(Label = "XamarinBlog", MainLauncher = true)>]
	type MainActivity() = 
	    inherit Activity()
	    let mutable count : int = 1
	    override this.OnCreate(bundle) = 
	        base.OnCreate(bundle)
	        // Set our view from the "main" layout resource
	        this.SetContentView(Resource_Layout.Main)
	        // Get our button from the layout resource, and attach an event to it
	        let button = this.FindViewById<Button>(Resource_Id.myButton)
	        button.Click.Add(fun args -> 
	            button.Text <- sprintf "%d clicks!" count
	            count <- count + 1)
	        let seekbarTextView = this.FindViewById<TextView>(Resource_Id.seekbarTextView)
	        let seekbar = this.FindViewById<SeekBar>(Resource_Id.seekBar1)
	        seekbar.ProgressChanged.Add
	            (fun args -> seekbarTextView.Text <- sprintf "The value of seekbar is %A" args.Progress)
	
	        let checkbox = this.FindViewById<CheckBox>(Resource_Id.checkBox1)
	        checkbox.CheckedChange.Add(fun args -> printfn "Check changed")

Hope you can see what I am trying to say here. I can become a good typist by writing code in Java but defiantly not good programmer. I don't know from which planet Java has incorporated it's Object Oriented model. 

Xamarin is solving many problems by supporting C# and F# for android development. 

> <3<3<3 Xamarin

*You can also compare code between C# and F# but don't tell anyone as right now I am bashing Java in this post. :P* 