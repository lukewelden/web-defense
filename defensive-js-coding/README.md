# Trey Coding 
This mini project has been created to demonstrate how write defensive javascript code.
This project is part of the *Security, Infrastructure, and Scalability | Common Attacks on Web Applications* module
from Codecademy's Backend Engineer Career Path. 

## Brief 
Congrats! You were just hired as a junior web developer at Trey Corp! Trey Corp has been around for several decades. Over the years, developers rarely had the opportunity to maintain their code. That’s where you come in - your first assignment at Trey Corp is to update some of the legacy code.

The code you’ve been tasked to update is a Node.js express server that hosts web pages consisting of various utilities. Senior devs want you to find and fix any vulnerabilities you come across to improve overall security. Good luck!

## Tools 
- [ESLint](https://eslint.org/)
- [safe-eval]()

## Tasks completed 
- Setup ESLint with `npm init @eslint/config`
- Identified issues with `npx eslint .`
- Fixed some of the issues identified above with `npx eslint --fix .`
- Removed the delete commands that were causing SyntaxErrors
```js
// main.js
delete hostname;
delete port;
```
- Removed duplicate parameters that were causing SyntaxErrors 
```js
// calculator.js 
export default function calculator_callback(request, response, response)
```
- Corrected variable declarations that were causing ReferenceErrors
```js
// main.js
hostname = "localhost";
port = process.env.PORT || 4001;
app = express();
```
- Fixed a file system vulnerability by enforcing input to use a specific directory 
```js
// main.js
const filename = name;
content = fs.readFileSync(filename, "utf8");
response.send(content);
```
- Imported safe-eval and replaced insecure use of eval()
```js
// calculator.js 
const answer = eval(expression);
```
- Fixed exec() vulnerability by replaced exec with execFile
```js
// linux.js
if (command) {
    content = fs.readFileSync("public/linux.html", "utf8");
    // this allows you to run whatever command and arguments you want 
    exec(command, (error, stdout, stderr) => {
        if (error || stderr) {
            content = content.replace("&gt;", "&gt; " + (error ? error + "<br/>" : "") + stderr)
        } else {
            content = content.replace("&gt;", "&gt; " + stdout)
        }
        response.send(content);
    });
```
- 