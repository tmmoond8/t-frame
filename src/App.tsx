import React from "react";
import { Route, BrowserRouter, Routes } from "./navigation";
import * as Pages from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" title="Home" component={Pages.Home} />
        <Route path="/feed" title="Feed" component={Pages.Feed} />
        <Route path="/about" title="About" component={Pages.About} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
