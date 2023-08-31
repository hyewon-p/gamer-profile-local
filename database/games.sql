
-- drop table games; 
CREATE TABLE IF NOT EXISTS games (
        userID INTEGER,
        gameID TEXT,
        title TEXT,
        image TEXT,
        platform TEXT,
        playtime INTEGER,
        foreign key(userID) references users(userID)
        constraint games_pk PRIMARY key(userID, gameID)
      )
