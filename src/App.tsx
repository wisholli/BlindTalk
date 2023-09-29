import Login from "./pages/login/Login";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/header/Header";
import Conversation from "./pages/conversationspage/Conversation";
import { Users } from "./pages/homepage/Users";
import { useEffect } from "react";
import { getAuthStatus } from "./store/slices/login/authSlice";
import { getConversations } from "./store/slices/conversations/conversationsSlice";
import Register from "./pages/registerpage/Register";
import { ProtectedRoutes } from "./utils/ProtectedRoutes/ProtectedRoutes";
import { ProfilePage } from "./pages/profilepage/profilePage";
import { useAppDispatch } from "./store/store";

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
