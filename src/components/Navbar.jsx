import "./Navbar.css";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

function Navbar() {
  const [user, setUser] = useState(null);

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <nav className="navbar">
      <h1 className="logo">NETFLIX</h1>

      <ul className="nav-links">
        <li>Home</li>
        <li>TV Shows</li>
        <li>
        <Link to="/search">Search</Link></li>
        <Link to="/my-list">
        <li>My List</li>
        </Link>
      </ul>

      <div className="profile">
  {user ? (
    <>
      <span style={{ marginRight: "10px", fontSize: "14px" }}>
        {user.email}
      </span>

      <button onClick={handleLogout}>
        Logout
      </button>
    </>
  ) : (
    <>
      <Link to="/login">
        <button>Login</button>
      </Link>

      <Link to="/signup">
        <button style={{ marginLeft: "10px" }}>
          Sign Up
        </button>
      </Link>
    </>
  )}
</div>
    </nav>
  );
}

export default Navbar;