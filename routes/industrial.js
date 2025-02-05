const { industrialschema } = require("../models/industrial")
const express = require("express");
const router = express.Router()
const bcrypt = require('bcryptjs');


router.post('/industrial_register', async (req, res) => {
    const industrial = new industrialschema ({
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 10),
        confirmpassword : req.body.confirmpassword,
    });

    await industrial.save();
    res.redirect('/cpanel/industrial/')
})

router.post('/industrial_login', async (req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const industrial = await industrialschema.findOne({ email });
        
        if(user && bcrypt.compareSync(password, industrial.password)){
            res.redirect("/cpanel/industrial/")
        }
        else{
            res.status(400).send("password is wrong! ");
        }
    }
    catch(error) {
        console.log(error);
    }    
})

router.get('/cpanel/industrial/', function(req, res) {
    res.render('pages/cpanel/industrial/index');
});

router.get('/cpanel/industrial/index', function(req, res) {
    res.render('pages/cpanel/industrial/index');
});

router.get('/cpanel/industrial/industrial_payment', function(req, res) {
    res.render('pages/cpanel/industrial/industrial_payment');
});

router.get('/cpanel/industrial/industrial_submit', function(req, res) {
    res.render('pages/cpanel/industrial/industrial_submit');
});

router.get('/cpanel/industrial/login', function(req, res) {
    res.render('pages/cpanel/industrial/login');
});

router.get('/cpanel/industrial/forgotpsw', function(req, res) {
    res.render('pages/cpanel/industrial/forgotpsw');
});

router.get('/cpanel/industrial/notification', function(req, res) {
    const query = 'SELECT * FROM recycler_requirement ';

    connection.query(query, function(err, result) {
        if (err) {
            console.error('Error executing query:', error);
            return res.status(500).send('Internal Server Error');
        }
        res.render('pages/cpanel/industrial/notification', { data: result });
    });
});

router.get('/cpanel/industrial/account', function(req, res) {
    res.render('pages/cpanel/industrial/account');
});


router.get('/cpanel/industrial/schedule', function(req, res) {

    Query = "SELECT * FROM industrial_schedule"
    connection.query(Query, function(err, result){
        if(err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.render('pages/cpanel/industrial/schedule', { data: result });
    });
});

router.get('/cpanel/industrial/schedule', function(req, res) {

    Query = "SELECT * FROM industrial_schedule"
    connection.query(Query, function(err, result){
        if(err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.render('pages/cpanel/industrial/schedule', { data: result });
    });
});

router.get('/cpanel/industrial/print_payment_details', function(req, res) {
    res.render('pages/cpanel/industrial/print_payment_details');
});

router.get('/cpanel/industrial/register', function(req, res) {
    res.render('pages/cpanel/industrial/register');
});
router.get('/cpanel/industrial/chatbot', function(req, res) {
    res.render('pages/cpanel/industrial/chatbot');
});


module.exports = router
