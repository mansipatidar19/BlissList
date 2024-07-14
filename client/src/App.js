import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlissList from "./pages/BlissList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "./utilities/authReducer";
import NotFound from "./pages/NotFound";
import BlissTask from "./pages/BlissTask";
import EditTask from "./pages/EditTask";
import AddTask from "./pages/AddTask";

function App() {
  const token = useSelector(selectToken);
  return (
    <div className="App">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          {token && (
            <>
              <Route path="/list" element={<BlissList />}></Route>
              <Route path="/task/:id" element={<BlissTask />}></Route>
              <Route path="/editTask/:id" element={<EditTask />}></Route>
              <Route path="/addTask" element={<AddTask />}></Route>
            </>
          )}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
