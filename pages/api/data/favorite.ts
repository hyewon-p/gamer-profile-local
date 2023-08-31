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
  const data = await db.all(`select * from favorites where userID=${userID}`);
  return data;
};

const createNewGame = async (gameInfo) => {
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
        "${gameInfo.title}",
        "${gameInfo.description}",
        ${gameInfo.seq}`
  );
  await db.close();
  return 201;
};
