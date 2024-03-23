import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { PORT } from "./config/config.js";

// Import additional security-related libraries
import mongoSanitize from "express-mongo-sanitize"; // To prevent NoSQL injection
import helmetContentSecurityPolicy from "helmet-csp"; // For Content Security Policy
import connect from "./db/db.js";

const app = express();

// Use Express built-in middleware
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Enabling the Helmet middleware
app.use(helmet());

// Add Content Security Policy (CSP) header
app.use(
  helmetContentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
    },
  })
);

// Cors Policies
const allowedOrigins = ["http://localhost:3000"];

// app.use(cors())

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Additional security middleware
app.use(mongoSanitize()); // Prevent NoSQL injection

// All Routers of this project
import userRouters from "./routes/user.routers.js";

app.use("/api/v1/users", userRouters);

// MongoDB and Server Setups
const SERVER_PORT = PORT || 9090;

// Connect DB first, then start the server
connect();

app.listen(SERVER_PORT, () => console.log(`Server Is Running...`));
