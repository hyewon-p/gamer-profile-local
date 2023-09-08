import React, { useState } from "react";
import Modal from "./modals/Modal";
import FormModal from "./modals/FormModal";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { isOwnerValue } from "../store/user.store";
import { useRecoilValue } from "recoil";

const Character: React.FC<{ userType: string }> = ({ userType }) => {
  const [showModal, setShowModal] = useState(false);
  const [gamerType, setGamerType] = useState(
    userType.length > 0 ? userType.split(",") : []
  );
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const isOwner = useRecoilValue(isOwnerValue);
  const submitHandler = async (e) => {
    e.preventDefault();
    const token = getCookie("Auth");

    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["Authorization"] = token;
    const fetch = await axios.patch(`${process.env.API_URL}/user/gamerType`, {
      gamerType: gamerType.toString(),
    });
    if (fetch.status == 200) {
      toast("저장되었습니다.");
      router.reload();
    }
  };

  return (
    <div className="rounded border border-blue-400 w-full h-full ">
      <div className="pt-3 px-4 font-medium flex items-center">
        <span>성향</span>
        <div className="w-4 h-4 hover:cursor-pointer rounded-full ml-1 group relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 18.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25s-.559 1.25-1.25 1.25zm1.961-5.928c-.904.975-.947 1.514-.935 2.178h-2.005c-.007-1.475.02-2.125 1.431-3.468.573-.544 1.025-.975.962-1.821-.058-.805-.73-1.226-1.365-1.226-.709 0-1.538.527-1.538 2.013h-2.01c0-2.4 1.409-3.95 3.59-3.95 1.036 0 1.942.339 2.55.955.57.578.865 1.372.854 2.298-.016 1.383-.857 2.291-1.534 3.021z" />
          </svg>

          <div className="group-hover:block hover:cursor-default pt-8 top-0 right-[-5rem] z-[1000]  absolute hidden ">
            <div className="rounded-lg p-3 text-sm bg-slate-300 text-black">
              자신이 어떤 유형의 게이머인지 나타내는 항목입니다. <br />
              선택지로는 Bartle의 이론에 등장하는 게이머의 유형을 참고하였으나,
              스스로 작성하여 추가할 수도 있습니다.
              <br />
              만약 스스로 유형을 정의하는 것이 어렵다면, 아래의 사이트들에서
              테스트 후 결과를 참고하는 것을 추천합니다.
              <br />
              <a target="_blank" href="https://quanticfoundry.com">
                https://quanticfoundry.com
              </a>
              <br />
              <a
                target="_blank"
                href="https://gamified.uk/UserTypeTest2023/user-type-test.php#.Vvj-yYQVbmI"
              >
                https://gamified.uk/UserTypeTest2023/user-type-test.php#.Vvj-yYQVbmI
              </a>
              <br />
            </div>
          </div>
        </div>
        <div className="grow"></div>
        {isOwner && (
          <button
            onClick={() => setShowModal(true)}
            className="text-sm text-blue-400"
          >
            수정
          </button>
        )}
      </div>

      <div className="flex gap-1 px-2 pt-2 w-full flex-wrap grow-0 overflow-hidden">
        {userType.length > 0 &&
          userType.split(",").map((t, i) => (
            <span
              key={i}
              className="rounded-full bg-slate-500 px-2 text-xs py-1 shrink-0"
            >
              #{t}
            </span>
          ))}
      </div>
      <FormModal
        showModal={showModal}
        setShowModal={setShowModal}
        onSubmit={submitHandler}
        ok="저장"
      >
        <div>
          <div className="border-2 p-2 rounded h-24 border-white flex flex-col justify-center">
            <div className="gap-2 flex mb-2">
              {["격투가", "성취가", "사교가", "탐험가"].map((p, i) => (
                <button
                  type="button"
                  key={`type${i}`}
                  onClick={() =>
                    !gamerType.includes(p) &&
                    gamerType.length < 2 &&
                    setGamerType((prev) => [...prev, p])
                  }
                  className="rounded-full w-fit h-fit border border-slate-600 text-slate-600 px-2 text-xs py-1 shrink-0"
                >
                  #{p}
                </button>
              ))}
            </div>
            <div className="flex items-center">
              <input
                value={inputValue}
                onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                onChange={(e) => setInputValue(e.target.value)}
                className="rounded-full py-[0.1rem] pl-3 text-sm text-slate-600 border border-slate-600 bg-transparent"
              />
              <button
                type="button"
                onClick={() => {
                  if (
                    gamerType.length < 2 &&
                    !gamerType.includes(inputValue.split(" ").join(""))
                  ) {
                    setGamerType((prev) => [
                      ...prev,
                      inputValue.split(" ").join(""),
                    ]);
                    setInputValue("");
                  }
                }}
                className="border rounded-full text-slate-600 border-slate-600 text-xs px-2 py-1  ml-1 hover:bg-slate-500 hover:text-white"
              >
                추가
              </button>
            </div>
          </div>
          <div className="text-sm px-3 pt-1">
            최대 2개의 성향을 선택할 수 있습니다.
          </div>
          <div className="flex gap-1 px-2 pt-1 w-full flex-wrap grow-0">
            {gamerType.length > 0 &&
              gamerType.map((t, i) => (
                <button
                  key={`input${i}`}
                  type="button"
                  onClick={() =>
                    setGamerType((prev) => prev.filter((p) => p != t))
                  }
                  className="rounded-full bg-slate-500 text-white px-2 text-sm py-1 shrink-0"
                >
                  #{t}
                  <span className="ml-1">x</span>
                </button>
              ))}
          </div>
        </div>
      </FormModal>
    </div>
  );
};

export default Character;
