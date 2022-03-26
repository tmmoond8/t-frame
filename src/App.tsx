import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Route, BrowserRouter, Routes, Platform } from "./navigation";
import * as Pages from "./pages";

function App() {
  const platform = localStorage.getItem("AppPlatform") || "Cupertino";
  return (
    <BrowserRouter
      defaultPlatform={platform as Platform}
      screenOptions={{
        headerStyle: {},
        headerTintColor: "transparent",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        backIcon: <IoIosArrowBack />,
      }}
    >
      <Routes>
        <Route path="/" title="Home" component={Pages.Home} noHeader />
        <Route path="/detail" title="Detail" component={Pages.Detail} />
        <Route path="/editor" title="Editor" component={Pages.Editor} />
        <Route path="/person" title="Person" component={Pages.Person} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
