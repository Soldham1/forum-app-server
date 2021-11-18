const express = require("express");
const connectDB = require("./database/db");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

// Define routes
app.use("/users", require("./routes/api/users"));
app.use("/auth", require("./routes/api/auth"));
app.use("/discs", require("./routes/api/discs"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
