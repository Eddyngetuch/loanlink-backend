const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

// ✅ CONNECT ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/loans", require("./routes/loanRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// SERVER
app.listen(3000, () => console.log("Server running on port 3000"));