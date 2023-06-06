import React from "react";
import Frame from "./components/Frame";

import { appNavs } from "./config";
import RequiredAuth from "./components/RequiredAuth";

const App = () => {
  return (
    <RequiredAuth>
      {" "}
      <Frame navs={appNavs} />
    </RequiredAuth>
  );
};

export default App;
