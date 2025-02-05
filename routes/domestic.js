const { domesticschema } = require("../models/domestic")
const express = require("express");
const router = express.Router()
const bcrypt = require('bcryptjs');


router.post('/domestic_register', async (req, res) => {
    const domestic = new domesticschema ({
        fname : req.body.firstname,
        lname : req.body.lastname,
        email : req.body.email,
        phone : req.body.phone,
        password : bcrypt.hashSync(req.body.password, 10),
        confirmpassword : req.body.confirmpassword,
    });

    await domestic.save();
    res.redirect('/cpanel/domestic/')
})

router.post('/collector_login', async (req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const domestic = await domesticschema.findOne({ email });
        
        if(user && bcrypt.compareSync(password, user.password)){
            res.redirect("/shop")
        }
        else{
            res.status(400).send("password is wrong! ");
        }
    }
    catch(error) {
        console.log(error);
    }    
})

router.get('/cpanel/domestic/', function(req, res) {
    res.render('pages/cpanel/domestic/index');
});

router.get('/cpanel/domestic/index', function(req, res) {
    res.render('pages/cpanel/domestic/index');
});

router.get('/cpanel/domestic/account', function(req, res) {
    res.render('pages/cpanel/domestic/account');
});

router.get('/cpanel/domestic/domestic_payment', function(req, res) {
    res.render('pages/cpanel/domestic/domestic_payment');
});

router.get('/cpanel/domestic/forgotpsw', function(req, res) {
    res.render('pages/cpanel/domestic/forgotpsw');
});

router.get('/cpanel/domestic/greetings', function(req, res) {
    res.render('pages/cpanel/domestic/greetings');
});

router.get('/cpanel/domestic/login', function(req, res) {
    res.render('pages/cpanel/domestic/login');
});
router.get('/cpanel/domestic/schedule', function(req, res) {
    res.render('pages/cpanel/domestic/schedule');
});
router.get('/cpanel/domestic/chatbot', function(req, res) {
    res.render('pages/cpanel/domestic/chatbot');
});

router.get('/cpanel/domestic/notification', function(req, res) {
    res.render('pages/cpanel/domestic/notification');
});

router.get('/cpanel/domestic/print_payment_details', function(req, res) {
    res.render('pages/cpanel/domestic/print_payment_details');
});

router.get('/cpanel/domestic/register', function(req, res) {
    res.render('pages/cpanel/domestic/register');
});

router.get('/cpanel/domestic/status_history', function(req, res) {
    res.render('pages/cpanel/domestic/status_history');
});
router.get('/cpanel/domestic/reward', function(req, res) {
    res.render('pages/cpanel/domestic/reward');
});
router.get('/cpanel/domestic/chatbot', function(req, res) {
    res.render('pages/cpanel/domestic/reward');
});

module.exports = router
