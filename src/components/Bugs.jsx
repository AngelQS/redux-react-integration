import React, { Component } from "react";

import StoreContext from "../contexts/storeContext";

class Bugs extends Component {
  static contextType = StoreContext;

  componentDidMount() {
    console.log(this.context);
  }

  render() {
    return <div>Bugs</div>;
  }
}

// One way to set context to class
// Bugs.contextType = StoreContext;

export default Bugs;
