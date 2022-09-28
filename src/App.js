/**File contains all the components and the routing happens here */
import "./App.css";
import DataTableCrudDemo from "./demo/DataTableCrudDemo";
import { Routes, Route } from "react-router-dom";
import SavedData from "./demo/SavedData";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DataTableCrudDemo />} />
        <Route path="saveddata" element={<SavedData />} />
      </Routes>
   
    </>
  );
}

export default App;
