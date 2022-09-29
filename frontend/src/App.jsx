import React from "react";
import { useEffect } from "react";
import "./App.css";
import { Navbar } from "./Components/Layout/Navbar";
import { Footer } from "./Components/Layout/Footer";
import { AllRoutes } from "./Pages/AllRoutes";
import { store } from "./Redux/store";
import { getProfile } from "./Redux/Auth/action";

function App() {
  useEffect(() => {
    store.dispatch(getProfile());
  }, []);

  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
      <Footer />
    </div>
  );
}

export default App;
