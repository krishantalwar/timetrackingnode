// const passport = require("passport");
// // start code for sign in with google
// const GoogleStrategy = require("passport-google-oauth2").Strategy;
// const facebookStrategy = require('passport-facebook').Strategy;

// // used to serialize the user for the session
// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// // used to deserialize the user
// passport.deserializeUser(function (user, done) {
//   done(null, user);
// });

// //Google strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL,
//       passReqToCallback: true,
//     },
//     (request, accessToken, refreshToken, profile, done) => {
//       // console.log("profile   ", profile);
//       done(null, profile);
//     }
//   )
// );


// //facebook strategy

// passport.use(new facebookStrategy({
//   // pull in our app id and secret from our auth.js file
//   clientID        : process.env.FACEBOOK_CLIENT_ID,
//   clientSecret    : process.env.FACEBOOK_SECRET_ID,
//   callbackURL     : process.env.FACEBOOK_CALLBACK_URL,
//   profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)','email']

// },// facebook will send back the token and profile
// function(request,token, refreshToken, profile, done) {
//   // console.log(profile)
//   return done(null,profile)
// }));
