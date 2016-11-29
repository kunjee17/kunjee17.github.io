---
title: "Pointers what is your address dude"
keywords:
- Pointers
- C++
- CPP 

date: 2011-10-10
categories:
- Technical
tags:
- C
- CPP
- Programming
---
Pointers, heart of C, C++. If you belongs to engineering branch and learned C as subject, then this may be the last chapter of you curriculum. This is the stepping stone of programming career. This is the chapter or I can say love for the pointer will differentiate a passionate coder from normal coder.

Even if you work, higher level languages or going for web, you can’t deny existence of pointer in your life. It’s just you are not touching directly to them, but they are there every time. Now, I directly jump to basic understanding of topic.

If I give a definition than pointer is variable which saves address of another variable. It is useful when you want to share data. Pointer is like light weight variable which saves memory and do normal task for us like anything.

Pointer consumes two bytes of memory to save address. It doesn’t matter which type of pointer you are using. Here we directly jump to the example

    int value = 10; // declaring and assigning simple integer variable.
    
    int *prt = &value; // declaring and assigning simple pointer variable
    
    print value; //printing value
    
    print *ptr; // printing pointer value
    
    print prt; // printing pointer
    
Result of this comes somewhat like 10, 10, 8000. Here you can easily understand first and second value gives the value of integer, while last is something else. It is address of the integer, place of memory where pointer stored. Here value is called pointee, a variable pointed by pointer.

Here few things you have to care, you can’t assign value directly to the pointer, like *ptr = 10, if value is not assigned, don’t try to fetch value of that pointer, means *ptr is not assigned then it will give exception. Defining pointer and defining pointee is complete different operation and both are necessary.

This is very basic understanding of Pointers. I will try to go somewhat deeper with this in upcoming write-ups. If you want to know something more about pointers, you can always [click here][1] .

 [1]: http://tinyurl.com/3l3xhfs