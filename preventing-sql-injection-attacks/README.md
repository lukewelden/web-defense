# Codey's Confectionary 
This mini project has been created to demonstrate how protect a node.js application from SQL injection.
This project is part of the *Security, Infrastructure, and Scalability | Common Attacks on Web Applications* module
from Codecademy's Backend Engineer Career Path. 

## Brief 
Codey’s Confectionery added a new page on their website where visitors can enter their customer ID number to see the information that the bakery has on file. A clever hacker discovered that the form is vulnerable to a SQL injection where submitting malicious code to the form will display all of the customer information.

Throughout this project you will harden the web form to validate that the submission is a number, as well as convert the SQL query to a prepared statement preventing a SQL injection attack.

## Tasks completed 
- Required [Validator.js](https://www.npmjs.com/package/validator) in [app.js](./app.js) 
```js
const validator = require('validator');
```
- Validated that user input is an integar using `validator.isInt()`
```js
if (!validator.isInt(req.body.customerId))
```
- Changed SQL query to a prepared query 
```js
db.all(
    `SELECT * FROM Employee WHERE EmployeeId = $customerId`, 
    { $customerId: req.body.customerId }, 
    (err, rows) => {
        if (rows) {
            res.status(200);
            res.json(rows);
        } else {
            res.status(200);
            res.json({ message: "No employees" });
        }
    });
```