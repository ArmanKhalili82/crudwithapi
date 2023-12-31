import { Route, Routes } from "react-router-dom";
import UserList from "./features/users/UserList";
import Addedit from "./features/users/Addedit";

function App() {
  return (
    <div className="container mx-auto px-2 max-w-5xl pt-10 md:pt-32">
      <h1 className="text-center font-bold text-2xl text-gray-700">crud</h1>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/Addedit/:taskid" element={<Addedit />} />
      </Routes>
    </div>
  );
}

export default App;
