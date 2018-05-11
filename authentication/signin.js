'use strict'
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.local.password);
}

module.exports = (passport) => {

    passport.use('local-signin', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback : true
        },
        (req, email, password, done) => { 
            // check in mongo if a user with email exists or not
            User.findOne({ 'local.email' :  email }, 
                (err, user) => {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);

                    // Username does not exist, log the error and redirect back
                    if (!user || !isValidPassword(user, password)){
                        console.log(`User not found with email ${email}`);
                        
                        return done(null, false, req.flash('error', 'Invalid credentials')); // redirect back to login page                 
                    }

                    // User and password both match, return user from done method
                    // which will be treated like success
                    return done(null, user);
                }
            );

        })
    );
}