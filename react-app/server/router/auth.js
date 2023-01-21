const express = require('express');
const router = express.Router();
const cp = require('child_process');
const fs = require('fs');

const app = express();
app.use(express.json());

router.post("/", function(req, res){
    let lang = req.body.lang;
    let code = req.body.code;
    let input = req.body.input;

    // console.log(lang);
    // console.log(code);
    // console.log(input);

    fs.writeFile(__dirname + '/prog/input.txt', input, function(err){
        if (err) {
            console.log(err);
        } else {
            if (lang == "CPP14") {

                fs.writeFile(__dirname + '/prog/a.cpp', code, function(err){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Successfully written to a.cpp");
        
                        //now executing the program present in a.cpp
                        cp.exec("cd " + __dirname + "/prog & g++ a.cpp -o a.exe & a.exe < input.txt", function(error, stdout, stderr){
                            if (error) {
                                res.send(error);
                            } else if (stderr) {
                                res.send(stderr);
                            } else {
                                fs.writeFile(__dirname + '/prog/output.txt', stdout, function(err) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log("Output Written to the output file");

                                        cp.exec('sh ' + __dirname + '/prog/checker_script.sh', (error, stdout, stderr) => {
                                            if (error) {
                                                res.send(error);
                                            } else if (stderr) {
                                                res.send(stderr);
                                            } else {
                                                return res.status(201).json({message: stdout});
                                                
                                                res.send(stdout);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            } 
            else if (lang == "Python3") {
        
                fs.writeFile(__dirname + '/prog/a.py', code, function(err){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Successfully written to a.py");
        
                        //now executing the program present in a.py
                        cp.exec("cd " + __dirname + "/prog & python a.py < input.txt", function(error, stdout, stderr){
                            if (error) {
                                console.log(error);
                                res.send(error);
                            } else if (stderr) {
                                res.send(stderr);
                            } else {
                                fs.writeFile(__dirname + '/prog/output.txt', stdout, function(err) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log("Output Written to the output file");

                                        cp.exec('sh ' + __dirname + '/prog/checker_script.sh', (error, stdout, stderr) => {
                                            if (error) {
                                                res.send(error);
                                            } else if (stderr) {
                                                res.send(stderr);
                                            } else {
                                                return res.status(201).json({message: stdout});

                                                res.send(stdout);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
            else {
                
                fs.writeFile(__dirname + '/prog/a.java', code, function(err){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Successfully written to a.java");
        
                        //now executing the program present in a.java
                        cp.exec("cd " + __dirname + "/prog & javac a.java & java Main < input.txt", function(error, stdout, stderr){
                            if (error) {
                                console.log(error);
                                res.send(error);
                            } else if (stderr) {
                                res.send(stderr);
                            } else {
                                fs.writeFile(__dirname + '/prog/output.txt', stdout, function(err) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log("Output Written to the output file");

                                        cp.exec('sh ' + __dirname + '/prog/checker_script.sh', (error, stdout, stderr) => {
                                            if (error) {
                                                res.send(error);
                                            } else if (stderr) {
                                                res.send(stderr);
                                            } else {
                                                return res.status(201).json({message: stdout});

                                                res.send(stdout);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    });
});

module.exports = router;