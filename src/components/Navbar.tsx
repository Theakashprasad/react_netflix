import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="absolute flex justify-between items-center p-4 z-[100] w-full ">
      <Link to="/">
        <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
          NETFLIX
        </h1>
      </Link>

      {user?.email ? (
        <div className="w-48 flex justify-between">
          <Link to="/profile">
            <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white ">
              profile
            </button>
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="w-48 flex justify-between">
          <Link to="/signup">
            <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
              SignUp
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
              Login{" "}
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
