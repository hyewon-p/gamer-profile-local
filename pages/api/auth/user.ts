import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { setCookie } from "cookies-next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const { token, id } = req.query;
  setCookie("Auth", token, { req, res });
  setCookie("User", id, { req, res });

  console.log(token, id);

  axios.defaults.headers.common["Authorization"] = token;
  res.writeHead(308, { Location: `/steam/${id}`, Token: token }).end();
}
