import { GetServerSideProps, GetStaticPaths, NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { getCookie } from "cookies-next";
import Library from "../../components/Library";
import Trait from "../../components/Trait";
import { useRouter } from "next/router";
import Favorite from "../../components/Favorite";
import Modal from "../../components/Modal";
import {
  RecoilState,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { isOwnerValue, tokenValue, userID } from "../../store/user.store";
import Character from "../../components/Character";
import Bookmark from "../../components/Bookmark";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const [isOwner, setIsOwner] = useRecoilState(isOwnerValue);
  const [profile, setProfile] = useState(undefined);

  const userID = getCookie("User");
  useEffect(() => {
    setIsOwner(true);
    getData();
    // setDesc(profile.description);
  }, []);

  const getData = async () => {
    const key = getCookie("User");
    const user = await fetch(`/api/data/user?key=${key}`).then((d) => d.json());
    console.log(user);
    setProfile(user);
  };

  // const [desc, setDesc] = useState(profile.description);

  const [showModal, setShowModal] = useState(false);

  return (
    <Layout>
      {console.log(profile)}
      <div>
        <>
          <div>loading...</div>
        </>
      </div>
    </Layout>
  );
};

export default ProfilePage;
