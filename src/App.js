import { Suspense } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Suspense>
        <Routes>
          <Route index path="/" element={<Navigate replace to="/home" />} />
          <Route exact path="/home" element={<h1>homes</h1>} />
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
