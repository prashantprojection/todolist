const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let items = [];
let workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req , res){

    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US", options);
    
    res.render("list", {
        kindOfDay: day,
        newItem: items
    });
});

app.get("/work", function (req, res) {
    res.render("list", {
        kindOfDay: "Work List",
        newItem: workItems
    });
})


app.post("/", function (req, res) {
    let item = req.body.inputField;
    if(req.body.item == "Work"){
        if(item != "" && item != " "){
        workItems.push(item);
        }
        res.redirect("/work");
    }else{
        if(item != "" && item != " "){
        items.push(item);
        }
        res.redirect("/");
    }
    
});

app.listen(3000, function () {
    console.log("Server Started at port 3000");
})