import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ChatRoom from "./components/ChatRoom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "chatroom",
    children: [
      {
        path: ":roomIdx",
        element: <ChatRoom />,
      },
    ],
  },
]);

export default router;
