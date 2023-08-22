import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await open({
    filename: "./database/db.sqlite",
    driver: sqlite3.Database,
  });
  if (req.method == "PUT") {
    const profile = JSON.parse(req.body);
    await db.run(
      `insert into users (steamKey, username, image) values ("${profile.steamKey}", "${profile.username}", "${profile.image}")
      `
    );
    await db.close();
    res.status(201).json(`welcome ${profile.username}`);
  } else if (req.method == "GET") {
    const key = req.query.key;
    const userData = await db.get(
      `select * from users where steamKey="${key}"`
    );
    await db.close();
    userData
      ? res.status(200).json(userData)
      : res.redirect(307, "/steam/login");
  }
}
