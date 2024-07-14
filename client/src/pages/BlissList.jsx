import React, { useEffect, useState } from "react";
import { getAllTasks } from "../APIs/api";
import { selectToken } from "../utilities/authReducer";
import { useSelector } from "react-redux";
import { selectUser } from "../utilities/userReducer";
import { Link } from "react-router-dom";

function BlissList() {
  const [username, setUserName] = useState();
  const [tasks, setTasks] = useState([]);
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      setUserName(user.username);
    }
  }, [user]);
  useEffect(() => {
    async function loadTasks() {
      try {
        const response = await getAllTasks(token);
        setTasks(response.data.Tasks);
      } catch (error) {
        console.log("Error in Loading Taks:", error);
      }
    }
    loadTasks();
  }, [token, user]);
  return (
    <>
      <div className="h-screen bg-outline-boxes bg-opacity-25 flex items-center justify-center">
        <div className="bg-yellow-50 bg-opacity-75 hover:bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-80 md:max-w-md">
          <h2 className="text-center text-2xl font-bold font-sans text-amber-900 pb-2">
            Welcome {username}
          </h2>
          {tasks.length > 0 ? (
            <>
              <div className="flex justify-center">
                <table className="table-auto w-full">
                  <thead>
                    <tr className="text-left font-light text-amber-900">
                      <th className="font-normal">Sr.</th>
                      <th className="font-normal">Task</th>
                      <th className="font-normal">More</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task, index) => (
                      <tr key={index} className="font-light">
                        <td>{index + 1 + "."}</td>
                        <td>{task.task}</td>
                        <td className="ps-4 font-bold">
                          <Link to={`/task/${task._id}`}>:</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bottom-10 right-10 fixed hover:animate-pulse">
                <Link
                  to="/addTask"
                  className="focus:outline-none rounded-full bg-amber-900 hover:bg-amber-800 text-white px-4 py-2 shadow-md"
                >
                  Add Task
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="text-center text-sm font-sans text-amber-900 mt-3">
                You haven't added any task yet, Click below to add task
              </p>
              <div className="mt-6 text-center">
                <Link
                  to="/addTask"
                  className="font-sans focus:outline-none rounded-md bg-amber-900 hover:bg-amber-800 text-white px-4 py-2 shadow-md"
                >
                  Add Task
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default BlissList;
