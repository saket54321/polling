const express = require('express');
const app = express();
const port = 8000 ; 
const Database = require('./config/mongoose');


//for getting form data
app.use(express.urlencoded());

app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is up and running on port ${port}`);
})

