import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./styles/index.less";

// Your Parse initialization configuration goes here
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Parse from "parse/dist/parse.min.js";
import router from "./router";
import { IntlProvider } from "react-intl";
import { CustomProvider } from "rsuite";
import locales from "./locales";
import enGB from "rsuite/locales/en_GB";
const PARSE_APPLICATION_ID = "xN01HjcV6z6uqr8k1K4RIn08WaJ5UT3GrUrXtRb3";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "pefuwnCnc58ge4wCwhLX0duMdgVCDm4xeF50tzzO";

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <IntlProvider locale="en" messages={locales.en}>
    <CustomProvider locale={enGB} theme="dark"></CustomProvider>
    <RouterProvider router={router} />
  </IntlProvider>,
  //</React.StrictMode>
);
