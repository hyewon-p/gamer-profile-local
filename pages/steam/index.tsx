import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import Library from "../../components/Library";
import Trait from "../../components/Trait";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userID } from "../../store/user.store";
import router from "../../lib/router";
import { useRouter } from "next/router";

axios.defaults.withCredentials = true;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  await router.run(req, res);
  setCookie("User", req.user._json.steamid, { req, res });
  const body = {
    steamKey: req.user._json.steamid,
    username: req.user._json.personaname,
    image: req.user._json.avatarfull,
  };
  await fetch(`${process.env.BASE_URL}/api/data/user`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  return {
    props: {},
  };
};
const SteamPage = () => {
  return <></>;
};

export default SteamPage;
