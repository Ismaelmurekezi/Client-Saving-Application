import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { connectDatabase } from "./config/database.js";
import authRoutes from "./routes/authRoute.js";
import { specs, swaggerUi } from "./config/swagger.js";
import savingsRoutes from "./routes/savingsRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-netlify-app.netlify.app', 'https://your-custom-domain.com']
    : ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(limiter);
app.use(express.json({ limit: '10mb' }));

app.get("/", (request, response) => {
  response
    .status(200)
    .send("Welcome to the Client Saving Application Backend!");
});

app.use("/api/auth", authRoutes);
app.use("/api/savings", savingsRoutes);

// Swagger Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
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
