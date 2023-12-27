import fs from "fs";
// Imported safe-eval
import safeEval from "safe-eval";

// Fixed duplicate parameter name
export default function calculator_callback(request, response) {
    const expression = request.query?.expressionChooser;
    let content = "";

    if (expression) {
        try {
            content = fs.readFileSync("public/calculator.html", "utf8");
            // Replaced eval with safe-eval
            const answer = safeEval(expression);
            content = content.replace("&gt;", "&gt; " + answer)
            response.send(content);
        } catch (e) {
            content = content.replace("&gt;", "&gt; " + e)
            response.send(content);
        }
    } else {
        try {
            content = fs.readFileSync("public/calculator.html", "utf8");
        } catch (e) {
            console.log("Error:", e.stack);
        }
        response.send(content);
    }
}
