const sqlite3 = require("sqlite3");

async function initialize() {
  const db = await sqlite3.open({
    filename: "db.sqlite",
    driver: sqlite3.Database,
  });
}

initialize();
