import { mytoken_backend } from "../../declarations/mytoken_backend";
import ReactDOM from "react-dom";
import React from "react";
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

const init = async () => {
  const authClient = await AuthClient.create();

  if (await authClient.isAuthenticated()) {
    HandleAuthentication(authClient);
  } else {
    await new Promise((resolve, reject) => {
      authClient.login({
        onSuccess: () => {
          HandleAuthentication(authClient);
        },
        onError: reject,
      });
    });
  }
};

async function HandleAuthentication(authClient) {
  ReactDOM.render(<App />, document.getElementById("root"));
}

init();
