import React from "react";
import { Route, Router, Switch } from "./navigation";
import * as Pages from "./pages";

function App() {
  return (
    <>
      <Link href="/" />
      <Link href="/feed" />
      <Link href="/about" />
      <Router>
        <Switch>
          <Route path="/" component={Pages.Home} />
          <Route path="/feed" component={Pages.Feed} />
          <Route path="/about" component={Pages.About} />
        </Switch>
      </Router>
    </>
  );
}

export default App;

function Link({ href }: { href: string }) {
  return <button onClick={() => (window.location.href = href)}>{href}</button>;
}
