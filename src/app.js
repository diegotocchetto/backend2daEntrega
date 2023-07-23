import express from 'express';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import productRouter from './routes/products.router.js';
import routerCar from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import realTimeRouter from './routes/realTimeProducts.router.js';
import { authRouter } from './routes/auth.router.js';
import { sessionsRouter } from './routes/sessions.router.js';
import handlebars from 'express-handlebars';
import { __dirname, connectMongo,connectSocket} from './utils.js';
import { iniPassport } from './config/passport.config.js';
import ChatRouter from './routes/chat.router.js';
import { usersRouter } from './routes/users.router.js';
import 'dotenv/config'



//EXPRESS
const app = express();
const port=process.env.PORT;
const httpServer =app.listen(port, () => {
    console.log("Conected to http://localhost:"+ port);
});


//--------------------- SESSION ---------------------//
app.use(
    session({
      store: MongoStore.create({ mongoUrl: process.env.MONGOURL, ttl: 7200 }),
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
    })
  );
  
  iniPassport();
  app.use(passport.initialize());
  app.use(passport.session());

connectMongo();
connectSocket(httpServer);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//RUTAS
app.use('/static',express.static('./src/public'));
app.use('/api/carts', routerCar);
app.use('/api/products', productRouter);
app.use("/", realTimeRouter)
app.use('/api/sessions', sessionsRouter);
app.use('/auth', authRouter);
app.use("/api/users", usersRouter);



// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views",__dirname+ "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname+'/public'));
app.use('/chat',ChatRouter);
app.use('/products', viewsRouter); //voy  aseparr os routeers
app.use('/carts/:cid', viewsRouter);
app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);



// redirect to /home
app.get("/", (req, res) => {
  res.redirect("/products");
});

 
//not found
app.use("*", (req, res, next) => {
  res.render("notfound");
});















