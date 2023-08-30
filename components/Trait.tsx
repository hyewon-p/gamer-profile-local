import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useRecoilValue } from "recoil";
import { isOwnerValue } from "../store/user.store";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Trait = () => {
  const [data, setData] = useState([]);
  const [trash, setTrash] = useState([]);
  const [emptyList, setEmptyList] = useState<any[]>([]);
  const isOwner = useRecoilValue(isOwnerValue);
  const userID = getCookie("User");

  const makeNew = () => {
    setEmptyList((prev) => [...prev, {}]);
  };

  const getData = async () => {
    const traits = await axios.post(`/api/data/trait`, {
      url: "getAll",
      bodyData: { userID: userID },
    });
    setData(traits.data);
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {}, [data]);

  const saveTraits = async (e) => {
    e.preventDefault();
    const fetch = await axios.put("/api/data/trait", {
      url: "new",
      bodyData: [{ userID: userID, label: "디스코드", value: "#0000", seq: 0 }],
      // c_trait: emptyList,
      // u_trait: data,
      // d_trait: trash,
    });
    if (fetch.status == 200) {
      toast("저장되었습니다.");
      return;
    } else {
      console.log(fetch);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={saveTraits}>
        {/* {console.log(data)} */}
        <div className="mb-2 mt-1 flex">
          <div className="font-medium text-lg">항목별 설명</div>
          <div className="grow"></div>
          {isOwner && (
            <button
              type="submit"
              className="px-2 py-1 border rounded border-blue-400 text-blue-400 text-sm hover:bg-blue-400/50 hover:text-blue-200"
            >
              저장
            </button>
          )}
        </div>

        <table className="border border-blue-400 rounded-t-md border-separate border-spacing-0 border-b-0 w-full">
          <tbody>
            {data.map((t, i: number) => (
              <tr key={i} className="relative">
                <td
                  width="25%"
                  className="font-medium border-blue-400 border-r border-b leading-3"
                >
                  {isOwner && (
                    <div className="absolute left-[-1.5rem] h-full justify-center flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setData((prev) =>
                            prev.filter((g, index) => index != i)
                          );
                          setTrash((prev) => [...prev, t.id]);
                        }}
                        className="group w-4 h-4 p-[0.1rem]"
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
                  <TextareaAutosize
                    required
                    disabled={!isOwner}
                    onChange={(e) => {
                      let newArr = [...data];
                      newArr[i] = { ...newArr[i], label: e.target.value };
                      setData(newArr);
                    }}
                    className="text-sm bg-transparent w-full focus:bg-blue-500/50 focus:outline-0 p-2 rounded text-center"
                    value={t.label}
                  />
                </td>
                <td
                  width="75%"
                  className="text-sm border-blue-400 border-b leading-3"
                >
                  <TextareaAutosize
                    required
                    disabled={!isOwner}
                    onChange={(e) => {
                      let newArr = [...data];
                      newArr[i] = { ...newArr[i], value: e.target.value };
                      setData(newArr);
                    }}
                    className="text-sm bg-transparent w-full focus:bg-blue-500/50 p-2 focus:outline-0 rounded"
                    value={t.value}
                  />
                  {/* <textarea className="bg-transparent w-full focus:bg-blue-500/50 p-2 focus:outline-0">
                    {t.value}
                  </textarea> */}
                </td>
              </tr>
            ))}
            {emptyList.map((e, i) => (
              <tr className="relative" key={`empty${i}`}>
                <td
                  width="25%"
                  className="font-medium border-blue-400 border-r border-b leading-3"
                >
                  <div className="absolute left-[-1.5rem] h-full justify-center flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setEmptyList((prev) =>
                          prev.filter((g, index) => index != i)
                        )
                      }
                      className="group w-4 h-4 p-[0.1rem]"
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
                  <TextareaAutosize
                    required
                    placeholder="ex) 좋아하는 장르"
                    onChange={(e) => {
                      let newArr = [...emptyList];
                      newArr[i] = { ...newArr[i], label: e.target.value };
                      setEmptyList(newArr);
                    }}
                    className="text-sm bg-transparent w-full focus:bg-blue-500/50 focus:outline-0 p-2 rounded text-center"
                  />
                </td>
                <td width="75%" className="border-blue-400 border-b leading-3">
                  <TextareaAutosize
                    required
                    placeholder="ex) RPG"
                    onChange={(e) => {
                      let newArr = [...emptyList];
                      newArr[i] = { ...newArr[i], value: e.target.value };
                      setEmptyList(newArr);
                    }}
                    className="text-sm bg-transparent w-full focus:bg-blue-500/50 p-2 focus:outline-0 rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isOwner && (
          <button
            onClick={makeNew}
            type="button"
            className="group hover:bg-blue-400/50 border-blue-400 border-t-0 border rounded-b-md h-10 w-full  text-blue-400 flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 stroke-0 fill-blue-400 group-hover:fill-blue-200"
              viewBox="0 0 24 24"
            >
              <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
            </svg>
          </button>
        )}
      </form>
    </div>
  );
};

export default Trait;
