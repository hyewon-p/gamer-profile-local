import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    redirect: {
      destination: "/steam/profile",
    },
    // props: {},
  };
};
const SteamPage = () => {
  return <></>;
};

export default SteamPage;
