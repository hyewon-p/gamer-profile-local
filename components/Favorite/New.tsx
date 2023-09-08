import axios from "axios";
import { gameInfo } from "interfaces/game";
import { useState } from "react";
import { toast } from "react-toastify";

export const NewComponent: React.FC<{
  index: number;
  library: gameInfo[];
  setList: Function;
}> = ({ index, setList, library }) => {
  const [gameInfo, setGameInfo] = useState({
    title: "게임 선택",
    image: "",
    playtime: 0,
  });
  const createFavorite = async () => {
    // const fetch = await axios.post("/api/data/favorite", {
    //   url: "new",
    //   bodyData: {
    //     gameID: gameInfo.id,
    //     userID: userID,
    //     description: desc,
    //   },
    // });
    // fetch.status == 201 && toast("저장되었습니다.");
  };
  const [desc, setDesc] = useState("");
  return (
    <form className="w-full" onSubmit={createFavorite}>
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
                  library.filter((g: gameInfo) => g.gameID == e.target.value)[0]
                );
              }}
            >
              {[{ title: "게임 선택", image: "", playtime: 0 }, ...library].map(
                (game) => (
                  <option key={`favorite${game.title}`} value={game.playtime}>
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
              setList((prev: { [key: string]: string }[]) =>
                prev.filter((_, i: number) => i != index)
              )
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
