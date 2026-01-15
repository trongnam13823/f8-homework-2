require("module-alias/register");
require("module-alias").addAlias("@", __dirname);

const express = require("express");
const cors = require("cors");
const apiRoutes = require("@/src/routes/index");

const app = express();
const PORT = 3000;

const corsOptions = {
  origin: ["http://localhost:5173", "https://namtran13823.github.io"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Express API Server is running" });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
