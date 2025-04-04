import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/appSlice";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.post(
        BASE_URL + "/signup",
        { name, email, password, role },
        { withCredentials: true }
      );
      console.log(res.data.user);
      dispatch(addUser(res.data.user));
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="max-w-md mx-auto p-4 shadow-md rounded-lg bg-white"
    >
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
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
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Signup
      </button>

      <Link to={"/login"}>
        <p className="py-2">Already have a Account? <u>Click here</u></p>
      </Link>
    </form>
  );
};

export default Signup;
