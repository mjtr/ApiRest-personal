var express = require("express");
var path = require("path");
var port = (process.env.PORT || 16778);
var bodyParser = require("body-parser");

var app = express();


app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log("Magic is happening in port " + port);
}).on("error", (e) => {
    console.log("Server can noy be started " + e);
    process.exit(1);
});


app.get("/api/v1/rape-stats/docs",(req,res)=>{
   
   res.redirect("https://documenter.getpostman.com/view/360397/collection/RVu1GWFS");
   
    
});


//llamadas a los métodos creados en el otro archivo
var rape = require("./public/rape-manager/v1/rape.js");

//var rape2 = require("./public/rape-manager/v1/rapenedb.js");

/*********CON MONGO*******/

/****Gets***/

app.get("/api/v1/rape-stats/loadInitialData",rape.getInitialData);
app.get("/api/v1/rape-stats",rape.getAllData);
app.get("/api/v1/rape-stats/:name/:year",rape.getSingleDataNameYear);
app.get("/api/v1/rape-stats/:name",rape.getData);

/**Post**/

app.post("/api/v1/rape-stats",rape.postDataGroup);
app.post("/api/v1/rape-stats/:name",rape.postDenied);
app.post("/api/v1/rape-stats/:name/:year",rape.postDenied);

/***Put****/

app.put("/api/v1/rape-stats",rape.putDenied);
app.put("/api/v1/rape-stats/:name",rape.putDenied);
app.put("/api/v1/rape-stats/:name/:year",rape.putSingleData);

/***Delete**/

app.delete("/api/v1/rape-stats",rape.deleteAll);
app.delete("/api/v1/rape-stats/:name/:year",rape.deleteData);


/*********CON MONGO Y APIKEY*******/

var rapekey = require("./public/rape-manager/v1/rapekey.js");

/****Gets***/

app.get("/api/v1/secure/rape-stats/loadInitialData",rapekey.getInitialData);
app.get("/api/v1/secure/rape-stats",rapekey.getAllData);
app.get("/api/v1/secure/rape-stats/:name/:year",rapekey.getSingleDataNameYear);
app.get("/api/v1/secure/rape-stats/:name",rapekey.getData);

/**Post**/

app.post("/api/v1/secure/rape-stats",rapekey.postDataGroup);
app.post("/api/v1/secure/rape-stats/:name",rapekey.postDenied);
app.post("/api/v1/secure/rape-stats/:name/:year",rapekey.postDenied);

/***Put****/

app.put("/api/v1/secure/rape-stats",rapekey.putDenied);
app.put("/api/v1/secure/rape-stats/:name",rapekey.putDenied);
app.put("/api/v1/secure/rape-stats/:name/:year",rapekey.putSingleData);

/***Delete**/

app.delete("/api/v1/secure/rape-stats",rapekey.deleteAll );
app.delete("/api/v1/secure/rape-stats/:name/:year",rapekey.deleteData);



/*********CON NEDB*********/

/****Gets***/
/*
app.get("/api/v1/rape-stats/loadInitialData", rape2.getInitialData);
app.get("/api/v1/rape-stats", rape2.getAllData);
app.get("/api/v1/rape-stats/:name/:year", rape2.getSingleDataNameYear);
app.get("/api/v1/rape-stats/:name", rape2.getData);

/**Post**/
/*
app.post("/api/v1/rape-stats", rape2.postDataGroup);
app.post("/api/v1/rape-stats/:name", rape2.postDenied);
app.post("/api/v1/rape-stats/:name/:year", rape2.postDenied);

/***Put****/
/*
app.put("/api/v1/rape-stats", rape2.putDenied);
app.put("/api/v1/rape-stats/:name", rape2.putDenied);
app.put("/api/v1/rape-stats/:name/:year", rape2.putSingleData);

/***Delete**/
/*
app.delete("/api/v1/rape-stats", rape2.deleteAll);
//app.delete("/api/v1/rape-stats/:country" ,rape2.deleteData);
app.delete("/api/v1/rape-stats/:name/:year", rape2.deleteData);
*/