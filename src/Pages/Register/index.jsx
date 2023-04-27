import { useState } from "react";
import { IoEnter } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success("account create with sucess");
          navigate("/admin");
        })
        .catch(() => {
          toast.warning("Error to create register");
        });
    } else {
      toast.warn("Please enter field");
    }
  };
  return (
    <div className="home-container">
      <h1>Task Manager</h1>
      <span>Lets create a account</span>
      <h2> Register </h2>

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
      <Link className="button-link" to="/">
        Have a account? login
      </Link>
    </div>
  );
};

export default Register;
