const { PrismaMariaDb } = require('@prisma/adapter-mariadb')
const { PrismaClient } = require("@/prisma/generated/client");
const parseMysqlUrl = require('@/utils/parseMysqlUrl');
const databaseConfig = require('@/config/database.config');

const adapter = new PrismaMariaDb(parseMysqlUrl(databaseConfig.url))
const prisma = new PrismaClient({ adapter });

module.exports = prisma;