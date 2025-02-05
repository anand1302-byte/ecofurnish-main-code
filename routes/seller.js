const { sellerschema } = require("../models/user")
const express = require("express");
const router = express.Router()
const bcrypt = require('bcryptjs');


router.post('/register', async (req, res) => {
    const seller = new sellerschema ({
        fname : req.body.firstname,
        lname : req.body.lastname,
        email : req.body.email,
        phone : req.body.phone,
        password : bcrypt.hashSync(req.body.password, 10),
        confirmpassword : req.body.confirmpassword,
    });

    await seller.save();
    res.redirect('/cpanel/seller/')
})

router.post('/seller_login', async (req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const user = await sellerschema.findOne({ email });
        
        if(user && bcrypt.compareSync(password, user.password)){
            res.redirect("/cpanel/seller")
        }
        else{
            res.status(400).send("password is wrong! ");
        }
    }
    catch(error) {
        console.log(error);
    }    
});

router.get('/cpanel/seller/', function(req, res) {
    res.render('pages/cpanel/seller/index');
});

router.get('/cpanel/seller/index', function(req, res) {
    res.render('pages/cpanel/seller/index');
});

router.get('/cpanel/seller/order_history', function(req, res) {
    res.render('pages/cpanel/seller/order_history');
});

router.get('/cpanel/seller/login', function(req, res) {
    res.render('pages/cpanel/seller/login');
});
router.get('/cpanel/seller/chatbot', function(req, res) {
    res.render('pages/cpanel/seller/chatbot');
});

router.get('/cpanel/seller/register', function(req, res) {
    res.render('pages/cpanel/seller/register');
});

router.get('/cpanel/seller/forgotpsw', function(req, res) {
    res.render('pages/cpanel/seller/forgotpsw');
});

router.get('/cpanel/seller/notification', function(req, res) {
    res.render('pages/cpanel/seller/notification');
});
router.get('/cpanel/seller/account', function(req, res) {
    res.render('pages/cpanel/seller/account');
});

router.get('/cpanel/seller/print_payment_details', function(req, res) {
    res.render('pages/cpanel/seller/print_payment_details');
}); 

router.get('/cpanel/seller/product_add', function(req, res) {
    res.render('pages/cpanel/seller/product_add');
});

router.get('/cpanel/seller/product_list', function(req, res) {
    res.render('pages/cpanel/seller/product_list');
});

module.exports = router
