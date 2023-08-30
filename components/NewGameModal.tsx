import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userID } from "../store/user.store";
import FormModal from "./FormModal";
import { v4 } from "uuid";
import { useRouter } from "next/router";

interface appData {
  name: string;
  appID: number;
  playTime: number;
  playTime2: number;
  iconURL: string;
  achievements: any;
}

const NewGameModal = ({ showModal, setShowModal }) => {
  const [platform, setPlatform] = useState<string>("직접 입력");
  const [platforms, setPlatforms] = useState(["직접 입력"]);
  const userid = getCookie("User");
  const [games, setGames] = useState<appData[]>([]);
  const [game, setGame] = useState<appData>({});
  const router = useRouter();

  const getPlatformData = async () => {
    // const user = await axios.post(`/api/data/steam/getOwnedGames?`);

    setPlatforms([
      "직접 입력",
      "STEAM",
      // user.data.psToken && "PS",
    ]);
  };

  const getAppData = async (e: any) => {
    setPlatform(e.target.value);
    if (e.target.value == "STEAM") {
      const steamKey = getCookie("Key");
      await axios
        .post("/api/data/steam", {
          url: "getOwnedGames",
          bodyData: { steamKey: steamKey },
        })
        .then((res) =>
          setGames(
            res.data.sort((a, b) =>
              a.name > b.name ? 1 : a.name === b.name ? 0 : -1
            )
          )
        );
    } else if (e.target.value == "PS") {
      const fetchedData = await axios.get(`/api/user/ps/games`);
      console.log(fetchedData.data.data.gameLibraryTitlesRetrieve.games);
      const resData = fetchedData.data.data.gameLibraryTitlesRetrieve.games;
      setGames(
        resData.sort((a, b) =>
          a.name > b.name ? 1 : a.name === b.name ? 0 : -1
        )
      );
    }
  };

  useEffect(() => {
    if (!showModal) {
      setPlatform("직접 입력");
      setGame({});
      setGames([]);
    } else {
      getPlatformData();
    }
  }, [showModal]);

  const setAppID = async () => {
    const gameList = await axios.get(`/API/game/gamelist`);
    let num = Math.floor(Math.random() * 1000);
    while (gameList.data.includes(num)) {
      num = Math.floor(Math.random() * 1000);
    }

    return num;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let gameID;
    if (platform == "직접 입력") {
      gameID = await setAppID();
    }
    const data = await axios.put(`/api/data/game`, {
      url: "new",
      bodyData: {
        gameInfo: {
          gameID: game.appID ? game.appID : gameID,
          userID: userid,
          title: game.name,
          platform: platform,
          playtime: Number(game.playTime),
          image: game.iconURL,
        },
      },
    });
    if (data.status == 200) {
      setShowModal(false);
    }
    router.replace(router.asPath);
  };
  return (
    <FormModal
      showModal={showModal}
      setShowModal={setShowModal}
      ok="추가"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2 py-4">
        <label className="w-full font-medium">
          연동 플랫폼
          <select
            className="w-2/3 rounded float-right truncate font-normal text-sm py-1"
            onChange={(e) => getAppData(e)}
          >
            {platforms.map((p, i) => (
              <option value={p} key={i}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label className="w-full font-medium">
          게임
          {games.length > 0 && platform != "직접 입력" ? (
            <select
              className="rounded w-2/3 float-right truncate font-normal text-sm py-1"
              onChange={(e) => {
                setGame(games.filter((g) => g.appID == e.target.value)[0]);
              }}
            >
              {games.map((g) => (
                <option value={g.appID} key={g.appID}>
                  {g.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              className="rounded w-2/3 float-right truncate px-2"
              onChange={(e) =>
                setGame((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              required
            />
          )}
        </label>
        {platform == "직접 입력" && (
          <label className="w-full font-medium">
            게임 아이콘 url
            <span className="w-2/3 float-right flex font-normal text-base">
              <input
                required
                value={game.iconURL ? game.iconURL : ""}
                onChange={(e) =>
                  setGame((prev) => ({
                    ...prev,
                    iconURL: e.target.value,
                  }))
                }
                className="rounded text-black text-end px-2 mr-2 grow"
              />
              <div className="w-6 h-6 bg-slate-400 rounded">
                <img
                  className="object-cover w-full h-full"
                  src={game.iconURL}
                />
              </div>
            </span>
          </label>
        )}

        <label className="w-full font-medium">
          플레이타임
          <span className="w-2/3 float-right flex font-normal text-base">
            <input
              required
              value={game.playTime ? game.playTime : ""}
              type="number"
              onChange={(e) =>
                setGame((prev) => ({
                  ...prev,
                  playTime: Number(e.target.value),
                }))
              }
              className="rounded text-black text-end px-2 mr-2 grow"
            />
            <span className="shrink-0 text-sm pt-1">
              {`분 ( ${
                game.playTime ? Math.trunc(game.playTime / 60) : 0
              } 시간 )`}
            </span>
          </span>
        </label>
      </div>
    </FormModal>
  );
};

export default NewGameModal;
