
CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY,
        userID INTEGER,
        gameID TEXT,
        title TEXT,
        image TEXT,
        platform TEXT,
        playtime INTEGER,
        favorite TEXT,
        foreign key(userID) references users(userID)
      )
