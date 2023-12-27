import fs from "fs";
// Imported execFile
import { execFile } from "child_process";

export default function linux_callback(request, response) {
    const command = request.query?.commandChooser;
    console.log(command);
    let content = "";

    if (command) {
        const [rootcommand, ...args] = command.split(" ");
        content = fs.readFileSync("public/linux.html", "utf8");
        // Converted exec to execFile
        execFile(rootcommand, args, (error, stdout, stderr) => {
            if (error || stderr) {
                content = content.replace("&gt;", "&gt; " + (error ? error + "<br/>" : "") + stderr)
            } else {
                content = content.replace("&gt;", "&gt; " + stdout)
            }
            response.send(content);
        });
    } else {
        try {
            content = fs.readFileSync("public/linux.html", "utf8");
        } catch (e) {
            console.log("Error:", e.stack);
        }
        response.send(content);
    }
}
