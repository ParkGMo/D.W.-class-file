import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import NewPage from "./pages/NewPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/">
            <Route index element={<Homepage />} />
            <Route path="new" element={<NewPage />} />
            {/* <Route path="edit" element={< />} /> */}
            {/* <Route path="diary" element={< />} /> */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
