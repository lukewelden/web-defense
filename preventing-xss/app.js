const express = require("express");
const session = require("express-session");
// Require new packages below
const helmet = require("helmet");
// Added the 'check' function below:
const { validationResult, check } = require("express-validator");

const PORT = process.env.PORT || 4001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set('trust proxy', 1)
// Add helmet below

app.use(
  session({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 300000000, 
      sameSite: 'none',
      // Securing the cookie below
      secure: true,
      httpOnly: true
    },
  })
);

app.get("/", (req, res) => {
  res.render("home");
});

// Endpoint in development
app.post(
  "/review",
  [
    // Checking email is an email
    check("email").isEmail().normalizeEmail(),
    // Checking restaurant name is not empty and blacklists the characters < and >
    check("restaurant_name").not().isEmpty().blacklist("<>"),
    // Checking rating is numeric 
    check("rating").isNumeric(),
    // Checking review is not empty and blacklists the characters < and >
    check("review").not().isEmpty().blacklist("<>")    
  ],
  (req, res) => {
    var errors = validationResult(req).array();
    console.log(`Errors found: ${JSON.stringify(errors)}`);
    if (errors.length >= 1) {
      res.redirect("/error");
    } else {
      console.log("Data was valid!");
      res.redirect("/success");
    }
  }
);

app.get("/success", (req, res) => {
  res.render("success");
});

app.get("/error", (req, res) => {
  res.render("error");
});

app.listen(PORT, () =>
  console.log(`The server is listening at port: http://localhost:${PORT}`)
);
