import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    // <>
    <main className="App">
      <div>
        <Register />
        {/* <Login
       /> */}
      </div>
      <div className="container mt-3">
        <Routes>
          <Route path="/dashboad" element={<Dashboard />} />
          {/* <Route path="/private" element={<Private />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
