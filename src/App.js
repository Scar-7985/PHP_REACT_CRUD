import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./Pages/Home";
import Error404 from './Pages/Error404'
import CRUD from "./Pages/CRUD";

function App() {
  return (
    <div className="w-screen h-screen bg-gray-200 grid place-items-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CRUD />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
