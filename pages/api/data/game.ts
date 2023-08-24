import { NextApiRequest, NextApiResponse } from "next";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url, userID } = JSON.parse(req.body);
  let data;
  switch (url) {
    case "getAllFromLibrary":
      data = await getAllFromLibrary(userID);
  }
  res.status(200).json(JSON.stringify(data));
};

export default handler;

const getAllFromLibrary = async (userID: string) => {
  const db = await open({
    filename: "./database/db.sqlite",
    driver: sqlite3.Database,
  });
  const data = await db.all(`select * from games where userID=${userID}`);
  console.log(userID, data);
  return data;
};
