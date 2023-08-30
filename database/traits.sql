
drop table traits;
CREATE TABLE IF NOT EXISTS traits (
        userID INTEGER,
        label TEXT,
        value TEXT,
        seq INTEGER,
        foreign key(userID) references users(userID)
        constraint traits_pk PRIMARY key(userID, seq)
      )
