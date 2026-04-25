import { Route, Routes } from "react-router-dom";
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import Tasks from "./components/pages/tasks/Tasks";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
