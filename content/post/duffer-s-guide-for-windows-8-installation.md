---

title: "Duffer's guide for windows 8 installation"
keywords:
- guide
- windows
slug: "duffers-guide-for-windows-installation"
date: 2012-10-29
categories:
- Technical
tags:
- DotNet

---
Oops, I used “Duffer” instead of “Dummy” because I am one of it.

I installed OS nearly 8 times to get what I wanted from Windows 8. I brought new Dell Ultra book and first thing I have done is to install consumer preview, second thing installing VS2012. And I meet my first issue, it is not allowed so I need to use trial version, so another format and new OS in.

Here, I have made another mistake to install it in SSD, I thought I put OS there and all other things in other drive. As, at that point of time I really don’t know why on the earth that 32 GB SSD is there. It is fast but what I do with that. As, it was not showing at the time, when default Windows 7 was there. OK, it goes as per plan and my system things got better and better but my drive got screwed big time. Always I need to watch that is it full or not.

Than I got mail that Pro version is available. Wow, I just loved that news. So, first thing first learn about SSD and I got wonderful [article][1] written by Sean. Ok, now I know that SSD for caching only. Here, issue again that I need to order first as direct download of ISO is not available. Damn is seriously don’t like this.

To, do that I need to reinstall Windows 7 and then I started the process using [upgrade wizard][2] . I ordered my brand new Windows 8 Pro and started downloading. Then there is wizard come that give me option to create a ISO for that. I selected that. And then I have created my boot USB.
 
Ok, things seems good up till now. But when I change my mode to SATA ACHI to RAID, drive is not showing up only. I installed in ACHI and try to change again but giving me error that drive where windows is locked. Just feeling like I am road end. Then I have done some Google, but sadly couldn’t found any perfect solution. That keep me thinking how to give them driver even before installing of windows.

Now, time came where one should trust books and basics instead of Google God. Drivers are sys files which allows you to load hardware, it is not exe, out file its below that which contains definition of the hardware. So, I went to dell site and download drivers. I extracted on my other machine, put it on USB from where I am installing OS. At the time of installation I clicked load drivers, unchecked for singed drivers only check-box and I got the list of drivers available. I selected the RAID one and magic works. Drive list arrives to complete the installation. Later things is kids stuff, next next and Windows 8 up and running. [NOTE: You need key to do the installation. I don’t find trial option in there. ]

Now, time to use SSD, just install all the application from Dell [In case of other vendors use your respective site or Intel site] and you will get Rapid Storage software running, just enable Caching there for your hard disk using SSD. Its done. A cool OS is ready to use.

Download aaps, Visual Studio are running. Its done. Enjoy the change.

 [1]: http://www.overclock.net/t/1227655/how-to-set-up-intel-smart-response-technology-ssd-caching
 [2]: http://windows.microsoft.com/en-IN/windows/upgrade-offer