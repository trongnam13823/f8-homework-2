const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const routesDir = __dirname;
const routeFiles = fs.readdirSync(routesDir).filter((file) => file.endsWith(".route.js"));

routeFiles.forEach((file) => {
  const routeName = file.replace(".route.js", "");
  const routePath = path.join(routesDir, file);
  const route = require(routePath);
  router.use(`/${routeName}`, route);
});

module.exports = router;
