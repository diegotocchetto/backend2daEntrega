import passport from 'passport';
import local from 'passport-local';
import { createHash, isValidPassword } from '../utils.js';
import { UserModel } from '../DAO/Mongo/models/users.model.js';
const LocalStrategy = local.Strategy;
import {CartService} from '../services/carts.service.js';
import GithubStrategy from 'passport-github2';
import 'dotenv/config'
import logger from '../utils/logger.js';
import {sendMailRegister} from '../utils/mail.js';

const cartService = new CartService();

export function iniPassport() {
  passport.use(
    'login',
    new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ email: username });
        if (!user) {
          logger.debug('User Not Found with email ' + username);
          return done(null, false);
        }
        if (!isValidPassword(password, user.password)) {
          logger.debug('Invalid Password');
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.use(
    'register',
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: 'email',
      },
      async (req, username, password, done) => {
        try {
          const {firstName, lastName, email, age } = req.body;
          const cart = await cartService.createOne();
          const cartId = cart._id;
          let user = await UserModel.findOne({ email: username });
          if (user) {
            logger.debug('User already exists');
            return done(null, false);
          }

          const newUser = {
            email,
            firstName,
            lastName,
            age,
            role: 'user',
            password: createHash(password),
            cartId: cartId
          };
          let userCreated = await UserModel.create(newUser);
          logger.info('User Registration successful', { user: userCreated });
          await sendMailRegister(email,firstName);
          return done(null, userCreated);
        } catch (e) {

          return done(e);
        }
      }
    )
  );


  passport.use(
    'github',
    new GithubStrategy(
        {
            clientID: process.env.clientID,
            clientSecret: process.env.clientSecret,
            callbackURL: process.env.callbackURL,
        },
        async (accessToken, _, profile, done) => {
          logger.debug(profile);
            try {
                const res = await fetch('https://api.github.com/user/emails', {
                    headers: {
                        Accept: 'application/vnd.github+json',
                        Authorization: 'Bearer ' + accessToken,
                        'X-Github-Api-Version': '2022-11-28',
                    },
                });
                const emails = await res.json();
                const emailDetail = emails.find((email) => email.verified == true);

                if (!emailDetail) {
                    return done(new Error('cannot get a valid email for this user'));
                }
                profile.email = emailDetail.email;

                let user = await UserModel.findOne({ email: profile.email });
                if (!user) {
                  const cart = await cartService.createOne();
                  const cartId = cart._id;
                    const newUser = {
                        email: profile.email,
                        firstName: profile._json.name || profile._json.login || 'noname',
                        lastName: 'nolast',
                        isAdmin: false,
                        cartId: cartId,
                        password: profile.password || '',
                    };
                
                    logger.info("login github");
                    let userCreated = await UserModel.create(newUser);
                    logger.info('User Registration succesful');
                    return done(null, userCreated);
                } else {

                    return done(null, user);
                }
            } catch (e) {
                return done(e);
            }
        }
    )
);




  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await UserModel.findById(id);
    done(null, user);
  });
}