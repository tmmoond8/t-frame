import React from "react";
import { Route, BrowserRouter, Routes } from "./navigation";
import * as Pages from "./pages";

function App() {
  return (
    <BrowserRouter
      pratform="Cupertino"
      screenOptions={{
        headerStyle: {},
        headerTintColor: "transparent",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Routes>
        <Route path="/" title="Home" component={Pages.Home} />
        <Route path="/detail" title="Detail" component={Pages.Detail} />
        <Route path="/editor" title="Editor" component={Pages.Editor} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
