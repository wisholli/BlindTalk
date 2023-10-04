import Login from "./pages/login/Login";
import { Routes, Route, useLocation } from "react-router-dom";
import Conversation from "./pages/conversationspage/Conversation";
import { Users } from "./pages/homepage/Users";
import { useEffect } from "react";
import { getAuthStatus } from "./store/slices/login/authSlice";
import { getConversations } from "./store/slices/conversations/conversationsSlice";
import Register from "./pages/registerpage/Register";
import { ProtectedRoutes } from "./utils/ProtectedRoutes/ProtectedRoutes";
import { ProfilePage } from "./pages/profilepage/profilePage";
import { useAppDispatch } from "./store/store";
import { MainLayout } from "./assets/styles/MainLayout";
import { ErrorPageNotFound } from "./pages/errorsPages/errorPageNotFound";

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
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route
            path="/"
            element={
              <MainLayout>
                <Users />
              </MainLayout>
            }
          ></Route>
          <Route
            path="/conversation/:id"
            element={
              <MainLayout>
                <Conversation />
              </MainLayout>
            }
          ></Route>
          <Route
            path="/profile/:id"
            element={
              <MainLayout>
                <ProfilePage />
              </MainLayout>
            }
          ></Route>
        </Route>

        <Route
          path="/register"
          element={
            <MainLayout>
              <Register />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        ></Route>
        <Route path="*" element={<ErrorPageNotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
