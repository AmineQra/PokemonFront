import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import "./index.css";

function App() {
  return (
    <div className="">
      <Router>
        <Header />
        <Routes>
          <Route path="/connexion" element={<LoginPage />} />
          <Route path="/inscription" element={<RegistrationPage />} />
          {/* Add other routes for other pages */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
