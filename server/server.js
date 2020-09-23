// Import Express Framework.
const express = require('express');
// Import body-parser
const bodyParser = require('body-parser');
// Import CORS
const cors = require('cors');

// Initialize the express framework. It will return an Express-Object 'app'.
const app = express();

// Call the "listen"-method of the Express-Object. This method tells the server to listen for incoming requests on the given port.
app.listen(8000, () => {
    // Pass in a callback-function, that is called, once the server has successfully started.
    console.log('Server started!');
})

// Use CORS.
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions))


// === Define routes ===
// =====================

// Get all cats. / GET
app.route('/api/cats').get((req, res) => {
    res.send(
        // { cats: [{ name: 'lilly' }, { name: 'lucy' }] }
        // [{ name: 'lilly' }, { name: 'lucy' }]
        [{ "name": "lilly" }, { "name": "lucy" }]
    );
})

// Get a single cat. / GET
app.route('/api/cats/:name').get((req, res) => {
    const requestedCatName = req.params['name']
    res.send({ name: requestedCatName })
})

// Send many cats. / POST
app.use(bodyParser.json())
app.route('/api/cats').post((req, res) => {
    res.send(201, req.body)
})

// Change a cat. / PUT
app.route('/api/cats/:name').put((req, res) => {
    res.send(200, req.body)
})

// Delete a cat. / DELETE
app.route('/api/cats/:name').delete((req, res) => {
    res.sendStatus(204)
})