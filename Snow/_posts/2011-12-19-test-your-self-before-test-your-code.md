---
title: Test your self before test your code
metadescription: All about Test Driven Development 
category: Technical,DotNet
layout: post
---
Few days back I had written a [post][1] , on [Test Driven Development][2] . And many of my friends raise question, why should I test and is there anything there in built in Visual Studio. And also more explanation on Test Driven Design. So, Here again I will some what more deeper in testing. Ok, its just a little bit deeper.

First thing, as per title, you should test your self before test your code. It is not philosophical but it is pure technical. If I am writing test for my code, I should know why I am writing? How I am going to write? These few question must be answered before writing test. Now, we are normal kind of coders. I can’t say that whatever code I am writing is going to execute perfectly. In a contrary in most of the cases reverse is true. Every damn time I forgot something to consider and that crash my code. If you are like my friend [Aalap][3] then you can go on and on, without writing test. He is damn good with windows technology and write code like anything. And a bit lucky because whenever he writes code, and that piece of shit executes perfectly. But I am not genius like him, so I need to test it.

Again we go with my [mathematical functions][4] . Because I just loved [mathematics][5] . And this time we are using [Visual Studio][6] Testing facility. You can go with [NUnit][7] , it almost same, just few syntax changed here and there. But it is not a big deal. Start with new console application. Add new class MathUtil to it. And make is [static class][8] for the simplicity. Now, I am not putting screen shot for “how to use visual studio???”, if you don’t know, this article is not for you better you go and study some basics before jump to this. Sorry…

Again we have static function to add something. Let’s start with [integer][9] . So, here is a add method for adding integer.
    
    public static class MathUtil { 
    public static dynamic AddData( int a, int b) { 
      return a + b; 
    } 
  } 

damn sweet. A simple method to add two integer. Now, time for testing. Add another project to solution, that project will be test project. You will find test project if you are running visual studio pro or greater. After adding project, we just have to remember [Paul Allen][10] and click right mouse button in Add data method. Then just click create unit test and mighty visual studio create test for us. Here, we get code like this

      ///A test for AddData /// 
  [TestMethod()] 
  public void AddDataTest() { 
    int a = 0; // TODO: Initialize to an appropriate value 
    int b = 0; // TODO: Initialize to an appropriate value 
    object expected = null ; // TODO: Initialize to an appropriate value 
    object actual; 
    actual = MathUtil.AddData(a, b); 
    Assert.AreEqual(expected, actual); 
    Assert.Inconclusive( "Verify the correctness of this test method." ); 
  } 
Now, we need modify to run the test. And code will look something like this
  [TestMethod()] 
  public void AddDataTest() { 
    int a = 10; // TODO: Initialize to an appropriate value 
    int b = 10; // TODO: Initialize to an appropriate value 
    object expected = 20; // TODO: Initialize to an appropriate value 
    object actual; 
    actual = MathUtil.AddData(a, b); 
    Assert.AreEqual(expected, actual); 
  } 

This test works perfectly. Ya, we do have written a correct function. Now, client come and tell that he need the same for float. Why not??? We have [overriding][11] thing in software Engineering.We will use it. And Ta da… We have another function like this 

    public static dynamic AddData( float a, float b) { 
      return a + b; 
  } 
    
This will work for float. Same thing we will do for testing now. Right click and create unit test. We have our method here like this. 

    [TestMethod()] 
    public void AddDataTest1() { 
    float a = 0F; // TODO: Initialize to an appropriate value 
    float b = 0F; // TODO: Initialize to an appropriate value 
    object expected = null ; // TODO: Initialize to an appropriate value object actual; 
    actual = MathUtil.AddData(a, b); 
    Assert.AreEqual(expected, actual); 
    Assert.Inconclusive( "Verify the correctness of this test method." ); } 
    
If you have noticed, this is not overriding in test. It just add “1” after test name. Who cares, test project is not going to client side. Ya, true. But I may not be the only one who is working on the project. There are many who are working and using my methods, testing them. This name will confuse them. So what I should do, Add definition to name it self. Then method looks like 

    [TestMethod()] 
    public void AddDataTest_Float() { 
    float a = 10F; // TODO: Initialize to an appropriate value 
    float b = 10F; // TODO: Initialize to an appropriate value 
    object expected = 20; // TODO: Initialize to an appropriate value 
    object actual; 
    actual = MathUtil.AddData(a, b); 
    Assert.AreEqual(expected, actual); 
  } 
    
Ok, this test is for float data. We will change previous method integer data. And once again client comes for double. How can I say no??? He is my client. No, problem sir we go for double too. Here is the method I write, I made some what generic method so I don’t have write again and again.

    public static dynamic AddData( object [] data) { 
    dynamic result = data[0]; for ( int i = 1; i return result; 
  } 
    
now this will add almost anything. And also any amount of data . Now, create test for it. Test method some what looks like this. 

    [TestMethod()] 
    public void AddDataTest_ObjectArray() { object [] data = new object [] { 10, 10, 10 }; // TODO: Initialize to an appropriate value 
    object expected = 30; // TODO: Initialize to an appropriate value 
    object actual; 
    actual = MathUtil.AddData(data); 
    Assert.AreEqual(expected, actual); 
  } 
    
Here, I just like to say that, you just don’t start testing because someone says so. Or just you love me so much that can’t ignore my request to make application in way it should be made. Just know where you need testing, and also for testing you should know what you want to test. There are may methods available to check null, inequality, exception. Use appropriate method for that. There are many books available just to explain how to test.

Book I recently come across [The Art of Unit Testing][12] . It’s a wonderful book explaining every minor details for testing. Just don’t waste your time and energy on clicking buttons in your own application. It is a work of testing department. But unit testing comes in our part, it is a job of coder to test his functionality before adding to system. Do the unit test and become confident about your work. There is no need to add unnecessary bugs in bug tracker.

Please let me know if any further explanation is needed.

 [1]: http://kunjan.in/index.php/technical/14-net--c-c-sharp/12-ddt-oops-tdd-its-test-driven-development
 [2]: http://en.wikipedia.org/wiki/Test_Driven_Development
 [3]: https://twitter.com/#%21/shahaalap
 [4]: http://en.wikipedia.org/wiki/Mathematics_Functions
 [5]: http://en.wikipedia.org/wiki/Mathematics
 [6]: http://en.wikipedia.org/wiki/Visual_Studio_
 [7]: http://en.wikipedia.org/wiki/Nunit
 [8]: http://en.wikipedia.org/wiki/Static_Class
 [9]: http://en.wikipedia.org/wiki/Integer
 [10]: http://en.wikipedia.org/wiki/Paul_Allen
 [11]: http://en.wikipedia.org/wiki/Overriding
 [12]: http://artofunittesting.com/