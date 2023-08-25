import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { setCookie } from "cookies-next";
import router from "lib/router";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await router.run(req, res);
  const body = {
    steamKey: req.user._json.steamid,
    username: req.user._json.personaname,
    image: req.user._json.avatarfull,
  };
  const user = await fetch(`${process.env.BASE_URL}/api/data/user`, {
    method: "PUT",
    body: JSON.stringify(body),
  }).then((d) => d.json());
  setCookie("Key", req.user._json.steamid, { req, res });
  setCookie("User", JSON.parse(user), { req, res });
  res.writeHead(308, { Location: `/steam/profile` }).end();
}
