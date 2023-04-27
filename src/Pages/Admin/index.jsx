import { useEffect, useState } from "react";
import "./admin.css";
import { FiEdit } from "react-icons/fi";
import { IoCheckmarkDone } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase.config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";

const Admin = () => {
  const [input, setInput] = useState("");
  const [user, setUser] = useState({});
  const [task, setTasks] = useState([]);

  useEffect(() => {
    const loadTask = async () => {
      const userDetails = localStorage.getItem("@DetailUser");
      setUser(JSON.parse(userDetails));
      if (userDetails) {
        const data = JSON.parse(userDetails);
        const tasksRef = collection(db, "Tasks");
        const q = query(
          tasksRef,
          orderBy("created", "desc"),
          where("userUid", "==", data?.uid)
        );
        const unsub = onSnapshot(q, (snapshot) => {
          let list = [];
          snapshot.forEach((doc) => {
            list.push({
              id: doc.id,
              task: doc.data().task,
              userUid: doc.data().userUid,
            });
          });
          console.log(list);
          setTasks(list);
        });
      }
    };

    loadTask();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (input === "") {
      toast.warning(" type your task...");
    }
    await addDoc(collection(db, "Tasks"), {
      task: input,
      created: new Date(),
      userUid: user.uid,
    })
      .then(() => {
        toast.success("task register");
        setInput("");
      })
      .catch((err) => {
        toast.warn(err);
      });
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const deleteTask = async (id) => {
    console.log(id);
    const docRef = doc(db, "Tasks", id);
    await deleteDoc(docRef);
  };
  return (
    <div className="admin-container">
      <h1>My tasks</h1>

      <form className="form" onSubmit={handleRegister}>
        <textarea
          placeholder="type your task...."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <button type="submit" className="btn-register">
          {" "}
          Register Task
        </button>
      </form>

      {task.map((task) => (
        <article className="list" key={task.id}>
          <p>{task.task}</p>
          <div>
            <button className="btn-edit">
              <FiEdit size={20} />
              Edit
            </button>
            <button className="btn-delete" onClick={() => deleteTask(task.id)}>
              <IoCheckmarkDone size={20} />
              Complete
            </button>
          </div>
        </article>
      ))}

      <button className="btn-logout" onClick={handleLogout}>
        <BiLogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default Admin;
