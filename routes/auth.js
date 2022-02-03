const router = require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js")

// register route
router.post("/register", async (req , res) => {
    const newUser = new User(
        {
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.decrypt("req.body.password", "process.env.PASS_KEY").toString(),
    });

    try{
        const savedUser = await newUser.save()
        res.status(201).json(savedUser);    
    } catch (err) {
        res.status(500).json(err);
    }
});

// login route
// used CryptoJS to encrypt passwords for users
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        !user && res.status(401).json("Incorrect User Name!");

        const hashPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_KEY);
        const originalPassword = hashPassword.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password && res.status(401).json("Incorrect Password!");

        const {password, ...others} = user._doc;

        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router