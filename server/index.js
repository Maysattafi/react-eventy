import express from "express";

const app = express();
const PORT = 3000;

app.get("/api/health", (req, res) => {
    console.log("health route called")
  // TODO 1: send back a JSON response: { status: "ok" }
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  // TODO 2: print a message saying the server runs on this port
  console.log(`the server works on this port, ${PORT}!`);   
});