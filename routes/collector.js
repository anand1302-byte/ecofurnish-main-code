const { collectorschema } = require("../models/collector")
const express = require("express");
const router = express.Router()
const bcrypt = require('bcryptjs');


router.post('/collector_register', async (req, res) => {
    const collector = new collectorschema ({
        fname : req.body.firstname,
        lname : req.body.lastname,
        email : req.body.email,
        phone : req.body.phone,
        password : bcrypt.hashSync(req.body.password, 10),
        confirmpassword : req.body.confirmpassword,
    });

    await collector.save();
    res.redirect('/')
})

router.post('/collector_login', async (req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const user = await userschema.findOne({ email });
        
        if(collector && bcrypt.compareSync(password, user.password)){
            res.redirect("/cpanel/collector/")
        }
        else{
            res.status(400).send("password is wrong! ");
        }
    }
    catch(error) {
        console.log(error);
    }    
})

router.get('/cpanel/collector/', function(req, res) {
    res.render('pages/cpanel/collector/index');
});

router.get('/cpanel/collector/index', function(req, res) {
    res.render('pages/cpanel/collector/index');
});

router.get('/cpanel/collector/industrial_payment', function(req, res) {
    res.render('pages/cpanel/collector/industrial_payment');
});

router.get('/cpanel/collector/login', function(req, res) {
    res.render('pages/cpanel/collector/login');
});

router.get('/cpanel/collector/register', function(req, res) {
    res.render('pages/cpanel/collector/register');
});

router.get('/cpanel/collector/forgotpsw', function(req, res) {
    res.render('pages/cpanel/collector/forgotpsw');
});

router.get('/cpanel/collector/notification', function(req, res) {
    res.render('pages/cpanel/collector/notification');
});
router.get('/cpanel/collector/account', function(req, res) {
    res.render('pages/cpanel/collector/account');
});

router.get('/cpanel/collector/schedule', function(req, res) {
    res.render('pages/cpanel/collector/schedule');
});

router.get('/cpanel/collector/print_payment_details', function(req, res) {
    res.render('pages/cpanel/collector/print_payment_details');
});

module.exports = router
