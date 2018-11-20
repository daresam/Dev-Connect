const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const keys = require('../../config/keys');
const User = require('../../model/User');
const validateRegisterInput = require('../../validation/user/register');
const validateLoginInput = require('../../validation/user/login');

// @route /api/users
// @desc load all users
// @access private
router.get('/', (req, res) => {
    User.find()
        .then(users => {
            if (!users) {
                return res.status(404).json({
                    msg: 'No User Information Found'
                });
            } else {
                return res.status(200).json({
                    users: users
                });
            }
        });

});

// @route /api/users/register
// @desc register a new user
// @access public
router.post('/register', (req, res) => {

    // Validate Input
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                errors.email = "Email already exist";
                return res.status(400).json(errors);
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', //size
                    r: 'pg', // Rating
                    d: 'mm' // default
                });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avatar
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json({
                                user: user
                            }))
                            .catch(err => console.log(err));
                    })
                });

            }
        })
});

// @route /api/users/login
// @desc login a user
// @access public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Validate Input
    const {
        errors,
        isValid
    } = validateLoginInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    // check for user
    User.findOne({
            email
        })
        .then(user => {
            if (!user) return res.status(404).json({
                email: 'User not found'
            });

            // Check Password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // User Match
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        };
                        // Generate Token
                        jwt.sign(payload, keys.secret, {
                            expiresIn: 3600
                        }, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        })

                    } else {
                        return res.status(400).json({
                            password: 'Password incorrect'
                        });
                    }
                });
        });

});

// @route /api/users/current
// @desc get the crrent user
// @access private
router.get('/current', passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {
        res.json({
            user: {
                id: req.user.id,
                name: req.user.name,
                email: req.user.email,
                avatar: req.user.avatar
            }

        });

    });



module.exports = router;