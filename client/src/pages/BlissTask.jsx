import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { selectToken } from "../utilities/authReducer";
import { deleteTask, getTask } from "../APIs/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import toast from "react-hot-toast";

function BlissTask() {
  const { id } = useParams();
  const token = useSelector(selectToken);
  const [taskData, setTaskData] = useState(null);
  const navigate = useNavigate();
  async function deleteTaskFunction() {
    try {
      const response = await deleteTask(id, token);
      if (response.data.Message === "Task deleted successfully!") {
        toast("Task Deleted", {
          style: {
            borderRadius: "20px",
            color: "#78350f",
            background: "#f8fafc",
          },
          duration: 1000,
        });
        setTimeout(() => {
          navigate("/list");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    async function getData() {
      try {
        const response = await getTask(id, token);
        setTaskData(response.data.Task);
      } catch (error) {
        console.log(error);
      }
    }
    if (token) {
      getData();
    } else {
      console.error("Token is missing");
    }
  }, [id, token]);
  return (
    <>
      <div className="h-screen bg-outline-boxes bg-opacity-25 flex items-center justify-center">
        <div className="bg-yellow-50 bg-opacity-75 hover:bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-80 md:max-w-lg lg:max-w-xl pb-6">
          <h4 className="text-center font-bold text-xl text-amber-900 mb-2">
            Task Details
          </h4>
          {taskData ? (
            <>
              <div className="grid grid-cols-4 gap-y-4 p-0">
                <p className="pl-3 text-amber-900 border-b border-amber-900 pb-1">
                  Task:
                </p>
                <p className="col-span-3 font-light border-b border-amber-900 pb-1">
                  {taskData.task}
                </p>
                <p className="pl-3 text-amber-900 border-b border-amber-900 pb-1">
                  Gratitude:
                </p>
                <p className="col-span-3 font-light border-b border-amber-900 pb-1">
                  {taskData.gratitude}
                </p>
                <p className="pl-3 text-amber-900 border-b border-amber-900 pb-1">
                  Affirmation:
                </p>
                <p className="col-span-3 font-light border-b border-amber-900 pb-1">
                  {taskData.affirmation}
                </p>
                <p className="pl-3 text-amber-900 border-b border-amber-900 pb-1">
                  Completed:
                </p>
                <p className="col-span-3 font-light border-b border-amber-900 pb-1">
                  {taskData.completed ? (
                    <FontAwesomeIcon icon={faCircleCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faCircleXmark} />
                  )}
                </p>
              </div>
              <div className="flex mr-3 mt-5 mb-0 w-full justify-end">
                <Link
                  to={`/editTask/${id}`}
                  className="rounded-xl bg-amber-900 hover:bg-amber-800 text-white px-4 py-2 shadow-md mr-2 w-24 text-center"
                >
                  Edit
                </Link>
                <button
                  className="rounded-xl bg-amber-900 hover:bg-amber-800 text-white px-4 py-2 shadow-md w-24"
                  onClick={deleteTaskFunction}
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <>
              <div class="grid grid-cols-4 gap-y-4 gap-x-5 w-full animate-pulse my-5 pb-2 border-b border-stone-800">
                <div class="h-6 bg-stone-400 opacity-40 rounded col-span-1"></div>
                <div class="h-6 bg-stone-400 opacity-40 rounded col-span-3"></div>
              </div>
              <div class="grid grid-cols-4 gap-y-4 gap-x-5 w-full animate-pulse my-5 pb-2 border-b border-stone-800">
                <div class="h-6 bg-stone-400 opacity-40 rounded col-span-1"></div>
                <div class="h-6 bg-stone-400 opacity-40 rounded col-span-3"></div>
              </div>
              <div class="grid grid-cols-4 gap-y-4 gap-x-5 w-full animate-pulse my-5 pb-2 border-b border-stone-800">
                <div class="h-6 bg-stone-400 opacity-40 rounded col-span-1"></div>
                <div class="h-6 bg-stone-400 opacity-40 rounded col-span-3"></div>
              </div>
              <div class="grid grid-cols-4 gap-y-4 gap-x-5 w-full animate-pulse my-5 pb-2 border-b border-stone-800">
                <div class="h-4 bg-stone-400 opacity-40 rounded col-span-1"></div>
                <div class="h-4 bg-stone-400 opacity-40 rounded col-span-3"></div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default BlissTask;
