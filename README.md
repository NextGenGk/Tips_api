# Tips API - SLobby

## Overview
**Tips API** is a simple Express.js API for fetching random business tips from a PostgreSQL database.  
This is part of the **SLobby** project.

## Features
- Fetch a random tip from the database.
- Secured with a master key.
- Uses PostgreSQL as the database.
- Built with **Express.js** and **pg**.

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/tips_api.git
cd tips_api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add:
```
DB_USER=your_username
DB_HOST=your_host
DB_NAME=your_database_name
DB_PASS=your_password
DB_PORT=5432
```

### 4. Start the Server
```bash
npm start
```
The server runs on **http://localhost:3000**.

## API Endpoints

### 🔹 Get a Random Tip
**GET `/api/tip?key=YOUR_MASTER_KEY`**  
Returns a random business tip.

#### Example Response:
```json
{
  "tips_id": 3,
  "tips_title": "Leverage social media for free marketing",
  "tips_type": "Marketing"
}
```

## Technologies Used
- **Node.js**
- **Express.js**
- **PostgreSQL**
- **dotenv** (for environment variables)

## Author
Created by **SLobby Team** 🚀

---
🔹 *Made for helping local businesses grow!* 🌱
