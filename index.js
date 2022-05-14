const app = require('./app/app.js');
const mongoose = require('mongoose');


const port = process.env.PORT || 8080;

// connect to mongodb locally 
app.locals.db= mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true})
.then ( () => {
    
    console.log("Connected to Database");
    
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
    
});