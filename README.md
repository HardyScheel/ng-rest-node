Building a REST-Backend for Angular with Node.js & Express
==========================================================
Set up a Node.js server-application and create a very basic REST-API using the express framework.

We build an example frontend and backend and implement a RESTful API to exchange data between them. On the software side we will use:
- Angular 10
- Node.js 14.8.0 LTS
- Express Framework 6.14.7
- BodyParser 6.14.6
- CORS 2.8.5

The data we use are hardcoded in the Express server backend because we do not have a database in this tutorial yet.

The source code contains the the building process. The app is inspired by an tutorial at:
[https://malcoded.com/posts/angular-backend-express/](https://malcoded.com/posts/angular-backend-express/)

### What is REST or Restful API?

REST is a standardized way of building http-endpoints. It uses standard HTTP-verbs like get, post, put & delete to express read, create update & delete (CRUD) operations. All these methods (verbs) are applied to one endpoint, which represents the object to be modified. 

Setting up the Express Project
--------------------------------
Create a file like server.js.

### Setting up the node.js Environment

Initialize a new npm-project:
```shell
npm init
```

### Creating the Node.js Server-Application

server.js
```javascript
const express = require('express')
```

### Installing External Dependencies
```shell
npm install express --save
```

### Initializing the Express Framework
server.js
```javascript
const app = express()
```

### Starting the Server

server.js
```javascript
app.listen(8000, () => {
  console.log('Server started!')
})
```

### Running the Server with Node.js
There are two possibilities:
```shell
node server.js
```
or
```shell
npm start
```
If you are using Visual Studio Code, you can also start your server by hitting `F5`. This also automatically attaches the debugger to the process, which is quite useful.

Build the REST API
------------------

### Modelling the CRUD operations

Create: To create a new object under an endpoint, a post-request is sent to the REST-Endpoint containing the new object to create in the post-body.

Read: To read all objects from an endpoint, e.g if you want to know about all cats, a get-request is sent to the "cats" endpoint. If you are interested in one specific cat, you append the id/name of the cat to the route "cats/cat1".

Update: To update an object, a put request is sent to the endpoint. The identifier is added to the route e.g. "cat/cat1". The information of the object is added to the put-body.

Delete: To delete an object, a delete request is sent to the endpoint with the identifier of the wanted object added to the route.

These CRUD operations can be directly mapped to the database, for example MongoDB or MySQL, if you are using the MEAN-stack.

### Getting all Objects from an Endpoint

We get a list of all objects of an endpoint, by sending a get request to that endpoint directly.

Now, we have to tell our server, what to do, if it receives a request at that endpoint.

To do so, we are defining a so-called route, which is the "path" to the endpoint. In this example, the base path to our REST-API will be "api". This enables us to serve other things next to the REST-API. For example, we could serve our angular application under the "app" route.

To define a route, we call the route-method on our express object. Next, we wall the get-method on that route, to tell express that we want to register a callback for the HTTP-get request at that specific route.

server.js
```javascript
app.route('/api/cats').get((req, res) => {})
```

Inside of this callback method, we can decide, what should happen, when a user requests that route. For that, we get two objects. The request-object and the response-object.

The request-object does contain details about the request of the user. With this object, we get access to all the data of the request, for example, the headers or the body.

The response-object on the other hand helps us to send a response back. It does not only contain all the information of the response but also convenient methods, we can use to shape our response.

In our example, we are going to use the send-method, to send back any JavaScript object as JSON in the response body.

server.js
```javascript
app.route('/api/cats').get((req, res) => {
  res.send({
    cats: [{ name: 'lilly' }, { name: 'lucy' }],
  })
})
```

### Getting one specific Object from an Endpoint

The second method of a REST-endpoint, is getting one specific element from the API. By convention, the identifier of that object is appended to the route.

For example, if we want to get everything about the cat called "lucy", we would call the following route:
```
api/cats/lucy
```

But now we got a problem. The last of the element of the route is completely dynamic, as it could be any cat's name. So how do we tell express that we want to handle that route?

For that, express has a concept called route parameter and it works surprisingly similar to angular route parameters. We declare a parameter by using a colon.

The code to set this route up looks like this:

server.js
```javascript
app.route('/api/cats/:name').get((req, res) => {})
```

The ":name" tells express, that we expect a dynamic string as input. We can get the value of this route-parameter by getting the params-object from the request object. We query it using the name of our route-parameter ("name").

server.js
```javascript
app.route('/api/cats/:name').get((req, res) => {
  const requestedCatName = req.params['name']
})
```

All we have to do now is to return the cat with that name. In a real-world application, we would now search our database for that cat. But for demonstration purposes, we just return a new cat-object with the requested name.

server.js
```javascript
app.route('/api/cats/:name').get((req, res) => {
  const requestedCatName = req.params['name']
  res.send({ name: requestedCatName })
})
```

### Sending a new Object to an Endpoint

Another method of a REST-API is creating a new object at the endpoint. This method is different to the methods we looked at before because it is using the HTTP-post-request instead of the get-request.

This REST-method is used to send new objects to the server. For example, if we would want to insert a new cat into our (not existing) cat-database, we would use this method for that.

To get access to the post-body of the request, we need to add a little tool called body-parser. This parses the body of the requests and adds it as a new property to the request object. We need the body of the post request, because it contains the information about the new cat we are about to create.

Just add the body-parser to the dependencies of our server by using this command:

```shell
npm install body-parser --save
```

We then require it and tell express to use it for every request (more on that later).

server.js
```javascript
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.route('/api/cats').post((req, res) => {
  res.send(201, req.body)
})
```

You may have noticed that something else looks different here. We are using the "send"-method with two parameters instead of one. Now, the first parameter is the HTTP-status-code and the second one our payload. Normally, the "send"-method uses the status code "200" - OK. Because the request "created" something, a new cat entry in our database, for example, the status code "201" - Created is a much better fit.

### Changing an Object at an Endpoint

Inserting new Objects might not cover all of your needs. Depending on your use-case, you probably want to modify existing objects. We can create a route that allows for that using the express-put-method.

server.js
```javascript
app.route('/api/cats/:name').put((req, res) => {
  res.send(200, req.body)
})
```

### Deleting an Object at an Endpoint

Creating a delete method is quite simple. All we have to do is the delete-method from express. Again, we are using a route-parameter, to determine which cat to delete from the database.

server.js
```javascript
app.route('/api/cats/:name').delete((req, res) => {
  res.sendStatus(204)
})
```

The status-code "204" -No Content, means that we are not sending back any payload, but the 
request was successful.


Enabling CORS
-------------

Enable CORS with Express by using the CORS middleware.

```shell
npm install cors --save
```

server.js
```javascript
const cors = require('cors');

var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions))
```

Building the Angular application
--------------------------------

We use the Angular HttpClient to use the REST-API

 Import the HttpClientModule in AppModule.

app.module.ts
```typescript
import { HttpClientModule } from '@angular/common/http'
...
  imports: [
    ...,
    HttpClientModule,
  ]
```

 Create an Angular CatService, that consumes the REST-API.

 cat.service.ts
 ```typescript
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { HttpClient } from '@angular/common/http'

export interface Cat {
  name: string
}

@Injectable()
export class CatService {
  constructor(private http: HttpClient) {}

  getAllCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>('http://localhost:8000/api/cats')
  }

  getCat(name: string): Observable<Cat> {
    return this.http.get<Cat>('http://localhost:8000/api/cats/' + name)
  }

  insertCat(cat: Cat): Observable<Cat> {
    return this.http.post<Cat>('http://localhost:8000/api/cats/', cat)
  }

  updateCat(cat: Cat): Observable<void> {
    return this.http.put<void>(
      'http://localhost:8000/api/cats/' + cat.name,
      cat
    )
  }

  deleteCat(name: string) {
    return this.http.delete('http://localhost:8000/api/cats/' + name)
  }
}
 ```


Documentation: Angular client
=============================
## Initialize a new Angular app with RoutingModule

```shell
ng new ng-rest-node-client --routing
```

### Further information
- https://malcoded.com/posts/angular-backend-express/ - The main tutorial.
- [solving the problem: you get an object with an array of objects from the server](https://medium.com/@lucian.cbn/catcomponent-html-3-5cb2e33a07d)
- https://malcoded.com/posts/angular-beginners-guide/
- https://malcoded.com/posts/angular-2-components-and-mvvm/
- https://malcoded.com/posts - Read all Angular blog post from malcoded.com.
- https://www.tektutorialshub.com/angular/angular-http-get-example-using-httpclient/

## Add Angular Material

Add Angular Material:
```shell
ng add @angular/material
```

Add MaterialModule:
```shell
ng generate module material
```

Add content to material.Module.ts:
```shell
import { NgModule } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
    exports: [
        A11yModule,
        ClipboardModule,
        CdkStepperModule,
        CdkTableModule,
        CdkTreeModule,
        DragDropModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        OverlayModule,
        PortalModule,
        ScrollingModule,
    ]
})
export class MaterialModule { }
```

Add class mat-app-background to root content container or body to get the Angular Material background colour:

/src/index.html
```shell
<body class="mat-app-background">

```

Install Angular Animations Module:
```shell
npm install --save @angular/animations
```

Install HammerJS for Gesture Support
```shell
npm install --save hammerjs
```

Import HammerJS in src/main.ts
```shell
import 'hammerjs';
```

### Further information

Angular Material:
- [https://material.angular.io/guide/theming#using-a-pre-built-theme](https://material.angular.io/guide/theming#using-a-pre-built-theme)
- [https://auth0.com/blog/creating-beautiful-apps-with-angular-material/](https://auth0.com/blog/creating-beautiful-apps-with-angular-material/) continue here
- [https://robferguson.org/blog/2018/11/05/getting-started-with-angular-material/](https://robferguson.org/blog/2018/11/05/getting-started-with-angular-material/) generate Angular CLI Material starter component
