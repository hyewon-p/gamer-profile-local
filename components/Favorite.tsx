import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { isOwnerValue, userID } from "../store/user.store";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import { getCookie } from "cookies-next";

const Favorite: React.FC<{ library: any }> = ({ library }) => {
  const [gameList, setGameList] = useState([]);
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

  const [emptyList, setEmptyList] = useState<any[]>([]);
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

const NewComponent: React.FC<{
  index: number;
  library: any;
  setList: any;
}> = ({ index, setList, library }) => {
  const [gameInfo, setGameInfo] = useState({
    title: "게임 선택",
    image: "",
    playtime: 0,
  });
  const createFavorite = async () => {
    const fetch = await axios.post("/api/data/favorite", {
      url: "new",
      bodyData: {
        gameID: gameInfo.id,
        userID: userID,
        description: desc,
      },
    });
    fetch.status == 201 && toast("저장되었습니다.");
  };
  const [desc, setDesc] = useState("");
  return (
    <form className="w-full" onSubmit={createFavorite}>
      {console.log(gameInfo)}
      <div className="relative w-full border-blue-400 border rounded py-3 px-5 min-h-[10rem] text-blue-400 flex flex-col ">
        <div className="flex items-center gap-1">
          <div className="bg-slate-400 w-5 h-5 rounded overflow-hidden">
            {gameInfo?.image && (
              <img
                src={gameInfo?.image}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="font-normal text-white">
            <select
              className="bg-blue-800/50 rounded px-1 ml-1"
              onChange={(e) => {
                setGameInfo(
                  library.filter((g) => g.gameID == e.target.value)[0]
                );
              }}
            >
              {[{ title: "게임 선택", image: "", playtime: 0 }, ...library].map(
                (game) => (
                  <option key={`favorite${game.gameID}`} value={game.gameID}>
                    {/* {console.log(game)} */}
                    {game.title}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="grow"></div>
          <span className="text-slate-300 text-sm pt-1">
            {gameInfo?.playtime / 60 >= 1
              ? ` ${Math.trunc(gameInfo?.playtime / 60)} 시간`
              : ` ${gameInfo?.playtime} 분`}
          </span>
        </div>{" "}
        <div>{}</div>
        <textarea
          required
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="grow text-white text-sm mt-3 mb-1 px-3 py-1 bg-slate-500/50 rounded"
        ></textarea>
        <div className="absolute left-[-2.2rem] top-1 flex flex-col gap-2">
          <button
            type="submit"
            className="group hover:bg-blue-400/50 border-blue-400 border rounded-full p-[0.35rem] w-7 h-7"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              className="group-hover:fill-blue-100 fill-blue-400 stroke-blue-400"
            >
              <path d="M15.003 3h2.997v5h-2.997v-5zm8.997 1v20h-24v-24h20l4 4zm-19 5h14v-7h-14v7zm16 4h-18v9h18v-9z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() =>
              setList((prev) => prev.filter((_, i: number) => i != index))
            }
            className="group hover:bg-red-500/50 border-red-600 border rounded-full p-[0.35rem] w-7 h-7"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              className="group-hover:fill-red-100 fill-red-500 stroke-0"
            >
              <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
            </svg>
          </button>
        </div>
      </div>{" "}
    </form>
  );
};

const FavoriteComponent = ({ gameInfo, setList, isOwner }) => {
  const [desc, setDesc] = useState(gameInfo.description);
  const { game } = gameInfo;
  const deleteGame = async () => {
    const fetch = await axios.delete(`/api/data/favorite/delete/${game.id}`);
    fetch.status == 200 &&
      setList((prev) => prev.filter((g) => g.game_id != game.id));
  };
  return (
    <div className="relative w-full border-blue-400 border rounded py-3 px-5 min-h-[10rem] text-blue-400 flex flex-col ">
      <div className="flex items-center gap-1">
        <div className="bg-slate-400 w-5 h-5 rounded overflow-hidden">
          {game.image && (
            <img src={game.image} className="object-cover w-full h-full" />
          )}
        </div>

        <div className="font-normal text-white">{game.title}</div>
        <div className="grow"></div>
        <span className="text-slate-300 text-sm pt-1">
          {game.playtime / 60 >= 1
            ? ` ${Math.trunc(game.playtime / 60)} 시간`
            : ` ${game.playtime} 분`}
        </span>
      </div>

      <textarea
        disabled={!isOwner}
        className="grow text-white text-sm mt-3 mb-1 px-3 py-1 bg-slate-500/50 rounded"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      {isOwner && (
        <div className="absolute left-[-2.2rem] top-1 flex flex-col gap-2">
          {/* <ToastContainer /> */}
          <button
            onClick={async () => {
              await axios.put("/API/favorite/update", {
                gameID: game.id,
                description: desc,
              });
              toast("saved");
            }}
            className="group hover:bg-blue-400/50 border-blue-400 border rounded-full p-[0.35rem] w-7 h-7"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              className="group-hover:fill-blue-100 fill-blue-400 stroke-blue-400"
            >
              <path d="M15.003 3h2.997v5h-2.997v-5zm8.997 1v20h-24v-24h20l4 4zm-19 5h14v-7h-14v7zm16 4h-18v9h18v-9z" />
            </svg>
          </button>
          <button
            onClick={deleteGame}
            className="group hover:bg-red-500/50 border-red-600 border rounded-full p-[0.35rem] w-7 h-7"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              className="group-hover:fill-red-100 fill-red-500 stroke-0"
            >
              <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};
