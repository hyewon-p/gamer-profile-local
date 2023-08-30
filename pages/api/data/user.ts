import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { setCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await open({
    filename: "./database/db.sqlite",
    driver: sqlite3.Database,
  });
  if (req.method == "PUT") {
    const profile = req.body;
    await db.run(
      `insert or ignore into users (steamKey, username, image)
      values ("${profile.steamKey}", "${profile.username}", "${profile.image}")
     `
    );
    const user = await db.get(
      `select id from users where steamKey="${profile.steamKey}"`
    );
    await db.close();
    res.status(200).send(user.id);
  } else if (req.method == "GET") {
    const key = req.query.key;
    const userData = await db.get(
      `select * from users where steamKey="${key}"`
    );
    await db.close();
    userData
      ? res.status(200).send(userData)
      : res.redirect(307, "/steam/login");
  }
}
