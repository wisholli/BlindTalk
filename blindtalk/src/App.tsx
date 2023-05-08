import Login from "./components/login/Login";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/navbar";
import Conversations from "./components/conversations";
import Conversation from "./components/conversations/Conversation";
import Users from "./components/users";
import { useEffect } from "react";
import { getAuthStatus } from "./features/login/authSlice";
import { useAppDispatch } from "./app/hooks";
import { getConversations } from "./features/conversations/conversationsSlice";
import Register from "./components/register";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";

function App() {
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  useEffect(() => {
    if (!["/register", "/login"].includes(pathname))
      dispatch(getAuthStatus()).then((data: { payload: any }) => {
        if (data.payload.id) dispatch(getConversations());
      });
  }, []);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/conversation" element={<Conversations />}></Route>
          <Route path="/" element={<Users />}></Route>
        </Route>

        <Route path="/conversation/:id" element={<Conversation />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
