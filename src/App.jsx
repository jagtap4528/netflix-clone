import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import MyList from "./pages/MyList";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Routes>
  <Route path="/" element={<Home />} />
  <Route
  path="/my-list"
  element={
    <ProtectedRoute>
      <MyList />
    </ProtectedRoute>
  }
/>
  <Route path="/search" element={<Search />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
</Routes>
  );
}

export default App;