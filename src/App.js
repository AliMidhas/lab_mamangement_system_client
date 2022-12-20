import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RollTest from "./pages/RollTest";
import CubeTest from "./pages/CubeTest";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<Home />} path="/">
              <Route path="/" element={<Dashboard />} />
              <Route path="roll" element={<RollTest />} />
              <Route path="cube" element={<CubeTest />} />
            </Route>
          </Route>
          <Route element={<Login />} path="/login" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
