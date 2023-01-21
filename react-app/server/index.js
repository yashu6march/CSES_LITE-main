const express = require('express');
const ejs = require('ejs');


const app = express();

app.use(express.json());

app.use(require('./router/auth'));

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({
    extended: true
}));

app.get("/", function(req, res){
    res.render("index");
});


app.listen(5000, function(){
    console.log("Server started on port 5000!!");
});

// #include<bits/stdc++.h>
// using namespace std;

// int main() {
//    cout<<"Hello World!";
// }