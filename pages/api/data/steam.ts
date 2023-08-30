import { NextApiRequest, NextApiResponse } from "next";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import SteamAPI from "steamapi";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url, bodyData } = req.body;
  //   console.log(url, bodyData);
  let data;
  if (url == "getOwnedGames") {
    data = await getOwnedGames(bodyData.steamKey);
  }
  res.status(200).send(data);
};

export default handler;

const getOwnedGames = async (userKey: string) => {
  const steam = new SteamAPI(process.env.STEAM_KEY!);
  const data = await steam.getUserOwnedGames(userKey);
  return data;
};
