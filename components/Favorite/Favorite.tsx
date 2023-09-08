import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { isOwnerValue, userID } from "../../store/user.store";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import { getCookie } from "cookies-next";
import { FavoriteComponent } from "./FavComponent";
import { NewComponent } from "./New";
import { gameInfo } from "interfaces/game";
import { favoriteGameInterface } from "interfaces/favorite";

const Favorite: React.FC<{ library: gameInfo[] }> = ({ library }) => {
  const [gameList, setGameList] = useState<favoriteGameInterface[]>([]);
  const isOwner = useRecoilValue(isOwnerValue);
  const userID = getCookie("User");
  const getFavoriteGames = async () => {
    await axios
      .post(`/api/data/favorite`, { bodyData: { userID: userID } })
      .then((res) => setGameList(res.data));
    return;
  };
  useEffect(() => {
    getFavoriteGames();
  }, []);
  useEffect(() => {}, [gameList]);

  const [emptyList, setEmptyList] = useState<{ [key: string]: string }[]>([]);
  const makeNew = () => {
    setEmptyList((prev) => [...prev, {}]);
  };
  return (
    <div className="w-full mt-5">
      <div className="flex items-center mb-2 mt-1">
        <div className="font-medium text-lg">선호하는 게임</div>
      </div>
      <div className="flex flex-col items-center gap-3">
        {gameList.length > 0 &&
          gameList.map((game) => (
            <FavoriteComponent
              isOwner={isOwner}
              gameInfo={game}
              key={v4()}
              setList={setGameList}
            />
          ))}
        {emptyList.map((e, i) => (
          <NewComponent
            index={i}
            setList={setEmptyList}
            key={"empty" + i}
            library={library}
          />
        ))}
        {isOwner && (
          <button
            onClick={makeNew}
            className="group hover:bg-blue-400/50 w-full border-blue-400 border rounded py-1 h-12 text-blue-400 flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 stroke-0 fill-blue-400 group-hover:fill-blue-200"
              viewBox="0 0 24 24"
            >
              <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(Favorite);
