const { userschema } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  const user = new userschema({
    fname: req.body.firstname,
    lname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    password: bcrypt.hashSync(req.body.password, 10),
    confirmpassword: req.body.confirmpassword,
  });

  await user.save();
  res.redirect("/");
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await userschema.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.redirect("/shop");
    } else {
      res.status(400).send("password is wrong! ");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/", function (req, res) {
  res.render("pages/index");
});

router.get("/index", function (req, res) {
  res.render("pages/index");
});

router.get('/about_us', function(req, res) {
  res.render('pages/about_us');
});

router.get('/shop', function(req, res) {
    res.render('pages/shop');
});

router.get('/cart', function(req, res) {
    res.render('pages/cart');
});

router.get('/wishlist', function(req, res) {
    res.render('pages/wishlist');
});

router.get('/checkout', function(req, res) {
    res.render('pages/checkout');
});

router.get('/contact', function(req, res) {
    res.render('pages/contact');
});

router.get('/account', function(req, res) {
    res.render('pages/account');
});

router.get('/faq', function(req, res) {
    res.render('pages/faq');
});

router.get('/login', function(req, res) {
    res.render('pages/login');
});


router.get('/user_invoice', function(req, res) {
    res.render('pages/user_invoice');
});

router.get('/register', function(req, res) {
    res.render('pages/register');
});

router.get('/terms_and_condition', function(req, res) {
    res.render('pages/terms_and_condition');
});

router.get('/privacy_policy', function(req, res) {
    res.render('pages/privacy_policy');
});

router.get('/product_details', function(req, res) {
    res.render('pages/product_details');
});


module.exports = router;
