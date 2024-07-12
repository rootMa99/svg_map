import { Suspense } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/UI/NavBar";
import SvgHome from "./components/svgs/SvgHome";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Suspense>
        <Routes>
          <Route index path="/" element={<Navigate replace to="/home" />} />
          <Route exact path="/home" element={<SvgHome />} />
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
