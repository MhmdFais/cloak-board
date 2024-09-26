const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../controller/user')

function initialize(passport){
    const authenticateUser = async (email, password, done) => {
        const user = await User.findOne({email : email})

        if(!user){
            return done(null, false, { message: 'Invalid Credidentials' })
        }

        try{
            const isMatchPassword = await bcrypt.compare(password, user.password)

            if(isMatchPassword){
                return done(null, user);
            }
            else {
                return done(null, false, { message: 'Invalid Credidentials' })
            }
        } catch (error){
            return done(error)
        }
    }

    passport.use(new LocalStrategy({usernameField : 'email'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    })
}

module.exports = initialize