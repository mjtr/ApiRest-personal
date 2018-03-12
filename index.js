var express = require ("express");
var path = require ("path");
var port = (process.env.PORT || 16778);


var app = express();


app.use("/", express.static(path.join(__dirname,"public")));

app.listen(port, () => {
    console.log("Magic is happening in port " + port);
}).on("error", (e) => {
    console.log("Server can noy be started " + e);
    process.exit(1);
});



