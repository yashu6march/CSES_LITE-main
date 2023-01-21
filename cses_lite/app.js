require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const cors = require("cors");
const axios = require('axios');

const HackerEarth = require('hackerearth-v4-node');

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect('mongodb://localhost:27017/usersDB', {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
    handle: String, 
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model('User', userSchema);

//passport code.. copied from documentation
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//hackerearth api connection
const HE = new HackerEarth({
    clientSecret: process.env.CLIENT_SECRET,
    memory_limit: 10000,
    time_limit: 2,
    lang: 'CPP',
    callbackURL: "http://localhost:3000/he"
});

// const source = 'print("GOD ARHAM")';
app.get('/newhe',(req,res) => {
    const headers = {
        'content-type':'application/json',
        'client-secret':''
    }
    axios.post('https://api.hackerearth.com/v4/partner/code-evaluation/submissions/',{
        "lang": "PYTHON",
        "source": "print 'Hello World'",
        "input": "",
        "memory_limit": 243232,
        "time_limit": 5,
        "callback": "http://localhost:3000/newhe"
    },{headers:headers})
    .then((resp) => console.log(resp))
    .catch((err) => console.log(err.message))
})

app.post('/newhe',(req,res) => {
    console.info('BODY->');
    console.log(req.body);
})

app.get("/he", function(req, res){
    HE.execute({
        sourceFile: __dirname + '/problems/prog.cpp',
        // lang: 'CPP',
        inputFile: __dirname + '/problems/input.txt',
        memory_limit: 10000,
        time_limit: 2,
        callbackURL: "http://localhost:3000/he"
    }, 
    function(err, response){
        if (err) {
            console.log(err);
        } else {
            console.log("Getting Response", response.data);

            setTimeout(function(){
                HE.get_status(response.data.he_id, function(err, resp){
                    if (err) {
                        console.log(err);
                    }
                    else{
                        console.log(resp.data);
    
                        if (resp.data.result.run_status.status === 'AC') {
                            HE.get_output({
                                url: resp.data.result.run_status.output
                            }, function(err, respo){
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(respo.data);
    
                                    res.send(respo.data);
                                }
                            });
                        } 
                    }
                });
            }, 5000);   

        }
    });

});

app.post("/he", function(res, req){
    console.log("Doesn't Work!");
});


app.get("/", function(req, res){
    res.render("home");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.get("/dashboard/:handle", function(req, res){
    if(req.isAuthenticated()){
        // let handle = req.body.handle;
        // console.log(req.params.handle);

        res.render("dashboard", {handle: req.params.handle});
    } else {
        res.redirect("/login");
    }
});

app.get("/problems", function(req, res){
    if (req.isAuthenticated()) {
        res.render("problems");
    } else {
        res.redirect("/login");
    }
});

app.get("/logout", function(req, res){
    req.logout();

    res.redirect("/");
});


app.post("/login", function(req, res){
    User.findOne({username: req.body.username}, function(err, use){
        if (err) {
            console.log(err);
            res.redirect("/login");
        } else {
            if(use === null){
                res.redirect("/register");
            } else {
                const handle = use.handle;

                // console.log(handle);
                const user = new User({
                    handle: handle,
                    username: req.body.username,
                    password: req.body.password
                });
                
                req.logIn(user, function(err){
                    if (err) {
                        console.log(err);
                        res.redirect("/login");
                    } else {
                        passport.authenticate("local")(req, res, function(){
                            // console.log("/dashboard/" + handle);
                            res.redirect("/dashboard/" + handle);
                        });
                    }
                });
            }
        }
    });
    
});

app.post("/register", function(req, res){
    let handle   = req.body.handle;
    let username = req.body.username;
    let password = req.body.password;

    User.register({handle: handle, username: username}, password, function(err, user) {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/dashboard/" + handle);
            });
        }
    });
});







app.listen(8000, function(){
    console.log("Server started at port 8000!");
});