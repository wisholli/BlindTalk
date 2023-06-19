import Login from "./components/login/Login";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/header/Header";
import Conversation from "./components/conversations/Conversation";
import { Users } from "./components/users/Users";
import { CurrentUserProfile } from "./components/currentUserProfile/currentUserProfile";
import { useEffect } from "react";
import { getAuthStatus } from "./features/login/authSlice";
import { useAppDispatch } from "./app/hooks";
import { getConversations } from "./features/conversations/conversationsSlice";
import Register from "./components/register/Register";
import { ProtectedRoutes } from "./utils/ProtectedRoutes/ProtectedRoutes";
import { ProfilePage } from "./components/currentUserProfile/profilePage";

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
      <Header />
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/" element={<Users />}></Route>
          <Route path="/conversation/:id" element={<Conversation />}></Route>
          <Route path="/profile/:id" element={<ProfilePage />}></Route>
        </Route>

        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
