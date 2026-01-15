const fs = require('fs');
const path = require('path');

const dbDir = path.join(__dirname, '..', 'db');

function loadDB(resourceName) {
  const filePath = path.join(dbDir, `${resourceName}.json`);
  
  try {
    if (!fs.existsSync(filePath)) {
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
      }
      fs.writeFileSync(filePath, '[]', 'utf8');
      return [];
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Error loading DB for ${resourceName}:`, error.message);
    return [];
  }
}

function saveDB(resourceName, data) {
  const filePath = path.join(dbDir, `${resourceName}.json`);
  
  try {
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error(`Error saving DB for ${resourceName}:`, error.message);
    throw error;
  }
}

module.exports = {
  loadDB,
  saveDB
};
