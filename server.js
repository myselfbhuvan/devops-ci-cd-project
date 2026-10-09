const http = require("http");
const fs = require("fs");
const url = require("url");

const PORT = 5000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    // Serve calculator.html
    if (parsedUrl.pathname === "/") {
        fs.readFile("calculator.html", (err, data) => {
            if (err) {
                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });

                res.end("Error loading calculator.html");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(data);
        });
    }

    // Calculator API
    else if (parsedUrl.pathname === "/calculate") {
        const num1 = Number(parsedUrl.query.num1);
        const num2 = Number(parsedUrl.query.num2);
        const operation = parsedUrl.query.operation;

        let result;

        switch (operation) {
            case "+":
                result = num1 + num2;
                break;

            case "-":
                result = num1 - num2;
                break;

            case "*":
                result = num1 * num2;
                break;

            case "/":
                result = num2 !== 0
                    ? num1 / num2
                    : "Cannot divide by zero";
                break;

            default:
                result = "Invalid operation";
        }

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            num1: num1,
            num2: num2,
            operation: operation,
            result: result
        }));
    }

    // 404
    else {
        res.writeHead(404, {
            "Content-Type": "text/plain"
        });

        res.end("404 - Not Found");
    }
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});