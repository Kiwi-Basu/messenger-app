import { Route, Routes } from "react-router";
import Register from "./pages/Register";
import Otp from "./pages/Otp";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <h1>Text App</h1>

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