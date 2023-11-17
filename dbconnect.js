const mongoose = require('mongoose');

const dbUrl ="mongodb+srv://aknath_08:9H4BTiN8yKn3EvHT@cluster0.hfkca9p.mongodb.net/?retryWrites=true&w=majority"

const dbconnect = mongoose
                  .connect(dbUrl)
                  .then(()=>console.log("Db connected successfully"))
                  .catch((err)=> console.log("error"))

        module.exports = dbconnect          

