CREATE TABLE IF NOT EXISTS favorites (
    gameID INTEGER not null,
    userID INTEGER not null,
    description TEXT,
    foreign key(gameID) references games(id),
    foreign key(userID) references users(id)
)
