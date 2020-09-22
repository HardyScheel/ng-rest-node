Building a REST-Backend for Angular with Node.js & Express
==========================================================
This is the source code of the building process and this app follows the tutorial at:
[https://malcoded.com/posts/angular-backend-express/](https://malcoded.com/posts/angular-backend-express/)

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