import express from "express";
import eventsRouter from "./routes/events.routes.js"
import cors from "cors";
const app = express();
const PORT = 3000;
app.use(cors({ origin: "http://localhost:5173" }));
app.get("/api/health", (req, res) => {
    console.log("health route called")
  res.json({ status: "ok" });
});
app.use("/api/events", eventsRouter);



app.listen(PORT, () => {
  // TODO 2: print a message saying the server runs on this port
  console.log(`the server works on this port, ${PORT}!`);   
});