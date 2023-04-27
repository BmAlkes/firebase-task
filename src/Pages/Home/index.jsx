import { useState } from "react";
import "./home.css";
import { IoEnter } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success("Login sucess");
          navigate("/admin");
        })
        .catch((err) => {
          console.log(err);
          toast.error("error login");
        });
    } else {
      toast.warn("Please enter field");
    }
  };
  return (
    <div className="home-container">
      <h1>Task Manager</h1>
      <span>Management your Task in a easy way</span>
      <h2> Login</h2>

      <form className="form" onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="add your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="add your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          <IoEnter size={24} />
          Enter
        </button>
      </form>
      <Link className="button-link" to="/register">
        {" "}
        Dont have a account? Register
      </Link>
    </div>
  );
};

export default Home;
