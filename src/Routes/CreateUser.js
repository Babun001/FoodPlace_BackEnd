const express = require('express')
const router = express.Router()
const User = require('../models/User')

const { body, validationResult } = require('express-validator')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser } = require('../repositories/userRepository');
const jwtSecret = "ThisisBabunRoyTheAuthorOf@FoodPlace#Application";

router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password', "Incorrect Password!").isLength({ min: 5 })]
    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(5);
        let SecPassword = await bcrypt.hash(req.body.password, salt)

        const r = createUser(req.body.name, SecPassword, req.body.email, req.body.location)
        return res.json({success:r})
        // try {
        //     await User.create({
        //         name: req.body.name,
        //         password: SecPassword,
        //         email: req.body.email,
        //         location: req.body.location

        //     })
        //     return res.json({ success: true });
        // }

        // catch (err) {
        //     console.log(err)
        //     return res.json({ success: false });
        // }
    })

router.post("/loginuser", [
    body('email').isEmail()]
    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userdata = await User.findOne({ email })
            if (!userdata) {
                return res.status(400).json({ errors: "Invalid Email-id!" });
            }
            else {
                const pwdCompare = await bcrypt.compare(req.body.password,userdata.password);
                if (!pwdCompare) {
                    return res.status(400).json({ errors: "Incorrect Password!" });
                }
            }
            console.log(userdata);

            const data = {
                user:{
                    id:userdata.id
                }
            }
            const authtoken =jwt.sign(data,jwtSecret)
            return res.json({ success: true, authtoken:authtoken});
        }

        catch (err) {
            console.log(err)
            res.json({ success: false });
        }
    })

module.exports = router;