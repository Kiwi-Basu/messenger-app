import { Route, Routes } from "react-router";
import Register from "./pages/Register";
import Otp from "./pages/Otp";
import Home from "./pages/Chat";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <Routes>

         <Route path="/" element = {<Home />} />
         <Route path="/register" element = {<Register />} />
         <Route path="/otp" element = {<Otp />} />
         <Route path="/login" element = {<Login />} />
      </Routes>
    </div>
  );
}

export default App;