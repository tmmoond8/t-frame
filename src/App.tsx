import React from "react";
import { Route, BrowserRouter, Switch, useHistory } from "./navigation";
import * as Pages from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Link href="/" />
        <Link href="/feed" />
        <Link href="/about" />
        <Switch>
          <Route path="/" component={Pages.Home} />
          <Route path="/feed" component={Pages.Feed} />
          <Route path="/about" component={Pages.About} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;

function Link({ href }: { href: string }) {
  const { history } = useHistory();
  return <button onClick={() => history.push(href)}>{href}</button>;
}
