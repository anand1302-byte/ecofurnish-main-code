var express = require('express');
var app = express();
const session = require('express-session');
const mongoose = require("mongoose");
const ejs = require('ejs');
const connectdb = async () => {
    try {
      await mongoose.connect('mongodb+srv://anandjethava538:Anand123@cluster0.ujbaulb.mongodb.net/Ecofurnish');
      console.log("MongoDB Connected");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
    }
  };
  
connectdb();

app.use(session({
    secret: '16e8e032de4434f787ff398b2da8bfb34071f261e8332fa2cbfb5da513a106ac',
    resave: false,
    saveUninitialized: true
}))


// set the view engine to ejs
app.set('view engine', 'ejs');

// ------------------ For Homepages ----------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/assets', express.static('public/cpanel/assets'));
app.use("/css", express.static(__dirname + 'public/css'));
app.use("/img", express.static(__dirname + 'public/imag'));
app.use("/js", express.static(__dirname + 'public/js'));
app.use("/fonts", express.static(__dirname + 'public/fonts'));
app.use("/webfonts", express.static(__dirname + 'public/webfonts'));

const user = require("./routes/user");
const industrial = require("./routes/industrial")
const domestic = require("./routes/domestic")
const individual = require("./routes/individual")
const recycler = require("./routes/recycler")
const seller = require("./routes/seller")
const collector = require("./routes/collector")

app.use(user);
app.use(industrial);
app.use(domestic)
app.use(individual)
app.use(recycler)
app.use(seller)
app.use(collector)

app.listen(8080);
console.log('Server is listening on port 8080');