import React from "react";
import { Route, BrowserRouter, Routes, useHistory } from "./navigation";
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
        <Route
          path="/"
          title="Home"
          component={Pages.Home}
          rightMenus={HomeRightMenus}
        />
        <Route path="/detail" title="Detail" component={Pages.Detail} />
        <Route path="/editor" title="Editor" component={Pages.Editor} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function HomeRightMenus() {
  const { history } = useHistory();
  return <button onClick={() => history.push("/editor")}>✏️</button>;
}
