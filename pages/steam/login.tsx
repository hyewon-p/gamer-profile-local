import { GetServerSideProps, NextPage } from "next";
import { getCookieParser } from "next/dist/server/api-utils";
import Link from "next/link";
import React from "react";
import Layout from "../../components/Layout";
import { setCookie } from "cookies-next";

// export const getServerSideProps: GetServerSideProps = async (context) => {

// };
const loginPage: NextPage = () => {
  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  return (
    <Layout isUser={true}>
      <div className="w-full h-[80vh] flex justify-center items-center">
        <div className="w-1/2 rounded border px-2 py-12 flex flex-col items-center gap-3">
          <div className="mb-6 text-2xl font-medium">Login</div>
          <Link href={"/api/auth/login"}>
            <img
              className="cursor-pointer"
              src="https://community.akamai.steamstatic.com/public/images/signinthroughsteam/sits_01.png"
            />
          </Link>
          <Link href={"/API/auth/google"}>
            <img src="/btn_google_signin_light_normal_web.png" />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default loginPage;
