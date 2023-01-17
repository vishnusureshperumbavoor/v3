var express = require('express')
var app = express()
const bodyparser = require('body-parser')
const urlencodedparser = bodyparser.urlencoded({extended:false})
const mongoose = require("mongoose")
const db = mongoose.connection;
const dotenv = require("dotenv")
dotenv.config()
const mongodb_uri = process.env.MONGODB_URI
const port = process.env.PORT
const collections = require("./collections")

mongoose.set("strictQuery",false)
mongoose.connect(mongodb_uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
db.on("connected",()=>{
    console.log("mongodb connection establised");
})
db.on("error",(err)=>{
    console.log("mongodb connection error");
    console.log(`${err}`);
})
const userSchema = new mongoose.Schema({
    name:String,
    password:String,
    createdAt:{type:Date,default:new Date()}
})
const User = mongoose.model("User",userSchema)

app.set("view engine", "hbs");
app.set("views", "");

app.get('/',(req,res)=>{
    res.sendFile("signup.html",{root:__dirname})
})
app.get('/login',(req,res)=>{
    res.sendFile("login.html",{root:__dirname})
})
app.post('/signup',urlencodedparser,(req,res)=>{
    const user = new User(req.body)
    db.collection(collections.USER_COLLECTION).insertOne(user,(err,coll)=>{
        if(err) console.log(`error ${err}`);
        else{
            console.log("successfully inserted");
            res.redirect("/login")
        }
    })
    console.log(req.body)
})
app.post('/login',urlencodedparser,(req,res)=>{
    db.collection(collections.USER_COLLECTION).findOne({name:req.body.name},(err,user)=>{
            if(user && user.password == req.body.password){
                console.log("login successful");
                res.redirect("/")
            }
            else{
                console.log("login error");
                res.redirect("/login")
            }
    })
})
app.listen((port),()=>{
    console.log(`Express listening to PORT ${port}`);
})