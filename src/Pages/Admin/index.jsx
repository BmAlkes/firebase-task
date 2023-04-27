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
  updateDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";

const Admin = () => {
  const [input, setInput] = useState("");
  const [user, setUser] = useState({});
  const [task, setTasks] = useState([]);
  const [editTarefa, setEditTask] = useState({});

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
    if (editTarefa?.id) {
      handleUpdateTarefa();
      return;
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
    const docRef = doc(db, "Tasks", id);
    await deleteDoc(docRef);
    toast.success("task completed..");
  };
  const editTask = async (task) => {
    setInput(task.task);
    setEditTask(task);
  };

  async function handleUpdateTarefa() {
    const docRef = doc(db, "Tasks", editTarefa?.id);
    await updateDoc(docRef, {
      task: input,
    })
      .then(() => {
        toast.success("task updated");
        setInput("");
      })
      .catch((err) => {
        toast.warn(`${err}`);
      });
  }
  return (
    <div className="admin-container">
      <h1>My tasks</h1>

      <form className="form" onSubmit={handleRegister}>
        <textarea
          placeholder="type your task...."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        {Object.keys(editTarefa).length > 0 ? (
          <button
            type="submit"
            className="btn-register"
            style={{ backgroundColor: "#6add39" }}
          >
            Update Task
          </button>
        ) : (
          <button type="submit" className="btn-register">
            Register Task
          </button>
        )}
      </form>

      {task.map((task) => (
        <article className="list" key={task.id}>
          <p>{task.task}</p>
          <div>
            <button className="btn-edit" onClick={() => editTask(task)}>
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
