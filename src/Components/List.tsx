import React from "react";
import { connect } from "react-redux";
import { RootState } from "../configureStore";
import { Entry, displayStartTime } from "../lib";
import { selectors, actions } from "../ducks/entries";

const List = (props: { entries: Entry[], entryRemoved: any }) => {
  return (
    <>
      <h1>Entries: </h1>
      {props.entries.map((entry) => {
        return (
          <div key={entry.id}>
            <h2>
              {displayStartTime(entry.startTime) + " " + entry.details}
            </h2>
            <button onClick={() => props.entryRemoved(entry.id)}>X</button>
          </div>
        );
      })}
    </>
  );
};

const mapState = (state: RootState) => {
  return { entries: selectors.selectAll(state.entries) };
};

const mapDispatch = {
  entryRemoved: actions.entryRemoved
}

export default connect(mapState, mapDispatch)(List);
