import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addUser } from "../utils/appSlice";
import { Link } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      setMessage(""); // Clear previous error
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      navigate("/");
    } catch (err) {
      // Optional: Log detailed error
      console.error("Login failed:", err);

      // Check for specific message from backend
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin(); // Better UX: trigger on Enter
      }}
      className="max-w-md mx-auto p-4 my-20 shadow-md rounded-lg bg-white"
    >
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-1"
      />

      {/* 👇 Error message shown here */}
      {message && <p className="text-red-600 text-sm mb-2">{message}</p>}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Login
      </button>

      <Link to={"/signup"}>
        <p className="py-2 text-center text-sm">
          Don't have an account? <u>Sign up here</u>
        </p>
      </Link>
    </form>
  );
};

export default Login;
