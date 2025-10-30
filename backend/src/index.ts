import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.js";

// configures dotenv to work in your application
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (request, response) => {
  response
    .status(200)
    .send("Welcome to the Client Saving Application Backend!");
});

// Database connection and server start
const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Client server running on port ${PORT}`);
      console.log(
        `Swagger docs available at http://localhost:${PORT}/api-docs`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
