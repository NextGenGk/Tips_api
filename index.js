import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;
const masterKey = "le-na-bhai";

// PostgreSQL connection
const db = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

app.use(bodyParser.urlencoded({ extended: true }));

// 1. GET a random tip
app.get("/api/tip", async (req, res) => {
  try {
    const { key } = req.query;
    if (key !== masterKey) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    const result = await db.query("SELECT * FROM tips ORDER BY RANDOM() LIMIT 1;");
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});
