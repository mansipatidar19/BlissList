import React, { useState } from "react";
import { addTask } from "../APIs/api";
import { useSelector } from "react-redux";
import { selectToken } from "../utilities/authReducer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddTask() {
  const [data, setData] = useState({
    task: "",
    affirmation: "I have completed this task before time.",
    gratitude: "Thank you to the Universe for giving me the chance to do this task!",
  });
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  async function handleAddTask() {
    try {
      const response = await addTask(data, token);
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
  return (
    <>
      <div>
        <div className="h-screen bg-outline-boxes bg-opacity-25 flex items-center justify-center">
          <div className="bg-yellow-50 bg-opacity-75 hover:bg-opacity-90 p-8 pt-6 pl-0 rounded-xl shadow-lg w-full max-w-80 md:max-w-lg lg:max-w-xl pb-6">
            <h4 className="text-center font-bold text-xl text-amber-900 mb-4">
              Add Task
            </h4>
            <form>
              <div className="grid gap-y-6 grid-cols-4">
                <label
                  htmlFor="task"
                  className="mt-1 text-amber-900 pl-8 col-span-1"
                >
                  Task:
                </label>
                <input
                  type="text"
                  name="task"
                  className="col-span-3 border rounded-md py-1 text-amber-900 px-2 border-amber-900"
                  value={data.task}
                  onChange={(e) => setData({ ...data, task: e.target.value })}
                />
                <label
                  htmlFor="task"
                  className="mt-1 text-amber-900 pl-8 col-span-1"
                >
                  Afirmation:
                </label>
                <input
                  type="text"
                  name="task"
                  className="col-span-3 border rounded-md py-1 text-amber-900 px-2 border-amber-900"
                  value={data.affirmation}
                  onChange={(e) =>
                    setData({ ...data, affirmation: e.target.value })
                  }
                />
                <label
                  htmlFor="task"
                  className="mt-1 text-amber-900 pl-8 col-span-1"
                >
                  Gratitude:
                </label>
                <input
                  type="text"
                  name="task"
                  className="col-span-3 border rounded-md py-1 text-amber-900 px-2 border-amber-900"
                  value={data.gratitude}
                  onChange={(e) =>
                    setData({ ...data, gratitude: e.target.value })
                  }
                />
              </div>
              <div className="flex mr-3 mt-5 mb-0 w-full justify-end">
                <button
                  className="rounded-xl bg-amber-900 hover:bg-amber-800 text-white px-4 py-2 shadow-md w-24"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddTask();
                  }}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTask;
