import { Routes, Route, BrowserRouter } from "react-router-dom"
import SignInSignUp from "./screens/SignInSignUp";
import Home from "./screens/Home";
import LogedIn from "./screens/LogedIn";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<SignInSignUp />} exact />
        <Route path="/app" element={<LogedIn />} exact />
      </Routes>
    </BrowserRouter>
  );
}
