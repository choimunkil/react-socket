import "./App.css";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
// 채팅방 더미 데이터
const CHAT_ROOMS = [
  {
    roomIdx: "123",
    roomTitle: "채팅방 123",
  },
  {
    roomIdx: "456",
    roomTitle: "채팅방 456",
  },
];
function App() {
  const navigate = useNavigate();
  // userIdx를 임시로 날짜데이터 사용...
  const userIdx = dayjs(new Date()).format("YYYYMMDDhhmmss");

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {CHAT_ROOMS.map((room) => (
          <li
            style={{
              width: "100%",
              padding: "16px",
              border: "1px solid #000",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
              boxShadow: "rgba(99,99,99,0.2) 0px 2px 8px 0px",
            }}
            key={room.roomIdx}
            onClick={() =>
              navigate(`/chatroom/${room.roomIdx}`, {
                state: {
                  userIdx,
                },
              })
            }
          >
            <h3>{room.roomTitle}</h3>
          </li>
        ))}
      </div>
    </>
  );
}

export default App;
