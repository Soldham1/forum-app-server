const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const statusMonitor = require("express-status-monitor");
const connectDB = require("./database/db");

dotenv.config();

const app = express();

app.use(statusMonitor());

connectDB(process.env.DOCKER_DB_URI);

app.enable("trust proxy");

app.use(express.json({ extended: false }));

app.use(cors());

app.get("/", (req, res) => res.send("API Running"));

// Define routes
app.use("/users", require("./routes/api/users"));
app.use("/auth", require("./routes/api/auth"));
app.use("/discs", require("./routes/api/discs"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
