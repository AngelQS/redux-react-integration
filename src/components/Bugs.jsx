import React, { Component } from "react";

import { connect } from "react-redux";
import { loadBugs, resolveBug, getUnresolvedBugs } from "../store/bugs";

class Bugs extends Component {
  componentDidMount() {
    this.props.loadBugs();
  }

  render() {
    return (
      <ul>
        {this.props.bugs.map((bug) => (
          <li key={bug.id}>
            {bug.description}
            <button onClick={() => this.props.resolveBug(bug.id)}>
              Resolve
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

// One way to set context to class
// Bugs.contextType = StoreContext;

const mapStateToProps = (state) => ({
  // bugs: state.entities.bugs.list, // default
  bugs: getUnresolvedBugs(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadBugs: () => dispatch(loadBugs()),
  resolveBug: (id) => dispatch(resolveBug(id)),
});

// Container (presentation component)
//   Presentation (Bugs)
// arg1 => bugs: state.entities.bugs.list
export default connect(mapStateToProps, mapDispatchToProps)(Bugs);
