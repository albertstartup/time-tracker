import React from "react";
import { connect } from "react-redux";
import { RootState } from "../configureStore";
import { Entry, displayStartDate } from "../lib";
import { selectors, actions } from "../ducks/entries";

const List = (props: { entries: Entry[], entryRemoved: any }) => {
  return (
    <>
      <h1>Entries: </h1>
      {props.entries.map((entry) => {
        return (
          <div key={entry.id}>
            <span>
              {displayStartDate(entry.startDate) + " " + entry.details}
            </span>
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
