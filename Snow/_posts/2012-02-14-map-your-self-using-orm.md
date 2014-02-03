---
title: Map your self using ORM
metadescription: A quick introduction of wonderful ORM provided by Microsoft named Entity Framework. 
category: Technical,DotNet
layout: post
---
Many of you must know this word, “ORM”. Then why this post. But trust, even after we have a lots and lots of ORMs in market and some company still using age old technology. Just few days back in one company again I had to face same old question about connection class and command class. Why?????????? It is so true that one must know that things, but this question is always be a nightmare to me.

When I have a java advanced as a subject, I use to do all things other than JDBC connection. I had never completed a single database connection using JDBC. And may be that is the reason why I haven’t choose career with Java. I am not Ninja anymore. It is my unfulfilled dream!!!

Let’s come back to .net. We used to have connection and command class rule the arena in .net. Every interview starts with that and blast because of that. Question starts with
 
> What is connection class? And what are the uses of it?
>  
> What is command class?
>  
> Difference between data set and data reader?

Some, time I do wonder I was going to be selected for making application or “**connection to**” database class. And then we had few more option to connect to database. Few other question which are still unanswered, like

> Where I should put connection string? In web config or in single class?
>  
> How much time I should allow to connection be open?
>  
> How can I use connection pulling?

I still don’t know answer of last question. And problem not ends there. We need to implement [design pattern][1] , had to implement interface to follow [DRY][2] . And what actually happened that we became DRY to do all this stuff. At least I do become DRY, pushing my self more for technical stuff rather then concentrating on giving output. Microsoft try to help us by pushing library like [DAAB][3] . But still open source community is far ahead of this. Java had [Hibernate][4] And also then comes hibernate port of .net [nHibernate][5] . And then Microsoft comes with [Linq to SQL][6] .

All these are [ORM][7] s. Full form of ORM is object relational mapping. What it does that it mapped the database table with equivalent object. This make CRUD operation easy like anything. And internally it takes care of every thing starting from connection life cycle to generating equivalent query for that.

So, now I don’t worry about connection and commands but work more on business logic. Yes, of course I am saving name [Entity Framework][8] for my example of ORM. It is final blow from Microsoft. And to do [RAD][9] type development it is best product till now from Microsoft, even better than [web forms][10] .

Now, the example. I am using age old North-wind database. Also using [SQL CE][11] . Now, what you need to do is add new file and chose data option, find Entity file and add it. Choose northwind file and “next next next”. Just don’t forget to choose all database. That’s it its done.

I am so lazy person by default. So, I am using [MVCScaffolding][12] to generate classes. You can do as your wish.

So, what I have done here is add Entity Framework file (dbml) file. Which is xml file which shows mapping between database and object. Than fired a scaffold command. That it. After this I got the error.

Basically Scaffold command is designed for EF Code First by default and I haven’t customized for simple Entity Framework. So, I do have to modified some of the code and that is it. It is done and working perfectly. Here is the code snippet with details.

I have taken customer table for example.

Created [interface][13] for basic [CRUD][14] operations.

    public interface ICustomerRepository { 
    IQueryableCustomer All { get ; } 
    IQueryableCustomer AllIncluding( params ExpressionFuncCustomer , object[] includeProperties); 
    Customer Find( string id); 
    void InsertOrUpdate( Customer customer); 
    void Delete( string id); 
    void Save(); 
  } 

and then create the repository class to do the task.
    
    public class CustomerRepository : ICustomerRepository { 
    NorthwindEntities context = new NorthwindEntities (); 
    public IQueryableCustomer All { get { return context.Customers; } } 
    public IQueryableCustomer AllIncluding( params ExpressionFuncCustomer , object [] includeProperties) 
      { 
        IQueryableCustomer query = context.Customers; 
        foreach ( var includeProperty in includeProperties) 
          { query = query.Include(includeProperty); } 
        return query; 
      } 
    public Customer Find( string id) { 
      return context.Customers.Where(c => c.Customer_ID == id).FirstOrDefault(); 
    } 
    public void InsertOrUpdate( Customer customer) { 
      var _customer = Find(customer.Customer_ID); 
      if (_customer != null ) { 
        _customer.Address = customer.Address; 
        _customer.City = customer.City;   
        _customer.Company_Name = customer.Company_Name; 
        _customer.Contact_Name = customer.Contact_Name; 
        _customer.Contact_Title = customer.Contact_Title; 
        _customer.Country = customer.Contact_Title; 
        _customer.Fax = customer.Fax; 
        _customer.Phone = customer.Phone; 
        _customer.Postal_Code = customer.Postal_Code; 
        _customer.Region = customer.Region; 
        // Haven't taken orders in update just for demo purpose only 
      } else { 
        context.Customers.AddObject(customer); 
      } 
    } 
    public void Delete( string id) { 
      var customer = Find(id); 
      context.Customers.DeleteObject(customer); 
    } 
    public void Save() { 
      context.SaveChanges(); 
    } 
  } 
we add one line to application start to solve dependency. kernel.Bind
    
    ICustomerRepository().ToCustomerRepository(); 


Now, we have basic methods in our customer’s controller to do all the basic operations.


    public class CustomersController : Controller { 
    private readonly ICustomerRepository customerRepository; 
    public CustomersController( ICustomerRepository customerRepository) { 
      this .customerRepository = customerRepository; 
    } 

    // GET: Customers 
    public ViewResult Index() { 
      return View(customerRepository.AllIncluding(customer.Orders)); 
    } 
    
    // GET: /Customers/Details/5 
    public ViewResult Details( string id) { 
      return View(customerRepository.Find(id)); } 
    
    // GET: /Customers/Create 
    public ActionResult Create() { 
      return View(); 
    } 
    
    // POST: /Customers/Create 
    [ HttpPost ] 
    public ActionResult Create( Customer customer) { 
      if (ModelState.IsValid) { 
        customerRepository.InsertOrUpdate(customer); customerRepository.Save(); 
        return RedirectToAction( "Index" ); 
        } else { 
          return View(); 
        } 
      } 

      // GET: /Customers/Edit/5 
    public ActionResult Edit( string id) { 
      return View(customerRepository.Find(id)); 
    } 
  
    // POST: /Customers/Edit/5 
    [ HttpPost ] 
    public ActionResult Edit( Customer customer) { 
      if (ModelState.IsValid) { 
        customerRepository.InsertOrUpdate(customer); customerRepository.Save(); 
        return RedirectToAction( "Index" ); 
      } else { 
        return View(); 
      } 
    } 

    // GET: /Customers/Delete/5 
    public ActionResult Delete( string id) { 
      return View(customerRepository.Find(id)); } 
  
    // POST: /Customers/Delete/5  
    [HttpPost ActionName ( "Delete" )] 
    public ActionResult DeleteConfirmed( string id){ 
      customerRepository.Delete(id); 
      customerRepository.Save(); 
      return RedirectToAction( "Index" ); 
    } 
  } 

now, just you need views according to Action Results.

I have shared project on [Github][15] at [my repository][16] . So, do check out for any missing code. You can check out for Demo Application there.

See, no connection, no command just a clean beautiful code and work is done. Entity Framework will take care about every thing else.

We can use any other [ORM][7] s too. One of my favorite [Orchard][17] is using [NHibernate][18] . It is far mature than any other ORM in .Net. And lots and lots of features to work on. I will work on it in my next articles.

One more thing to add. It takes more time to copy paste the code than creating it. So, you can imagine how fast it is!!!

 [1]: http://en.wikipedia.org/wiki/Software_design_pattern
 [2]: http://en.wikipedia.org/wiki/Don%27t_repeat_yourself
 [3]: http://msdn.microsoft.com/en-us/library/ff649538.aspx
 [4]: http://en.wikipedia.org/wiki/Hibernate_%28Java%29
 [5]: http://en.wikipedia.org/wiki/NHibernate
 [6]: http://en.wikipedia.org/wiki/LINQ_to_SQL#LINQ_to_SQL_.28formerly_called_DLINQ.29
 [7]: http://en.wikipedia.org/wiki/Object-Relational_Mapping
 [8]: http://en.wikipedia.org/wiki/Entity_Framework
 [9]: http://en.wikipedia.org/wiki/Rapid_application_development
 [10]: http://www.asp.net/web-forms
 [11]: http://en.wikipedia.org/wiki/SQL_CE
 [12]: http://nuget.org/packages/MvcScaffolding
 [13]: http://en.wikipedia.org/wiki/Interface
 [14]: http://en.wikipedia.org/wiki/Create,_read,_update_and_delete
 [15]: https://github.com/
 [16]: https://github.com/kunjee17/kunjan-web-space
 [17]: http://orchardproject.net/
 [18]: http://nhforge.org/Default.aspx