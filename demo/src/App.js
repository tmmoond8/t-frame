import { Route, BrowserRouter, Routes } from "t-frame";
import Pages from "./Pages";

function App() {
  const platform = localStorage.getItem("AppPlatform") || "Cupertino";
  return (
    <BrowserRouter
      defaultPlatform={platform}
      screenOptions={{
        headerStyle: {},
        headerTintColor: "transparent",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Routes>
        <Route path="/" title="Main" component={Pages.Main} noHeader />
        <Route path="/detail" title="Detail" component={Pages.Detail} />
        <Route path="/editor" title="Editor" component={Pages.Editor} />
        <Route path="/person" title="Person" component={Pages.Person} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
