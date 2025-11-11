import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import LoginPage from "./Components/Login/LoginPage";

const Home = () => <h2 style={{ textAlign: "center", marginTop: "50px" }}>🏠 Home Page</h2>;

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default App;
