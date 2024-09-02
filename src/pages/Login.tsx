import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const Login = () => {
  const [rememberLogin, setRememberLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      
    }
  };
  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/7ca5b7c7-20aa-42a8-a278-f801b0d65fa1/fb548c0a-8582-43c5-9fba-cd98bf27452f/IN-en-20240326-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt=""
        />
        <div className="bg-black/70 fixed top-0 left-0 w-full h-screen" />

        <div className="fixed w-full px-4 py-24 z-20">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Login</h1>
              <form
                onSubmit={handleFormSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  type="email"
                  className="p-3 my-2 bg-gray-700 rounded"
                  placeholder="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  className="p-3 my-2 bg-gray-700 rounded"
                  placeholder="password "
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="bg-red-600 py-3 my-6 rounded font-bold">
                  Login
                </button>
                <div className="flex justify-between items-center text-gray-600">
                  <p>
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={rememberLogin}
                      onChange={() => setRememberLogin(!rememberLogin)}
                    />
                    remember me
                  </p>
                  <p>need help</p>
                </div>
                <p className="my-4">
                  <span className="text-gray-600 mr-2"> New to netflix</span>
                  <Link to="/signup">sign in</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
