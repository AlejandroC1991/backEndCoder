import passport from 'passport';
import userModel from '../dao/models/users.js';
import GitHubStrategy from 'passport-github2';

const initializePassport = () => {
    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.199f2494f3260cd3',
        clientSecret: '9a3ce0a68593fc8e820290cfa34a2c6c046f3f6e',
        callbackURL: 'http://localhost:8080/api/sessions/github-callback'
    }, async(accessToken, refreshToken, profile, done) => {
        try {
            const user = await userModel.findOne({ email: profile._json.email });
            if (!user) {
                const newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    age: 18,
                    email: profile._json.email,
                    password: ''
                };

                const result = await userModel.create(newUser);

                done(null, result);
            } else {
                done(null, user);
            }
        } catch (error) {
            done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    });
};

export default initializePassport;




