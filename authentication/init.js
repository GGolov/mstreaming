'use strict'
const signin = require('./signin');
const signup = require('./signup');
const User = require('../models/user');

module.exports = (passport) => {

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log(`Serializing user ${user.email}`);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            console.log(`Deserializing user ${user.email}`);
            done(err, user);
        });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    signin(passport);
    signup(passport);
}