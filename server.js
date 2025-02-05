var express = require('express');
var app = express();
const path = require('path');
const mysql = require('mysql2');

// set the view engine to ejs
app.set('view engine', 'ejs');

// ------------------ For Homepages ----------------
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/css", express.static(__dirname + 'public/css'));
app.use("/img", express.static(__dirname + 'public/imag'));
app.use("/js", express.static(__dirname + 'public/js'));
app.use("/fonts", express.static(__dirname + 'public/fonts'));
app.use("/webfonts", express.static(__dirname + 'public/webfonts'));

const connection = mysql.createConnection({
    host: 'sql9.freemysqlhosting.net',
    user: 'sql9659191',
    password: 'eDhnPTZaBj',
    database: 'sql9659191',
  });


app.get('/', function(req, res) {
  res.render('pages/index');
});
app.get('/index', function(req, res) {
    res.render('pages/index');
  });

app.get('/about_us', function(req, res) {
  res.render('pages/about_us');
});

app.get('/shop', function(req, res) {
    res.render('pages/shop');
});

app.get('/cart', function(req, res) {
    res.render('pages/cart');
});

app.get('/wishlist', function(req, res) {
    res.render('pages/wishlist');
});

app.get('/checkout', function(req, res) {
    res.render('pages/checkout');
});

app.get('/contact', function(req, res) {
    res.render('pages/contact');
});

app.get('/account', function(req, res) {
    res.render('pages/account');
});

app.get('/faq', function(req, res) {
    res.render('pages/faq');
});

app.get('/login', function(req, res) {
    res.render('pages/login');
});

app.post("/login", (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const query = 'SELECT * FROM individual WHERE email = ?';
    connection.query(query, [email], (err, results) => {
    if(err) {
        console.error('Error query in database: ', err.stack);
    }

    const user = results[0];
    if(results.length > 0) {
        const fullname = results[0].name;
        if(user.password == password) {
            req.session.loggedIn = true;
            req.session.email = email; 
            res.redirect('/')
        }
        else{
            const checkquery = 'SELECT * FROM Industrial WHERE email = ?';
            connection.query(checkquery, [email], (err, result) => {
            if(result.length>0){
                const fullname = result[0].fullname;
                if(result[0].password==password){ 
                    req.session.loggedIn = true;
                    req.session.email = email;
                    res.redirect('/')
                }else{
                console.log('User not found');  
                res.redirect('/Industry_register');
        }}});
      }
    }
  })
});
app.get('/register', function(req, res) {
    res.render('pages/register');
});

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS individual (
      firstname VARCHAR(50),
      lastname VARCHAR(50),
      phone VARCHAR(20),
      email VARCHAR(50),
      googleid VARCHAR(50),
      displayName VARCHAR(20),
      password VARCHAR(30)
    );`;
  
connection.query(createTableQuery, (err) => {
    if (err) {
        console.error('Error creating table: ' + err.stack);
    }
        console.log('Table created');
  });

app.post('/user_register', (req, res) => {

    const firstname = req.body.username;
    const lastname = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const password= req.body.password;
    const confirmpassword = req.body.confirmpassword;
  
    const checkquery = 'SELECT * FROM individual WHERE email = ?';
    connection.query(checkquery, [email], (err, results) => {
        if (results && results.length > 0){
            res.status(400).send("you are already registered");
            res.redirect('/login');
        } else {
            if(password === confirmpassword) {
                const insertQuery = 'INSERT INTO individual(firstname, lastname, phone, email, password) VALUES (?, ?, ?, ?, ?)';
                connection.query(insertQuery, [firstname, lastname, phone, email, password], (err, result) => {
                if (err) {
                    throw err;
                }
                else {
                }
            console.log(`1 record inserted ${result}`);
            res.redirect('/login')
        });
        }
        else{
            res.render('signup', {message:"Passwords do not match"});
        }
    }})
    res.redirect('/login');
});

app.get('/terms_and_condition', function(req, res) {
    res.render('pages/terms_and_condition');
});

app.get('/privacy_policy', function(req, res) {
    res.render('pages/privacy_policy');
});

app.get('/product_details', function(req, res) {
    res.render('pages/product_details');
});






// ------------------ For CPanel pages ----------------
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static('public/cpanel/assets'));


app.get('/cpanel/industrial/', function(req, res) {
    res.render('pages/cpanel/industrial/index');
});
app.get('/cpanel/industrial/index', function(req, res) {
    res.render('pages/cpanel/industrial/index');
});

app.get('/cpanel/industrial/industrial_payment', function(req, res) {
    res.render('pages/cpanel/industrial/industrial_payment');
});

app.get('/cpanel/industrial/industrial_submit', function(req, res) {
    res.render('pages/cpanel/industrial/industrial_submit');
});

const createTable3Query = `
    CREATE TABLE IF NOT EXISTS waste_submit (
      address VARCHAR(50),
      types VARCHAR(50),
      activity VARCHAR(30),
      address2 VARCHAR(20),
      address3 VARCHAR(20),
      state VARCHAR(20),
      zip VARCHAR(20),
      notes VARCHAR(20)
    );`;
  
connection.query(createTable3Query, (err) => {
    if (err) {
        console.error('Error creating table: ' + err.stack);
    }
        console.log('Table created');
  });

app.post('/waste_submit', (res, req) => {
    const address = req.body.inputAddress;
    const type = req.body.formControlSelectMultiple;
    const activity = req.body.Activity;
    const address2 = req.body.inputAddress;
    const address3 = req.body.inputAddress2;
    const state = req.body.inputState;
    const zip = req.body.inputZip;
    const notes = req.body.notes;
    
    const insertQuery = 'INSERT INTO waste_submit(address,types,activity,address2,address3,states,zip,notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
                connection.query(insertQuery, [address, type, activity, address2, address3, state, zip, notes], (err, result) => {
                if (err) {
                    throw err;
                }
                else {
                }
});
});

app.get('/cpanel/industrial/login', function(req, res) {
    res.render('pages/cpanel/industrial/login');
});

app.post("/industrial_login", (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const query = 'SELECT * FROM individual WHERE email = ?';
    connection.query(query, [email], (err, results) => {
    if(err) {
        console.error('Error query in database: ', err.stack);
    }

    const user = results[0];
    if(results.length > 0) {
        const fullname = results[0].name;
        if(user.password == password) {
            req.session.loggedIn = true;
            req.session.email = email; 
            res.redirect('/cpanel/industrial/index')
        }
        else{
            const checkquery = 'SELECT * FROM Industrial WHERE email = ?';
            connection.query(checkquery, [email], (err, result) => {
            if(result.length>0){
                const fullname = result[0].fullname;
                if(result[0].password==password){ 
                    req.session.loggedIn = true;
                    req.session.email = email;
                    res.redirect('/')
                }else{
                console.log('User not found');  
                res.redirect('/cpanel/industrial/index');
        }}});
      }
    }
  })
});

app.get('/cpanel/industrial/register', function(req, res) {
    res.render('pages/cpanel/industrial/register');
});

const createTable2Query = `
    CREATE TABLE IF NOT EXISTS industrial (
      username VARCHAR(50),
      email VARCHAR(50),
      password VARCHAR(30)
    );`;
  
connection.query(createTable2Query, (err) => {
    if (err) {
        console.error('Error creating table: ' + err.stack);
    }
        console.log('Table created');
  });

app.post('/industrial_register', (req, res) => {

    const username = req.body.username;
    const email = req.body.email;
    const password= req.body.password;
    const confirmpassword = req.body.confirmpassword;
  
    const checkquery = 'SELECT * FROM individual WHERE email = ?';
    connection.query(checkquery, [email], (err, results) => {
        if (results && results.length > 0){
            res.status(400).send("you are already registered");
            res.redirect('/login');
        } else {
            if(password === confirmpassword) {
                const insertQuery = 'INSERT INTO individual(username, email, password) VALUES (?, ?, ?)';
                connection.query(insertQuery, [username, email, password], (err, result) => {
                if (err) {
                    throw err;
                }
                else {
                }
            console.log(`1 record inserted ${result}`);
        });
        }
        else{
            res.render('pages/cpanel/industrial/register', {message:"Passwords do not match"});
        }
    }})
    res.redirect('/cpanel/industrial/login');
});


app.get('/cpanel/industrial/forgotpsw', function(req, res) {
    res.render('pages/cpanel/industrial/forgotpsw');
});

app.get('/cpanel/industrial/notification', function(req, res) {
    res.render('pages/cpanel/industrial/notification');
});
app.get('/cpanel/industrial/account', function(req, res) {
    res.render('pages/cpanel/industrial/account');
});

app.get('/cpanel/industrial/schedule', function(req, res) {
    res.render('pages/cpanel/industrial/schedule');
});

const createTable4Query = `
    CREATE TABLE IF NOT EXISTS schedule (
      address VARCHAR(50),
      types VARCHAR(50),
      activity VARCHAR(30),
      address2 VARCHAR(20),
      address3 VARCHAR(20),
      state VARCHAR(20),
      zip VARCHAR(20),
      notes VARCHAR(20)
    );`;
  
connection.query(createTable3Query, (err) => {
    if (err) {
        console.error('Error creating table: ' + err.stack);
    }
        console.log('Table created');
  });

app.post('/waste_submit', (res, req) => {
    const address = req.body.inputAddress;
    const type = req.body.formControlSelectMultiple;
    const activity = req.body.Activity;
    const address2 = req.body.inputAddress;
    const address3 = req.body.inputAddress2;
    const state = req.body.inputState;
    const zip = req.body.inputZip;
    const notes = req.body.notes;
    
    const insertQuery = 'INSERT INTO waste_submit(address,types,activity,address2,address3,states,zip,notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
                connection.query(insertQuery, [address, type, activity, address2, address3, state, zip, notes], (err, result) => {
                if (err) {
                    throw err;
                }
                else {
                }
});
});
app.get('/cpanel/industrial/print_payment_details', function(req, res) {
    res.render('pages/cpanel/industrial/print_payment_details');
});

app.get('/cpanel/industrial/change_password', function(req, res) {
    res.render('pages/cpanel/industrial/change_password');
});



app.listen(8080);
console.log('Server is listening on port 8080');