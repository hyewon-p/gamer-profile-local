// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import SteamAPI from "steamapi";

type Data = { name: string }[];

const nameData = [
  { name: "John Doe" },
  { name: "Hyewon" },
  { name: "James" },
  { name: "Lily" },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const steam = new SteamAPI(process.env.STEAM_KEY!);
  const data = await steam.getUserOwnedGames("76561198280693232");

  console.log(data);
  res.status(200).json(nameData);
}
