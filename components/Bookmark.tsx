import React, { useEffect, useState } from "react";
import Modal from "./modals/Modal";
import axios from "axios";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { isOwnerValue, userID } from "../store/user.store";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Bookmark = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState();
  const router = useRouter();
  const id = getCookie("User");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const isOwner = useRecoilValue(isOwnerValue);
  const getData = async () => {
    const fetch = await axios.get(`${process.env.API_URL}/bookmark/list/${id}`);
    setData(fetch.data);
  };
  useEffect(() => {
    data &&
      setIsBookmarked(
        data.map((d) => d.profile_id.toString()).includes(router.query.id)
      );
  }, [data]);
  const clickHandler = async () => {
    if (!id) {
      router.push("login");
    } else {
      if (isOwner) {
        setShowModal(true);
      } else {
        const token = getCookie("Auth");

        axios.defaults.withCredentials = true;
        axios.defaults.headers.common["Authorization"] = token;

        if (
          data.map((d) => d.profile_id.toString()).includes(router.query.id)
        ) {
          const fetch = await axios.delete(
            `${process.env.API_URL}/bookmark/delete/${router.query.id}`
          );
          fetch.status == 200 && toast("북마크에서 삭제되었습니다.");
        } else {
          const fetch = await axios.post(
            `${process.env.API_URL}/bookmark/new/${router.query.id}`
          );
          fetch.status == 201 && toast("북마크에 추가되었습니다.");
        }
        getData();
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <button
        onClick={clickHandler}
        className="rounded-full h-6 w-6 p-1 border border-white"
      >
        {isOwner ? (
          <svg
            fill="white"
            clip-rule="evenodd"
            fill-rule="evenodd"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"
              fill-rule="nonzero"
            />
          </svg>
        ) : isBookmarked ? (
          <svg
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M0 10h24v4h-24z" />
          </svg>
        ) : (
          <svg
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
          </svg>
        )}
      </button>
      <Modal showModal={showModal} setShowModal={setShowModal} ok="닫기">
        <div>
          {data == undefined ? (
            <div>불러오는 중...</div>
          ) : (
            <div>
              <div className="border-2 rounded-lg p-2">
                아래의 url을 복사하여 프로필을 공유해보세요.
                <br />{" "}
                <strong className="font-semibold">{`${process.env.BASE_URL}/steam/${id}`}</strong>
              </div>
              <div className="px-2 text-lg font-medium mt-2">북마크 목록</div>
              <div className="flex flex-col gap-1">
                {data.map((userData) => (
                  <button
                    key={userData.profile_id}
                    onClick={async () => {
                      await router.push(`${userData.profile_id}`);
                      router.reload();
                    }}
                    className="flex w-full px-3 py-1 mt-1 items-center"
                  >
                    <div className="w-3 h-3 border rounded-md bg-blue-400 border-blue-400  mr-2">
                      {/* <img
                        className="w-full h-full"
                        src=""
                      /> */}
                    </div>
                    <span>{userData.user.username}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Bookmark;
