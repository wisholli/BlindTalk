import Login from "./features/login/Login";
import { Routes, Route } from "react-router-dom";
import People from "./features/users";
import NavBar from "./features/navbar";
import Conversations from "./features/conversations";
import Conversation from "./features/conversations/Conversation";

function App() {
  return (
    <div className="bg-basic-gray-5 h-screen w-full">
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<People />}></Route>
        <Route path="/conversation" element={<Conversations />}></Route>
        <Route path="/conversation/:id" element={<Conversation />}></Route>
      </Routes>
    </div>
  );
}

export default App;
