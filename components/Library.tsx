import React, { useState } from "react";
import Modal from "./Modal";
import NewGameModal from "./NewGameModal";
import FormModal from "./FormModal";
import { useRecoilValue } from "recoil";
import { isOwnerValue } from "../store/user.store";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface gameInfo {
  id: number;
  userID: number;
  gameID: string;
  title: string;
  playtime: number;
  image: string;
}

const Library: React.FC<{ appList: gameInfo[] }> = ({ appList }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const isOwner = useRecoilValue(isOwnerValue);
  const [selectedGame, setSelectedGame] = useState<gameInfo | undefined>(
    undefined
  );
  const router = useRouter();

  const deleteGame = async () => {
    if (selectedGame != undefined) {
      const fetch = await axios.delete(
        `${process.env.API_URL}/game/delete/${selectedGame.gameID}`
      );
      fetch.status == 200 && toast("삭제되었습니다.");
    }

    router.reload();

    setShowModifyModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.patch(`${process.env.API_URL}/game`);
  };

  return (
    <div className="w-[30%]">
      {/* {console.log(appList)} */}
      <div className="flex items-center mb-2 mt-1">
        <div className="font-medium text-lg">보유 게임</div>
        <div className="grow"></div>
        {isOwner && (
          <button
            onClick={() => setShowModal(!showModal)}
            className="px-2 py-1 border rounded border-blue-400 text-blue-400 text-sm hover:bg-blue-400/50 hover:text-blue-200"
          >
            추가
          </button>
        )}
      </div>
      <div className="flex flex-col border border-blue-400 rounded px-1 py-2">
        {appList
          .filter((_, i) => i < 100)
          .map((p: gameInfo) => (
            <button
              onClick={() => {
                setSelectedGame(p);
                setShowModifyModal(true);
              }}
              key={p.gameID}
              className="group relative p-1 grid gap-2 rounded w-full grid-cols-[1rem_1fr] items-center text-start hover:bg-slate-400/50"
            >
              <div className="bg-slate-400 rounded w-[1rem] h-[1rem] overflow-hidden">
                <img className="object-cover w-full h-full" src={p.image} />
              </div>

              <div className="text-sm truncate">{p.title}</div>
            </button>
          ))}
      </div>
      <FormModal
        onSubmit={handleSubmit}
        showModal={showModifyModal}
        setShowModal={setShowModifyModal}
      >
        {selectedGame == undefined ? (
          <div>게임 정보 가져오는 중...</div>
        ) : (
          <div>
            <div className="flex mb-3 items-center">
              <div className="bg-slate-400 rounded w-6 h-6 overflow-hidden">
                <img
                  className="object-cover w-full h-full"
                  src={selectedGame.image}
                />
              </div>
              <span className="grow text-lg font-medium mx-1">
                {selectedGame.title}
              </span>
              <button
                type="button"
                onClick={deleteGame}
                className="group hover:border border-white w-6 h-6 p-[0.3rem] bg-red-500 rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 24 24"
                  className=" fill-white stroke-0"
                >
                  <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
                </svg>
              </button>
            </div>
            <label className="w-full font-medium">
              플레이타임
              <span className="w-2/3 float-right flex font-normal text-base">
                <input
                  required
                  value={selectedGame.playtime ? selectedGame.playtime : ""}
                  type="number"
                  onChange={(e) =>
                    setSelectedGame((prev: any) => ({
                      ...prev,
                      playtime: Number(e.target.value),
                    }))
                  }
                  className="rounded text-black text-end px-2 mr-2 grow"
                />
                <span className="shrink-0 text-sm pt-1">
                  {`분 ( ${
                    selectedGame.playtime
                      ? Math.trunc(selectedGame.playtime / 60)
                      : 0
                  } 시간 )`}
                </span>
              </span>
            </label>
          </div>
        )}
      </FormModal>

      <NewGameModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default React.memo(Library);
