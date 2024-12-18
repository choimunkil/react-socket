interface Chat {
  userIdx: string;
  message: string;
}
interface Props {
  type: "send" | "receive";
  data: Chat;
}
const ChatItem = ({ type, data }: Props) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        padding: "0px 16px 16px",
        alignItems: type === "receive" ? "flex-start" : "flex-end",
      }}
    >
      <h4 style={{ margin: "0" }}>user : {data.userIdx}</h4>
      <span>message : {data.message}</span>
    </div>
  );
};

export default ChatItem;
