import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import indexRouter from "./routes/indexRouter.js";
import loginRouter from "./routes/loginRouter.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { csrfSync } from "csrf-sync";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure cookies in production
      sameSite: "strict",
    },
  })
);

app.use(passport.session());

passport.use(
  new LocalStrategy((username, password, done) => {
    const test = { id: 1, username: "admin", password: "test" };

    if (username !== test.username) {
      return done(null, false, { message: "Incorrect username" });
    }
    if (password !== test.password) {
      return done(null, false, { message: "Incorrect password" });
    }
    return done(null, test);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  const test = { id: 1, username: "admin", password: "test" };
  done(null, test)
})

// Retrieve csrftoken from form body
export const { csrfSynchronisedProtection, generateToken, revokeToken } =
  csrfSync({
    getTokenFromRequest: (req) => {
      return req.body["CSRFToken"];
    },
  });
app.use((req, res, next) => {
  if (req.path === "/login") {
    return next();
  }
  csrfSynchronisedProtection(req, res, next);
});

app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

//
//
//
// Routes

app.use("/login", loginRouter);
app.use("/", indexRouter);

//
//
//
//

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
