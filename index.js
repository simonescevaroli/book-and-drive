const app = require('./app/app.js');
const mongoose = require('mongoose');


const port = process.env.PORT || 8080;
const DB_URL= process.env.DB_URL || 'mongodb://localhost:27017'
console.log("DB_URL: "+DB_URL);
// connect to mongodb locally 
app.locals.db= mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then ( () => {
    
    console.log("Connected to Database");
    
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
    
})
.catch(err=>console.log("unable to connect to the db:"+ err));