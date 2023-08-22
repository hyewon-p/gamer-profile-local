
drop table users;
CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT,
        steamKey TEXT,
        psToken TEXT,
        email TEXT,
        image TEXT,
        description TEXT
      )

