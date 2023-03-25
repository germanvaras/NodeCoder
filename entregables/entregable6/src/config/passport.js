const passport = require("passport");
const GitHubStrategy = require("passport-github2");
require("dotenv").config();
const {
    getUserById,
    createUserService,
    getUserByUsername,
} = require("../services/user");

const initPassport = () => {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
    
        const user = await getUserById(id);
        done(null, user);
    });
    passport.use(
        "github",
        new GitHubStrategy(
            {
                clientID: process.env.githubClientId,
                clientSecret: process.env.githubSecret,
                callbackUrl: process.env.githubCallBack,
                
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    console.log(profile)
                    let user = await getUserByUsername(profile.username)
                    if (!user) {
                        let newUser = {
                            username: profile._json.login,
                            email: profile.emails[0].value,
                            password: "",
                        };
                        let userAdded = await createUserService(newUser);
                        console.log("userAdded", userAdded);
                        done(null, userAdded);
                    } else {
                        done(null, user);
                    }
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
};

module.exports = initPassport;
