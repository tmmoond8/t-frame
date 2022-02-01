import React from "react";
import { Route, BrowserRouter, Routes } from "./navigation";
import * as Pages from "./pages";

function App() {
  return (
    <BrowserRouter
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Routes>
        <Route path="/" title="Home" component={Pages.Home} />
        <Route path="/detail" title="Detail" component={Pages.Detail} />
        <Route path="/about" title="About" component={Pages.About} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
