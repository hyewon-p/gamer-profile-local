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

export const getServerSideProps: GetServerSideProps = async (context) => {
  await router.run(context.req, context.res);
  setCookie("User", context.req.user._json.steamid);
  return {
    redirect: {
      destination: "/steam/profile",
      permanent: false,
    },
  };
};
const SteamPage = () => {
  return <></>;
};

export default SteamPage;
