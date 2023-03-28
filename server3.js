const express = require("express");
fs = require("fs");
const https = require("https")
const app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//connect to SQL database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("USE SERVER;");
  con.query("SHOW Tables;", (err,result)=>{
    console.log(result)
  })
});



//Handling http requests
app.get("/", (req, res) => {
    res.sendFile(__dirname+"/index.html");

  
  });

app.post("/insertStudent", (req,res)=>{
    console.log(req.body.ID);
    res.send("<a href='/'>Back</a>");
    con.query("INSERT INTO STUDENTS (ID, name) values ("+req.body.ID+", \""+req.body.name+"\");")
  }
  );


//TLS certificate and listen
const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem")
};

/*app.listen(80, () => {
    console.log("Application started and Listening on port 4000");
  });*/
app.listen(80);
https.createServer(options, app).listen(443);