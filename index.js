import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Use env PORT or default to 3000

// PostgreSQL connection
const db = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432, // Ensure port is a number
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false, // Enable SSL if required
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Enable JSON parsing

// Check database connection on startup
db.connect()
  .then(() => console.log("Connected to PostgreSQL database successfully"))
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1); // Exit if DB connection fails
  });

// 1. GET a random tip
app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tips ORDER BY RANDOM() LIMIT 1;");
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "No tips found" });
    }
  } catch (error) {
    console.error("Error fetching tip:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
