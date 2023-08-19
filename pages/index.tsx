import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import handler from "./api/hello";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/steam",
      permanent: false,
    },
  };
};

const Home: NextPage = () => {
  return (
    <Layout isUser={false}>
      <div className={styles.container}>home</div>
    </Layout>
  );
};

export default Home;
