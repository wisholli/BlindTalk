import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SocketContext, socket } from "./utils/SocketContext/SocketContext";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <SocketContext.Provider value={socket}>
        <App />
      </SocketContext.Provider>
    </Provider>
  </BrowserRouter>
);
