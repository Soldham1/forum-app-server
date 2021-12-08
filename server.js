const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const statusMonitor = require("express-status-monitor");

const connectDB = require("./database/db");

dotenv.config();

const app = express();

// Connects db
connectDB();

app.enable("trust proxy");

// Init middleware
app.use(express.json({ extended: false }));
app.use(cors());
// Sets up express-status-monitor
app.use(statusMonitor());

app.get("/", (req, res) => res.send("API Running"));

// Define routes
app.use("/users", require("./routes/api/users"));
app.use("/auth", require("./routes/api/auth"));
app.use("/discs", require("./routes/api/discs"));

const PORT = process.env.PORT || 5000;

// Listens on port 5000 in development and port 80 in production
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
