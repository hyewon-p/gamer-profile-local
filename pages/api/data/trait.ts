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
    await deleteTrait(bodyData.removed);
    await updateTrait(bodyData.traits);
  }

  res.status(200).send(data);
};

export default handler;

const getAll = async (userID: string) => {
  const db = await open({
    filename: "./database/db.sqlite",
    driver: sqlite3.Database,
  });
  const data = await db.all(`select * from traits where userID=${userID}`);
  return data;
};

interface trait {
  userID: number;
  label: string;
  value: string;
  seq: number;
}

const updateTrait = async (traits: trait[]) => {
  // console.log(gameInfo);
  const db = await open({
    filename: "./database/db.sqlite",
    driver: sqlite3.Database,
  });
  await Promise.all(
    traits.map((trait) => {
      db.run(
        `insert or replace into traits (userID, label, value, seq) 
        values (
            ${trait.userID},
            "${trait.label}",
            "${trait.value}",
            ${trait.seq}
      )`
      );
    })
  );
  await db.close();
  return 201;
};

const deleteTrait = async (removed: trait[]) => {
  const db = await open({
    filename: "./database/db.sqlite",
    driver: sqlite3.Database,
  });
  await Promise.all(
    removed.map((trait) => {
      db.run(
        `delete from traits where userID=${trait.userID} and seq=${trait.seq}`
      );
    })
  );
  await db.close();
};
