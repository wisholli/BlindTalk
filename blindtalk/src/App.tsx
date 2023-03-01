import Login from "./features/login/Login";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./features/navbar";
import Conversations from "./features/conversations";
import Conversation from "./features/conversations/Conversation";
import Users from "./features/users";
import { useEffect } from "react";
import { getAuthStatus } from "./features/login/authSlice";
import { useAppDispatch } from "./app/hooks";
import { getConversations } from "./features/conversations/conversationsSlice";
import Register from "./features/register";
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
    <div className="flex flex-col bg-basic-gray-5 h-screen w-full">
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
