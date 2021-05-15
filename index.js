const express = require("express")
const app = express()
const port = 3000

var path = require('path')
var static = require('serve-static');
app.use(static(path.join(__dirname,'public')));

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


const mongoose = require('mongoose');
const { User } = require("./model/User");

mongoose.connect
('mongodb+srv://psh:1234@boilerplate.idmdn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(()=>console.log('MongoDB Connected~')).catch(err =>console.log(err))

app.post('/register',(req,res)=>{
    const user = new User(req.body)
    user.save((err,userInfo)=>{
        if(err) return res.json({success:false,err})
        return res.status(200).json({
            success:true
        })
    })

})



app.get('/',(req,res)=>res.send('Hello world~~~~~!!!!!!!!!!'))

app.listen(port,()=>console.log('testProject Start on port on '+port))