import { FormEvent, useEffect, useRef, useState } from "react";

import ChatItem from "./Chat";
import { useLocation, useParams } from "react-router-dom";
import useSocket from "../hooks/useSocket";

interface Chat {
  userIdx: string;
  message: string;
}

const ChatRoom = () => {
  const {
    state: { userIdx },
  } = useLocation() as { state: { userIdx: string } };
  console.log(userIdx);
  const { roomIdx } = useParams();
  const { socket } = useSocket(roomIdx as string);

  const [chatList, setChatList] = useState<Chat[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 타입 가드
    if (!socket || !inputRef.current) return;
    // submit 시 서버로 메세지 전송
    socket.emit("send", { userIdx, message: inputRef.current.value });
    inputRef.current.value = "";
  };

  useEffect(() => {
    if (!socket) return;
    const socketEvent = (data: Chat) => {
      setChatList((prev) => [...prev, data]);
    };
    socket.on("receive", socketEvent);
    return () => {
      socket.off("receive", socketEvent);
    };
    // useSocket hook 에서 effect실행 되면서 socket 초기화 되는데 setState로 socket이 업데이트 되면 해당 effect가 실행되면서 receive 이벤트 리스너를 등록
  }, [socket]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: "16px",
          width: "100%",
          height: "calc(100% - 60px)",
        }}
      >
        {chatList.map((chat, i) => (
          <ChatItem
            key={i}
            type={chat.userIdx === userIdx ? "send" : "receive"}
            data={chat}
          />
        ))}
      </div>
      <form
        style={{
          position: "absolute",
          bottom: "-85px",
          width: "100%",
          height: "60px",
          display: "flex",
          padding: "16px",
          gap: "8px",
        }}
        onSubmit={submitHandler}
      >
        <input style={{ flex: "1", borderRadius: "4px" }} ref={inputRef} />
        <button
          style={{
            border: "none",
            borderRadius: "4px",
            backgroundColor: "rgb(25,195,125",
          }}
        >
          보내기
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
