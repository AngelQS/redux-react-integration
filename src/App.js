import React from "react";

import BugsList from "./components/BugsList";
import Bugs from "./components/Bugs";
import configureStore from "./store/configStore";
import { Provider } from "react-redux";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      {/* <Bugs /> */}
      <BugsList />
    </Provider>
  );
}

export default App;
