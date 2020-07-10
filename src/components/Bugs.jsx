import React, { Component } from "react";

import StoreContext from "../contexts/storeContext";
import { loadBugs } from "../store/bugs";

class Bugs extends Component {
  static contextType = StoreContext;
  state = { bugs: [] };

  componentDidMount() {
    const store = this.context;

    // Subscribing to store
    this.unsubscribe = store.subscribe(() => {
      const bugsInStore = store.getState().entities.bugs.list;
      if (this.state.bugs !== bugsInStore) this.setState({ bugs: bugsInStore });
    });

    // Dispatching loadBugs
    store.dispatch(loadBugs());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <ul>
        {this.props.bugs.map((bug) => (
          <li key={bug.id}>{bug.description}</li>
        ))}
      </ul>
    );
  }
}

// One way to set context to class
// Bugs.contextType = StoreContext;

export default Bugs;
