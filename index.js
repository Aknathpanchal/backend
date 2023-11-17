const express= require('express');
const app = express();
const cors = require('cors');
const dbconnect = require('./dbconnect');
const Port = 8080;
const authRouter = require('./routes/auth.routes');

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);


app.get('/',(req,res)=>{
    res.json({
        message:"api running successfully"
    })
})


app.listen(Port ,async()=>{
    try{
       await dbconnect;
       console.log(`listening on :${Port}`);
    } catch(error){
        console.log("app listening error:",error)
    }
})
