import http from "http";
import { ProofRequest } from "./interface";

const myServer = http.createServer((req, res) => {
    // Read the data from the request
    let data = "";

    req.on("data", (chunk) => {
        data += chunk.toString();
    });

    // When the request is done
    req.on("end", () => {
        let request: ProofRequest = JSON.parse(data);
        console.log(request)
    });

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
        JSON.stringify({
            success: true,
            message: {a: 1},
    }));
});

myServer.listen(3000, () => {
    console.log('Server is running on port 3000. Go to http://localhost:3000/')
});