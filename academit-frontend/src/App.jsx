import React from "react";
import NavBar from "./components/header";
import TablaArchivos from "./components/tabla";
function App() {
  return (
    <div>
      <NavBar className="titulo"></NavBar>
      <div className="container p-4">
        <TablaArchivos></TablaArchivos>
      </div>
    </div>
  );
}

export default App;
