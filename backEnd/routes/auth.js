const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const mailgun = require("mailgun-js");

//REGISTER
router.post("/register", async (req, res) => {
    try {
        const { firstname, lastname, username, email, password } = req.body;

       // Check if user with the same email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(401).json("User with this email or username already exists");
        } 

        // Create a new user
        const encryptedPassword = CryptoJS.AES.encrypt(
            password, 
            process.env.PASS_SEC
        ).toString();

        const newUser = new User({
            firstname,
            lastname,
            username,
            email,     
            password: encryptedPassword,
        });

        const savedUser = await newUser.save(); 
        res.status(201).json(savedUser);
    } catch (err) {
        console.error('An error occurred:', err)
        res.status(500).json({ message: "Internal server error." });
    }
});

//LOGIN

router.post("/login", async(req,res) => {
    try {
        const user = await User.findOne({username: req.body.username});

        if (!user) {
            return res.status(401).json("Wrong Credentials!")
        }
        
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password, 
            process.env.PASS_SEC
            );

        const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (Originalpassword !== req.body.password) {
            return res.status(401).json("Wrong Credentials!")
        }

        const accessToken = jwt.sign(
            {
                id:user._id, 
                isAdmin: user.isAdmin,
            }, process.env.JWT_SEC,
            {expiresIn: "3d"}
        );

        const { password, ...others } = user._doc;

        res.status(200).json( {...others, accessToken} );
    } catch(err) {
        console.error('An error occured:', err)
        res.status(500).json(err);
    }
});

//SEND CONFIRMATION EMAIL
router.post("/sendmail", async (req, res) => { 
    const { messageData, location } = req.body;
    const API_KEY = process.env.MAILGUN_API_KEY;
    const DOMAIN = process.env.MAILGUN_DOMAIN;
    const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });
    try {
        mg.messages().send(messageData, function (error, body) {
            if (error) {
                console.error(error);
                res.status(500).json({ message: "Internal server error." });
            } else {
                console.log(body);
                res.status(200).json({ message: location + " - Email sent successfully" });
            }
        });
    } catch (err) {
        console.error('An error occurred:', err)
        res.status(500).json({ message: "Internal server error." });
    }
});
  

module.exports = router;