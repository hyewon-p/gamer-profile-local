import { favoriteGameInterface } from "interfaces/favorite";
import { gameInfo } from "interfaces/game";
import { NextApiRequest, NextApiResponse } from "next";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url, bodyData } = req.body;

  let data;
  if (url == "getAll") {
    data = await getAll(bodyData.userID);
  }
  if (url == "new") {
    data = await createNewGame(bodyData.gameInfo);
  }

  res.status(200).send(data);
};

export default handler;

const getAll = async (userID: string) => {
  const db = await open({
    filename: "./database/db.sqlite",
    driver: sqlite3.Database,
  });
  const data = await db.all(
    `select * from favorites left outer join games on favorites.gameID = games.gameID and favorites.userID=${userID}`
  );

  return formatData(data);
};

const createNewGame = async (gameInfo: favoriteGameInterface) => {
  // console.log(gameInfo);
  const db = await open({
    filename: "./database/db.sqlite",
    driver: sqlite3.Database,
  });
  await db.run(
    `insert into favorites (userID, gameID, description, seq) 
    values (
        ${gameInfo.userID},
        "${gameInfo.gameID}",
        "${gameInfo.description}",
        ${gameInfo.seq})`
  );
  await db.close();
  return 201;
};

const formatData = (response: Array<gameInfo & favoriteGameInterface>) => {
  return response.map((data) => {
    const {
      userID,
      gameID,
      description,
      seq,
      title,
      image,
      platform,
      playtime,
    } = data;
    return {
      userID,
      gameID,
      description,
      seq,
      game: {
        title,
        image,
        platform,
        playtime,
      },
    };
  });
};
