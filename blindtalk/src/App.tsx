import Login from "./features/login/Login";
import { Routes, Route } from "react-router-dom";
import People from "./features/people";

function App() {
  return (
    <div className="bg-basic-gray-10">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<People />}></Route>
      </Routes>
    </div>
  );
}

export default App;
