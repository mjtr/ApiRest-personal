var express = require("express");
var path = require("path");
var port = (process.env.PORT || 16778);
var bodyParser = require("body-parser");
var cors = require("cors");
var request= require("request");


var app = express();
app.use(cors());


app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log("Magic is happening in port " + port);
}).on("error", (e) => {
    console.log("Server can noy be started " + e);
    process.exit(1);
});

/******PROXY*******/

var apiServerHostDivorce = "https://sos1718-08.herokuapp.com/api/v1/divorces-an";

app.use("/proxyDivorce", (req, res) =>{
    
    var url = apiServerHostDivorce + req.url ; 
    
    req.pipe(request(url)).pipe(res);
});


app.get("/api/v1/rape-stats/docs", (req, res) => {

    res.redirect("https://documenter.getpostman.com/view/360397/collection/RVu1GWFS");


});


//llamadas a los métodos creados en el otro archivo
var rape = require("./public/rape-manager/v1/rape.js");

/***********Version 1***********/
/*********CON MONGO*******/

/****Gets***/

app.get("/api/v1/rape-stats/loadInitialData", rape.getInitialData);
app.get("/api/v1/rape-stats", rape.getAllData);
app.get("/api/v1/rape-stats/:name/:year", rape.getSingleDataNameYear);
app.get("/api/v1/rape-stats/:name", rape.getData);

/**Post**/

app.post("/api/v1/rape-stats", rape.postDataGroup);
app.post("/api/v1/rape-stats/:name", rape.postDenied);
app.post("/api/v1/rape-stats/:name/:year", rape.postDenied);

/***Put****/

app.put("/api/v1/rape-stats", rape.putDenied);
app.put("/api/v1/rape-stats/:name", rape.putDenied);
app.put("/api/v1/rape-stats/:name/:year", rape.putSingleData);

/***Delete**/

app.delete("/api/v1/rape-stats", rape.deleteAll);
app.delete("/api/v1/rape-stats/:name/:year", rape.deleteData);


/*********CON MONGO Y APIKEY*******/

var rapekey = require("./public/rape-manager/v1/rapekey.js");

/****Gets***/

app.get("/api/v1/secure/rape-stats/loadInitialData", rapekey.getInitialData);
app.get("/api/v1/secure/rape-stats", rapekey.getAllData);
app.get("/api/v1/secure/rape-stats/:name/:year", rapekey.getSingleDataNameYear);
app.get("/api/v1/secure/rape-stats/:name", rapekey.getData);

/**Post**/

app.post("/api/v1/secure/rape-stats", rapekey.postDataGroup);
app.post("/api/v1/secure/rape-stats/:name", rapekey.postDenied);
app.post("/api/v1/secure/rape-stats/:name/:year", rapekey.postDenied);

/***Put****/

app.put("/api/v1/secure/rape-stats", rapekey.putDenied);
app.put("/api/v1/secure/rape-stats/:name", rapekey.putDenied);
app.put("/api/v1/secure/rape-stats/:name/:year", rapekey.putSingleData);

/***Delete**/

app.delete("/api/v1/secure/rape-stats", rapekey.deleteAll);
app.delete("/api/v1/secure/rape-stats/:name/:year", rapekey.deleteData);


/**************Version 2****************/
var rape33 = require("./public/rape-manager/v2/rape.js");
var url2 = "/api/v2/rape-stats";


/*********CON MONGO*******/

/****Gets***/

app.get(url2 + "/loadInitialData", rape33.getInitialData);
app.get(url2, rape33.getAllData);
app.get(url2 + "/:name/:year", rape33.getSingleDataNameYear);
app.get(url2 + "/:name", rape33.getData);

/**Post**/

app.post(url2, rape33.postDataGroup);
app.post(url2 + "/:name", rape33.postDenied);
app.post(url2 + "/:name/:year", rape33.postDenied);

/***Put****/

app.put(url2, rape33.putDenied);
app.put(url2 + "/:name", rape33.putDenied);
app.put(url2 + "/:name/:year", rape33.putSingleData);

/***Delete**/

app.delete(url2, rape33.deleteAll);
app.delete(url2 + "/:name/:year", rape33.deleteData);


/*********CON MONGO Y APIKEY*******/

var rapekey22 = require("./public/rape-manager/v2/rapekey.js");
var url = "/api/v2/secure/rape-stats";

/****Gets***/

app.get(url + "/loadInitialData", rapekey22.getInitialData);
app.get(url, rapekey22.getAllData);
app.get(url + "/:name/:year", rapekey22.getSingleDataNameYear);
app.get(url + "/:name", rapekey22.getData);

/**Post**/

app.post(url, rapekey22.postDataGroup);
app.post(url + "/:name", rapekey22.postDenied);
app.post(url + " /:name/:year", rapekey22.postDenied);

/***Put****/

app.put(url, rapekey22.putDenied);
app.put(url + "/:name", rapekey22.putDenied);
app.put(url + "/:name/:year", rapekey22.putSingleData);

/***Delete**/

app.delete(url, rapekey22.deleteAll);
app.delete(url + "/:name/:year", rapekey22.deleteData);


