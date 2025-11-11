import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import LoginPage from "./Components/Login/LoginPage";
import RegisterPage from "./Components/Register/RegisterPage";

const Home = () => <h2 style={{ textAlign: "center", marginTop: "50px" }}>🏠 Home Page</h2>;

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
};

export default App;
