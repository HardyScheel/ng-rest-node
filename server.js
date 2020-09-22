// Import Express Framework.
const express = require('express')

// Initialize the express framework. It will return an Express-Object 'app'.
const app = express()

// Call the "listen"-method of the Express-Object. This method tells the server to listen for incoming requests on the given port.
app.listen(8000, () => {
    // Pass in a callback-function, that is called, once the server has successfully started.
    console.log('Server started!')
})
