require('module-alias/register');
require("dotenv").config();
const databaseConfig = require("@/config/database.config");
const { defineConfig } = require("prisma/config");

module.exports = defineConfig({
  schema: "src/prisma/schema.prisma",
  migrations: {
    path: "src/prisma/migrations",
  },
  datasource: {
    url: databaseConfig.url,
  },
});
