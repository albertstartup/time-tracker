import React, { useState } from "react";
import { connect } from "react-redux";
import { RootState } from "../configureStore";
import { Entry, displayStartDate } from "../lib";
import { selectors, actions } from "../ducks/entries";
import Edit from "./Edit";

const List = (props: {
  entries: Entry[];
  entryRemoved: any;
}) => {
  const [editingEntryId, setEditingEntryId] = useState("");

  return (
    <>
      <h1>Entries: </h1>
      {props.entries.map((entry) => {
        if (editingEntryId === entry.id) {
          return (
            <Edit              
              entry={entry}
              setEditingEntryId={setEditingEntryId}
              key={entry.id}
            />
          );
        } else {
          return (
            <div key={entry.id}>
              {displayStartDate(entry.startDate) + " " + entry.details}

              <button onClick={() => props.entryRemoved(entry.id)}>X</button>
              <button onClick={() => setEditingEntryId(entry.id)}>Edit</button>
            </div>
          );
        }
      })}
    </>
  );
};

const mapState = (state: RootState) => {
  return { entries: selectors.selectAll(state.entries) };
};

const mapDispatch = {
  entryRemoved: actions.entryRemoved,
};

export default connect(mapState, mapDispatch)(List);
