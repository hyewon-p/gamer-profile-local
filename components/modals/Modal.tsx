import React from "react";

const Modal: React.FC<{
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: any;
  close?: string;
  ok?: string;
}> = ({ children, showModal, setShowModal, close = "취소", ok = "확인" }) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-slate-300 w-[40vw] outline-none focus:outline-none">
                {/*header*/}

                {/* <button
                  className="p-1 ml-auto bg-transparent h-6 w-6 border-0 text-black float-right outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" />
                  </svg>
                </button> */}

                {/*body*/}
                <div className="relative p-6 text-black min-h-[6rem]">
                  {children}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-3 border-t border-solid border-blue-300 rounded-b">
                  {/* <button
                    className="text-red-500 background-transparent font-bold uppercase px-4 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    {close}
                  </button> */}
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    {ok}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
