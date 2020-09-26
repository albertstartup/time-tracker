import React, { useState } from "react";
import { connect } from "react-redux";
import { RootState } from "app/rootReducer";
import { displayStartDate } from "utils";
import { selectors, actions } from "features/entries/entriesSlice";
import Edit from "./Edit";
import { Entry } from "features/entries/utils";

const List = (props: { entries: Entry[]; entryRemoved: any }) => {
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
