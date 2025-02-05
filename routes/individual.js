const { userschema } = require("../models/user")
const express = require("express");
const router = express.Router()
const bcrypt = require('bcryptjs');


router.post('/collector_register', async (req, res) => {
    const user = new userschema ({
        fname : req.body.firstname,
        lname : req.body.lastname,
        email : req.body.email,
        phone : req.body.phone,
        password : bcrypt.hashSync(req.body.password, 10),
        confirmpassword : req.body.confirmpassword,
    });

    await user.save();
    res.redirect('/')
})

router.post('/collector_login', async (req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const user = await userschema.findOne({ email });
        
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

router.get('/cpanel/individual/', function(req, res) {
    res.render('pages/cpanel/individual/index');
});
router.get('/cpanel/individual/index', function(req, res) {
    res.render('pages/cpanel/individual/index');
});
router.get('/cpanel/individual/individual_payment', function(req, res) {
    res.render('pages/cpanel/individual/individual_payment');
});

router.get('/cpanel/individual/individual_submit', function(req, res) {
    res.render('pages/cpanel/individual/individual_submit');
});


router.get('/cpanel/individual/login', function(req, res) {
    res.render('pages/cpanel/individual/login');
});



router.get('/cpanel/individual/register', function(req, res) {
    res.render('pages/cpanel/individual/register');
});



router.get('/cpanel/individual/forgotpsw', function(req, res) {
    res.render('pages/cpanel/individual/forgotpsw');
});

router.get('/cpanel/individual/notification', function(req, res) {
    res.render('pages/cpanel/individual/notification');
});
router.get('/cpanel/individual/account', function(req, res) {
    res.render('pages/cpanel/individual/account');
});

router.get('/cpanel/individual/schedule', function(req, res) {
    res.render('pages/cpanel/individual/schedule');
});



router.get('/cpanel/individual/print_payment_details', function(req, res) {
    res.render('pages/cpanel/individual/print_payment_details');
});

router.get('/cpanel/individual/change_password', function(req, res) {
    res.render('pages/cpanel/individual/change_password');
});

router.get('/cpanel/individual/status_history', function(req, res) {
    res.render('pages/cpanel/individual/status_history');
});

module.exports = router
