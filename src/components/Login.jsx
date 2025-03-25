import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5555/login",
        { email, password },
        { withCredentials: true }
      );
      navigate("/");
      console.log(res.data);
      console.log({ email, password });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
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
        className="w-full p-2 border rounded mb-2"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
        onClick={handleLogin}
      >
        Login
      </button>
    </form>
  );
};

export default Login;
