# Restreview 
This mini project has been created to demonstrate how protect a node.js application from Cross Site Scripting 
attacks (XSS). 
This project is part of the *Security, Infrastructure, and Scalability | Common Attacks on Web Applications* module
from Codecademy's Backend Engineer Career Path. 

## Brief 
Welcome to Restreview!

Restreview is an application that publicly compiles reviews on selected restaurants.

The product is in the very early stages, and we’re taking over the development of the landing page to review a restaurant. We’re working closely with a new intern and, unfortunately, the current code hasn’t been secured properly and is vulnerable to different types of XSS attacks!

For this project, we’ll focus on implementing best practices and adding layers of security to protect the app from DOM-Based, Reflected, and Stored XSS Attacks.

We’ll make use of helmet and express-validator as well as explore how to use alternative methods from the document object in order to prevent any potential attacks on the application.

## Tasks completed 
- Secured end user cookies with the following properties in the cookie object of the session
```js
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
```
- Added data validation and sanitization to the `/review` endpoint
```js
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
```
- Generated the current URL in a more secure way. 
```html
<!-- Commenting out insecure code
<script>
  document.write("<b>Current URL</b> : " + document.baseURI);
</script>
--> 

<!-- replacing above insecure code with a more secure way to wright the current url -->
<script> 
document.getElementById("urlinfo").textContent = document.baseURI;
</script>

<body>
<b>Current URL:</b><span id="urlinfo"></span>
```
- Implemented [helmet](https://www.npmjs.com/package/helmet) to add some default security to the project
```js
const helmet = require("helmet");
```