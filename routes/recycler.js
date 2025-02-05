const { recyclerschema } = require("../models/recycler")
const express = require("express");
const router = express.Router()
const bcrypt = require('bcryptjs');


router.post('/recycler_register', async (req, res) => {
    const recycler = new recyclerschema({
        fname : req.body.firstname,
        lname : req.body.lastname,
        email : req.body.email,
        phone : req.body.phone,
        password : bcrypt.hashSync(req.body.password, 10),
        confirmpassword : req.body.confirmpassword,
    });

    await recycler.save();
    res.redirect('/')
})

router.post('/recycler_login', async (req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const recycler = await recyclerschema.findOne({ email });
        
        if(recycler && bcrypt.compareSync(password, user.password)){
            res.redirect("/shop")
        }
        else{
            res.status(400).send("password is wrong! ");
        }
    }
    catch(error) {
        console.log(error);
    }    
});

router.get('/cpanel/recycler/', function(req, res) {
    res.render('pages/cpanel/recycler/index');
});
router.get('/cpanel/recycler/index', function(req, res) {
    res.render('pages/cpanel/recycler/index');
});
router.get('/cpanel/recycler/recycler_payment', function(req, res) {
    res.render('pages/cpanel/recycler/recycler_payment');
});

router.get('/cpanel/recycler/recycler_submit', function(req, res) {
    res.render('pages/cpanel/recycler/recycler_submit');
});

router.get('/cpanel/recycler/login', function(req, res) {
    res.render('pages/cpanel/recycler/login');
});

router.get('/cpanel/recycler/register', function(req, res) {
    res.render('pages/cpanel/recycler/register');
});

router.get('/cpanel/recycler/forgotpsw', function(req, res) {
    res.render('pages/cpanel/recycler/forgotpsw');
});

router.get('/cpanel/recycler/schedule', function(req, res) {

    Query = "SELECT * FROM recycler_schedule"
    connection.query(Query, function(err, result){
        if(err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.render('pages/cpanel/recycler/schedule', { data: result });
    });
});

router.get('/cpanel/recycler/notification', function(req, res) {
    const query = 'SELECT * FROM industrial_schedule ';

    connection.query(query, function(err, result) {
        if (err) {
            console.error('Error executing query:', error);
            return res.status(500).send('Internal Server Error');
        }
        res.render('pages/cpanel/recycler/notification', { data: result });
    });
});

router.get('/cpanel/recycler/print_payment_details', function(req, res) {
    res.render('pages/cpanel/recycler/print_payment_details');
});
router.get('/cpanel/recycler/chatbot', function(req, res) {
    res.render('pages/cpanel/recycler/chatbot');
});

module.exports = router
