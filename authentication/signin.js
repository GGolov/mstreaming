'use strict'
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')

module.exports = (passport) => {

    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        (req, email, password, done) => { 
            // check in mongo if a user with email exists or not
            User.findOne({ 'email' :  email }, 
                (err, user) => {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!user){
                        console.log(`User not found with email ${email}`);
                        return done(null, false, req.flash('message', 'User Not found'));                 
                    }
                    // User exists but wrong password, log the error 
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    return done(null, user);
                }
            );

        })
    );

    const isValidPassword = (user, password) => {
        return bcrypt.compareSync(password, user.password);
    }
}