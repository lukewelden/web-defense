# web-defense
A repo to document findings from the 'Common Attacks on Web Applications' module from Codecademy's Backend Engineer career Path. 

In this repo you'll see the definition and how to prevent the following common attacks: 
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- SQL Injection Attacks 

You can also see some defensive coding in JavaScript. 

## Cross-Site Request Forgery (CSRF)
- Cross-Site Request Forgery (CSRF) is a vulnerability that tricks a user into submitting a web request on behalf of an attacker. This is often done by crafting a URL embedded with a request and tricking an authenticated user into clicking it. Examlpes include:
`http://bank.com/send?recipient=Stranger&amount=2000`
`https://oursite.com/changepassword.php?new_password=[USER PASSWORD]`
- CSRF attacks usually target state-changing web requests, such as payments, account information changes, fund transfers, and security setting changes. These attacks can be highly detrimental to the victim and can harm the reputation of the company behind the web application.
- One of the simplest ways to prevent CSRF attacks is to add a CSRF token to each request. This token is a unique, dynamically generated value used to verify all requests. The attacker does not have access to this token and cannot get the user to complete the same request without it.
- Despite the effectiveness of CSRF tokens, they can still fail if an application is vulnerable to Cross-Site Scripting (XSS) attacks. An attacker could use an XSS attack to extract the CSRF token.
- An additional layer of security against CSRF attacks is to ask users to re-authenticate by manually entering additional information prior to a critical request. This ensures that an attacker isn’t able to easily compromise a user, even with XSS.

## SQL Injection 
SQL Injection is a vulnerability that allows an attacker to manipulate SQL queries by injecting malicious input. This can lead to unauthorized access to data, data manipulation, or even system takeover.

### Attack Methods
- Union-Based Injections: These use the SQL UNION keyword to combine results from two SELECT queries, potentially revealing sensitive information.
- Error-Based Injections: These force the application to return an error message that contains sensitive data.
- Boolean-Based Injections: These involve SQL statements that confirm TRUE/FALSE questions about the database, with the attacker observing changes in the web response.
- Time-Based Injections: These use SQL functions like SLEEP() and BENCHMARK() to cause delays in the application's response time, allowing the attacker to infer information.
- Out-of-Band SQL Injections: These are rare and difficult to execute, but involve the database server sending HTTP or DNS requests containing SQL query results to an attacker-controlled server.

### Prevention
- Input Sanitization: Always sanitize user inputs to ensure they do not contain SQL syntax. This can be done using functions that escape special characters or using allow-lists that only permit certain types of input.
- Prepared Statements: Use prepared statements (or parameterized queries) in your code. These ensure that user input is always treated as literal values and not part of the SQL command.

#### Tools and technology
- [Validator.js](https://www.npmjs.com/package/validator)
- [express-validator](https://www.npmjs.com/package/validator)

## Cross-Site Scripting (XSS)
Cross-Site Scripting (XSS) is a vulnerability where unsanitized input is rendered on the front end, allowing an attacker to inject malicious code (usually JavaScript) that can steal user data, redirect users to malicious pages, or take control of their browser.

### Attack methods
- Stored XSS: Occurs when a web server stores unsanitized user input and displays it to other users, allowing an attacker to inject and store a malicious script on the website.
- Reflected XSS: Occurs when a user's input is immediately returned back to them without being stored on the server, allowing attackers to target specific users with a malicious script.
- DOM-Based XSS: Occurs when user input is interpreted by the DOM, allowing an attacker to inject malicious code that operates on the client-side.

### Prevention 
As with SQL Injection the main protection against XSS is Data Sanitization. 

#### Tools and technology
- [sanitize-html](https://www.npmjs.com/package/sanitize-html)
- [helmet](https://www.npmjs.com/package/helmet)

## Denfensive JavaScript 
In this section we'll run through the fundamental concepts of vulnerabilities and defensive programming with Javascript. For practical examples be sure to checkout the [defensive-js-coding](./defensive-js-coding/) directory. 
### Dangers of eval
The eval() function in JavaScript takes a string as an argument and executes it as Javascript source code. Not only is it slow to execute, but bad actors can also inject malicious code into the input string for mischievous reasons. Thus, it’s best never to use it. If you MUST use it, only allow trusted and predetermined input through it. NEVER trust user input.
The functions, setInterval(), setTimeout(), and new Function() use eval() in their implementations, and should be used with the same caution.
### Dangers of fs module 
The fs module coupled with improperly sanitized user input gives attackers access to our entire file system and exposes it to vulnerabilities. To mitigate the risk, we can tweak our code to restrict traversal scope to a directory of our choice using path.join() and process.cwd().
### Dangers of Regular Expressions
Attackers can make use of insecure regex expressions to trigger a Regular expression Denial of Service (ReDoS). The RegEx engine can lead to catastrophic backtracking by taking an exponential amount of backtracking steps on poorly defined Regex expressions. To prevent this danger, we can use the validator npm package, which provides a library of string validators and sanitizers for things like IP addresses, emails, and phone numbers. We can also use tools like the safe-regex npm package to detect dangerous regular expressions.
### JavaScript Strict Mode 
JavaScript strict mode is a defensive tool that can reveal vulnerabilities in JavaScript code by throwing errors that would otherwise be silent. By intentionally enforcing different semantics, it will throw errors on things like assignments to undefined variables, duplicate parameters, deleting variables or functions, et cetera. To enable strict mode, simply add "use strict"; to the beginning of the Javascript file.
### Static Code Analysis 
A lint, or linter, is a static code analysis tool used to evaluate and improve source code without executing it. It can find and flag programming errors, bugs, and patterns that may compromise security. The most popular JavaScript linters are ESLint, JSLint, and JSHint. They can be customized to one’s needs by using configuration files or third-party plugins.

eslint-plugin-security is a plugin for ESlint that adds rules to detect several security vulnerabilities including unsafe regular expressions, non-literal exec(), eval() used with an expression, and more!
### Dangers and Alternatives of exec
The exec() method can lead to a vulnerability where user input can run as a shell command. The danger is that unrestricted commands can access, modify, and delete files. The execFile() method is an alternative that works similarly to exec() but requires the separation of the commands and their arguments.

## Remediation and Incident Response 
- Incident: the term _incident_ is when something bad happens, like a breach or policy violation, that harms or potentially harms the security of a system
- Remediation: the process of fixing a security issue such as patching a vulnerability in a piece of software, removing malware from an infected computer, or kicking a malicious attacker out of a network
- Incident Response: everything that needs to happen to investigate and recover from an incident. 
- Incident Response Lifecycle 
    1. Preparation 
    2. Detection
    3. Analysis and Investigation
    4. Remediation
    5. Review 