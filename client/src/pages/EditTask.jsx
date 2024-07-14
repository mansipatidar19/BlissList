import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectToken } from "../utilities/authReducer";
import { editTask, getTask } from "../APIs/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

function EditTask() {
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState(null);
  const [newData, setNewData] = useState({
    affirmation: "",
    completed: Boolean,
    gratitude: "",
    task: "",
  });
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        const response = await getTask(id, token);
        setTaskData(response.data.Task);
        setNewData({
          affirmation: response.data.Task.affirmation,
          completed: response.data.Task.completed,
          gratitude: response.data.Task.gratitude,
          task: response.data.Task.task,
        });
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

  async function editTaskFunction() {
    try {
      const response = await editTask(newData, id, token);
      toast(response.data.Message, {
        style: {
          borderRadius: "20px",
          color: "#78350f",
          background: "#f8fafc",
        },
        duration: 1500,
      });
      setTimeout(() => {
        navigate("/list");
      }, 1000);
    } catch (error) {
      toast(error.response.data.Message, {
        style: {
          borderRadius: "20px",
          color: "#f8fafc",
          background: "#78350f",
        },
        duration: 3500,
      });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="h-screen bg-outline-boxes bg-opacity-25 flex items-center justify-center">
        <div className="bg-yellow-50 bg-opacity-75 hover:bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-80 md:max-w-lg lg:max-w-xl pb-6">
          <h4 className="text-center font-bold text-xl text-amber-900 mb-2">
            {taskData ? "Edit Task" : "Loading Task"}
          </h4>
          {taskData ? (
            <>
              <div className="grid grid-cols-4 gap-y-4 p-0">
                <input
                  className="pl-3 text-amber-900 border-b border-amber-900 border-0 bg-transparent pb-1"
                  value="Task:"
                  readOnly
                ></input>
                <input
                  name="task"
                  value={newData.task}
                  onChange={handleChange}
                  className="col-span-3 font-light border-b border-amber-900 pb-1 bg-transparent border-0"
                />
                <input
                  className="pl-3 text-amber-900 border-b border-amber-900 border-0 bg-transparent pb-1"
                  value="Gratitude:"
                  readOnly
                ></input>
                <input
                  name="gratitude"
                  value={newData.gratitude}
                  onChange={handleChange}
                  className="col-span-3 font-light border-b border-amber-900 pb-1 bg-transparent border-0"
                />
                <input
                  className="pl-3 text-amber-900 border-b border-amber-900 border-0 bg-transparent pb-1"
                  value="Affirmation:"
                  readOnly
                ></input>
                <input
                  name="affirmation"
                  value={newData.affirmation}
                  onChange={handleChange}
                  className="col-span-3 font-light border-b border-amber-900 pb-1 bg-transparent border-0"
                />
                <input
                  className="pl-3 text-amber-900 border-b border-amber-900 border-0 bg-transparent pb-1"
                  value="Completed:"
                  readOnly
                ></input>
                <button
                  className="col-span-3 font-light border-b border-amber-900 text-left bg-transparent border-0"
                  onClick={() =>
                    setNewData((prevState) => ({
                      ...prevState,
                      completed: !prevState.completed,
                    }))
                  }
                >
                  {newData.completed ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faXmark} />
                  )}
                </button>
              </div>
              <div className="flex mr-3 mt-5 mb-0 w-full justify-end">
                <button
                  className="rounded-xl bg-amber-900 hover:bg-amber-800 text-white px-4 py-2 shadow-md w-24"
                  onClick={editTaskFunction}
                >
                  Edit
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

export default EditTask;
