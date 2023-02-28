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

function App() {
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/register" && pathname !== "/login")
      dispatch(getAuthStatus()).then(() => dispatch(getConversations()));
  }, []);

  return (
    <div className="flex flex-col bg-basic-gray-5 h-screen w-full">
      <NavBar />
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Users />}></Route>
        <Route path="/conversation" element={<Conversations />}></Route>
        <Route path="/conversation/:id" element={<Conversation />}></Route>
      </Routes>
    </div>
  );
}

export default App;
