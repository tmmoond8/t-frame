import React from "react";
import { Route, BrowserRouter, Routes } from "./navigation";
import * as Pages from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" component={Pages.Home} />
          <Route path="/feed" component={Pages.Feed} />
          <Route path="/about" component={Pages.About} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
