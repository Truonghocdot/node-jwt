import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Single from "./pages/Single";
import Write from "./pages/Write";
import OwnPost from "./pages/OwnPost";
import EditProfile from "./pages/EditProfile";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/post/:id" element={<Single />} />
      <Route path="/write" element={<Write />} />
      <Route path="/own-post" element={<OwnPost />} />
      <Route path="/edit-profile" element={<EditProfile />} />
    </Routes>
  );
}

export default App;
