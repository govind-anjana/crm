// src/server.js
import app from "./app.js";
import cors from 'cors';
import connectDB from "./configs/db.js";

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();


// Start Express Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

