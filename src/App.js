import React from "react";

import Bugs from "./components/Bugs";
import configureStore from "./store/configStore";
import StoreContext from "./contexts/storeContext";

const store = configureStore();

function App() {
  return (
    <StoreContext.Provider value={store}>
      <Bugs />
    </StoreContext.Provider>
  );
}

export default App;
