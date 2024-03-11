const express = require("express");
const path = require("path");
const sendEmailRoute = require("./routes/send-emails");
const app = express();

app.set('view engine', "ejs");
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.resolve("./public")));

app.get('/', (req, res) => {
    res.render("home");
});

app.get('/result', (req, res) => {
    res.render("result");
})

app.use('/send-emails', sendEmailRoute);

app.listen(8000, () => {
    console.log("Server stated on port 8000");
})